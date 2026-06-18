import axios from 'axios';

/**
 * Axios instance pre-configured for the SkillMap API.
 * Automatically adds the JWT token to every request if available.
 */
const api = axios.create({
  baseURL: '/api',
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

// Response interceptor — handle 401 by clearing token and redirecting
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('skillmap_token');
      window.location.href = '/';
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
  api.post('/analysis', { targetInput }).then((res) => res.data);

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
