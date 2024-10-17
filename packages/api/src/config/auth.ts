import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Google from '@auth/express/providers/google';
import { db } from '../db/index.js';

export const authConfig = {
  trustHost: true,
  basePath: '/api/auth',
  providers: [Google],
  adapter: DrizzleAdapter(db),
};
