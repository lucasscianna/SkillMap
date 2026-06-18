const request = require('supertest');
const jwt = require('jsonwebtoken');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_jwt_secret_phrase';

const app = require('../src/index');
const db = require('../src/db');

// Mock db query
jest.mock('../src/db', () => ({
  query: jest.fn(),
}));

describe('Profile Endpoints', () => {
  let token;

  beforeAll(() => {
    token = jwt.sign({ id: 1, email: 'profileuser@example.com' }, process.env.JWT_SECRET);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/profile', () => {
    it('should return 401 if request is unauthenticated', async () => {
      const res = await request(app).get('/api/profile');
      expect(res.status).toBe(401);
    });

    it('should return 200 and profile if authenticated', async () => {
      const mockProfile = {
        id: 1,
        user_id: 1,
        skills: ['JavaScript', 'React'],
        education: 'B.S. Computer Science',
        experience: '2 years frontend developer',
      };

      db.query.mockResolvedValueOnce({ rows: [mockProfile] });

      const res = await request(app)
        .get('/api/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.skills).toContain('React');
      expect(res.body.education).toBe('B.S. Computer Science');
    });
  });

  describe('PUT /api/profile', () => {
    it('should return 200 and update profile when authenticated', async () => {
      // Mock existing check -> returns one row (meaning update will trigger)
      db.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

      // Mock update query returning updated profile
      const updatedProfile = {
        id: 1,
        user_id: 1,
        skills: ['JavaScript', 'React', 'Tailwind'],
        education: 'M.S. Software Engineering',
        experience: '3 years frontend developer',
      };
      db.query.mockResolvedValueOnce({ rows: [updatedProfile] });

      const res = await request(app)
        .put('/api/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({
          skills: ['JavaScript', 'React', 'Tailwind'],
          education: 'M.S. Software Engineering',
          experience: '3 years frontend developer',
        });

      expect(res.status).toBe(200);
      expect(res.body.skills).toContain('Tailwind');
      expect(res.body.education).toBe('M.S. Software Engineering');
    });
  });
});
