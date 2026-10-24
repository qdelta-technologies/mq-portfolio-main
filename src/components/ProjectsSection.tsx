import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useInView
} from 'framer-motion';
import { 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Play,
  Sparkles,
  Shield,
  Brain,
  Palette,
  FileText,
  Rocket,
  Megaphone
} from 'lucide-react';
import { PROJECTS_LIST } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';
import { OptimizedImage } from './OptimizedImage';
import { AmbientSection } from './AmbientSection';
import { useSiteMotion } from './SiteMotion';

// Map icons for project brands
const getProjectIcon = (id: string) => {
  switch (id) {
    case 'wts-nova':
      return <Megaphone className="w-4 h-4 text-sky-600" />;
    case 'flowdesk':
      return <Sparkles className="w-4 h-4 text-violet-600" />;
    case 'gsa':
      return <Shield className="w-4 h-4 text-emerald-600" />;
    case 'sentiment-analyser':
      return <Brain className="w-4 h-4 text-purple-600" />;
    case 'fresh-laundry':
      return <Palette className="w-4 h-4 text-pink-600" />;
    case 'pretty-good-pdf':
      return <FileText className="w-4 h-4 text-amber-600" />;
    case 'qdelta':
      return <Rocket className="w-4 h-4 text-blue-600" />;
    default:
      return <Sparkles className="w-4 h-4 text-violet-600" />;
  }
};

