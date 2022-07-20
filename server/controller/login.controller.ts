const jwt = require("jsonwebtoken");
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);
import { compare } from 'bcryptjs';
import db from '../db/postgres';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../utils/auth.utils';
import { logger } from '../utils/logger.utils';

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  // logger.warn('some login warning')
  console.log('login user', email, password);
  try {
    const users: Array<any> = await db('users')
      .select()
      .where({ email });

    console.log('users', users);
    if (!users || !users[0]) {
      logger.warn(`login fail no user found - email: ${email}`);
      return res.status(401).send();
    }

    const isPasswordValid: boolean = await compare(password, users[0].password);
    if (isPasswordValid) {
      console.log('is password valid')
      const isActive: boolean = await checkForActiveSubscription(users[0].customer_id);
      if (!isActive && users[0].active_subscription === true) {
        console.log('updating users')
        await db('users').update({ active_subscription: false, subscription_type: 'FREE' }).where({ email });
      }

      const token: string = createAccessToken(users[0]);

      const pinnedFiles: Array<any> = await db('pinned_files')
        .select('file_label', 'pinned_file_id', 'file_name')
        .where({ user_id: users[0].userid });

      const {
        password,
        userid,
        customer_id,
        passwordtoken,
        passwordtoken_expiration,
        ...user
      } = users[0];
      user.pinnedFiles = pinnedFiles;
      console.log('pinned files', pinnedFiles)
      sendRefreshToken(res, createRefreshToken(user));
      return res.status(200).json({ ...user, token });
    } else {
      console.log('wrong password')
      // logger.warn(`login fail invalid password - email: ${email}`);
    }

    return res.status(401).send();
  } catch (err: any) {
    logger.error(`login error - err: ${err}`);
    return res.status(401).send();
  }
}

export const refreshAccessToken = async (req: any, res: any) => {
  const refreshToken: string = req.cookies.rtsd;

  let payload: any = null;
  if (!!refreshToken && refreshToken !== 'undefined') {
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch(err) {
      console.log('ref token verification failed')
      return res.status(200).send();
    }
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

      const pinnedFiles: Array<any> = await db('pinned_files')
        .select('file_label', 'pinned_file_id', 'file_name')
        .where({ user_id: users[0].userid });

      user.pinnedFiles = pinnedFiles;
      sendRefreshToken(res, createRefreshToken(user));
      return res.status(200).json({ ...user, token });
    } else {
      logger.warn('refresh token fail no user found')
    }
    return res.status(200).send();
  } catch (err: any) {
    logger.error(`refresh token error - err: ${err}`);
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