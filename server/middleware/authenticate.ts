import { verify } from "jsonwebtoken";

export const authenticate = (req: any, _: any, next: any) => {
  console.log('req jwt ---- authenticate', req.headers);
  const authorization = req.headers.authorization;
  if (!authorization) {
    const err = new Error('Unauthenticated');
    next(err);
  }
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, 'secretkeyappearshere');
    if (payload) {
      return next();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}