import { logger } from '../utils/logger.utils';
import { v4 as uuidv4 } from 'uuid';
import db from '../db/postgres';

export const saveEmail = (req: any, res: any) => {
  const { email } = req.body;
  db('waitlist').insert({ id: uuidv4(), email })
    .then(() => res.status(200).send())
    .catch((err: any) => {
      logger.error(`email waitlist err - ${email}`, err);
      return res.status(400).send();
    });
}