// db.js
const { Pool } = require("pg");

// For Neon, you NEED SSL. Two common ways:
// 1) Put ?sslmode=require in the URL (Neon shows this).
// 2) Or set ssl: { rejectUnauthorized: false } here.
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
