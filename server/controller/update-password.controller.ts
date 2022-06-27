import bcrypt from 'bcryptjs';
import db from '../db/postgres';
import { logger } from '../utils/logger.utils';

export const updatePassword = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const users = await db('users').select().where({ email });
    if (users && users[0]) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const updatedUser = {
        password: hashedPassword,
        passwordtoken: null,
        passwordtoken_expiration: null
      };
      await db('users').update(updatedUser).where({ email });
      return res.status(200).send();
    }
  } catch(err) {
    logger.error(`update password error - email: ${email} - err: ${err}`);
    return res.status(400).send();
  }
}