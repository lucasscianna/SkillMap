import axios from 'axios';

/* ========================================
   Mock Data — used when backend is unreachable
   ======================================== */

const MOCK_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  btoa(JSON.stringify({ id: 1, email: 'demo@skillmap.app', iat: Math.floor(Date.now() / 1000) })) +
  '.mock_signature';

const MOCK_PROFILE = {
  id: 1,
  user_id: 1,
  skills: ['JavaScript', 'React', 'HTML/CSS', 'Git', 'Node.js', 'SQL'],
  education: 'Bachelor in Computer Science — Université de Paris (2024)',
  experience: '1 year as Junior Frontend Developer at a startup',
};

const MOCK_ANALYSIS = {
  id: 1,
  user_id: 1,
  target_input: 'Job Title: Senior Full-Stack Engineer at Google',
  gap_result: [
    { skill: 'System Design', priority: 'high', description: 'Ability to design large-scale distributed systems.' },
    { skill: 'TypeScript', priority: 'medium', description: 'Strong typing for large codebases.' },
    { skill: 'CI/CD Pipelines', priority: 'medium', description: 'Automated testing and deployment workflows.' },
    { skill: 'Cloud Architecture (GCP)', priority: 'high', description: 'Google Cloud Platform services and infrastructure.' },
    { skill: 'Data Structures & Algorithms', priority: 'high', description: 'Advanced algorithmic problem-solving for interviews.' },
    { skill: 'Docker & Kubernetes', priority: 'medium', description: 'Containerization and orchestration at scale.' },
  ],
  roadmap: [
    {
      step: 'Master TypeScript Fundamentals',
      duration: '2 weeks',
      topics: ['Generics', 'Type Guards', 'Utility Types', 'Module Augmentation'],
    },
    {
      step: 'Deep Dive into System Design',
      duration: '4 weeks',
      topics: ['Load Balancers', 'Database Sharding', 'Caching Strategies', 'Microservices'],
    },
    {
      step: 'Google Cloud Platform Essentials',
      duration: '3 weeks',
      topics: ['Cloud Run', 'Cloud SQL', 'Pub/Sub', 'IAM & Security'],
    },
    {
      step: 'Algorithms & Data Structures Practice',
      duration: '4 weeks',
      topics: ['Trees & Graphs', 'Dynamic Programming', 'Sliding Window', 'LeetCode Top 100'],
    },
    {
      step: 'CI/CD & DevOps Mastery',
      duration: '2 weeks',
      topics: ['GitHub Actions', 'Docker Compose', 'Kubernetes Basics', 'Monitoring'],
    },
  ],
  resources: [
    { title: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net/', type: 'book' },
    { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/', type: 'documentation' },
    { title: 'Google Cloud Skills Boost', url: 'https://www.cloudskillsboost.google/', type: 'course' },
    { title: 'NeetCode 150', url: 'https://neetcode.io/', type: 'practice' },
  ],
  created_at: new Date().toISOString(),
};

// Deeper parse helper for history page
const MOCK_HISTORY = [
  {
    ...MOCK_ANALYSIS,
    gaps: undefined, // history format uses gap_result as JSON string
    gap_result: JSON.stringify(MOCK_ANALYSIS.gap_result),
    roadmap: JSON.stringify(MOCK_ANALYSIS.roadmap),
    resources: JSON.stringify(MOCK_ANALYSIS.resources),
  },
  {
    id: 2,
    user_id: 1,
    target_input: 'Job Title: UX/UI Lead at Figma',
    gap_result: JSON.stringify([
      { skill: 'User Research', priority: 'high', description: 'Conducting user interviews and usability tests.' },
      { skill: 'Design Systems', priority: 'medium', description: 'Building and maintaining scalable design systems.' },
      { skill: 'Figma Prototyping', priority: 'low', description: 'Advanced prototyping with Figma.' },
    ]),
    roadmap: JSON.stringify([
      { step: 'User Research Foundations', duration: '3 weeks', topics: ['Interviews', 'Surveys', 'Persona Creation'] },
      { step: 'Design System Workshop', duration: '2 weeks', topics: ['Tokens', 'Components', 'Documentation'] },
    ]),
    resources: JSON.stringify([]),
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

/* ========================================
   Mock API handlers
   ======================================== */

/**
 * Simulate a small network delay for realism.
 */
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const mockHandlers = {
  'POST /auth/register': async () => {
    await delay();
    return { token: MOCK_TOKEN, user: { id: 1, email: 'demo@skillmap.app' } };
  },
  'POST /auth/login': async () => {
    await delay();
    return { token: MOCK_TOKEN, user: { id: 1, email: 'demo@skillmap.app' } };
  },
  'GET /profile': async () => {
    await delay();
    return MOCK_PROFILE;
  },
  'PUT /profile': async (_url, data) => {
    await delay();
    return { ...MOCK_PROFILE, ...data };
  },
  'POST /analysis': async () => {
    await delay(1500); // Simulate longer analysis time
    return { ...MOCK_ANALYSIS, gaps: MOCK_ANALYSIS.gap_result };
  },
  'GET /analysis/history': async () => {
    await delay();
    return MOCK_HISTORY;
  },
};

// Dynamic route matcher for /analysis/:id
const matchAnalysisById = (method, url) => {
  if (method === 'GET' && /^\/analysis\/\d+$/.test(url)) {
    return async () => {
      await delay();
      return { ...MOCK_ANALYSIS, gaps: MOCK_ANALYSIS.gap_result };
    };
  }
  return null;
};

/**
 * Resolve a mock handler for a given method + url.
 */
const getMockHandler = (method, url) => {
  const key = `${method} ${url}`;
  if (mockHandlers[key]) return mockHandlers[key];
  return matchAnalysisById(method, url);
};

/* ========================================
   Axios Instance
   ======================================== */

/**
 * Axios instance pre-configured for the SkillMap API.
 * Automatically adds the JWT token to every request if available.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('skillmap_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — on network failure fall back to mock data
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If backend returns 401, clear token and redirect
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('skillmap_token');
      window.location.href = '/';
      return Promise.reject(error);
    }

    // If network error or 5xx or CORS error → try mock fallback
    const isNetworkError = !error.response;
    const isServerError = error.response && error.response.status >= 500;

    if (isNetworkError || isServerError) {
      const config = error.config;
      const method = (config.method || 'get').toUpperCase();
      // Strip baseURL to get the relative path
      let url = config.url || '';
      if (config.baseURL && url.startsWith(config.baseURL)) {
        url = url.slice(config.baseURL.length);
      }
      // Also strip /api prefix if present (baseURL is /api)
      if (url.startsWith('/api')) {
        url = url.slice(4);
      }

      const handler = getMockHandler(method, url);
      if (handler) {
        console.warn(`[SkillMap] Backend unreachable — using mock data for ${method} ${url}`);
        const mockData = await handler(url, config.data ? JSON.parse(config.data) : undefined);
        return { data: mockData, status: 200, statusText: 'OK (Mock)', config };
      }
    }

    return Promise.reject(error);
  }
);

/* ========================================
   Auth API
   ======================================== */

/**
 * Register a new user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} { token, user }
 */
export const registerUser = (email, password) =>
  api.post('/auth/register', { email, password }).then((res) => res.data);

/**
 * Log in an existing user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} { token, user }
 */
export const loginUser = (email, password) =>
  api.post('/auth/login', { email, password }).then((res) => res.data);

/* ========================================
   Profile API
   ======================================== */

/**
 * Get the authenticated user's profile.
 * @returns {Promise<Object>} Profile data
 */
export const getProfile = () =>
  api.get('/profile').then((res) => res.data);

/**
 * Create or update the user's profile.
 * @param {Object} data - { skills, education, experience }
 * @returns {Promise<Object>} Updated profile
 */
export const updateProfile = (data) =>
  api.put('/profile', data).then((res) => res.data);

/* ========================================
   Analysis API
   ======================================== */

/**
 * Run a gap analysis.
 * @param {string} targetInput - Job title or job description
 * @returns {Promise<Object>} Analysis result with gaps, roadmap, resources
 */
export const createAnalysis = (targetInput) =>
  api.post('/analysis', { target: targetInput }).then((res) => res.data);

/**
 * Get a specific analysis by ID.
 * @param {number} id
 * @returns {Promise<Object>} Full analysis data
 */
export const getAnalysis = (id) =>
  api.get(`/analysis/${id}`).then((res) => res.data);

/**
 * Get the user's analysis history.
 * @returns {Promise<Array>} List of past analyses
 */
export const getHistory = () =>
  api.get('/analysis/history').then((res) => res.data);

export default api;
