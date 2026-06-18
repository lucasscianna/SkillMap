/**
 * Fallback local mock analyzer to generate high-quality analysis if the AI APIs fail.
 * Maps the target role to major industries and provides realistic timeline roadmaps
 * prioritizing professional diplomas/degrees first, followed by certifications and readings.
 */
const getMockAnalysis = (profile, target) => {
  const targetLower = (target || 'General Manager').toLowerCase();
  
  let gaps = [];
  let roadmap = [];
  let resources = [];

  // 1. Culinary, Hospitality & Food Services
  if (
    targetLower.includes('chef') ||
    targetLower.includes('cook') ||
    targetLower.includes('restaurant') ||
    targetLower.includes('hospitality') ||
    targetLower.includes('culinary') ||
    targetLower.includes('hotel') ||
    targetLower.includes('waiter') ||
    targetLower.includes('catering') ||
    targetLower.includes('food')
  ) {
    gaps = [
      { skill: 'Hospitality & Restaurant Management Degree', priority: 'high' },
      { skill: 'Food Safety & HACCP Manager Certification', priority: 'high' },
      { skill: 'Restaurant Operations & Cost Control', priority: 'medium' },
      { skill: 'Staff Scheduling & Team Leadership', priority: 'medium' },
      { skill: 'Inventory & Supply Chain Management', priority: 'low' }
    ];
    roadmap = [
      { skill: 'Hospitality & Restaurant Management Degree', duration: '12-18 months', order: 1 },
      { skill: 'Food Safety & HACCP Manager Certification', duration: '2-3 months', order: 2 },
      { skill: 'Restaurant Operations & Cost Control', duration: '1-2 months', order: 3 },
      { skill: 'Staff Scheduling & Team Leadership', duration: '4-6 weeks', order: 4 },
      { skill: 'Inventory & Supply Chain Management', duration: '2-4 weeks', order: 5 }
    ];
    resources = [
      { skill: 'Hospitality & Restaurant Management Degree', title: 'Associate Degree in Hospitality Management', url: 'https://www.coursera.org/', type: 'course' },
      { skill: 'Food Safety & HACCP Manager Certification', title: 'ServSafe Manager Certification Course', url: 'https://www.servsafe.com/', type: 'course' },
      { skill: 'Restaurant Operations & Cost Control', title: 'Restaurant Management & Operations Guide', url: 'https://www.restaurantowner.com/', type: 'reading' },
      { skill: 'Staff Scheduling & Team Leadership', title: 'Staff Scheduling Best Practices', url: 'https://7shifts.com/blog/', type: 'reading' },
      { skill: 'Inventory & Supply Chain Management', title: 'Restaurant Inventory Spreadsheet Project', url: 'https://www.microsoft.com/excel', type: 'project' }
    ];
  }
  // 2. Healthcare, Medical & Nursing
  else if (
    targetLower.includes('nurse') ||
    targetLower.includes('nursing') ||
    targetLower.includes('medical') ||
    targetLower.includes('healthcare') ||
    targetLower.includes('doctor') ||
    targetLower.includes('clinic') ||
    targetLower.includes('patient') ||
    targetLower.includes('hospital') ||
    targetLower.includes('care')
  ) {
    gaps = [
      { skill: 'Nursing / Healthcare Administration Degree', priority: 'high' },
      { skill: 'Medical Terminology & Clinical Care', priority: 'high' },
      { skill: 'Healthcare Law & Patient Ethics Compliance', priority: 'medium' },
      { skill: 'Clinic Operations & Electronic Health Records', priority: 'medium' },
      { skill: 'Hygiene & Infection Prevention Standards', priority: 'low' }
    ];
    roadmap = [
      { skill: 'Nursing / Healthcare Administration Degree', duration: '2-3 years', order: 1 },
      { skill: 'Medical Terminology & Clinical Care', duration: '3-4 months', order: 2 },
      { skill: 'Healthcare Law & Patient Ethics Compliance', duration: '2 months', order: 3 },
      { skill: 'Clinic Operations & Electronic Health Records', duration: '4-6 weeks', order: 4 },
      { skill: 'Hygiene & Infection Prevention Standards', duration: '2-4 weeks', order: 5 }
    ];
    resources = [
      { skill: 'Nursing / Healthcare Administration Degree', title: 'Bachelor of Science in Healthcare Administration', url: 'https://www.coursera.org/', type: 'course' },
      { skill: 'Medical Terminology & Clinical Care', title: 'Certified Medical Assistant Training', url: 'https://www.aama-ntl.org/', type: 'course' },
      { skill: 'Healthcare Law & Patient Ethics Compliance', title: 'Healthcare Law & Regulations Program', url: 'https://www.edx.org/', type: 'course' },
      { skill: 'Clinic Operations & Electronic Health Records', title: 'EHR Simulation & Management Tool', url: 'https://www.cms.gov/', type: 'project' },
      { skill: 'Hygiene & Infection Prevention Standards', title: 'WHO Infection Prevention & Control Guide', url: 'https://www.who.int/', type: 'reading' }
    ];
  }
  // 3. Technology, Software & Engineering
  else if (
    targetLower.includes('developer') ||
    targetLower.includes('engineer') ||
    targetLower.includes('programmer') ||
    targetLower.includes('devops') ||
    targetLower.includes('tech') ||
    targetLower.includes('coder') ||
    targetLower.includes('sysadmin') ||
    targetLower.includes('data analyst') ||
    targetLower.includes('data scientist') ||
    targetLower.includes('software')
  ) {
    gaps = [
      { skill: 'Computer Science & Software Systems Degree', priority: 'high' },
      { skill: 'Advanced Backend APIs & Database Management', priority: 'high' },
      { skill: 'System Design & Distributed Scalability', priority: 'medium' },
      { skill: 'CI/CD & Cloud Infrastructure Architecture', priority: 'medium' },
      { skill: 'Software Testing Suites & QA Standards', priority: 'low' }
    ];
    roadmap = [
      { skill: 'Computer Science & Software Systems Degree', duration: '12-24 months', order: 1 },
      { skill: 'Advanced Backend APIs & Database Management', duration: '2-3 months', order: 2 },
      { skill: 'System Design & Distributed Scalability', duration: '2 months', order: 3 },
      { skill: 'CI/CD & Cloud Infrastructure Architecture', duration: '1-2 months', order: 4 },
      { skill: 'Software Testing Suites & QA Standards', duration: '2-4 weeks', order: 5 }
    ];
    resources = [
      { skill: 'Computer Science & Software Systems Degree', title: 'Associate Degree in Computer Science', url: 'https://www.coursera.org/', type: 'course' },
      { skill: 'Advanced Backend APIs & Database Management', title: 'Full-Stack Developer Bootcamp Certification', url: 'https://www.freecodecamp.org/', type: 'course' },
      { skill: 'System Design & Distributed Scalability', title: 'System Design Primer Guide', url: 'https://github.com/donnemartin/system-design-primer', type: 'reading' },
      { skill: 'CI/CD & Cloud Infrastructure Architecture', title: 'Docker & Kubernetes Cloud Architecture Course', url: 'https://kubernetes.io/', type: 'course' },
      { skill: 'Software Testing Suites & QA Standards', title: 'Testing JavaScript Applications with Jest', url: 'https://jestjs.io/', type: 'reading' }
    ];
  }
  // 4. Business, Finance, Marketing & HR
  else if (
    targetLower.includes('manager') ||
    targetLower.includes('management') ||
    targetLower.includes('finance') ||
    targetLower.includes('business') ||
    targetLower.includes('analyst') ||
    targetLower.includes('accountant') ||
    targetLower.includes('accounting') ||
    targetLower.includes('hr') ||
    targetLower.includes('project') ||
    targetLower.includes('product') ||
    targetLower.includes('sales') ||
    targetLower.includes('marketing')
  ) {
    gaps = [
      { skill: 'Business Administration & Strategic Leadership Degree', priority: 'high' },
      { skill: 'Project Management Professional (PMP) Framework', priority: 'high' },
      { skill: 'Financial Accounting & Budgetary Control', priority: 'medium' },
      { skill: 'Agile Product Management & Scrum Methodologies', priority: 'medium' },
      { skill: 'Professional Negotiation & Conflict Resolution', priority: 'low' }
    ];
    roadmap = [
      { skill: 'Business Administration & Strategic Leadership Degree', duration: '12-18 months', order: 1 },
      { skill: 'Project Management Professional (PMP) Framework', duration: '3-4 months', order: 2 },
      { skill: 'Financial Accounting & Budgetary Control', duration: '2 months', order: 3 },
      { skill: 'Agile Product Management & Scrum Methodologies', duration: '4-6 weeks', order: 4 },
      { skill: 'Professional Negotiation & Conflict Resolution', duration: '2-4 weeks', order: 5 }
    ];
    resources = [
      { skill: 'Business Administration & Strategic Leadership Degree', title: 'Master of Business Administration (MBA) Program', url: 'https://www.coursera.org/', type: 'course' },
      { skill: 'Project Management Professional (PMP) Framework', title: 'PMP Certification Prep Training', url: 'https://www.pmi.org/', type: 'course' },
      { skill: 'Financial Accounting & Budgetary Control', title: 'Financial Accounting & Reporting Basics', url: 'https://www.edx.org/', type: 'course' },
      { skill: 'Agile Product Management & Scrum Methodologies', title: 'Scrum Alliance Product Owner Guide', url: 'https://www.scrumalliance.org/', type: 'reading' },
      { skill: 'Professional Negotiation & Conflict Resolution', title: 'Harvard Business Review Negotiation Skills Guide', url: 'https://hbr.org/', type: 'reading' }
    ];
  }
  // 5. Creative, Arts & Design
  else if (
    targetLower.includes('designer') ||
    targetLower.includes('design') ||
    targetLower.includes('art') ||
    targetLower.includes('creative') ||
    targetLower.includes('ux') ||
    targetLower.includes('ui') ||
    targetLower.includes('graphic') ||
    targetLower.includes('illustrator') ||
    targetLower.includes('content') ||
    targetLower.includes('fashion')
  ) {
    gaps = [
      { skill: 'Interaction Design & Visual Arts Degree', priority: 'high' },
      { skill: 'Graphic Design Principles & Branding Systems', priority: 'high' },
      { skill: 'User Experience Research & Usability Testing', priority: 'medium' },
      { skill: 'Figma Prototyping & Interface Design Systems', priority: 'medium' },
      { skill: 'Creative Portfolio Production & Showcase', priority: 'low' }
    ];
    roadmap = [
      { skill: 'Interaction Design & Visual Arts Degree', duration: '12-24 months', order: 1 },
      { skill: 'Graphic Design Principles & Branding Systems', duration: '3-4 months', order: 2 },
      { skill: 'User Experience Research & Usability Testing', duration: '2 months', order: 3 },
      { skill: 'Figma Prototyping & Interface Design Systems', duration: '4-6 weeks', order: 4 },
      { skill: 'Creative Portfolio Production & Showcase', duration: '2-4 weeks', order: 5 }
    ];
    resources = [
      { skill: 'Interaction Design & Visual Arts Degree', title: 'Interaction Design Foundation Certification', url: 'https://www.interaction-design.org/', type: 'course' },
      { skill: 'Graphic Design Principles & Branding Systems', title: 'Graphic Design Visual Masterclass', url: 'https://www.udemy.com/', type: 'course' },
      { skill: 'User Experience Research & Usability Testing', title: 'Google UX Design Professional Certification', url: 'https://www.coursera.org/', type: 'course' },
      { skill: 'Figma Prototyping & Interface Design Systems', title: 'Figma Design System Components Guide', url: 'https://www.figma.com/', type: 'project' },
      { skill: 'Creative Portfolio Production & Showcase', title: 'Behance Creative Portfolio Layouts', url: 'https://www.behance.net/', type: 'project' }
    ];
  }
  // 6. Education, Teaching & Coaching
  else if (
    targetLower.includes('teacher') ||
    targetLower.includes('teaching') ||
    targetLower.includes('education') ||
    targetLower.includes('school') ||
    targetLower.includes('instructor') ||
    targetLower.includes('coach') ||
    targetLower.includes('trainer') ||
    targetLower.includes('academic')
  ) {
    gaps = [
      { skill: 'Education & Pedagogy Studies Degree', priority: 'high' },
      { skill: 'Classroom Management & Syllabus Development', priority: 'high' },
      { skill: 'Educational Technologies & Online Learning Systems', priority: 'medium' },
      { skill: 'Inclusive Practices & Special Education Standards', priority: 'medium' },
      { skill: 'Teaching Licensure & Certifications Preparation', priority: 'low' }
    ];
    roadmap = [
      { skill: 'Education & Pedagogy Studies Degree', duration: '1-2 years', order: 1 },
      { skill: 'Classroom Management & Syllabus Development', duration: '3-4 months', order: 2 },
      { skill: 'Educational Technologies & Online Learning Systems', duration: '1-2 months', order: 3 },
      { skill: 'Inclusive Practices & Special Education Standards', duration: '4-6 weeks', order: 4 },
      { skill: 'Teaching Licensure & Certifications Preparation', duration: '2-4 weeks', order: 5 }
    ];
    resources = [
      { skill: 'Education & Pedagogy Studies Degree', title: 'Master of Arts in Teaching Education Degree', url: 'https://www.coursera.org/', type: 'course' },
      { skill: 'Classroom Management & Syllabus Development', title: 'Pedagogy & Classroom Management Training', url: 'https://www.udemy.com/', type: 'course' },
      { skill: 'Educational Technologies & Online Learning Systems', title: 'Google Certified Educator Level 1/2 Program', url: 'https://edu.google.com/', type: 'course' },
      { skill: 'Inclusive Practices & Special Education Standards', title: 'US Dept of Education Inclusive Practices Guide', url: 'https://www.ed.gov/', type: 'reading' },
      { skill: 'Teaching Licensure & Certifications Preparation', title: 'ETS Teaching Certification prep exams', url: 'https://www.ets.org/', type: 'reading' }
    ];
  }
  // 7. General Fallback (Default Professional Growth)
  else {
    gaps = [
      { skill: 'Executive Leadership & Operations Management Degree', priority: 'high' },
      { skill: 'Professional Certification in Operations Management', priority: 'high' },
      { skill: 'Corporate Finance & Budgetary Control', priority: 'medium' },
      { skill: 'Agile Project Management Frameworks', priority: 'medium' },
      { skill: 'Business Communication & Conflict Resolution', priority: 'low' }
    ];
    roadmap = [
      { skill: 'Executive Leadership & Operations Management Degree', duration: '12-18 months', order: 1 },
      { skill: 'Professional Certification in Operations Management', duration: '3-4 months', order: 2 },
      { skill: 'Corporate Finance & Budgetary Control', duration: '2 months', order: 3 },
      { skill: 'Agile Project Management Frameworks', duration: '4-6 weeks', order: 4 },
      { skill: 'Business Communication & Conflict Resolution', duration: '2-4 weeks', order: 5 }
    ];
    resources = [
      { skill: 'Executive Leadership & Operations Management Degree', title: 'Professional Diploma in Business Operations', url: 'https://www.coursera.org/', type: 'course' },
      { skill: 'Professional Certification in Operations Management', title: 'Operations Management Certificate Program', url: 'https://www.edx.org/', type: 'course' },
      { skill: 'Corporate Finance & Budgetary Control', title: 'HBR Guide to Finance Basics for Managers', url: 'https://hbr.org/', type: 'reading' },
      { skill: 'Agile Project Management Frameworks', title: 'Project Management Core Framework Guide', url: 'https://www.pmi.org/', type: 'reading' },
      { skill: 'Business Communication & Conflict Resolution', title: 'Conflict Resolution Strategies Handbook', url: 'https://www.shrm.org/', type: 'reading' }
    ];
  }
  
  return { gaps, roadmap, resources };
};

module.exports = {
  getMockAnalysis,
};
