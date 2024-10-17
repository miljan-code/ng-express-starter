import type { Config } from 'drizzle-kit';

import env from './src/env.js';

export default {
  dialect: 'postgresql',
  schema: './src/db/schema',
  out: './src/db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
