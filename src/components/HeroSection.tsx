import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { HeroMetrics } from './HeroMetrics';
import { HeroSocialLinks } from './HeroSocialLinks';
import { OptimizedImage } from './OptimizedImage';
import { PERSONAL_INFO } from '../data/portfolioData';

const ROLES = [
  'Designer',
  'Developer',
  'Marketer',
  'Researcher',
  'AI Generalist',
];

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete || shouldReduceMotion) return;

    const currentWord = ROLES[roleIndex];
    const isLastWord = roleIndex === ROLES.length - 1;

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // Typing phase
      if (displayedText.length < currentWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 45); // Snappy, fluid typing speed (no sluggishness)
      } else {
        // Current word is fully typed
        if (isLastWord) {
          // Permanently finish on "AI Generalist"
          timer = setTimeout(() => {
            setIsComplete(true);
          }, 350);
        } else {
          // Natural reading pause before backspacing
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 850);
        }
      }
    } else {
      // Deleting phase
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, 22); // Fast, effortless backspacing
      } else {
        // Word cleared: brief breathing pause then begin next role
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => prev + 1);
        }, 120);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, isComplete, shouldReduceMotion]);

  return (
    <section
      id="about"
      className="hero-section w-full relative isolate overflow-hidden"
    >
      {/* ================= BACKGROUND AMBIENT DECORATIVE ACCENTS & FINE GRID ================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
        {/* Soft Ethereal Lavender, Pale-Violet & Warm Ambient Glows */}
        <div className="absolute top-[20%] right-[12%] w-[580px] h-[580px] bg-violet-300/35 rounded-full blur-3xl opacity-80" />
        <div className="absolute top-[35%] left-[8%] w-[520px] h-[520px] bg-amber-100/50 rounded-full blur-3xl opacity-75" />
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[640px] bg-purple-200/35 rounded-full blur-3xl opacity-70" />

        {/* Fine Low-Contrast Grid Pattern with Smooth Radial Vignette Mask */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(100, 116, 139, 0.20) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(100, 116, 139, 0.20) 1px, transparent 1px)
            `,
            backgroundSize: '44px 44px',
            maskImage: 'radial-gradient(ellipse 85% 75% at 50% 45%, black 45%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 45%, black 45%, transparent 95%)',
          }}
        />
      </div>

      {/* Headline stays centered without absolutely positioned greeting text. */}
      <div className="hero-heading relative z-10 text-center flex flex-col items-center">
        <motion.span
          initial={false}
          animate={{ y: shouldReduceMotion ? 0 : [0, -3, 0] }}
          transition={{ duration: 2.8, repeat: shouldReduceMotion ? 0 : Infinity, ease: 'easeInOut' }}
          className="mb-2.5 text-xs sm:text-sm font-bold text-copy-secondary tracking-tight"
        >
          Hi, there!
        </motion.span>
        <h1 className="text-[clamp(2rem,10vw,2.75rem)] sm:text-5xl lg:text-[clamp(3.5rem,5vw,4.5rem)] font-extrabold tracking-tight text-slate-950 leading-[1.08] text-balance">
          <span>I'm</span>{' '}
          <span
            className="text-violet-600"
            style={{
              WebkitTextStroke: '1px #0f172a',
              paintOrder: 'stroke fill',
            }}
          >
            Mohammed Qais
          </span>
        </h1>

        {/* Buttery Smooth Typewriter Subtitle */}
        <div className="mt-2.5 sm:mt-3 h-8 sm:h-9 flex items-center justify-center">
          <div className="inline-flex items-center text-base sm:text-lg md:text-xl font-bold text-slate-800 tracking-tight">
            <span className="sr-only">{PERSONAL_INFO.title}</span>
            <span aria-hidden="true">{shouldReduceMotion ? PERSONAL_INFO.title : displayedText}</span>
            <span
              className={`inline-block w-[2.5px] h-5 sm:h-6 bg-violet-600 ml-1 rounded-full transition-opacity duration-300 ${
                isComplete || shouldReduceMotion ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-pulse'
              }`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* The intro follows normal grid flow at every breakpoint. */}
      <div className="hero-intro relative z-20">
        {/* Availability badge leads the left-side content. */}
        <div className="hero-availability inline-flex max-w-full items-center gap-2.5 px-3 sm:px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-stroke/80 shadow-xs ring-1 ring-slate-900/5 text-left">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600 ring-2 ring-emerald-100" />
          </span>
          <span className="text-[11px] md:text-xs xl:text-sm font-bold text-slate-900 tracking-tight leading-relaxed">
            {PERSONAL_INFO.statusText}
          </span>
        </div>

        {/* Intro paragraph with Frosted Glass Text Effect */}
        <p
          className="text-sm md:text-base xl:text-lg font-semibold leading-relaxed max-w-md"
          style={{
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 1) 0%, rgba(51, 65, 85, 0.95) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0px 1px 1px rgba(255, 255, 255, 0.85))',
          }}
        >
          {PERSONAL_INFO.intro}
        </p>

        {/* Dual Action CTAs: Reduced Size, Same Dimensions Side-by-Side with Shiny Glass Styling */}
        <div className="hero-actions flex items-center gap-2.5 xl:gap-3 w-full max-w-[370px] pt-1">
          <a
            href="#projects"
            className="relative flex-1 min-w-0 h-11 px-2.5 md:px-3 xl:px-4 rounded-full overflow-hidden bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 text-white font-bold text-xs md:text-sm border border-white/25 shadow-[0_4px_16px_rgba(15,23,42,0.35),inset_0_1.5px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(0,0,0,0.6)] hover:border-white/45 hover:shadow-[0_6px_20px_rgba(15,23,42,0.45),inset_0_1.5px_1px_rgba(255,255,255,0.8)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 transition-all duration-200 group flex items-center justify-center whitespace-nowrap"
          >
            {/* Top Gloss Arc Reflection */}
            <span className="absolute inset-x-2 top-0.5 h-[46%] rounded-t-full bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none" />
            
            {/* Dynamic Moving Shiny Light Beam */}
            <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
              <span className="absolute inset-y-0 w-3/5 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shine" />
            </span>

            {/* Button Label & Icon */}
            <span className="relative z-10 flex items-center justify-center gap-1.5 tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <span>{PERSONAL_INFO.primaryCta}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>

          <a
            href="#contact"
            className="relative flex-1 min-w-0 h-11 px-2.5 md:px-3 xl:px-4 rounded-full overflow-hidden bg-gradient-to-b from-violet-600 via-violet-700 to-violet-800 text-white font-bold text-xs md:text-sm border border-violet-500 shadow-[0_4px_14px_rgba(118,49,229,0.25),inset_0_1.5px_1px_rgba(255,255,255,0.3)] hover:border-violet-400 hover:shadow-[0_6px_20px_rgba(118,49,229,0.35)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600 transition-all duration-200 group flex items-center justify-center whitespace-nowrap"
          >
            {/* Top Gloss Arc Reflection */}
            <span className="absolute inset-x-2 top-0.5 h-[46%] rounded-t-full bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none" />

            {/* Dynamic Moving Shiny Light Beam */}
            <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
              <span className="absolute inset-y-0 w-3/5 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shine" />
            </span>

            {/* Button Label & Icon */}
            <span className="relative z-10 flex items-center justify-center gap-1.5 tracking-tight text-white drop-shadow-[0_1px_1px_rgba(46,16,101,0.4)]">
              <Mail className="w-3.5 h-3.5 shrink-0 text-white" />
              <span>{PERSONAL_INFO.secondaryCta}</span>
            </span>
          </a>
        </div>
        <HeroSocialLinks />
      </div>

      {/* Statistics are shown only in the desktop/laptop hero layout. */}
      <div className="hero-metrics relative z-20">
        <HeroMetrics />
      </div>

      {/* Portrait stays in its own grid area and meets the ticker without a gap. */}
      <div className="hero-portrait relative z-10">
        <OptimizedImage
          src={PERSONAL_INFO.portraitSrc}
          sizes="(min-width: 1412px) and (hover: hover) and (pointer: fine) 480px, (min-width: 1280px) and (hover: hover) and (pointer: fine) 34vw, (min-width: 892px) 410px, (min-width: 640px) calc((100vw - 72px) / 2), 280px"
          alt={`${PERSONAL_INFO.name} — AI Generalist`}
          className="block w-full h-auto object-contain object-bottom align-bottom drop-shadow-md select-none"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </section>
  );
};

export default HeroSection;
