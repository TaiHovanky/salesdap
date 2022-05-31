export const authenticate = (req: any, _: any, next: any) => {
  if (!req.session || !req.session.user) {
    const err = new Error('Unauthenticated');
    // err.statusCode = 401;
    next(err);
  }
  next();
}