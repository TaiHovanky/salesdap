import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: any) => {
  return sign({ userId: user.userid }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m'
  });
};

export const createRefreshToken = (user: any) => {
  return sign(
    { userId: user.userid, tokenVersion: user.token_version },
    'refreshtokensecret',
    {
      expiresIn: '7d'
    }
  );
};

export const sendRefreshToken = (res: any, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token'
  });
};