import { config } from 'dotenv';

config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 },
    migrations: {
      directory: 'src/db/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: 'src/db/seeds',
    },
  },
};
