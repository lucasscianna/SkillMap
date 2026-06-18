const { Router } = require('express');
const { register, login } = require('../controllers/authController');

const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Create a new user account
 * @access Public
 */
router.post('/register', register);

/**
 * @route POST /api/auth/login
 * @desc Authenticate and receive a JWT
 * @access Public
 */
router.post('/login', login);

module.exports = router;
