import { compare } from 'bcryptjs';
import db from '../db';

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const users: Array<any> = await db('users').select().where({ email })
    if (users && users[0]) {
      console.log('if user', users);
      const isPasswordValid: boolean = await compare(password, users[0].password);
      if (isPasswordValid) {
        req.session.user = users[0];
        return { user: users[0] };
      }
    }
  } catch (err: any) {
    console.log('login err', err);
  }
}