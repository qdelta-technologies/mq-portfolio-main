import React from 'react';
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
  return (
  <motion.div
    className="relative isolate flex min-h-28 sm:min-h-36 lg:min-h-40 flex-col items-center justify-center py-4 sm:py-6 text-center mb-12 sm:mb-16"
    style={{ containerType: 'inline-size' }}
    initial={reducedMotion ? false : { opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
  >
    <span
      aria-hidden="true"
      className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-black tracking-[-0.01em] text-[#ECEAF6] select-none pointer-events-none uppercase font-['Outfit','Plus_Jakarta_Sans',sans-serif] leading-none whitespace-nowrap -z-10"
      // Scale by both available width and word length so long words fit on phones.
      style={{ fontSize: `clamp(1rem, ${145 / watermark.length}cqi, 170px)` }}
    >
      {watermark}
    </span>

    <div className="relative flex items-center justify-center gap-2 mb-2.5">
      <span aria-hidden="true" className="w-1.5 h-1.5 shrink-0 bg-violet-600 rounded-[2px]" />
      <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-wide">{label}</span>
      <span aria-hidden="true" className="w-1.5 h-1.5 shrink-0 bg-violet-600 rounded-[2px]" />
    </div>

    <h2 className="relative max-w-4xl text-balance text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-slate-900 leading-[1.12] font-display">
      {children}
    </h2>
  </motion.div>
  );
};
