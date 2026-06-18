const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { getMockAnalysis } = require('./mockService');

/**
 * Format the prompt to send to Gemini Flash API.
 */
const formatPrompt = (profile, target) => {
  const skillsList = Array.isArray(profile.skills) ? profile.skills.join(', ') : '';
  const education = profile.education || 'Not specified';
  const experience = profile.experience || 'Not specified';

  return `You are a professional career advisor for ALL industries and fields, not just technology. 
Given the user profile and career target below, identify the skill gaps and generate a personalized learning roadmap.

The target role can be in ANY field : cooking, healthcare, design, management, finance, education, hospitality, engineering, arts, or any other domain.

Profile:
- Skills: ${skillsList}
- Education: ${education}  
- Experience: ${experience}

Target: ${target}

Respond ONLY in valid JSON with NO markdown :
{
  "gaps": [{ "skill": string, "priority": "high"|"medium"|"low" }],
  "roadmap": [{ "skill": string, "duration": string, "order": number }],
  "resources": [{ "skill": string, "title": string, "url": string, "type": "course"|"project"|"reading" }]
}`;
};

/**
 * Validate and parse the JSON response returned by the Gemini API.
 */
const parseResponse = (raw) => {
  try {
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
    throw new Error('Invalid AI response: ' + err.message);
  }
};

/**
 * Perform career gap analysis using Gemini Flash API.
 */
const analyzeGap = async (profile, target) => {
  // Dynamically reload .env file at runtime
  const envPath = path.resolve(__dirname, '../../.env');
  if (fs.existsSync(envPath)) {
    try {
      const envConfig = dotenv.parse(fs.readFileSync(envPath));
      for (const k in envConfig) {
        process.env[k] = envConfig[k];
      }
    } catch (e) {
      console.error('Failed to reload .env dynamically:', e.message);
    }
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || !apiKey.trim()) {
      throw new Error('GEMINI_API_KEY is not defined or is empty in environment variables');
    }

    const prompt = formatPrompt(profile, target);
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
      console.warn(`Gemini API error: ${response.status} ${errText}. Falling back to mock analysis.`);
      return getMockAnalysis(profile, target);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error('Empty response from Gemini API');
    }

    return parseResponse(rawText);
  } catch (err) {
    console.warn('Error calling Gemini API, falling back to local mock:', err.message);
    return getMockAnalysis(profile, target);
  }
};

module.exports = {
  formatPrompt,
  parseResponse,
  analyzeGap,
};
