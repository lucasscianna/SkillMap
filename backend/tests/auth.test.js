const request = require('supertest');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Set env variables before importing anything
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_jwt_secret_phrase';

const app = require('../src/index');
const db = require('../src/db');

// Mock the db query
jest.mock('../src/db', () => {
  return {
    query: jest.fn(),
  };
});

describe('Auth Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully and return a token', async () => {
      // Mock existing user check -> returns no users
      db.query.mockResolvedValueOnce({ rows: [] });

      // Mock user insert
      db.query.mockResolvedValueOnce({
        rows: [{ id: 1, email: 'newuser@example.com', created_at: new Date() }],
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'newuser@example.com', password: 'password123' });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('newuser@example.com');
    });

    it('should fail if email already exists', async () => {
      // Mock existing user check -> returns one user
      db.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'existing@example.com', password: 'password123' });

      expect(res.status).toBe(409);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in successfully with valid credentials', async () => {
      const passwordHash = await bcrypt.hash('password123', 10);

      // Mock user select
      db.query.mockResolvedValueOnce({
        rows: [{ id: 1, email: 'login@example.com', password_hash: passwordHash }],
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'login@example.com', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should fail with invalid password', async () => {
      const passwordHash = await bcrypt.hash('password123', 10);

      db.query.mockResolvedValueOnce({
        rows: [{ id: 1, email: 'login@example.com', password_hash: passwordHash }],
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'login@example.com', password: 'wrongpassword' });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('Protected Route Token Rejection', () => {
    it('should reject requests to protected routes without a token', async () => {
      const res = await request(app).get('/api/profile');
      expect(res.status).toBe(401);
    });
  });
});
