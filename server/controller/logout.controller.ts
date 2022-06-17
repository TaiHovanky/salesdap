import { sendRefreshToken } from '../utils/auth.utils';

export const logoutUser = (_: any, res: any) => {
  sendRefreshToken(res, '');
  return res.status(200).send();
}