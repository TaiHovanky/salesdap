const session = require('express-session');
const RedisStore = require('connect-redis')(session);
import { redisClient } from '../db/redis';

export const redisSession = session({
  store: new RedisStore({ client: redisClient }),
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false,
  name: 'sessionId',
  secure: false, // set to True for prod
  cookie: {
    secure: false,
    sameSite: 'lax',
    httpOnly: true, // prevents client side JS from reading cookie
    maxAge: 1000 * 60 * 30 // session max age in seconds
  }
});