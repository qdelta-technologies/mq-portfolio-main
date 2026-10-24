import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Code2, 
  Sparkles, 
  PenTool, 
  BarChart3, 
  FolderKanban, 
  Megaphone, 
  ArrowRight, 
  ChevronRight
} from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { AmbientSection } from './AmbientSection';
import { useSiteMotion } from './SiteMotion';

/* ================= TECH LOGO INLINE SVGS ================= */
const TechLogos: Record<string, React.FC<{ className?: string }>> = {
  react: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 115.3 100" fill="#61DAFB">
      <ellipse cx="57.6" cy="50" rx="10.8" ry="4.2" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="4.5" fill="none">
        <ellipse cx="57.6" cy="50" rx="52" ry="20" />
        <ellipse cx="57.6" cy="50" rx="52" ry="20" transform="rotate(60 57.6 50)" />
        <ellipse cx="57.6" cy="50" rx="52" ry="20" transform="rotate(120 57.6 50)" />
      </g>
    </svg>
  ),
  python: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 110 110" fill="none">
      <path
        d="M54.2 8C27.4 8 28.5 19.8 28.5 19.8L28.6 32.1H55V35.8H18.2C18.2 35.8 8 34.6 8 61.8C8 89 16.9 87.7 16.9 87.7H26V74.8C26 74.8 25.5 60.3 40.2 60.3H65.8C65.8 60.3 78.4 60.8 78.4 48.6V19.8C78.4 19.8 79.5 8 54.2 8ZM41.4 17.5C44.7 17.5 47.4 20.2 47.4 23.5C47.4 26.8 44.7 29.5 41.4 29.5C38.1 29.5 35.4 26.8 35.4 23.5C35.4 20.2 38.1 17.5 41.4 17.5Z"
        fill="#387EB8"
      />
      <path
        d="M55.8 102C82.6 102 81.5 90.2 81.5 90.2L81.4 77.9H55V74.2H91.8C91.8 74.2 102 75.4 102 48.2C102 21 93.1 22.3 93.1 22.3H84V35.2C84 35.2 84.5 49.7 69.8 49.7H44.2C44.2 49.7 31.6 49.2 31.6 61.4V90.2C31.6 90.2 30.5 102 55.8 102ZM68.6 92.5C65.3 92.5 62.6 89.8 62.6 86.5C62.6 83.2 65.3 80.5 68.6 80.5C71.9 80.5 74.6 83.2 74.6 86.5C74.6 89.8 71.9 92.5 68.6 92.5Z"
        fill="#FFE052"
      />
    </svg>
  ),
  openai: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="#10A37F">
      <path d="M22.28 9.37a5.98 5.98 0 0 0-.52-4.94 6.07 6.07 0 0 0-6.44-2.88A6 6 0 0 0 10.77.34a6.07 6.07 0 0 0-5.8 4.21A6 6 0 0 0 1.34 7.2a6.07 6.07 0 0 0 .93 6.96 5.98 5.98 0 0 0 .52 4.94 6.07 6.07 0 0 0 6.44 2.88 6 6 0 0 0 4.55 1.21 6.07 6.07 0 0 0 5.8-4.21 6 6 0 0 0 3.63-2.65 6.07 6.07 0 0 0-.93-6.96ZM12 14.85a2.85 2.85 0 1 1 2.85-2.85A2.85 2.85 0 0 1 12 14.85Z" />
    </svg>
  ),
  nextjs: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 180 180" fill="none">
      <circle cx="90" cy="90" r="90" fill="#0F172A" />
      <path
        d="M149.5 159.2L68.7 54H54v72h12.5V70.8l70.7 91.8c4.3-1.1 8.4-2.5 12.3-4.2z"
        fill="url(#next_linear_light)"
      />
      <path d="M115 54h12.5v44.2L115 82V54z" fill="url(#next_linear_light2)" />
      <defs>
        <linearGradient id="next_linear_light" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="next_linear_light2" x1="121" y1="54" x2="120.7" y2="106" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  figma: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 38 57" fill="none">
      <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5A9.5 9.5 0 0 1 9.5 57 9.5 9.5 0 0 1 0 47.5z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  ),
  notion: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="#0F172A">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.78c-.467-.373-1.213-.746-2.286-.653L2.873 2.154c-.466.047-.56.327-.373.513zm.606 3.639v12.457c0 .793.42 1.073 1.26 1.026l14.288-.84c.84-.046 1.073-.606 1.073-1.213V6.914c0-.653-.28-1.026-.887-.98l-14.848.887c-.653.047-.886.42-.886 1.026zm13.122.98c.093.42 0 .84-.42.887l-.98.14v8.585c-.606.327-1.166.513-1.633.513-.793 0-1.026-.233-1.633-.98l-4.526-7.091v6.952l1.353.327c.373.093.373.42.046.793l-3.36.233c-.093-.42 0-.84.42-.887l1.026-.186V9.014L8.17 8.874c-.373-.093-.373-.42-.047-.793l3.547-.233 4.806 7.325V8.594l-1.306-.187c-.373-.046-.327-.466.093-.746z" />
    </svg>
  ),
  automation: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#EA4B71" strokeWidth="2.2">
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="12" cy="18" r="3" />
      <path d="M8.5 7.5L10 15.5M15.5 7.5L14 15.5" strokeDasharray="2 2" />
    </svg>
  ),
  canva: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="#00C4CC" />
      <path d="M14.5 8.5C13.2 7.8 11.5 8.2 10.5 9.5C9.2 11.1 9.3 13.5 10.6 15C11.8 16.3 13.8 16.4 15.2 15.2" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  github: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="#0F172A">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  drive: ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 87.3 78" fill="none">
      <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5l5.4 9.35z" fill="#0066DA" />
      <path d="M43.65 25L29.9 1.2c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44C.4 50 0 51.55 0 53.1h27.5L43.65 25z" fill="#00AC47" />
      <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H59.8l5.85 10.15 7.9 13.65z" fill="#EA4335" />
      <path d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.4-4.5 1.2L43.65 25z" fill="#00832D" />
      <path d="M59.8 53.1H87.3c0-1.55-.4-3.1-1.2-4.5l-25.4-44c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.15 28.1z" fill="#FFBA00" />
      <path d="M73.55 76.8H27.5L13.75 53.1h59.8l-7.9 13.65c-.8 1.4-1.95 2.5-3.3 3.3z" fill="#2684FC" />
    </svg>
  ),
};

