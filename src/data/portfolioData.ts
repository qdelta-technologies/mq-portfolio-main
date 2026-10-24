export interface NavItem {
  label: string;
  href: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  icon: string;
  description?: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
  ariaLabel: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  linkText: string;
}

export const PERSONAL_INFO = {
  name: "Mohammed Qaisuddin",
  initials: "MQ",
  title: "AI Generalist",
  eyebrow: "AI GENERALIST",
  tagline: "Founder of QDelta Technologies",
  headlinePrefix: "I turn ideas into useful ",
  headlineHighlight: "digital experiences.",
  intro: "I Combine Design, Development, Automation, Strategy & AI to build practical digital solutions for businesses.",
  primaryCta: "Explore My Work",
  secondaryCta: "Get in Touch",
  statusText: "Open to Client Projects & Remote Work",
  email: "qais@qdelta.in",
  github: "https://github.com/mdqais29",
  businessSite: "https://www.qdelta.in/",
  linkedin: "https://www.linkedin.com/in/md-qais-905039224/",
  instagram: "https://www.instagram.com/mqtech.ai?psln=MWd0MndtZmp3YXJ3Zw==",
  whatsapp: "https://wa.me/917815895689",
  whatsappNumber: "+91 78158 95689",
  portraitSrc: "/images/qais-portrait-hero.png",
  logoSrc: "/images/mq-logo.png",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export const HERO_EXPERTISE_ITEMS: ExpertiseItem[] = [
  { id: "ai-auto", title: "AI & Automation", icon: "sparkle" },
  { id: "web-dev", title: "Web Development", icon: "code" },
  { id: "ui-ux", title: "UI/UX Design", icon: "palette" },
  { id: "digital-sys", title: "Digital Systems", icon: "layers" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    href: PERSONAL_INFO.github,
    icon: "github",
    ariaLabel: "Visit Mohammed Qaisuddin's GitHub Profile",
  },
  {
    name: "LinkedIn",
    href: PERSONAL_INFO.linkedin,
    icon: "linkedin",
    ariaLabel: "Connect with Mohammed Qaisuddin on LinkedIn",
  },
  {
    name: "Instagram",
    href: PERSONAL_INFO.instagram,
    icon: "instagram",
    ariaLabel: "Visit MQTech AI on Instagram",
  },
  {
    name: "Email",
    href: `mailto:${PERSONAL_INFO.email}`,
    icon: "mail",
    ariaLabel: "Email Mohammed Qaisuddin",
  },
  {
    name: "WhatsApp",
    href: PERSONAL_INFO.whatsapp,
    icon: "whatsapp",
    ariaLabel: "Chat with Mohammed Qaisuddin on WhatsApp",
  },
  {
    name: "Website",
    href: PERSONAL_INFO.businessSite,
    icon: "globe",
    ariaLabel: "Visit QDelta Technologies Website",
  },
];

export const TICKER_ITEMS = [
  "WEB DEVELOPMENT",
  "UI/UX",
  "LEAD CAPTURE SYSTEMS",
  "AI AUTOMATION",
  "CONTENT CREATION",
  "SOCIAL MEDIA MARKETING",
  "LANDING PAGE OPTIMIZATION",
];

export const SERVICES_SECTION_DATA = {
  label: "My Specialization",
  headingHighlight: "Services",
  headingSuffix: "I Provide",
  watermark: "SERVICES",
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "web-dev",
    number: "01",
    title: "Web Design & Development",
    description: "Modern, responsive and high-performing websites tailored to your brand and goals.",
    tags: ["React", "Next.js", "Tailwind CSS", "Responsive Web", "SEO"],
  },
  {
    id: "ui-ux",
    number: "02",
    title: "UI/UX Design",
    description: "User-focused interfaces, wireframes and product designs that deliver seamless digital experiences.",
    tags: ["Figma", "Wireframing", "Prototypes", "Design Systems", "UI/UX"],
  },
  {
    id: "landing-page",
    number: "03",
    title: "Landing Page Optimization",
    description: "Conversion-focused landing pages with clear messaging and strategic calls to action.",
    tags: ["CRO", "Copywriting", "A/B Testing", "Speed", "Analytics"],
  },
  {
    id: "social-media",
    number: "04",
    title: "Social Media Management",
    description: "Content planning, posting, and brand growth across multiple platforms.",
    tags: ["Instagram", "LinkedIn", "YouTube", "Content Strategy", "Growth"],
  },
  {
    id: "content-writing",
    number: "05",
    title: "Content Creation & Writing",
    description: "Engaging content for social media, websites, and blogs tailored to your audience.",
    tags: ["SEO Articles", "Copywriting", "Storytelling", "Brand Voice"],
  },
  {
    id: "ai-automation",
    number: "06",
    title: "AI & Workflow Automation",
    description: "Automate repetitive tasks, connect tools, and build intelligent workflows using AI and automation platforms.",
    tags: ["n8n", "Make", "ChatGPT", "AI Agents", "Automations"],
  },
];

