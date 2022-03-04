import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Redis from 'ioredis';
import session from 'express-session';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import router from './routes';

(async () => {
  let RedisStore = require('connect-redis')(session)
  let redisClient = new Redis({
    host: process.env.REDIS_URL,
    port: 6379
  });

  const app = express();
  app.use(cors({
    /* Use IP address of droplet with the exposed port that React app container runs on.
    Note that port isn't needed because Web container exposes port 80 */
    origin: process.env.APP_URL,
    credentials: true
  }));
  app.use(bodyParser());
  app.use(cookieParser());

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || '',
      resave: false,
      cookie: {
        secure: false,
        sameSite: 'lax',
        httpOnly: true,
        maxAge: 600000
      }
    })
  );

  /* Retry connecting to postgres database because it might take a while
  for the database to spin up and be connectable */
  let retries = 5;
  while (retries) {
    try {
      await createConnection();
      console.log('connected to db');
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  app.get('/', (_req, res) => res.send('hello'));

  app.use('/', router);

  app.listen(3001, () => {
    console.log('app listening at 3001');
  });
})()