// Update with your config settings.

module.exports = {

  development: {
    client: "postgres",
    connection: {
      database: "delivers-app",
      user: "postgres",
      password: "123456"
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
