const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}
console.log("Connecting to DB...");

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

module.exports = { pool };
