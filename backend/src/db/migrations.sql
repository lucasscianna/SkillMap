-- SkillMap database schema
-- Run this file against your PostgreSQL database to create all tables.

-- Users table — stores account credentials
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Profiles table — stores the user's current skills, education, and experience
CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  skills TEXT[],
  education VARCHAR(255),
  experience TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Analyses table — stores each gap analysis result
CREATE TABLE IF NOT EXISTS analyses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  target_input TEXT NOT NULL,
  gap_result JSONB,
  roadmap JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Resources table — stores suggested resources for each analysis
CREATE TABLE IF NOT EXISTS resources (
  id SERIAL PRIMARY KEY,
  analysis_id INTEGER REFERENCES analyses(id) ON DELETE CASCADE,
  skill_name VARCHAR(255),
  title VARCHAR(255),
  url VARCHAR(500),
  type VARCHAR(50)
);