/* ================= 8 ORBITAL TECH TILES ================= */
interface OrbitTech {
  id: string;
  name: string;
  angle: number; // in degrees
  radius: number; // in px
  category: string;
  label: string;
}

const ORBIT_ITEMS: OrbitTech[] = [
  { id: 'react', name: 'React', angle: 270, radius: 135, category: 'dev', label: 'Development' },
  { id: 'python', name: 'Python', angle: 315, radius: 145, category: 'data', label: 'Data' },
  { id: 'openai', name: 'AI & Agents', angle: 0, radius: 135, category: 'ai', label: 'AI & Automation' },
  { id: 'notion', name: 'Notion', angle: 45, radius: 145, category: 'tools', label: 'Productivity' },
  { id: 'canva', name: 'Canva', angle: 90, radius: 135, category: 'marketing', label: 'Marketing' },
  { id: 'drive', name: 'Workspace', angle: 135, radius: 145, category: 'tools', label: 'Workspace' },
  { id: 'figma', name: 'Figma', angle: 180, radius: 135, category: 'design', label: 'Design' },
  { id: 'github', name: 'GitHub', angle: 225, radius: 145, category: 'dev', label: 'Code & Git' },
];

/* ================= 6 CATEGORIES DATA ================= */
interface CategoryData {
  id: string;
  title: string;
  icon: React.ReactNode;
  toolCount: string;
  tools: string[];
}

