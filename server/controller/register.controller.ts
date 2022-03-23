import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import db from '../db';

export const registerUser = async (req: any, res: any) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = {
    userid: uuidv4(),
    email,
    password: hashedPassword
  };
  db('users').insert(newUser)
    .then(() => res.status(200).send())
    .catch((err: any) => console.log('register err', err));
};