import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './routes';

(async () => {
  const app = express();
  app.use(cors({
    /* Use IP address of droplet with the exposed port that React app container runs on.
    Note that port isn't needed because Web container exposes port 80 */
    origin: process.env.APP_URL,
    credentials: true
  }));
  app.use(bodyParser());
  app.use(cookieParser());

  app.use('/', router);

  app.listen(3001, () => {
    console.log('app listening at 3001');
  });
})()