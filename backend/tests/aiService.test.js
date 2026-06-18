const { formatPrompt, parseResponse } = require('../src/services/geminiService');

describe('AI Service Helpers', () => {
  describe('formatPrompt', () => {
    it('should format prompt with skills, education, experience and target role', () => {
      const profile = {
        skills: ['React', 'Node.js'],
        education: 'Bachelor in CS',
        experience: '2 years of frontend coding',
      };
      const target = 'Senior Developer';

      const prompt = formatPrompt(profile, target);

      expect(prompt).toContain('React, Node.js');
      expect(prompt).toContain('Bachelor in CS');
      expect(prompt).toContain('2 years of frontend coding');
      expect(prompt).toContain('Senior Developer');
      expect(prompt).toContain('Respond ONLY in valid JSON');
    });
  });

  describe('parseResponse', () => {
    it('should successfully parse valid JSON response structure', () => {
      const validRawText = JSON.stringify({
        gaps: [{ skill: 'Docker', priority: 'medium' }],
        roadmap: [{ skill: 'Docker', duration: '2 weeks', order: 1 }],
        resources: [{ skill: 'Docker', title: 'Docker Tutorial', url: 'http://docker.com', type: 'course' }],
      });

      const parsed = parseResponse(validRawText);

      expect(parsed.gaps[0].skill).toBe('Docker');
      expect(parsed.roadmap[0].duration).toBe('2 weeks');
      expect(parsed.resources[0].title).toBe('Docker Tutorial');
    });

    it('should strip markdown backticks and parse correctly', () => {
      const markdownRawText = '```json\n' + JSON.stringify({
        gaps: [],
        roadmap: [],
        resources: [],
      }) + '\n```';

      const parsed = parseResponse(markdownRawText);
      expect(parsed.gaps).toEqual([]);
    });

    it('should throw an error on invalid or missing structure keys', () => {
      const invalidJson = JSON.stringify({
        gaps: [],
        roadmap: [],
        // resources key is missing
      });

      expect(() => parseResponse(invalidJson)).toThrow('Invalid AI response structure');
    });

    it('should throw an error on malformed JSON string', () => {
      const malformedText = '{ gaps: [, ';
      expect(() => parseResponse(malformedText)).toThrow('Invalid AI response:');
    });
  });
});
