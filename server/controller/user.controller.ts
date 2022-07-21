import db from '../db/postgres';
import { logger } from '../utils/logger.utils';

export const searchUsers = async (req: any, res: any) => {
  const { searchString } = req.body;
  console.log('email and name', searchString );
  const users: Array<any> = await db('users')
    .select()
    .where('full_name', 'like', `%${searchString}%`)
    .orWhere('email', 'like', `%${searchString}%`);

  console.log('users', users);
  if (!users) {
    logger.warn(`login fail no user found - name: ${searchString}`);
    return res.status(401).send();
  }

  return res.status(200).send(users);
}