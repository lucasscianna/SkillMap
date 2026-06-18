/**
 * Format the prompt to send to Gemini Flash API.
 * 
 * @param {Object} profile - User profile data (skills, education, experience)
 * @param {string} target - Target role or job description
 * @returns {string} Formatted prompt
 */
const formatPrompt = (profile, target) => {
  const skillsList = Array.isArray(profile.skills) ? profile.skills.join(', ') : '';
  const education = profile.education || 'Not specified';
  const experience = profile.experience || 'Not specified';

  return `You are a career advisor. Given this profile and target,
identify skill gaps and generate a prioritized roadmap.
Profile:
- Skills: ${skillsList}
- Education: ${education}
- Experience: ${experience}
Target: ${target}
Respond ONLY in valid JSON with this exact structure:
{
  "gaps": [{ "skill": string, "priority": "high"|"medium"|"low" }],
  "roadmap": [{ "skill": string, "duration": string, "order": number }],
  "resources": [{ "skill": string, "title": string, "url": string, "type": "course"|"project"|"reading" }]
}
Return ONLY the JSON, no markdown, no explanation.`;
};

/**
 * Validate and parse the JSON response returned by the Gemini API.
 * Throws an error if the response format is invalid.
 * 
 * @param {string} raw - Raw text response from Gemini API
 * @returns {Object} Parsed JSON analysis
 */
const parseResponse = (raw) => {
  try {
    // Strip markdown JSON codeblock markers if present
    let cleanText = raw.trim();
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.substring(7);
    }
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.substring(3);
    }
    if (cleanText.endsWith('```')) {
      cleanText = cleanText.substring(0, cleanText.length - 3);
    }
    cleanText = cleanText.trim();

    const parsed = JSON.parse(cleanText);

    // Validate the exact required structure
    if (!parsed.gaps || !Array.isArray(parsed.gaps) ||
        !parsed.roadmap || !Array.isArray(parsed.roadmap) ||
        !parsed.resources || !Array.isArray(parsed.resources)) {
      throw new Error('Invalid AI response structure');
    }

    return parsed;
  } catch (err) {
    throw new Error('Invalid AI response');
  }
};

/**
 * Perform career gap analysis using Gemini Flash API.
 * 
 * @param {Object} profile - User profile data
 * @param {string} target - Target career goal
 * @returns {Promise<Object>} Analysis results
 */
const analyzeGap = async (profile, target) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
  }

  const prompt = formatPrompt(profile, target);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error: ${response.status} ${errText}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error('Empty response from Gemini API');
    }

    return parseResponse(rawText);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  formatPrompt,
  parseResponse,
  analyzeGap,
};