export const PROJECTS_SECTION_DATA = {
  label: "MY WORK",
  headingPrefix: "Selected ",
  headingHighlight: "Projects",
  description: "A collection of digital experiences across web development, AI, design, and digital products.",
  viewAllLink: "#projects",
  viewAllText: "View All Projects",
};

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: "wts-nova",
    title: "WTS Nova",
    description: "A modern, clean website for a social media agency, showcasing its services and creative work.",
    image: "/images/projects/wts-nova.png",
    tags: ["Agency Website", "Web Development"],
    link: "https://www.wtsnova.com/",
    linkText: "View project",
  },
  {
    id: "gsa",
    title: "Global Safety Academy",
    description: "A modern, animated website for a safety training institute, built with Next.js.",
    image: "/images/projects/global-safety-academy.jpg",
    tags: ["Next.js", "Website"],
    link: "https://www.globalsafetyacademy.com/",
    linkText: "View project",
  },
  {
    id: "sentiment-analyser",
    title: "AI Sentiment Analyser",
    description: "A Python-based NLP application that classifies text sentiment as positive, negative, or neutral.",
    image: "/images/projects/ai-sentiment-analyser.jpg",
    tags: ["Python", "NLP"],
    link: "https://ai-sentiment-analyser.netlify.app/",
    linkText: "View project",
  },
  {
    id: "flowdesk",
    title: "FlowDesk",
    description: "A web application project designed for streamlined task tracking and productivity workflows.",
    image: "/images/projects/flowdesk.jpg",
    tags: ["Web App", "Productivity"],
    link: "https://flowdesk123.netlify.app/",
    linkText: "View project",
  },
  {
    id: "fresh-laundry",
    title: "Fresh Laundry",
    description: "A UI/UX design case study focused on a modern laundry service, created in Figma.",
    image: "/images/projects/fresh-laundry.jpg",
    tags: ["Figma", "UI/UX"],
    link: "https://www.figma.com/design/s25K1h3V88yAPuYTg9zIX9/UI-UX?node-id=2002-456",
    linkText: "View project",
  },
  {
    id: "pretty-good-pdf",
    title: "Pretty Good PDF",
    description: "A web-based PDF project with useful client-side tools for document manipulation.",
    image: "/images/projects/pretty-good-pdf.jpg",
    tags: ["Web Tool", "Productivity"],
    link: "https://www.prettygoodpdf.site/",
    linkText: "View project",
  },
  {
    id: "qdelta",
    title: "QDelta Technologies",
    description: "My business website representing my venture in AI automation and digital solutions.",
    image: "/images/projects/qdelta-technologies.jpg",
    tags: ["Next.js", "Business"],
    link: "https://www.qdelta.in/",
    linkText: "View project",
  },
];

/* ==========================================================================
   EXPERIENCE SECTION DATA
   ========================================================================== */
export interface ExperienceItem {
  id: string;
  step: string;
  role: string;
  organization: string;
  location?: string;
  period: string;
  description: string;
}

export const EXPERIENCE_SECTION_DATA = {
  label: "MY JOURNEY",
  headingPrefix: "Experi",
  headingHighlight: "ence",
  description: "Roles and opportunities that have shaped my skills and professional journey.",
};

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    id: "freelance-dev",
    step: "01",
    role: "Freelance Web Designer & Developer",
    organization: "Independent",
    location: "Remote",
    period: "2024 – 2026",
    description: "Designed and developed websites and digital experiences, focusing on responsive layouts, modern interfaces, usability, and client requirements.",
  },
  {
    id: "gsa-intern",
    step: "02",
    role: "Web Developer & Digital Support Intern",
    organization: "Global Safety Academy",
    location: "Nalgonda, Telangana",
    period: "October 2025 – September 2026",
    description: "Developed and maintained the institute's website while supporting website improvements, digital content, branding, and internal documentation.",
  },
  {
    id: "codtech-intern",
    step: "03",
    role: "Artificial Intelligence Intern",
    organization: "CODTECH IT Solutions Pvt. Ltd.",
    location: "Remote",
    period: "7 January 2026 – 4 March 2026",
    description: "Artificial intelligence internship experience with practical applications and tools.",
  },
  {
    id: "wts-nova",
    step: "04",
    role: "Operations Manager",
    organization: "WTS Nova (a social media agency)",
    location: "Hybrid",
    period: "August 2026 – Present",
    description: "Supports agency operations, team coordination, project execution, and digital service delivery.",
  },
  {
    id: "qdelta-founder",
    step: "05",
    role: "Founder & CEO",
    organization: "QDelta Technologies",
    location: "Remote / Hyderabad",
    period: "September 2026 – Present",
    description: "Founded and leads a digital venture focused on website development and modern digital experiences, with plans to expand into AI-powered solutions.",
  },
];

