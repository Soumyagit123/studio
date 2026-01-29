import {
  Codepen,
  Cpu,
  Database,
  GitBranch,
  Github,
  Globe,
  Layers,
  Linkedin,
  Mail,
  Server,
  Smartphone,
  Sparkles,
  Twitter,
} from 'lucide-react';

export const personalDetails = {
  name: 'Soumyaranjan Dash',
  role: 'GenAI Engineer',
  experience: '5+ Years',
  location: 'Bhubaneswar, Odisha, India',
  email: 'soumyaranjan.dash4@gmail.com',
  phone: '+91 7008861660',
  social: {
    linkedin: 'https://www.linkedin.com/in/soumyaranjan-dash-968357221/',
    github: 'https://github.com/soumyaranjan-dash',
    twitter: 'https://twitter.com/srdash4',
    credly: 'https://www.credly.com/users/soumyaranjan-dash.d25aea47/badges#credly',
  },
};

export const professionalSummary =
  'A GenAI Engineer and Software Developer with 5+ years of experience in building scalable web applications using Angular, Vue.js, Node.js, and modern backend technologies. Currently focused on integrating Generative AI, RAG systems, and Agentic AI frameworks to automate enterprise workflows and deliver intelligent, data-driven solutions.';

export const skills = [
  {
    category: 'Frontend',
    icon: Codepen,
    technologies: ['Angular (9–17+)', 'Vue.js', 'Ionic', 'HTML5, CSS3, JavaScript', 'Bootstrap', 'Angular Material'],
  },
  {
    category: 'Backend',
    icon: Server,
    technologies: ['Node.js', 'ASP.NET Web API', 'Spring Boot', 'REST APIs'],
  },
  {
    category: 'Databases',
    icon: Database,
    technologies: ['SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB', 'Vector Databases (Pinecone, pgvector)'],
  },
  {
    category: 'AI / GenAI',
    icon: Sparkles,
    technologies: ['Generative AI', 'RAG', 'LangChain', 'LangGraph', 'Multi-Agent Systems', 'Google Gemini LLM'],
  },
  {
    category: 'Tools',
    icon: GitBranch,
    technologies: ['Git / GitHub', 'Postman', 'Docker (basic)'],
  },
];

export const workExperience = [
  {
    role: 'Software Engineer',
    company: 'Gemini Consulting & Services',
    location: 'Bhubaneswar',
    period: 'May 2024 – Present',
    description: [
      'Developing frontend and AI-driven applications.',
      'Integrating Generative AI, RAG, and agentic workflows into enterprise systems.',
      'Tech stack: Vue.js, Node.js, TypeScript, LangChain, LangGraph, PostgreSQL, Vector DBs.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Westech Ltd',
    location: 'Bhubaneswar',
    period: 'Mar 2023 – May 2024',
    description: [
      'Developed and maintained complex web applications using Angular 14+.',
      'Contributed to requirement analysis, database design, and system architecture.',
      'Collaborated with cross-functional teams to deliver high-quality software solutions.',
    ],
  },
  {
    role: 'Associate',
    company: 'Healthmatic Business Solutions',
    location: 'Hyderabad',
    period: 'Mar 2020 – Mar 2023',
    description: [
      'Worked on full-stack development using Angular, ASP.NET Web API, and SQL Server.',
      'Engaged in client interaction to gather requirements and provide technical support.',
      'Participated in the complete software development lifecycle, from concept to deployment.',
    ],
  },
];

export const projectsData = [
  {
    id: 'hr-copilot',
    title: 'Gen AI – HR Co-Pilot',
    year: '2024 – Present',
    description:
      'A fully automated HR assistance system using Agentic AI to handle employee queries, manage leave requests, and streamline onboarding processes. The system leverages RAG for contextual understanding and provides intelligent, human-like responses.',
    role: 'GenAI Engineer',
    techStack: 'LangChain, LangGraph, Pinecone, Vue.js, Node.js',
    
  },
  {
    id: 'hospital-management',
    title: 'Hospital Management System',
    year: '2023',
    description:
      'An enterprise-level hospital management system designed to manage patient records, appointments, billing, and inventory. The application provides a seamless experience for hospital staff and improves operational efficiency.',
    role: 'Frontend Developer',
    techStack: 'Angular 17, Spring Boot, PostgreSQL, Angular Material',
    
  },
  {
    id: 'grievance-system',
    title: 'FOREST – Grievance Management System',
    year: '2022',
    description:
      'A web-based platform for a government department to manage and track public grievances. The system includes features for lodging complaints, tracking status, and generating reports for officials.',
    role: 'Full-Stack Developer',
    techStack: 'Angular 14, Spring Boot, PostgreSQL',
  },
  {
    id: 'logistics-platform',
    title: 'MamaStop & EV Charging System',
    year: '2021',
    description:
      'A dual-purpose platform combining a logistics management system with an EV charging station booking service. It helps optimize delivery routes and allows EV owners to find and book charging slots.',
    role: 'Frontend Developer',
    techStack: 'Angular, Node.js, MySQL',
  },
  {
    id: 'nanoseal-crm',
    title: 'NanoSeal CRM',
    year: '2020',
    description:
      'A comprehensive Customer Relationship Management (CRM) system, similar to Salesforce, built for a specific industry. It manages leads, contacts, sales pipelines, and customer support tickets.',
    role: 'Associate Developer',
    techStack: 'Angular, ASP.NET Web API, SQL Server',
  },
];

export const education = [
  {
    degree: 'M.Sc. IT',
    institution: 'Sikkim Manipal University',
    period: '2017–2020',
  },
  {
    degree: 'B.Sc. (Hons)',
    institution: 'Utkal University',
    period: '2013',
  },
];

export const certifications = [
  {
    id: 'certificate-badge',
    title: 'IBM RAG and Agentic AI Professional Certificate',
    issuer: 'IBM',
    date: 'Issued: Jan 2026', // As per user request
    description: 'Expertise in RAG systems, Vector databases, Agentic AI with LangChain & LangGraph, CrewAI & AutoGen, and Multimodal AI.',
    verificationLink: 'https://coursera.org/verify/professional-cert/9AIHPNMKNF70',
  },
];
