import { rateLimit } from 'express-rate-limit';
import { createClient } from 'redis';
import { RedisStore } from 'rate-limit-redis';

import env from '../env.js';

const client = createClient({
  url: env.REDIS_URL,
});

await client.connect();

export const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args: string[]) => client.sendCommand(args),
  }),
});
