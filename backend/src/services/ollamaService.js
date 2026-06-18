const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { getMockAnalysis } = require('./mockService');

/**
 * Format the prompt to send to Ollama.
 */
const formatPrompt = (profile, target) => {
  const skillsList = Array.isArray(profile.skills) ? profile.skills.join(', ') : '';
  const education = profile.education || 'Not specified';
  const experience = profile.experience || 'Not specified';

  return `You are a professional career advisor for ALL industries and fields, not just technology. 
Given the user profile and career target below, identify the skill gaps and generate a personalized learning roadmap.

The target role can be in ANY field : cooking, healthcare, design, management, finance, education, hospitality, engineering, arts, or any other domain.
Ensure that recommendations are domain-specific and directly relevant to the target career sector. Do NOT suggest technical IT/programming/cloud skills unless the target role itself is explicitly in the technology sector (e.g. do not recommend database management or coding courses to a restaurant manager or culinary chef).

Structure the roadmap chronologically according to a realistic timeline hierarchy:
1. Major Foundation Gaps (e.g. University Degrees, Professional Diplomas, or major state licenses): These must be scheduled as the first steps (e.g., order 1, 2) and have long-term durations (e.g., '12-24 months' or '1-2 years'). Always suggest professional degrees or diplomas if there is a major gap to bridge.
2. Intermediate Verification Gaps (e.g. Specific Professional Certifications, bootcamp courses): These must have mid-term durations (e.g., '2-3 months' or '4-6 weeks').
3. Short-term Application Gaps (e.g. Focused reading, tutorials, small hands-on projects): These should have short-term durations (e.g., '2-4 weeks' or '1-2 weeks').
Timelines must be highly realistic for a career transition. Under no circumstances should complex gaps like restaurant operations management or healthcare compliance be scheduled to be completed in just 1-2 weeks.

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
 * Validate and parse the JSON response returned by the Ollama API.
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
 * Perform career gap analysis using local Ollama model.
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

  const baseUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  const modelName = process.env.OLLAMA_MODEL || 'llama3.2';
  const prompt = formatPrompt(profile, target);

  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: false,
        options: {
          temperature: 0.1,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Ollama API error: ${response.status} ${errText}`);
    }

    const data = await response.json();
    const rawText = data.message?.content;

    if (!rawText) {
      throw new Error('Empty response from local Ollama model');
    }

    return parseResponse(rawText);
  } catch (err) {
    console.warn(`Local Ollama connection failed or model was not found: ${err.message}. Falling back to high-quality local mock analysis.`);
    return getMockAnalysis(profile, target);
  }
};

module.exports = {
  formatPrompt,
  parseResponse,
  analyzeGap,
};
