import db from '../db/postgres';

export const verifyResetPasswordToken = async (req: any, res: any) => {
  const token = req.body.token;
  try {
    const users = await db('users').select().where({ passwordtoken: token }).andWhere('passwordtoken_expiration', '>', new Date());
    if (users && users[0]) {
      res.status(200).send('Password reset link is valid');
    }
  } catch(err: any) {
    res.status(400).send('Invalid password reset link');
  }
}