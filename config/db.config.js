const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
});

pool
  .connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Error connecting to database: ", err));

module.exports = pool;
