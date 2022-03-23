import { v4 as uuidv4 } from 'uuid';
import db from '../db';

export const registerUser = (req: any, res: any) => {
  const { email, password } = req.body;
  const newUser = {
    userid: uuidv4(),
    email,
    password
  };
  db('users').insert(newUser)
    .then(() => res.status(200).send())
    .catch((err: any) => console.log('register err', err));
};