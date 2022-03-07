import bcrypt, { compare } from 'bcryptjs';
import { User } from '../entity/user';

export const registerUser = async (req: any, res: any) => {
  const {
    firstName,
    lastName,
    email,
    organizationId,
    password,
    confirm
  } = req.body;
  if (password.length <= 2) {
    res.send({
      errors: [
        {
          field: "password",
          message: "Password must be greater than 2",
        },
      ],
    });
  }
  if (password !== confirm) {
    res.send({
      errors: [
        {
          field: "password",
          message: "Password must match",
        },
      ],
    });
  }
  /* Hash the password and then insert the user data and hashed password into db. */
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log('hashed password');
  try {
    const user = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      organizationId
    };
    // const userInsert = await User.insert(user);
    // const newUser = {...userInsert.raw[0], ...user};
    console.log('new user', user)
    req.session.user = user;
    res.send({ user });
  } catch(err) {
    if (err.code === '23505') {
      res.send({
        errors: [
          {
            field: 'email',
            message: 'Email already taken',
          },
        ],
      });
    }
    res.send({ errors: [{ field: 'registration', message: `Registration failed: ${err}` }] });
  };
}

export const loginUser = async (req: any, res: any) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email }});

  if (user) {
    const isPasswordValid: boolean = await compare(password, user.password);
    if (isPasswordValid) {
      req.session.user = user;
      res.send({ user });
    }
  }
  res.send({ errors: [{ field: 'login', message: 'Login failed' }] });
}