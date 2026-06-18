const db = require('../db');

/**
 * Get the profile of the currently authenticated user.
 * 
 * @route GET /api/profile
 * @returns {Object} User profile details
 */
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      'SELECT id, user_id, skills, education, experience, updated_at FROM profiles WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve profile' });
  }
};

/**
 * Create or update (upsert) the profile of the currently authenticated user.
 * 
 * @route PUT /api/profile
 * @param {Object} req.body - { skills, education, experience }
 * @returns {Object} Updated profile details
 */
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { skills, education, experience } = req.body;

    // Check if profile already exists for this user
    const existing = await db.query('SELECT id FROM profiles WHERE user_id = $1', [userId]);

    let result;
    if (existing.rows.length > 0) {
      // Update existing profile
      result = await db.query(
        'UPDATE profiles SET skills = $1, education = $2, experience = $3, updated_at = NOW() WHERE user_id = $4 RETURNING id, user_id, skills, education, experience, updated_at',
        [skills || [], education || '', experience || '', userId]
      );
    } else {
      // Create new profile
      result = await db.query(
        'INSERT INTO profiles (user_id, skills, education, experience, updated_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, user_id, skills, education, experience, updated_at',
        [userId, skills || [], education || '', experience || '']
      );
    }

    return res.json(result.rows[0]);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update profile' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
