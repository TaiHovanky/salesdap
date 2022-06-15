import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: any) => {
  return sign(
    { userId: user.userid },
    'secretkeyappearshere',
    { expiresIn: '15m' }
  );
};

export const createRefreshToken = (user: any) => {
  return sign(
    { email: user.email, tokenVersion: user.token_version | 0 },
    'refreshtokensecret',
    { expiresIn: '7d' }
  );
};

export const sendRefreshToken = (res: any, token: string) => {
  res.cookie(
    'jid',
    token,
    {
      httpOnly: true,
      path: '/api/v1/refresh_token'
    }
  );
};