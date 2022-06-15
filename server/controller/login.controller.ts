const jwt = require("jsonwebtoken");
import { compare } from 'bcryptjs';
import db from '../db/postgres';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../utils/auth.utils';

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const users: Array<any> = await db('users').select().where({ email })
    if (users && users[0]) {
      const isPasswordValid: boolean = await compare(password, users[0].password);
      if (isPasswordValid) {
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
    const users: Array<any> = await db('users').select().where({ email: payload.email })
    if (users && users[0]) {
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