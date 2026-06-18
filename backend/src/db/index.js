const { Pool } = require('pg');
require('dotenv').config();

/**
 * PostgreSQL connection pool.
 * Uses DATABASE_URL from environment variables.
 * The pool manages connections automatically — no need to open/close manually.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Execute a SQL query against the database.
 * @param {string} text - SQL query string
 * @param {Array} params - Query parameters (for parameterized queries)
 * @returns {Promise<Object>} Query result
 */
const query = (text, params) => pool.query(text, params);

module.exports = { query, pool };
