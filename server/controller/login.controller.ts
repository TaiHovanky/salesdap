import { compare } from 'bcryptjs';
import db from '../db/postgres';

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const users: Array<any> = await db('users').select().where({ email })
    if (users && users[0]) {
      const isPasswordValid: boolean = await compare(password, users[0].password);
      if (isPasswordValid) {
        req.session.user = users[0].userid;
        req.session.save();
        console.log('req session user after login', req.session, req.sessionID);
        const { password, userid, ...user } = users[0];
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Origin', "http://54.85.114.194");
        res.header( 'Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        return res.status(200)
        // .cookie(
        //   req.session.user,
        //   JSON.stringify(process.env.SESSION_SECRET),
        //   req.session.cookie
        // )
        .send(user);
      }
      return res.status(401).send();
    }
    return res.status(401).send();
  } catch (err: any) {
    console.log('login err', err); // TO DO: need to replace this with winston
    return res.status(401).send();
  }
}