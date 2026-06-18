const db = require('../db');
const geminiService = require('../services/geminiService');
const ollamaService = require('../services/ollamaService');

/**
 * Get the AI service provider based on env config.
 */
const getAiService = () => {
  const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();
  if (provider === 'ollama') {
    return ollamaService;
  }
  return geminiService;
};

/**
 * Create a new career gap analysis.
 * 1. Fetch user's profile.
 * 2. Send profile + target to active AI API.
 * 3. Store analysis and suggested resources.
 * 
 * @route POST /api/analysis
 * @param {Object} req.body - { target }
 * @returns {Object} Created analysis with gaps, roadmap, and resources
 */
const createAnalysis = async (req, res) => {
  const userId = req.user.id;
  const target = req.body.target || req.body.targetInput;

  if (!target || typeof target !== 'string' || !target.trim()) {
    return res.status(400).json({ error: 'Target career goal or job description is required.' });
  }

  const client = await db.pool.connect();

  try {
    // 1. Fetch current profile
    const profileResult = await client.query(
      'SELECT skills, education, experience FROM profiles WHERE user_id = $1',
      [userId]
    );

    if (profileResult.rows.length === 0) {
      return res.status(400).json({ error: 'Please complete your profile first' });
    }

    const profile = profileResult.rows[0];

    // 2. Call active AI Service
    const aiService = getAiService();
    const analysisResult = await aiService.analyzeGap(profile, target.trim());
    const { gaps, roadmap, resources } = analysisResult;

    // 3. Save to database using a transaction
    await client.query('BEGIN');

    const analysisInsert = await client.query(
      'INSERT INTO analyses (user_id, target_input, gap_result, roadmap) VALUES ($1, $2, $3, $4) RETURNING id, created_at',
      [userId, target.trim(), JSON.stringify(gaps), JSON.stringify(roadmap)]
    );

    const analysisId = analysisInsert.rows[0].id;
    const createdAt = analysisInsert.rows[0].created_at;

    // Insert resources sequentially
    if (Array.isArray(resources) && resources.length > 0) {
      for (const resItem of resources) {
        await client.query(
          'INSERT INTO resources (analysis_id, skill_name, title, url, type) VALUES ($1, $2, $3, $4, $5)',
          [
            analysisId,
            resItem.skill || '',
            resItem.title || '',
            resItem.url || '',
            resItem.type || 'course'
          ]
        );
      }
    }

    await client.query('COMMIT');

    return res.status(201).json({
      id: analysisId,
      gaps,
      roadmap,
      resources,
      created_at: createdAt
    });
  } catch (err) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: err.message || 'Failed to generate gap analysis' });
  } finally {
    client.release();
  }
};

/**
 * Get details of a specific analysis, including resources.
 * 
 * @route GET /api/analysis/:id
 * @returns {Object} Complete analysis report
 */
const getAnalysis = async (req, res) => {
  try {
    const userId = req.user.id;
    const analysisId = req.params.id;

    // Fetch analysis and verify ownership
    const analysisResult = await db.query(
      'SELECT id, user_id, target_input, gap_result, roadmap, created_at FROM analyses WHERE id = $1',
      [analysisId]
    );

    if (analysisResult.rows.length === 0) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    const analysis = analysisResult.rows[0];

    if (analysis.user_id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Fetch related resources
    const resourcesResult = await db.query(
      'SELECT skill_name as skill, title, url, type FROM resources WHERE analysis_id = $1',
      [analysisId]
    );

    return res.json({
      id: analysis.id,
      target_input: analysis.target_input,
      gaps: typeof analysis.gap_result === 'string' ? JSON.parse(analysis.gap_result) : analysis.gap_result,
      roadmap: typeof analysis.roadmap === 'string' ? JSON.parse(analysis.roadmap) : analysis.roadmap,
      resources: resourcesResult.rows,
      created_at: analysis.created_at
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve analysis details' });
  }
};

/**
 * Get analysis history list of the current user.
 * 
 * @route GET /api/analysis/history
 * @returns {Array} List of past analyses
 */
const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      'SELECT id, target_input, created_at FROM analyses WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return res.json(result.rows);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve analysis history' });
  }
};

module.exports = {
  createAnalysis,
  getAnalysis,
  getHistory,
};
