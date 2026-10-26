import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Award, Sparkles } from 'lucide-react';
import {
  CERTIFICATIONS_SECTION_DATA,
  CERTIFICATIONS_LIST,
  CertificationItem
} from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';
import { AmbientSection } from './AmbientSection';
import { useSiteMotion } from './SiteMotion';

// Platform badges for the certification list.
const getCertLogo = (id: string) => {
  switch (id) {
    case 'naukri-young-turks':
      return (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0052cc] text-white flex items-center justify-center shrink-0 shadow-xs font-black text-sm select-none">
          N
        </div>
      );
    case 'oci-gen-ai':
    case 'oci-foundations':
      return (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-red-100 flex items-center justify-center shrink-0 shadow-xs p-1.5">
          <svg viewBox="0 0 100 66" className="w-5 h-3.5" fill="#EA1C24">
            <path d="M33 0C14.78 0 0 14.78 0 33s14.78 33 33 33h34c18.22 0 33-14.78 33-33S85.22 0 67 0H33zm33.5 50h-33C22.61 50 14 41.39 14 33s8.61-17 19.5-17h33C77.39 16 86 24.61 86 33s-8.61 17-19.5 17z" />
          </svg>
        </div>
      );
    case 'gen-ai-foundations':
      return (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shrink-0 shadow-xs p-1.5">
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
            <div className="bg-[#F25022] rounded-[1px]" />
            <div className="bg-[#7FBA00] rounded-[1px]" />
            <div className="bg-[#00A4EF] rounded-[1px]" />
            <div className="bg-[#FFB900] rounded-[1px]" />
          </div>
        </div>
      );
    case 'software-dev-fundamentals':
      return (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0 shadow-xs font-black text-sm select-none">
          S
        </div>
      );
    case 'gen-ai-mastermind':
      return (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-violet-100 text-violet-700 border border-violet-200/80 flex items-center justify-center shrink-0 shadow-xs">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" transform="rotate(45 12 12)" />
            <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          </svg>
        </div>
      );
    case 'uiux-design':
      return (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-950 flex items-center justify-center shrink-0 shadow-xs p-1.5">
          <svg viewBox="0 0 38 57" className="w-3.5 h-4.5" fill="none">
            <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
            <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
            <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
            <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
            <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center shrink-0 font-bold text-xs">
          ★
        </div>
      );
  }
};

