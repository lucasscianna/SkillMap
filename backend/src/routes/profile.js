const { Router } = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const auth = require('../middleware/auth');

const router = Router();

/**
 * @route GET /api/profile
 * @desc Retrieve current user profile
 * @access Private
 */
router.get('/', auth, getProfile);

/**
 * @route PUT /api/profile
 * @desc Create or update user profile
 * @access Private
 */
router.put('/', auth, updateProfile);

module.exports = router;
