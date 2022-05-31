import Redis from 'ioredis';

export const redisClient = new Redis({
  host: process.env.REDIS_URL,
  port: 6379
});