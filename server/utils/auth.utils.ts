import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: any) => {
  return sign(
    { userId: user.userid },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '15m' }
  );
};

export const createRefreshToken = (user: any) => {
  return sign(
    { email: user.email, tokenVersion: user.token_version || 0 },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: '7d' }
  );
};

export const sendRefreshToken = (res: any, token: string) => {
  res.cookie(
    'rtsd',
    token,
    {
      httpOnly: true,
      path: '/api/v1/refresh_token',
      secure: true
    }
  );
};