import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { HeroMetrics } from './HeroMetrics';
import { HeroSocialLinks } from './HeroSocialLinks';
import { OptimizedImage } from './OptimizedImage';
import { HeroAmbient } from './HeroAmbient';
import { HeroMagneticLink } from './HeroMagneticLink';
import { useHeroMotion } from '../hooks/useHeroMotion';
import { PERSONAL_INFO } from '../data/portfolioData';
import { HeroRole } from './HeroRole';

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { shouldReduceMotion, isDesktop, isVisible, interactiveMotion } = useHeroMotion(heroRef);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const [portraitReady, setPortraitReady] = useState(false);

  useEffect(() => {
    if (!interactiveMotion) { pointerX.set(0); pointerY.set(0); }
  }, [interactiveMotion, pointerX, pointerY]);

  const reveal = (delay: number) => ({
    initial: shouldReduceMotion ? false as const : { opacity: 0, y: isDesktop ? 8 : 0 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: shouldReduceMotion ? 0 : isDesktop ? 0.5 : 0.32,
      delay: shouldReduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

  return (
    <section
      id="about"
      ref={heroRef}
      className="hero-section w-full relative isolate overflow-hidden"
      data-motion-mode={shouldReduceMotion ? 'reduced' : interactiveMotion ? 'desktop' : 'subtle'}
      data-motion-paused={!isVisible || shouldReduceMotion}
      onPointerMove={interactiveMotion ? event => {
        if (event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointerX.set(Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2)));
        pointerY.set(Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2)));
      } : undefined}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}
    >
      <HeroAmbient active={interactiveMotion} heroRef={heroRef} pointerX={pointerX} pointerY={pointerY} />

      {/* Desktop greeting sits over “I'm”; mobile/tablet keep the centered greeting. */}
      <div className="hero-heading relative z-10 text-center flex flex-col items-center">
        <span
          className="hero-greeting mb-2.5 text-xs sm:text-sm font-bold text-copy-secondary tracking-tight"
        >
          Hi, there!
        </span>
        <h1 className="text-[clamp(2rem,10vw,2.75rem)] sm:text-5xl lg:text-[clamp(3.5rem,5vw,4.5rem)] font-extrabold tracking-tight text-slate-950 leading-[1.08] text-balance">
          <span className="relative inline-block">
            <span className="hero-desktop-greeting" aria-hidden="true">Hi, there!</span>
            I'm
          </span>{' '}
          <motion.span
            className="text-violet-600"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: 'easeOut' }}
            style={{
              WebkitTextStroke: '1px #0f172a',
              paintOrder: 'stroke fill',
            }}
          >
            Mohammed Qais
          </motion.span>
        </h1>

        {/* Buttery Smooth Typewriter Subtitle */}
        <HeroRole reducedMotion={shouldReduceMotion} visible={isVisible} />
      </div>

      {/* The intro follows normal grid flow at every breakpoint. */}
      <div className="hero-intro relative z-20">
        {/* Availability badge leads the left-side content. */}
        <motion.div {...reveal(0.06)} className="hero-availability inline-flex max-w-full items-center gap-2.5 px-3 sm:px-4 py-2 rounded-full bg-violet-600/15 backdrop-blur-md border border-violet-500/35 shadow-xs shadow-violet-900/10 text-left">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-80" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-600 ring-2 ring-violet-300/40" />
          </span>
          <span className="text-[11px] md:text-xs xl:text-sm font-bold text-violet-950 tracking-tight leading-relaxed">
            {PERSONAL_INFO.statusText}
          </span>
        </motion.div>

        {/* Intro paragraph with Frosted Glass Text Effect */}
        <motion.p
          {...reveal(0.12)}
          className="text-sm md:text-base xl:text-lg font-semibold leading-relaxed max-w-md"
          style={{
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 1) 0%, rgba(51, 65, 85, 0.95) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0px 1px 1px rgba(255, 255, 255, 0.85))',
          }}
        >
          {PERSONAL_INFO.intro}
        </motion.p>

        {/* Dual Action CTAs: Reduced Size, Same Dimensions Side-by-Side with Shiny Glass Styling */}
        <motion.div {...reveal(0.2)} className="hero-actions flex items-center gap-2.5 xl:gap-3 w-full max-w-[370px] pt-1">
          <HeroMagneticLink
            magnetic={interactiveMotion}
            href="#projects"
            className="relative flex-1 min-w-0 h-11 px-2.5 md:px-3 xl:px-4 rounded-full overflow-hidden bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 text-white font-bold text-xs md:text-sm border border-white/25 shadow-[0_4px_16px_rgba(15,23,42,0.35),inset_0_1.5px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(0,0,0,0.6)] hover:border-white/45 hover:shadow-[0_6px_20px_rgba(15,23,42,0.45),inset_0_1.5px_1px_rgba(255,255,255,0.8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 transition-[border-color,box-shadow] duration-200 group flex items-center justify-center whitespace-nowrap"
          >
            {/* Top Gloss Arc Reflection */}
            <span className="absolute inset-x-2 top-0.5 h-[46%] rounded-t-full bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none" />
            
            {/* Dynamic Moving Shiny Light Beam */}
            <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
              <span className="hero-button-sheen absolute inset-y-0 w-3/5 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </span>

            {/* Button Label & Icon */}
            <span className="relative z-10 flex items-center justify-center gap-1.5 tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              <span>{PERSONAL_INFO.primaryCta}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </HeroMagneticLink>

          <HeroMagneticLink
            magnetic={interactiveMotion}
            href="#contact"
            className="relative flex-1 min-w-0 h-11 px-2.5 md:px-3 xl:px-4 rounded-full overflow-hidden bg-gradient-to-b from-violet-600 via-violet-700 to-violet-800 text-white font-bold text-xs md:text-sm border border-violet-500 shadow-[0_4px_14px_rgba(118,49,229,0.25),inset_0_1.5px_1px_rgba(255,255,255,0.3)] hover:border-violet-400 hover:shadow-[0_6px_20px_rgba(118,49,229,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600 transition-[border-color,box-shadow] duration-200 group flex items-center justify-center whitespace-nowrap"
          >
            {/* Top Gloss Arc Reflection */}
            <span className="absolute inset-x-2 top-0.5 h-[46%] rounded-t-full bg-gradient-to-b from-white/15 via-white/5 to-transparent pointer-events-none" />

            {/* Dynamic Moving Shiny Light Beam */}
            <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
              <span className="hero-button-sheen absolute inset-y-0 w-3/5 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </span>

            {/* Button Label & Icon */}
            <span className="relative z-10 flex items-center justify-center gap-1.5 tracking-tight text-white drop-shadow-[0_1px_1px_rgba(46,16,101,0.4)]">
              <Mail className="w-3.5 h-3.5 shrink-0 text-white" />
              <span>{PERSONAL_INFO.secondaryCta}</span>
            </span>
          </HeroMagneticLink>
        </motion.div>
        <HeroSocialLinks motionEnabled={interactiveMotion} reducedMotion={shouldReduceMotion} />
      </div>

      {/* Statistics are shown only in the desktop/laptop hero layout. */}
      <div className="hero-metrics relative z-20">
        <HeroMetrics motionEnabled={interactiveMotion} reducedMotion={shouldReduceMotion} />
      </div>

      {/* Portrait stays in its own grid area and meets the ticker without a gap. */}
      <div className="hero-portrait relative z-10">
        <motion.div
          className="w-full"
          initial={false}
          animate={{
            opacity: shouldReduceMotion || portraitReady ? 1 : 0,
            y: shouldReduceMotion || portraitReady ? 0 : isDesktop ? 12 : 6,
            scale: portraitReady || !isDesktop || shouldReduceMotion ? 1 : 0.98,
          }}
          transition={{ duration: shouldReduceMotion ? 0 : isDesktop ? 0.8 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '50% 100%' }}
        >
          <OptimizedImage
            src={PERSONAL_INFO.portraitSrc}
            sizes="(min-width: 1412px) and (hover: hover) and (pointer: fine) 480px, (min-width: 1280px) and (hover: hover) and (pointer: fine) 34vw, (min-width: 892px) 410px, (min-width: 640px) calc((100vw - 72px) / 2), 240px"
            alt={`${PERSONAL_INFO.name} — AI Generalist`}
            className="block w-full h-auto object-contain object-bottom align-bottom drop-shadow-md select-none"
            loading="eager"
            fetchPriority="high"
            onLoad={() => setPortraitReady(true)}
            onError={() => setPortraitReady(true)}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
