import { compare } from 'bcryptjs';
import db from '../db/postgres';
const jwt = require("jsonwebtoken");
import { createRefreshToken } from '../utils/auth.utils';

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
        return res.status(200).json({ ...user, token, refreshToken: createRefreshToken(user) });
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
  const { refreshToken } = req.body;
  console.log('refresh token ', refreshToken, req.body);

  let payload: any = null;
  try {
    payload = jwt.verify(refreshToken, 'refreshtokensecret');
  } catch (err) {
    console.log(err);
    return res.send({ token: "" });
  }
  console.log('payload-------', payload);

  try {
    const users: Array<any> = await db('users').select().where({ email: payload.email })
    console.log('login refresh users', users);
    if (users && users[0]) {
      const token: any = jwt.sign(
        { userId: users[0].userid },
        "secretkeyappearshere",
        { expiresIn: "1h" }
      );
      console.log('password valid', token);
      const { password, userid, ...user } = users[0];
      return res.status(200).json({ ...user, token });
    }
    return res.status(200).send({ token: '' });
  } catch (err: any) {
    console.log('login err', err); // TO DO: need to replace this with winston
    return res.status(200).send({ token: '' });
  }
}