module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      // user: '',
      // password: '',
      database: "4gproxy"
    },
    migrations: {
      directory: "./knex/migrations"
    },
    seeds: {
      directory: "./knex/seeds"
    }
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE
      // user: '',
      // password: '',
    },
    migrations: {
      directory: "./knex/migrations"
    },
    seeds: {
      directory: "./knex/seeds"
    }
  }
};