const CATEGORIES: CategoryData[] = [
  {
    id: 'dev',
    title: 'Development',
    icon: <Code2 className="w-4 h-4 text-violet-600" />,
    toolCount: '8+ Tools',
    tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Python', 'Git & GitHub', 'REST APIs', 'Supabase'],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    icon: <Sparkles className="w-4 h-4 text-violet-600" />,
    toolCount: '6+ Tools',
    tools: ['ChatGPT', 'Claude', 'Google AI Studio', 'n8n', 'Make', 'Prompt Engineering', 'AI Agents'],
  },
  {
    id: 'design',
    title: 'Design & Creative',
    icon: <PenTool className="w-4 h-4 text-violet-600" />,
    toolCount: '6+ Tools',
    tools: ['Figma', 'UI/UX Design', 'Canva', 'Graphic Design', 'Web Design', 'Prototyping'],
  },
  {
    id: 'data',
    title: 'Data & Analytics',
    icon: <BarChart3 className="w-4 h-4 text-violet-600" />,
    toolCount: '5+ Tools',
    tools: ['Python', 'Pandas', 'NumPy', 'Data Analysis', 'Machine Learning', 'Visualization'],
  },
  {
    id: 'tools',
    title: 'Productivity & Tools',
    icon: <FolderKanban className="w-4 h-4 text-violet-600" />,
    toolCount: '6+ Tools',
    tools: ['Google Workspace', 'Notion', 'VS Code', 'Cursor', 'Slack', 'Terminal'],
  },
  {
    id: 'marketing',
    title: 'Marketing & Others',
    icon: <Megaphone className="w-4 h-4 text-violet-600" />,
    toolCount: '5+ Tools',
    tools: ['Content Writing', 'Social Media Marketing', 'CRM Management', 'SEO', 'Sales Funnels'],
  },
];

