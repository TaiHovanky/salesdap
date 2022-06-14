import { compare } from 'bcryptjs';
import db from '../db/postgres';
const jwt = require("jsonwebtoken");
import { createRefreshToken, sendRefreshToken } from '../utils/auth.utils';

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const users: Array<any> = await db('users').select().where({ email })
    // console.log('login users', users);
    if (users && users[0]) {
      const isPasswordValid: boolean = await compare(password, users[0].password);
      if (isPasswordValid) {
        const token: any = jwt.sign(
          { userId: users[0].userid },
          "secretkeyappearshere",
          { expiresIn: "1h" }
        );
        console.log('password valid', token);
        const { password, userid, ...user } = users[0];
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
  const token = req.cookies.jid;
  console.log('refresh token ', token);
  res.status(200).send();
}