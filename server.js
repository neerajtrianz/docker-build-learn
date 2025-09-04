// server.js
const express = require("express");
const { pool } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// health check
app.get("/health", async (_req, res) => {
  try {
    const r = await pool.query("SELECT 1 as ok");
    res.json({ status: "ok", db: r.rows[0].ok === 1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

// CRUD: items
// Table schema (run on Neon once): 
// CREATE TABLE IF NOT EXISTS items (
//   id SERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   done BOOLEAN NOT NULL DEFAULT false,
//   created_at TIMESTAMPTZ DEFAULT now()
// );

app.get("/items", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM items ORDER BY id DESC");
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/items/:id", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/items", async (req, res) => {
  try {
    const { name, done = false } = req.body || {};
    const { rows } = await pool.query(
      "INSERT INTO items (name, done) VALUES ($1, $2) RETURNING *",
      [name, done]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put("/items/:id", async (req, res) => {
  try {
    const { name, done } = req.body || {};
    const { rows } = await pool.query(
      "UPDATE items SET name = COALESCE($1, name), done = COALESCE($2, done) WHERE id = $3 RETURNING *",
      [name ?? null, done ?? null, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    const { rowCount } = await pool.query("DELETE FROM items WHERE id = $1", [req.params.id]);
    if (!rowCount) return res.status(404).json({ error: "Not found" });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on http://0.0.0.0:${PORT}`);
});