export const SkillsSection: React.FC = () => {
  const { reducedMotion: shouldReduceMotion, ambientMotion, pageVisible } = useSiteMotion();
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef, { amount: 0.1 });
  const animateOrbit = ambientMotion && pageVisible && inView;

  // Active category & hovered tech
  const [activeCategory, setActiveCategory] = useState<string>('dev');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Parallax subtle rotation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const orbitRotation = useTransform(scrollYProgress, [0, 1], animateOrbit ? [-12, 12] : [0, 0]);

  return (
    <AmbientSection
      id="skills"
      pattern="constellation"
      ref={containerRef}
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FAF9F6] border-t border-stroke/75 overflow-hidden"
    >
      {/* Placed cleanly on section main background without enclosing card wrappers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Skills & Tools" watermark="SKILLS">
          <span>Tools I Use to Build, Design and </span>
          <span className="text-violet-600">Innovate.</span>
        </SectionHeader>
        
        {/* Main 3-Column Layout: Left Narrative, Center Orbit, Right Category Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* ================= 1. LEFT COLUMN: HEADLINE, DESCRIPTION & STATS ================= */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
            <div>
              {/* Description */}
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-sm">
                A blend of technical, creative, and strategic skills that help me design, develop, and deliver meaningful digital experiences.
              </p>
            </div>

            {/* Bottom Stats & Direct CTA Button */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3.5">
              {/* 6+ Skill Areas */}
              <div className="px-3.5 py-2 rounded-xl bg-white border border-slate-300/80 shadow-xs flex items-center gap-2.5">
                <span className="text-lg font-black text-violet-700 font-mono">6+</span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-900 leading-tight">Skill Areas</span>
                  <span className="text-[9.5px] font-medium text-copy-secondary">Cross-domain</span>
                </div>
              </div>

              {/* Always Learning */}
              <div className="px-3.5 py-2 rounded-xl bg-white border border-slate-300/80 shadow-xs flex items-center gap-2.5">
                <span className="text-lg font-black text-violet-700 font-mono">∞</span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-900 leading-tight">Always Learning</span>
                  <span className="text-[9.5px] font-medium text-copy-secondary">Daily R&D</span>
                </div>
              </div>

              {/* Direct CTA */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-violet-600 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all hover:scale-105 active:scale-95 group cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* ================= 2. CENTER COLUMN: MQ ORBITAL PLANETARY SYSTEM ================= */}
          <div className="lg:col-span-4 flex items-center justify-center relative min-h-[360px] sm:min-h-[420px] select-none">
            
            {/* Ambient Center Glow */}
            <div className="absolute w-[320px] h-[320px] rounded-full bg-violet-200/40 blur-3xl pointer-events-none" />

            {/* Annotation Notes with Subtle Directional Arrows */}
            <div className="absolute top-1 left-2 hidden sm:flex items-center gap-1 text-violet-700/80 font-serif italic text-xs">
              <span>Build & Develop</span>
              <span className="text-sm font-sans not-italic">↗</span>
            </div>
            <div className="absolute top-1 right-2 hidden sm:flex items-center gap-1 text-violet-700/80 font-serif italic text-xs">
              <span>Automate & Create</span>
              <span className="text-sm font-sans not-italic">↘</span>
            </div>
            <div className="absolute bottom-1 left-2 hidden sm:flex items-center gap-1 text-violet-700/80 font-serif italic text-xs">
              <span>Design & Prototype</span>
              <span className="text-sm font-sans not-italic">↖</span>
            </div>
            <div className="absolute bottom-1 right-2 hidden sm:flex items-center gap-1 text-violet-700/80 font-serif italic text-xs">
              <span>Analyse & Grow</span>
              <span className="text-sm font-sans not-italic">↙</span>
            </div>

            {/* Orbital Rings Area */}
            <div className="skills-orbit relative w-[340px] h-[340px] shrink-0 flex items-center justify-center">
              
              {/* Concentric Orbital Circles with Parallax */}
              <motion.div
                style={{ rotate: orbitRotation }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {/* Inner Ring */}
                <div className="absolute w-[210px] h-[210px] rounded-full border border-violet-200/90" />
                {/* Outer Dashed Ring */}
                <div className="absolute w-[290px] h-[290px] rounded-full border border-dashed border-slate-300" />
              </motion.div>

              {/* Center "MQ" Core Glossy Sphere */}
              <motion.div
                animate={{
                  scale: animateOrbit ? [1, 1.04, 1] : 1,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : animateOrbit ? 4 : 0.2,
                  repeat: animateOrbit ? Infinity : 0,
                  ease: 'easeInOut',
                }}
                className="relative z-20 w-24 sm:w-26 h-24 sm:h-26 rounded-full bg-gradient-to-br from-violet-600 via-indigo-700 to-purple-950 flex flex-col items-center justify-center shadow-[0_10px_35px_-5px_rgba(124,58,237,0.5),0_0_20px_rgba(139,92,246,0.4)] ring-4 ring-white group"
              >
                {/* Specular Gloss Reflection on Sphere */}
                <div className="absolute top-1.5 left-2.5 w-11 h-5 rounded-full bg-white/40 blur-[1px] -rotate-30 pointer-events-none" />

                {/* Monogram */}
                <span className="text-2xl sm:text-3xl font-black text-white tracking-wider drop-shadow-md font-display">
                  MQ
                </span>
                <span className="text-[9px] font-mono font-bold tracking-widest text-violet-200 uppercase mt-0.5">
                  CORE
                </span>
              </motion.div>

              {/* ================= 8 FLOATING TECH TILES IN ORBIT ================= */}
              {ORBIT_ITEMS.map((item) => {
                const rad = (item.angle * Math.PI) / 180;
                const x = Math.round(Math.cos(rad) * item.radius);
                const y = Math.round(Math.sin(rad) * item.radius);

                const isCatActive = activeCategory === item.category;
                const isHovered = hoveredTech === item.id;
                const LogoComponent = TechLogos[item.id] || TechLogos.react;

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show ${item.name} skills`}
                    aria-pressed={isCatActive}
                    onClick={() => setActiveCategory(item.category)}
                    style={{
                      position: 'absolute',
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="group z-30 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600"
                    onMouseEnter={() => {
                      setHoveredTech(item.id);
                      setActiveCategory(item.category);
                    }}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    <motion.span
                      animate={{
                        y: animateOrbit ? [0, -3.5, 0] : 0,
                        scale: isCatActive || isHovered ? 1.15 : 1,
                      }}
                      transition={{
                        y: {
                          duration: shouldReduceMotion ? 0 : animateOrbit ? 2.8 + (item.angle % 3) * 0.4 : 0.2,
                          repeat: animateOrbit ? Infinity : 0,
                          ease: 'easeInOut',
                        },
                        scale: { duration: shouldReduceMotion ? 0 : 0.2 },
                      }}
                      className={`relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border transition-all duration-300 shadow-md ${
                        isCatActive || isHovered
                          ? 'border-violet-500 shadow-[0_8px_25px_-5px_rgba(124,58,237,0.45)] ring-2 ring-violet-400/40 z-40'
                          : 'border-stroke/90 hover:border-violet-400 hover:shadow-lg'
                      }`}
                      title={item.name}
                    >
                      <LogoComponent className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-transform duration-200 group-hover:scale-110" />
                    </motion.span>
                  </button>
                );
              })}

            </div>
          </div>

          {/* ================= 3. RIGHT COLUMN: CATEGORY ACCORDION STACK ================= */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <motion.div
                  key={cat.id}
                  layout={!shouldReduceMotion}
                  className={`premium-surface rounded-2xl border transition-colors duration-200 p-3 sm:p-3.5 ${
                    isActive
                      ? 'bg-white border-violet-500 shadow-[0_6px_25px_-8px_rgba(124,58,237,0.25)] ring-1 ring-violet-500/30'
                      : 'bg-white/90 border-stroke hover:border-slate-300 hover:bg-white shadow-xs'
                  }`}
                >
                  {/* Category Title Row */}
                  <h3>
                  <button
                    type="button"
                    id={`skill-trigger-${cat.id}`}
                    aria-expanded={isActive}
                    aria-controls={`skill-panel-${cat.id}`}
                    onClick={() => setActiveCategory(previous => previous === cat.id ? '' : cat.id)}
                    className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600"
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      {/* Icon */}
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                          isActive
                            ? 'bg-violet-50 border-violet-200 text-violet-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {cat.icon}
                      </span>

                      {/* Title */}
                      <span
                        className={`text-sm font-bold tracking-tight truncate ${
                          isActive ? 'text-violet-700' : 'text-slate-900'
                        }`}
                      >
                        {cat.title}
                      </span>
                    </span>

                    {/* Tool Count + Arrow */}
                    <span className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                          isActive
                            ? 'bg-violet-50 text-violet-700 border-violet-200'
                            : 'bg-slate-100 text-copy-secondary border-stroke'
                        }`}
                      >
                        {cat.toolCount}
                      </span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isActive ? 'rotate-90 text-violet-700' : 'text-copy-muted'
                        }`}
                      />
                    </span>
                  </button>
                  </h3>

                  {/* Expandable Skills Drawer */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={`skill-panel-${cat.id}`}
                        role="region"
                        aria-labelledby={`skill-trigger-${cat.id}`}
                        initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2.5 mt-2.5 border-t border-stroke/75 flex flex-wrap gap-1.5">
                          {cat.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-stroke/80 hover:bg-violet-50 hover:text-violet-900 hover:border-violet-200 transition-colors"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </AmbientSection>
  );
};

export default SkillsSection;
