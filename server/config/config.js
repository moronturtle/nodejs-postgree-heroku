require("dotenv").config();
module.exports = {
  development: {
    host: "postgres",
    port: 5435,
    user: "postgres",
    password: "postgres",
    database: "db",
  },
  production: {
    host: process.env.HOST,
    port: 5432,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    dialect: "postgres",
    ssl: { rejectUnauthorized: false },
  },
};
