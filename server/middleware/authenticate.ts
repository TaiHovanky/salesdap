import { verify } from 'jsonwebtoken';

export const authenticate = (req: any, _: any, next: any) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    console.log('no auth headers---------------------------------------')
    const err = new Error('Unauthenticated');
    next(err);
  }
  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    if (payload) {
      console.log('req body', req.files, req.body)
      return next();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}