import db from '../db/postgres';

export const editProfile = async (req: any, res: any) => {
  try {
    const {
      email,
      firstname,
      lastname,
      company,
    } = req.body;
    const updatedUser = {
      email,
      firstname,
      lastname,
      company,
    };
  
    await db('users').update(updatedUser).where({ email });
    return res.status(200).json({ email, firstname, lastname, company });
  } catch (err: any) {
    console.log('registration error', err);
    res.status(400).send();
  }
}