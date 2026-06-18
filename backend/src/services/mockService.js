/**
 * Fallback local mock analyzer to generate high-quality analysis if the AI APIs fail.
 */
const getMockAnalysis = (profile, target) => {
  const targetLower = (target || 'Software Engineer').toLowerCase();
  
  let gaps = [];
  let roadmap = [];
  let resources = [];
  
  if (targetLower.includes('fullstack') || targetLower.includes('full-stack') || targetLower.includes('frontend') || targetLower.includes('backend') || targetLower.includes('developer') || targetLower.includes('engineer')) {
    gaps = [
      { skill: 'React & Advanced Frontend', priority: 'high' },
      { skill: 'Node.js & Backend APIs', priority: 'high' },
      { skill: 'System Design & Scalability', priority: 'medium' },
      { skill: 'CI/CD & DevOps', priority: 'medium' },
      { skill: 'Testing with Jest & Cypress', priority: 'low' }
    ];
    roadmap = [
      { skill: 'React & Advanced Frontend', duration: '2-3 weeks', order: 1 },
      { skill: 'Node.js & Backend APIs', duration: '3-4 weeks', order: 2 },
      { skill: 'System Design & Scalability', duration: '2 weeks', order: 3 },
      { skill: 'CI/CD & DevOps', duration: '2 weeks', order: 4 },
      { skill: 'Testing with Jest & Cypress', duration: '1-2 weeks', order: 5 }
    ];
    resources = [
      { skill: 'React & Advanced Frontend', title: 'React - The Complete Guide', url: 'https://react.dev/', type: 'course' },
      { skill: 'Node.js & Backend APIs', title: 'Node.js Developer Course', url: 'https://nodejs.org/', type: 'course' },
      { skill: 'System Design & Scalability', title: 'System Design Interview Guide', url: 'https://example.com/system-design', type: 'reading' },
      { skill: 'CI/CD & DevOps', title: 'GitHub Actions Tutorial', url: 'https://github.com/features/actions', type: 'project' },
      { skill: 'Testing with Jest & Cypress', title: 'Testing JavaScript Applications', url: 'https://jestjs.io/', type: 'reading' }
    ];
  } else {
    gaps = [
      { skill: 'Cloud Architecture', priority: 'high' },
      { skill: 'Database Management', priority: 'high' },
      { skill: 'System Monitoring', priority: 'medium' },
      { skill: 'Agile Methodologies', priority: 'low' }
    ];
    roadmap = [
      { skill: 'Cloud Architecture', duration: '4 weeks', order: 1 },
      { skill: 'Database Management', duration: '3 weeks', order: 2 },
      { skill: 'System Monitoring', duration: '2 weeks', order: 3 },
      { skill: 'Agile Methodologies', duration: '1 week', order: 4 }
    ];
    resources = [
      { skill: 'Cloud Architecture', title: 'AWS Solutions Architect course', url: 'https://aws.amazon.com/', type: 'course' },
      { skill: 'Database Management', title: 'PostgreSQL Tutorial', url: 'https://www.postgresql.org/', type: 'course' },
      { skill: 'System Monitoring', title: 'Prometheus & Grafana guide', url: 'https://prometheus.io/', type: 'reading' },
      { skill: 'Agile Methodologies', title: 'Scrum Alliance guide', url: 'https://www.scrumalliance.org/', type: 'reading' }
    ];
  }
  
  return { gaps, roadmap, resources };
};

module.exports = {
  getMockAnalysis,
};
