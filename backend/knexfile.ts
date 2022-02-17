// Update with your config settings.
import 'dotenv/config'

module.exports = {

  development: {
    client: "postgres",
    connection: {
      database: process.env.PG_DATABASE,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD
    },
    migrations: {
      directory: './src/database/migrations'
    },
  },

  production: {
    client: "postgres",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './src/database/migrations'
    },
  }

};
