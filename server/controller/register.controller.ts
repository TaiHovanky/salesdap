import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import db from '../db/postgres';
import { createAccessToken, createRefreshToken, sendRefreshToken } from '../utils/auth.utils';
import { logger } from '../utils/logger.utils';

export const registerUser = async (req: any, res: any) => {
  try {
    const {
      email,
      password,
      firstname,
      lastname,
      company,
      subscriptionType
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = {
      userid: uuidv4(),
      email,
      password: hashedPassword,
      firstname,
      lastname,
      company,
      subscription_type: subscriptionType
    };
  
    await db('users').insert(newUser);
    const token: string = createAccessToken(newUser);
    sendRefreshToken(res, createRefreshToken(newUser));
    return res.status(200).json({ email, firstname, lastname, company, token });
  } catch (err: any) {
    logger.error('registration error', err);
    return res.status(400).send();
  }
};