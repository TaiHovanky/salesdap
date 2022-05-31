import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import db from '../db/postgres';

export const registerUser = async (req: any, res: any) => {
  const {
    email,
    password,
    firstname,
    lastname,
    company
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = {
    userid: uuidv4(),
    email,
    password: hashedPassword,
    firstname,
    lastname,
    company
  };
  db('users').insert(newUser)
    .then(() => {
      req.session.user = newUser;
      return res.status(200).json({ email, firstname, lastname, company });
    })
    .catch((err: any) => console.log('register err', err));
};