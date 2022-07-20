import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './routes';
const pinoHttp = require('pino-http')();

(async () => {
  const app = express();
  const whitelist: Array<string> = ['https://salesdap.com', 'https://stripe.com', 'http://localhost:3000'];
  const corsOptions = {
    // origin: 'http://localhost:3000',
    origin: (origin: any, callback: any) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ["POST", "PUT", "GET"],
  }

  app.use(cors(corsOptions));
  app.use(bodyParser());
  app.use(cookieParser());
  app.set('trust proxy', 1);
  app.use(pinoHttp);
  app.use('/', router);

  app.listen(3001, () => {
    console.log('app listening at 3001');
  });
})()