import { v4 as uuidv4 } from 'uuid';
import db from '../db';

export const saveEmail = (req: any, res: any) => {
  const { email } = req.body;
  db('waitlist').insert({ id: uuidv4(), email })
    .then(() => res.status(200).send())
    .catch((err: any) => {
      console.log('email err', err);
      res.status(400).send();
    });
}