export const CertificationsSection: React.FC = () => {
  const { reducedMotion: shouldReduceMotion, ambientMotion, pageVisible } = useSiteMotion();
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef, { amount: 0.1 });
  const animateAmbient = ambientMotion && pageVisible && inView;
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const glowY = useTransform(scrollYProgress, [0, 1], animateAmbient ? [-35, 35] : [0, 0]);
  const secondGlowY = useTransform(scrollYProgress, [0, 1], animateAmbient ? [-18, 18] : [0, 0]);
  const timelineProgress = useTransform(scrollYProgress, [0.15, 0.85], shouldReduceMotion ? [1, 1] : [0, 1]);

  return (
    <AmbientSection id="certificates" pattern="credentials" ref={containerRef} className="relative w-full py-10 sm:py-12 lg:py-14 bg-[#FAF9F6] border-t border-stroke/75 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label={CERTIFICATIONS_SECTION_DATA.label} watermark={CERTIFICATIONS_SECTION_DATA.watermark}>
          <span>{CERTIFICATIONS_SECTION_DATA.headingPrefix}</span>
          <span className="text-violet-600">{CERTIFICATIONS_SECTION_DATA.headingHighlight}</span>
        </SectionHeader>

      </div>

      {/* The wide dark panel and glowing timeline formerly used by Experience. */}
      <div className="w-[calc(100%_-_1.25rem)] sm:w-[calc(100%_-_2rem)] lg:w-[calc(100%_-_2rem)] max-w-[1760px] mx-auto">
        <div className="certifications-panel relative rounded-2xl sm:rounded-[22px] bg-[#0A0E1A] border border-slate-800/90 shadow-[0_25px_70px_-15px_rgba(2,6,23,0.65)] p-4 sm:p-6 lg:py-8 lg:px-10 xl:py-10 xl:px-12 overflow-hidden">
          <motion.div aria-hidden="true" style={{ y: glowY }} className="absolute -top-24 -left-24 w-[480px] h-[480px] bg-gradient-to-br from-violet-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />
          <motion.div aria-hidden="true" style={{ y: secondGlowY }} className="absolute -bottom-24 -right-24 w-[520px] h-[520px] bg-gradient-to-tl from-violet-900/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[270px_minmax(0,1fr)] xl:grid-cols-[310px_minmax(0,1fr)] gap-6 xl:gap-10">
            <aside className="min-w-0 flex flex-col justify-between gap-6 py-1">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-violet-950/70 border border-violet-500/40 flex items-center justify-center text-violet-300 shrink-0">
                    <Award aria-hidden="true" className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight font-display">Credentials &amp; Recognition</h3>
                </div>
                <p className="text-sm text-copy-on-dark leading-relaxed">{CERTIFICATIONS_SECTION_DATA.description}</p>
              </div>
              <div className="hidden xl:flex items-start gap-2.5 border-t border-stroke-on-dark/80 pt-4">
                <Sparkles aria-hidden="true" className="w-4 h-4 text-violet-300 shrink-0 mt-0.5" />
                <p className="text-xs text-copy-on-dark leading-relaxed">Professional credentials and skill-based achievements.</p>
              </div>
            </aside>

            <div className="relative min-w-0 lg:pl-8">
              <div aria-hidden="true" className="certification-timeline-track hidden lg:block absolute left-[3px] top-7 bottom-7 w-0.5 bg-violet-300/50" />
              <motion.div
                aria-hidden="true"
                style={{ scaleY: timelineProgress, originY: 0 }}
                className="hidden lg:block absolute left-[3px] top-7 bottom-7 w-0.5 bg-gradient-to-b from-violet-500 via-indigo-400 to-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.7)]"
              />
              <div className="flex flex-col gap-3 lg:gap-4">
                {CERTIFICATIONS_LIST.map((cert: CertificationItem, index: number) => {
                  return (
                    <motion.article
                      key={cert.id}
                      data-certification-id={cert.id}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.4, delay: shouldReduceMotion ? 0 : index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="certification-card premium-surface group relative rounded-xl border border-stroke-on-dark/80 bg-[#0E1322]/90 py-4 px-3 sm:px-5 lg:py-5 lg:px-6 hover:bg-[#12182B] hover:border-violet-500/60 transition-colors duration-200 focus-within:bg-[#12182B] focus-within:border-violet-500/70"
                    >
                      {/* Include the card's 1px border when centering the 24px marker on the track. */}
                      <span aria-hidden="true" className="certification-timeline-dot hidden lg:block absolute -left-[41px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-[5px] border-[#11182B] bg-[#D8D5E8] group-hover:bg-violet-200 group-hover:shadow-[0_0_0_4px_rgba(139,92,246,0.18),0_0_20px_rgba(139,92,246,0.65)] group-focus-within:bg-violet-200 group-focus-within:shadow-[0_0_0_4px_rgba(139,92,246,0.18),0_0_20px_rgba(139,92,246,0.65)] transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none" />
                      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                        <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                          {getCertLogo(cert.id)}
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm sm:text-base lg:text-[17px] font-bold leading-snug text-white group-hover:text-violet-200 transition-colors">{cert.title}</h4>
                            <p className="text-xs sm:text-sm text-copy-on-dark font-medium mt-1">{cert.issuer}</p>
                            {cert.detail && (
                              <p className="text-xs sm:text-[13px] font-semibold text-violet-300 flex items-start gap-1.5 mt-2">
                                <Award aria-hidden="true" className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {cert.detail}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AmbientSection>
  );
};

export default CertificationsSection;
