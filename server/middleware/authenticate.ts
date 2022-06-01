export const authenticate = (req: any, _: any, next: any) => {
  console.log('req session', req.session);
  if (!req.session || !req.session.user) {
    const err = new Error('Unauthenticated');
    // err.statusCode = 401;
    next(err);
  }
  next();
}