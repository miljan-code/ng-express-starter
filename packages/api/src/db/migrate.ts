import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';

import config from '../../drizzle.config.js';

const client = postgres(config.dbCredentials.url, { max: 1 });
const db = drizzle(client);

(async function () {
  await migrate(db, { migrationsFolder: config.out });
  await client.end();
})()
  .then(() => console.log('Migrations completed'))
  .catch(() => console.error('Migrations failed'));
