require("dotenv").config();

const { 
  DEV_DATABASE_HOST, 
  DEV_DATABASE_USERNAME, 
  DEV_DATABASE_PASSWORD,
  DEV_DATABASE_NAME,
  TEST_DATABASE_USERNAME,
  TEST_DATABASE_PASSWORD,
  TEST_DATABASE_HOST,
  TEST_DATABASE_NAME
} = process.env;
module.exports = {
  development: {
    username: DEV_DATABASE_USERNAME,
    password: DEV_DATABASE_PASSWORD,
    database: DEV_DATABASE_NAME,
    host: DEV_DATABASE_HOST,
    dialect: "postgres"
  },
  test: {
    username: TEST_DATABASE_USERNAME,
    password: TEST_DATABASE_PASSWORD,
    database: TEST_DATABASE_NAME,
    host: TEST_DATABASE_HOST,
    dialect: "postgres"
  },
  /*
  production: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST
    dialect: "postgres"
  }*/ //these don't come into play until app is in production so config them after
}
