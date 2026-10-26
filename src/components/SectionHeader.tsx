import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSiteMotion } from './SiteMotion';

interface SectionHeaderProps {
  label: string;
  watermark: string;
  children: React.ReactNode;
}

/** Shared Services-style heading, kept above each section's content layout. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ label, watermark, children }) => {
  const { reducedMotion } = useSiteMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const word = watermarkRef.current;
    if (!header || !word) return;

    let active = true;
    const fitWordmark = () => {
      if (!active) return;
      const availableWidth = Math.max(0, header.clientWidth - 24);
      const naturalWidth = word.offsetWidth;
      const scale = naturalWidth > 0 ? Math.min(1, availableWidth / naturalWidth) : 1;
      const transform = `scaleX(${scale})`;
      if (word.style.transform !== transform) word.style.transform = transform;
    };

    fitWordmark();
    const observer = new ResizeObserver(fitWordmark);
    observer.observe(header);
    document.fonts?.ready.then(fitWordmark);
    return () => { active = false; observer.disconnect(); };
  }, [watermark]);

  return (
  <motion.div
    ref={headerRef}
     className="section-header relative isolate flex flex-col items-center py-4 sm:py-5 text-center mb-8 sm:mb-10"
    style={{ containerType: 'inline-size' }}
    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="relative flex items-center justify-center gap-2 mb-1 sm:mb-1.5">
      <span aria-hidden="true" className="w-1.5 h-1.5 shrink-0 bg-violet-600 rounded-[2px]" />
      <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-wide">{label}</span>
      <span aria-hidden="true" className="w-1.5 h-1.5 shrink-0 bg-violet-600 rounded-[2px]" />
    </div>

    <div className="section-header__title relative isolate flex w-full items-center justify-center py-4" style={{ minHeight: 'max(var(--section-heading-min-height, 6rem), min(18.125cqi, 170px))' }}>
    <span
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black tracking-[-0.01em] text-[#cfc1ea] select-none pointer-events-none uppercase font-['Outfit','Plus_Jakarta_Sans',sans-serif] leading-none whitespace-nowrap -z-10"
      // Keep every section's watermark height consistent; only compress long words to fit.
      style={{ fontSize: 'clamp(1rem, 18.125cqi, 170px)' }}
    >
      <span ref={watermarkRef} className="block w-max">
        {watermark}
      </span>
    </span>

    <h2 className="relative max-w-4xl text-balance text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-slate-900 leading-[1.12] font-display">
      {children}
    </h2>
    </div>
  </motion.div>
  );
};