/* ==========================================================================
   SKILLS & TOOLS SECTION DATA
   ========================================================================== */
export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  skills: string[];
}

export const SKILLS_SECTION_DATA = {
  label: "MY TOOLKIT",
  headingPrefix: "Skills & ",
  headingHighlight: "Tools",
  description: "Technologies and tools I work with across development, AI, design, and business.",
};

export const ESTABLISHED_SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "web-dev",
    title: "Web Development",
    iconName: "code",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Python", "Web Development", "Web Design", "Git", "GitHub"],
  },
  {
    id: "ai-data",
    title: "AI & Data",
    iconName: "brain",
    skills: ["Generative AI", "Machine Learning", "Data Analysis", "AI Orchestration", "AI Automation", "Prompt Engineering"],
  },
  {
    id: "automation-coding",
    title: "Automation & AI Coding",
    iconName: "zap",
    skills: ["Make", "n8n", "ChatGPT", "Claude Code", "Cursor", "Antigravity"],
  },
  {
    id: "design-content",
    title: "Design & Content",
    iconName: "pen-tool",
    skills: ["UI/UX Design", "Figma", "Canva", "Graphic Design", "Content Writing"],
  },
  {
    id: "business-ops",
    title: "Business & Operations",
    iconName: "briefcase",
    skills: ["CRM Management", "Social Media Marketing", "Sales Funnels"],
  },
  {
    id: "productivity",
    title: "Productivity",
    iconName: "check-circle",
    skills: ["Microsoft Office", "Google Workspace"],
  },
];

export const LEARNING_CATEGORY: SkillCategory = {
  id: "learning-exploring",
  title: "Learning & Exploring",
  iconName: "compass",
  skills: ["Google AI Studio", "Pandas", "NumPy", "Supabase", "REST APIs", "Vercel"],
};

/* ==========================================================================
   CERTIFICATIONS DATA
   ========================================================================== */
export interface CertificationItem {
  id: string;
  number: string;
  title: string;
  issuer: string;
  detail?: string;
}

export const CERTIFICATIONS_SECTION_DATA = {
  label: "Credentials",
  watermark: "CERTIFICATIONS",
  headingPrefix: "Professional ",
  headingHighlight: "Certifications",
  description: "Certifications and achievements across AI, cloud, software development, and UI/UX design.",
};

export const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    id: "naukri-young-turks",
    number: "01",
    title: "Naukri Campus Young Turks — Certificate of Merit",
    issuer: "Naukri Campus",
    detail: "97.14th percentile in Young Turks 2025",
  },
  {
    id: "oci-gen-ai",
    number: "02",
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle",
  },
  {
    id: "oci-foundations",
    number: "03",
    title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle",
  },
  {
    id: "gen-ai-foundations",
    number: "04",
    title: "Generative AI Foundations",
    issuer: "Microsoft & upGrad",
  },
  {
    id: "software-dev-fundamentals",
    number: "05",
    title: "Software Development Fundamentals",
    issuer: "Simplilearn SkillUp",
  },
  {
    id: "gen-ai-mastermind",
    number: "06",
    title: "Generative AI Mastermind — Certificate of Completion",
    issuer: "Outskill",
  },
  {
    id: "uiux-design",
    number: "07",
    title: "UI/UX Design Certificate",
    issuer: "Tutedude",
  },
];

/* ==========================================================================
   CONTACT SECTION DATA
   ========================================================================== */
export const CONTACT_SECTION_DATA = {
  label: "LET'S WORK TOGETHER",
  heading: "Have a project in mind?",
  subtitle: "Let's create something useful.",
  primaryCtaText: "Get in Touch",
  secondaryCtaText: "Visit QDelta",
  email: PERSONAL_INFO.email,
  whatsapp: PERSONAL_INFO.whatsapp,
  whatsappNumber: PERSONAL_INFO.whatsappNumber,
  businessSite: PERSONAL_INFO.businessSite,
  github: PERSONAL_INFO.github,
  statusText: PERSONAL_INFO.statusText,
};
