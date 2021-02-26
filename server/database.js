let config = require("./config/config");
require("dotenv").config();

let db =
  process.env.NODE_ENV === "production"
    ? config.production
    : config.development;

const Pool = require("pg").Pool;
const pool = new Pool(db);

module.exports = pool;
