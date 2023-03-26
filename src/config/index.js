require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  db: {
    dialect: "mysql",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
};
