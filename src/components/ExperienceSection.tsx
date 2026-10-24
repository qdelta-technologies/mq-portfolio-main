import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { 
  Laptop, 
  Building2, 
  Brain, 
  Users, 
  Rocket, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { EXPERIENCE_SECTION_DATA, EXPERIENCE_LIST, ExperienceItem } from '../data/portfolioData';

// Map icon for each experience role
const getExperienceIcon = (id: string, isCurrent: boolean) => {
  const iconClass = isCurrent
    ? 'w-4.5 h-4.5 text-violet-400 group-hover:text-violet-300 transition-colors'
    : 'w-4.5 h-4.5 text-slate-300 group-hover:text-violet-300 transition-colors';

  switch (id) {
    case 'freelance-dev':
      return <Laptop className={iconClass} />;
    case 'gsa-intern':
      return <Building2 className={iconClass} />;
    case 'codtech-intern':
      return <Brain className={iconClass} />;
    case 'wts-nova':
      return <Users className={iconClass} />;
    case 'qdelta-founder':
      return <Rocket className={iconClass} />;
    default:
      return <Sparkles className={iconClass} />;
  }
};

export const ExperienceSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<string | null>('qdelta-founder');

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax vertical drift for decorative ambient glow & left block
  const leftColY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-18, 18]);
  const glowY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-35, 35]);
  const timelineProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full py-10 sm:py-12 lg:py-16 bg-[#FAF9F6] border-t border-slate-200/60 overflow-hidden"
    >
      {/* Extended width dragged near screen edges */}
      <div className="w-[calc(100%-1.25rem)] sm:w-[calc(100%-2rem)] lg:w-[calc(100%-3rem)] max-w-[1680px] mx-auto">
        
        {/* ================= REFINED BALANCED DARK MATTE CONTAINER ================= */}
        <div className="relative rounded-2xl sm:rounded-[22px] bg-[#0A0E1A] border border-slate-800/90 shadow-[0_25px_70px_-15px_rgba(2,6,23,0.65)] p-4 sm:p-6 lg:py-6 lg:px-8 overflow-hidden">
          
          {/* Subtle Ambient Parallax Radial Lighting */}
          <motion.div
            style={{ y: glowY }}
            className="absolute -top-24 -left-24 w-[480px] h-[480px] bg-gradient-to-br from-violet-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none rounded-full"
          />
          <motion.div
            style={{ y: leftColY }}
            className="absolute -bottom-24 -right-24 w-[520px] h-[520px] bg-gradient-to-tl from-violet-900/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none rounded-full"
          />

          {/* Grid Layout: Left Heading Block, Central Timeline Line, Right Experience Rows */}
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch gap-6 lg:gap-5 xl:gap-6">
            
            {/* ================= LEFT COLUMN: HEADING & BRAND STORY ================= */}
            <motion.div
              style={{ y: leftColY }}
              className="lg:w-[260px] xl:w-[290px] flex flex-col justify-between shrink-0 py-1"
            >
              <div>
                {/* Eyebrow with Violet Dash */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4.5 h-0.5 bg-violet-500 rounded-full" />
                  <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
                    {EXPERIENCE_SECTION_DATA.label}
                  </span>
                </div>

                {/* Section Main Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-black text-white tracking-tight leading-[1.1] mb-2.5 font-display">
                  <span>{EXPERIENCE_SECTION_DATA.headingPrefix}</span>
                  <span className="text-violet-400">{EXPERIENCE_SECTION_DATA.headingHighlight}</span>
                </h2>

                {/* Subtitle / Description */}
                <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed max-w-[270px]">
                  {EXPERIENCE_SECTION_DATA.description}
                </p>
              </div>

              {/* Decorative Lower Flourish / Impact Badge */}
              <div className="mt-6 lg:mt-8 pt-4 border-t border-slate-800/80">
                <div className="relative mb-2 flex items-center gap-2">
                  <svg
                    className="w-20 h-5 text-violet-500/40"
                    viewBox="0 0 100 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M 0,18 C 25,2 35,22 60,6 C 75,-4 85,20 100,12" strokeLinecap="round" />
                  </svg>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                    Timeline
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-white tracking-tight">Focus</span>
                  <p className="text-[11px] text-slate-400 font-mono tracking-wider uppercase leading-tight">
                    Roles • Purpose • Impact
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ================= CENTER COLUMN: LUMINOUS VERTICAL TIMELINE LINE ================= */}
            <div className="hidden lg:flex flex-col items-center justify-between py-3 px-1.5 relative shrink-0">
              {/* Static Background Track Line */}
              <div className="absolute top-4 bottom-4 w-[2px] bg-slate-800/80" />

              {/* Dynamic Parallax Scroll Fill Line */}
              <motion.div
                style={{ scaleY: timelineProgress, originY: 0 }}
                className="absolute top-4 bottom-4 w-[2px] bg-gradient-to-b from-violet-500 via-indigo-400 to-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.7)]"
              />

              {/* Glowing Dots Aligned with Each Card Row */}
              {EXPERIENCE_LIST.map((item) => {
                const isCurrent = item.id === 'qdelta-founder';
                const isSelected = activeItem === item.id;

                return (
                  <div
                    key={`node-${item.id}`}
                    className="relative z-10 my-auto flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-125"
                    onClick={() => setActiveItem(item.id)}
                  >
                    {isCurrent ? (
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-4 h-4 rounded-full bg-violet-500 animate-ping opacity-60" />
                        <span className="w-3 h-3 rounded-full bg-violet-400 border border-[#0A0E1A] shadow-[0_0_12px_rgba(168,85,247,1)] ring-2 ring-violet-500/50" />
                      </div>
                    ) : (
                      <div
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-violet-300 ring-2 ring-violet-900/80 shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                            : 'bg-slate-300/90 ring-2 ring-slate-900 shadow-[0_0_6px_rgba(255,255,255,0.4)] hover:bg-white'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* ================= RIGHT COLUMN: BALANCED FORMATTED EXPERIENCE ROWS ================= */}
            <div className="flex-1 flex flex-col justify-between gap-2 sm:gap-2.5">
              {EXPERIENCE_LIST.map((item: ExperienceItem, index: number) => {
                const isCurrent = item.id === 'qdelta-founder';
                const isSelected = activeItem === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.4,
                      delay: shouldReduceMotion ? 0 : index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onMouseEnter={() => setActiveItem(item.id)}
                    className={`group relative rounded-xl border transition-all duration-200 py-2.5 px-3.5 sm:py-3 sm:px-4 cursor-pointer select-none ${
                      isCurrent
                        ? 'bg-[#11172B]/95 border-violet-500/50 shadow-[0_8px_30px_-8px_rgba(124,58,237,0.32)]'
                        : isSelected
                        ? 'bg-[#111628]/95 border-slate-700 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.5)]'
                        : 'bg-[#0E1322]/90 border-slate-800/80 hover:bg-[#12182B] hover:border-slate-700/80'
                    }`}
                  >
                    {/* Inner Content Layout: Desktop Multi-Column Row & Mobile Adaptive Stacking */}
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
                      
                      {/* Left Block: Number Badge, Period & Location, Icon, Role & Organization */}
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
                        
                        {/* 1. Number Badge (01 - 05) */}
                        <div
                          className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center text-xs sm:text-[13px] font-mono font-black shrink-0 transition-all duration-200 ${
                            isCurrent
                              ? 'bg-violet-600 text-white shadow-[0_0_18px_rgba(139,92,246,0.7)] ring-1.5 ring-violet-400/50'
                              : 'bg-white text-slate-950 shadow-xs group-hover:scale-105'
                          }`}
                        >
                          {item.step}
                        </div>

                        {/* 2. Period & Location */}
                        <div className="w-26 sm:w-30 xl:w-34 shrink-0">
                          <p className="text-xs sm:text-[12.5px] font-bold text-white tracking-tight leading-tight">
                            {item.period}
                          </p>
                          <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                            {item.location || 'Remote'}
                          </p>
                        </div>

                        {/* 3. Icon Box */}
                        <div
                          className={`w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-200 ${
                            isCurrent
                              ? 'bg-violet-950/70 border-violet-500/50 shadow-xs'
                              : 'bg-slate-800/60 border-slate-700/60 group-hover:border-violet-500/40 group-hover:bg-slate-800'
                          }`}
                        >
                          {getExperienceIcon(item.id, isCurrent)}
                        </div>

                        {/* 4. Role Title & Organization */}
                        <div className="min-w-[170px] sm:w-50 xl:w-56 shrink-0">
                          <h3
                            className={`text-xs sm:text-sm font-bold tracking-tight transition-colors line-clamp-1 ${
                              isCurrent
                                ? 'text-violet-300'
                                : 'text-white group-hover:text-violet-300'
                            }`}
                          >
                            {item.role}
                          </h3>
                          <p className="text-[11.5px] text-slate-400 font-medium mt-0.5 line-clamp-1">
                            {item.organization}
                          </p>
                        </div>
                      </div>

                      {/* Right Block: Description & Action Arrow */}
                      <div className="flex items-center justify-between xl:justify-end gap-3.5 flex-1">
                        {/* Description */}
                        <p className="text-xs sm:text-[12.5px] text-slate-400 font-normal leading-relaxed max-w-xl line-clamp-1 xl:line-clamp-2">
                          {item.description}
                        </p>

                        {/* Circular Action Button */}
                        <div
                          className={`w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border transition-all duration-200 shrink-0 ${
                            isCurrent
                              ? 'bg-violet-600 border-violet-500 text-white shadow-xs'
                              : 'bg-slate-800/80 border-slate-700/70 text-slate-400 group-hover:bg-violet-600 group-hover:border-violet-500 group-hover:text-white'
                          }`}
                          aria-label={`View details for ${item.role}`}
                        >
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
