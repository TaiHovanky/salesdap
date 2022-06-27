import pino from 'pino';

export const logger = pino(
  {},
  pino.destination(`${__dirname}/combined.log`)
);
