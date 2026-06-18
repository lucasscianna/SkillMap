const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- Cache Buster for Dynamic Code Reloading ---
app.use((req, res, next) => {
  for (const key in require.cache) {
    if (key.includes('/src/')) {
      delete require.cache[key];
    }
  }
  next();
});

// --- Routes (Dynamically Loaded) ---
app.use('/api/auth', (req, res, next) => {
  require('./routes/auth')(req, res, next);
});

app.use('/api/profile', (req, res, next) => {
  require('./routes/profile')(req, res, next);
});

app.use('/api/analysis', (req, res, next) => {
  require('./routes/analysis')(req, res, next);
});

/**
 * Health check endpoint.
 * Returns a simple status message to confirm the server is running.
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Global error handler.
 * Catches unhandled errors and returns a consistent JSON response.
 */
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  res.status(status).json({ error: message });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`SkillMap API running on port ${PORT}`);
  });
}

module.exports = app;
