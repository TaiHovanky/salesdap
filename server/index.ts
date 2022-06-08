import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
// import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './routes';
// import { redisSession } from './middleware/session';

(async () => {
  const app = express();

  app.use(cors({
    /* Use IP address of droplet with the exposed port that React app container runs on.
    Note that port isn't needed because Web container exposes port 80 */
    origin: 'http://localhost:3000',
    // origin: 'https://salesdap.com',
    credentials: true,
    methods: ["POST", "PUT", "GET", "HEAD"],
  }));
  app.use(bodyParser());
  // app.use(cookieParser());

  app.set('trust proxy', 1);
  // app.set('Access-Control-Allow-Origin', "https://salesdap.com");
  // app.set('Access-Control-Allow-Credentials', true);
  // app.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  // app.set('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, OPTIONS');
  // app.use(redisSession);

  app.use('/', router);

  app.listen(3001, () => {
    console.log('app listening at 3001');
  });
})()