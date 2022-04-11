import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// const Redis = require('ioredis');
// const session = require('express-session');
import router from './routes';

(async () => {
  // let RedisStore = require('connect-redis')(session)
  // let redisClient = new Redis({
  //   host: process.env.REDIS_URL,
  //   port: 6379
  // });

  const app = express();
  app.use(cors({
    /* Use IP address of droplet with the exposed port that React app container runs on.
    Note that port isn't needed because Web container exposes port 80 */
    origin: process.env.APP_URL,
    credentials: true
  }));
  app.use(bodyParser());
  app.use(cookieParser());

  // app.use(
  //   session({
  //     store: new RedisStore({ client: redisClient }),
  //     saveUninitialized: false,
  //     secret: process.env.SESSION_SECRET,
  //     resave: false,
  //     cookie: {
  //       secure: false,
  //       sameSite: 'lax',
  //       httpOnly: true,
  //       maxAge: 600000
  //     }
  //   })
  // );

  app.use('/', router);

  app.listen(3001, () => {
    console.log('app listening at 3001');
  });
})()