/* ================= 3D TILT CARD COMPONENT (Requirement 1) ================= */
interface TiltCardProps {
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
  onClick?: () => void;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, isActive, className = '', onClick }) => {
  const { reducedMotion: shouldReduceMotion, ambientMotion } = useSiteMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Framer Motion spring physics for tilt
  const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || shouldReduceMotion || !ambientMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={isActive && ambientMotion ? { scale: 1.025 } : {}}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`relative w-full h-full transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { reducedMotion: shouldReduceMotion, pageVisible } = useSiteMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInView = useInView(carouselRef, { amount: 0.2 });

  // Feature the newest project first, while keeping the full carousel intact.
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const total = PROJECTS_LIST.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselInView || !pageVisible) return;
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total, carouselInView, pageVisible]);

  // Gentle autoplay with pause on hover
  useEffect(() => {
    if (isHovered || shouldReduceMotion || !pageVisible || !carouselInView) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered, shouldReduceMotion, currentIndex, pageVisible, carouselInView]);

  return (
    <AmbientSection
      id="projects"
      pattern="studio"
      className="relative w-full py-16 sm:py-20 lg:py-28 bg-[#FAF9F6] border-t border-stroke/75 overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Selected Projects" watermark="PROJECTS">
          <span>Ideas Built into </span>
          <span className="text-violet-600">Real Products.</span>
        </SectionHeader>
        
        {/* Center the existing carousel beneath the section heading. */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="relative w-full">
            <div className="relative w-full">
                {/* 3D Perspective Stage */}
                <div
                  ref={carouselRef}
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="Selected projects"
                  className="relative h-[420px] sm:h-[480px] md:h-[510px] w-full flex items-center justify-center"
                  style={{ perspective: 1200 }}
                >
                  {PROJECTS_LIST.map((project, idx) => {
                    // Calculate circular relative offset (-1 = left peek, 0 = center active, 1 = right peek)
                    let offset = idx - currentIndex;
                    // Handle circular wrapping for seamless experience
                    if (offset > total / 2) offset -= total;
                    if (offset < -total / 2) offset += total;

                    const isCenter = offset === 0;
                    const isLeft = offset === -1;
                    const isRight = offset === 1;
                    const isVisible = Math.abs(offset) <= 1;

                    // Compute dynamic transform styles for 3D stack
                    let xOffset = '0%';
                    let scale = 1;
                    let rotateZ = 0;
                    let rotateY = 0;
                    let opacity = 1;
                    let zIndex = 30;
                    let blur = 'blur(0px)';

                    if (isCenter) {
                      xOffset = '0%';
                      scale = 1.02;
                      rotateZ = 0;
                      rotateY = 0;
                      opacity = 1;
                      zIndex = 30;
                      blur = 'blur(0px)';
                    } else if (isLeft) {
                      xOffset = '-64%';
                      scale = 0.88;
                      rotateZ = -4.5;
                      rotateY = 8;
                      opacity = 0.82;
                      zIndex = 20;
                      blur = 'blur(0.5px)';
                    } else if (isRight) {
                      xOffset = '64%';
                      scale = 0.88;
                      rotateZ = 4.5;
                      rotateY = -8;
                      opacity = 0.82;
                      zIndex = 20;
                      blur = 'blur(0.5px)';
                    } else {
                      xOffset = offset < 0 ? '-110%' : '110%';
                      scale = 0.75;
                      opacity = 0;
                      zIndex = 10;
                      blur = 'blur(4px)';
                    }

                    return (
                      <motion.div
                        key={project.id}
                        initial={false}
                        animate={{
                          x: xOffset,
                          scale,
                          rotate: rotateZ,
                          rotateY,
                          opacity,
                          filter: blur,
                        }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0.2 }
                            : { type: 'spring', stiffness: 240, damping: 26, mass: 0.8 }
                        }
                        style={{
                          position: 'absolute',
                          zIndex,
                          pointerEvents: isVisible ? 'auto' : 'none',
                        }}
                        className="w-[285px] sm:w-[350px] md:w-[390px] cursor-pointer"
                        onClick={() => {
                          if (isLeft) handlePrev();
                          if (isRight) handleNext();
                        }}
                      >
                        {/* Tilt Interaction on the Card */}
                        <TiltCard isActive={isCenter}>
                          <div
                            className={`group relative rounded-[26px] bg-white border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                              isCenter
                                ? 'border-slate-300/80 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18),0_10px_30px_-10px_rgba(124,58,237,0.22)] ring-1 ring-slate-900/5'
                                : 'border-stroke shadow-md hover:border-slate-300'
                            }`}
                          >
                            {/* Card Top: Visual Media Container */}
                            <div className="relative w-full aspect-[16/10.5] overflow-hidden bg-slate-900">
                              <OptimizedImage
                                src={project.image}
                                sizes="(min-width: 768px) 390px, (min-width: 640px) 350px, 285px"
                                alt={project.title}
                                className={`w-full h-full object-cover object-top transition-transform duration-500 ease-out ${
                                  isCenter ? 'group-hover:scale-105' : 'scale-100'
                                }`}
                                loading="lazy"
                              />

                              {/* Featured Project Badge (Only on center card or if active) */}
                              {isCenter && (
                                <div className="absolute top-3 left-3 z-20">
                                  <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white bg-slate-950/70 backdrop-blur-md border border-white/20 shadow-xs">
                                    Featured Project
                                  </span>
                                </div>
                              )}

                              {/* Circular Play / Preview Button on Visual */}
                              {isCenter && (
                                <a
                                  href={project.link}
                                  tabIndex={isCenter ? 0 : -1}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute bottom-3 right-3 z-20 w-11 h-11 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 hover:bg-violet-600 hover:text-white transition-all duration-200"
                                  aria-label={`Open ${project.title}`}
                                  title="View Project Live"
                                >
                                  <Play className="w-4 h-4 fill-current ml-0.5" />
                                </a>
                              )}

                              {/* Subtle Vignette Gradient for Depth */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Card Bottom: Metadata & Content matching Image 1 */}
                            <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
                              <div>
                                {/* Row: App Icon + Name + External Link Icon */}
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-6 h-6 rounded-lg bg-violet-50 flex items-center justify-center border border-violet-100">
                                      {getProjectIcon(project.id)}
                                    </div>
                                    <span className="text-xs font-bold text-slate-700">
                                      {project.title.split('–')[0].trim()}
                                    </span>
                                  </div>

                                  {/* External Link */}
                                  <a
                                    href={project.link}
                                    tabIndex={isCenter ? 0 : -1}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-1 rounded-md text-copy-muted hover:text-violet-700 hover:bg-slate-100 transition-colors"
                                    aria-label="Visit external project site"
                                  >
                                    <ArrowUpRight className="w-4 h-4" />
                                  </a>
                                </div>

                                {/* Full Project Title */}
                                <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight leading-snug line-clamp-1 mb-1.5 font-display">
                                  {project.title}
                                </h3>

                                {/* Project Description */}
                                <p className="text-xs sm:text-[13px] text-copy-secondary font-medium leading-relaxed line-clamp-2 mb-3.5">
                                  {project.description}
                                </p>
                              </div>

                              {/* Technology Tag Pills */}
                              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                {project.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-stroke/80 group-hover:bg-violet-50 group-hover:text-violet-800 transition-colors"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TiltCard>
                      </motion.div>
                    );
                  })}
                </div>

                {/* ================= REQUIREMENT 4: CAROUSEL NAVIGATION CONTROLS ================= */}
                <div className="mt-6 flex items-center justify-center gap-6">
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-full bg-white border border-slate-300/80 hover:border-violet-500 hover:text-violet-700 text-slate-700 flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer"
                    aria-label="Previous Project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Elongated Pill Pagination Indicators matching Image 1 */}
                  <div className="flex items-center gap-2">
                    {PROJECTS_LIST.map((_, dotIdx) => {
                      const isActiveDot = currentIndex === dotIdx;
                      return (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => setCurrentIndex(dotIdx)}
                          className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            isActiveDot
                              ? 'w-7 sm:w-8 bg-violet-600'
                              : 'w-3 sm:w-4 bg-slate-300 hover:bg-slate-400'
                          }`}
                          aria-label={`Jump to project ${dotIdx + 1}`}
                          aria-current={isActiveDot ? 'true' : undefined}
                        />
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-9 h-9 rounded-full bg-white border border-slate-300/80 hover:border-violet-500 hover:text-violet-700 text-slate-700 flex items-center justify-center shadow-xs active:scale-95 transition-all cursor-pointer"
                    aria-label="Next Project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
          </div>

        </div>

      </div>
    </AmbientSection>
  );
};

export default ProjectsSection;
