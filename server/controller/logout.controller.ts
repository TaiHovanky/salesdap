export const logoutUser = (req: any, res: any) => {
  return new Promise((resolve) => {
    if (req.session) {
      req.session.destroy((err: any) => {
        res.clearCookie('connect.sid');
        req.session = null;
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        return resolve(true);
      })
    }
    return resolve(true);
  });
}