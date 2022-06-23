const jwt = require("jsonwebtoken");
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);
import { compare } from 'bcryptjs';
import db from '../db/postgres';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../utils/auth.utils';

// const FREE = 'FREE';

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const users: Array<any> = await db('users').select().where({ email });
    if (!users || !users[0]) {
      return res.status(401).send();
    }

    const isPasswordValid: boolean = await compare(password, users[0].password);
    if (isPasswordValid) {
      const isActive: boolean = await checkForActiveSubscription(users[0].customer_id);
      if (!isActive && users[0].active_subscription === true) {
        await db('users').update({ active_subscription: false, subscription_type: 'FREE' }).where({ email });
      }

      const token: string = createAccessToken(users[0]);
      const {
        password,
        userid,
        customer_id,
        passwordtoken,
        passwordtoken_expiration,
        ...user
      } = users[0];
      sendRefreshToken(res, createRefreshToken(user));
      return res.status(200).json({ ...user, token });
    }

    return res.status(401).send();
  } catch (err: any) {
    console.log('login err', err); // TO DO: need to replace this with winston
    return res.status(401).send();
  }
}

export const refreshAccessToken = async (req: any, res: any) => {
  const refreshToken: string = req.cookies.jid;

  let payload: any = null;
  if (!!refreshToken && refreshToken !== 'undefined') {
    payload = jwt.verify(refreshToken, 'refreshtokensecret');
  } else {
    return res.status(200).send();
  }

  try {
    const users: Array<any> = await db('users').select().where({ email: payload.email });

    // if (!users[0] || users[0].token_version !== payload.tokenVersion) {
    //   // safeguard for refresh token version
    //   return res.status(200).send();
    // }
    const isActive: boolean = await checkForActiveSubscription(users[0].customer_id);

    if (users && users[0]) {
      if (!isActive && users[0].active_subscription === true) {
        await db('users').update({ active_subscription: false, subscription_type: 'FREE' }).where({ email: payload.email });
      }
      const token: string = createAccessToken(users[0]);
      const {
        password,
        userid,
        customer_id,
        passwordtoken,
        passwordtoken_expiration,
        ...user
      } = users[0];
      sendRefreshToken(res, createRefreshToken(user));
      return res.status(200).json({ ...user, token });
    }
    return res.status(200).send();
  } catch (err: any) {
    console.log('login err', err); // TO DO: need to replace this with winston
    return res.status(200).send();
  }
}

export const checkForActiveSubscription = async (customerId: string): Promise<boolean> => {
  if (!customerId) {
    return false;
  }

  const customer = await stripe.customers.retrieve(customerId, { expand: ['subscriptions']});

  if (customer && customer.subscriptions && customer.subscriptions.data) {
    const hasActiveSubscription: boolean = !!customer.subscriptions.data.find((subscription: any) => {
      return subscription.status === 'active';
        // && subscription.cancel_at_period_end === false;
    });

    if (hasActiveSubscription) {
      return true;
    }
  }
  return false;
}