import db from '../db/postgres';
import { logger } from '../utils/logger.utils';

export const verifyResetPasswordToken = async (req: any, res: any) => {
  const token = req.body.token;
  try {
    const users = await db('users').select().where({ passwordtoken: token }).andWhere('passwordtoken_expiration', '>', new Date());
    if (users && users[0]) {
      return res.status(200).send('Password reset link is valid');
    }
  } catch(err: any) {
    logger.error(`verify reset password token error - err: ${err}`);
    return res.status(400).send('Invalid password reset link');
  }
}