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
    github: 'https://github.com/Soumyagit123?tab=repositories',
    twitter: 'https://twitter.com/srdash4',
    credly: 'https://www.credly.com/users/soumyaranjan-dash.d25aea47/badges#credly',
  },
};

export const professionalSummary =
  "A full-stack developer with 5+ years of experience, now specializing in Generative AI. I build intelligent, agentic AI applications using frameworks like Langchain and LangGraph, integrated with full-stack systems. My focus on Context Engineering allows me to create robust, self-correcting AI agents. I am proficient in Angular, Vue.js, Node.js, and various databases, always exploring the intersection of AI and full-stack engineering to build impactful solutions.";

export const skills = [
  {
    category: 'Frontend',
    icon: Codepen,
    technologies: ['Angular', 'Vue.js', 'Tailwind CSS', 'HTML5, CSS3, JavaScript', 'Bootstrap'],
  },
  {
    category: 'Backend',
    icon: Server,
    technologies: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    category: 'Databases',
    icon: Database,
    technologies: ['Supabase', 'PostgreSQL', 'MongoDB', 'Vector DBs (Pinecone, ChromaDB, pgvector)'],
  },
  {
    category: 'Generative AI',
    icon: Sparkles,
    technologies: ['LangChain', 'LangGraph', 'RAG', 'Agentic Workflows', 'Context Engineering', 'Hugging Face models', 'OpenAI models', 'Anthropic models'],
  },
  {
    category: 'Tools & Platforms',
    icon: GitBranch,
    technologies: ['Git / GitHub', 'Postman', 'Docker', 'Windsurf', 'Claude-Code CLI', 'Google Gemini CLI'],
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
    title: 'MamaStop Logistics',
    year: '2021',
    description:
      'A comprehensive truck logistics management platform for fleet tracking, route optimization, and delivery management. The system helps logistics companies manage their truck fleets efficiently with real-time tracking and scheduling.',
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
