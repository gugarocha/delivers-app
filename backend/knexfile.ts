// Update with your config settings.

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
      connectionString: process.env.DATABASE_URL
    },
    migrations: {
      directory: './src/database/migrations'
    },
  }

};
