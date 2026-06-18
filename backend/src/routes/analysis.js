const { Router } = require('express');
const { createAnalysis, getAnalysis, getHistory } = require('../controllers/analysisController');
const auth = require('../middleware/auth');

const router = Router();

/**
 * @route POST /api/analysis
 * @desc Generate a new career gap analysis
 * @access Private
 */
router.post('/', auth, createAnalysis);

/**
 * @route GET /api/analysis/history
 * @desc Get user's past analyses
 * @access Private
 */
router.get('/history', auth, getHistory);

/**
 * @route GET /api/analysis/:id
 * @desc Get detailed report of a specific analysis
 * @access Private
 */
router.get('/:id', auth, getAnalysis);

module.exports = router;
