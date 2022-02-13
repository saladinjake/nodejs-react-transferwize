const config = require('dotenv');
config.config();

module.exports = {
  development: {
    username: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: 5432,
  },
  test: {
    username: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: 5432,
  },
  production: {
    use_heroku_db_variable: process.env.PG_DATABASE_HEROKU,
  },
  weblink:"https://transferwise-apitest.herokuapp.com/"
};
