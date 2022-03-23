import db from '../db';

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const user = await db('users').select().where({ email })
    if (user) {
      console.log('if user', user);
      
    }
  } catch (err: any) {
    console.log('login err', err);
  }
}