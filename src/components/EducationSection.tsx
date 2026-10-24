import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Award, MapPin, Calendar, Sparkles } from 'lucide-react';
import { 
  EDUCATION_SECTION_DATA, 
  EDUCATION_LIST, 
  CERTIFICATIONS_LIST,
  EducationItem,
  CertificationItem 
} from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';

// Authentic platform logos matching Image 2
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

export const EducationSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="certificates" className="w-full py-16 sm:py-20 lg:py-24 bg-[#FAF9F6] border-t border-stroke/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader label="Learning" watermark="EDUCATION">
          <span>{EDUCATION_SECTION_DATA.headingPrefix}</span>
          <span className="text-violet-600">{EDUCATION_SECTION_DATA.headingHighlight}</span>
        </SectionHeader>

        <p className="text-sm sm:text-base text-copy-secondary font-medium max-w-2xl mx-auto text-center leading-relaxed mb-10 sm:mb-14">
          {EDUCATION_SECTION_DATA.description}
        </p>

        {/* ================= 2-COLUMN BALANCED LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN: EDUCATION (5 COLS) ================= */}
          <motion.div 
            {...fadeIn}
            className="lg:col-span-5 flex flex-col"
          >
            {/* Column Header matching Image 1 */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-violet-100/70 border border-violet-200/60 flex items-center justify-center text-violet-700 shrink-0 shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Education
                </h3>
                <p className="text-xs sm:text-sm text-copy-muted font-medium">
                  My academic foundation
                </p>
              </div>
            </div>

            <div className="h-px bg-slate-200/80 mb-7" />

            {/* Vertical Timeline with Dates on the Left */}
            <div className="relative">
              {/* Continuous vertical line running through the center of nodes */}
              <div 
                className="absolute left-[64px] sm:left-[70px] top-6 bottom-10 w-[2px] bg-violet-200/80 -translate-x-1/2"
                aria-hidden="true" 
              />

              <div className="space-y-6 sm:space-y-7">
                {EDUCATION_LIST.map((edu: EducationItem) => (
                  <div key={edu.id} className="relative flex items-start gap-3 sm:gap-4 group">
                    {/* Date Column on the Left of the Timeline */}
                    <div className="w-11 sm:w-12 text-right shrink-0 pt-1 select-none">
                      <span className="block text-xs font-bold text-copy-secondary leading-none">
                        {edu.startYear || '2021'}
                      </span>
                      <span className="block text-[10px] font-semibold text-copy-muted my-0.5 leading-none">
                        -
                      </span>
                      <span className="block text-xs font-bold text-copy-secondary leading-none">
                        {edu.endYear || '2025'}
                      </span>
                    </div>

                    {/* Timeline Node on the Vertical Line */}
                    <div className="relative z-10 w-5 h-5 rounded-full border-2 border-violet-600 bg-white flex items-center justify-center shrink-0 shadow-xs ring-4 ring-[#FAF9F6] group-hover:scale-110 group-hover:border-violet-700 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-violet-600 group-hover:bg-violet-700 transition-colors" />
                    </div>

                    {/* Education Card Content */}
                    <div className="flex-1 min-w-0 bg-white rounded-2xl border border-stroke/90 p-5 sm:p-6 shadow-[0_2px_12px_rgba(15,23,42,0.02)] hover:border-violet-300 hover:shadow-[0_8px_24px_rgba(124,58,237,0.06)] transition-all">
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug group-hover:text-violet-700 transition-colors">
                        {edu.degree}
                      </h4>

                      <p className="text-xs sm:text-sm font-semibold text-copy-secondary mt-1.5">
                        {edu.institution}
                      </p>

                      <div className="flex flex-wrap items-center gap-2.5 text-xs text-copy-muted font-medium mt-3">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-copy-muted shrink-0" />
                          {edu.location}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-copy-muted shrink-0" />
                          {edu.period}
                        </span>
                      </div>

                      {/* Grade Pill */}
                      <div className="mt-4">
                        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-100/90 shadow-xs">
                          {edu.gradeLabel}: {edu.gradeValue}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: CERTIFICATIONS (7 COLS) ================= */}
          <motion.div 
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col"
          >
            {/* Column Header matching Image 2 */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-violet-100/70 border border-violet-200/60 flex items-center justify-center text-violet-700 shrink-0 shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight font-serif">
                    Certifications &amp; Achievements
                  </h3>
                  <p className="text-xs sm:text-sm text-copy-muted font-medium">
                    Recognitions that validate my skills and learning journey.
                  </p>
                </div>
              </div>

              {/* Sparkle badge on top-right */}
              <div className="hidden sm:flex w-9 h-9 rounded-xl bg-violet-50/80 border border-violet-100/80 items-center justify-center text-violet-600 shrink-0 shadow-xs">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
            </div>

            <div className="h-px bg-slate-200/80 mb-7" />

            {/* List of 7 Certifications with Timeline & Numbers matching Image 2 */}
            <div className="relative">
              {/* Continuous vertical line connecting the dots */}
              <div 
                className="absolute left-[47px] sm:left-[51px] top-4 bottom-5 w-[2px] bg-violet-200/70 -translate-x-1/2"
                aria-hidden="true"
              />

              <div className="space-y-3 sm:space-y-3.5">
                {CERTIFICATIONS_LIST.map((cert: CertificationItem) => (
                  <div
                    key={cert.id}
                    className="relative flex items-center gap-3 sm:gap-3.5 group"
                  >
                    {/* Number Badge Pill on the Left */}
                    <div className="w-8 h-7 sm:w-8.5 sm:h-7 rounded-full bg-violet-50/90 text-violet-700 text-xs font-bold flex items-center justify-center border border-violet-100/80 shrink-0 select-none shadow-xs group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-colors">
                      {cert.number}
                    </div>

                    {/* Timeline Dot Node */}
                    <div className="relative z-10 w-2 h-2 rounded-full bg-violet-400 ring-2 ring-[#FAF9F6] shrink-0 group-hover:bg-violet-600 group-hover:scale-125 transition-all" />

                    {/* Horizontal Certification Card */}
                    <div className="flex-1 min-w-0 bg-white rounded-xl sm:rounded-2xl border border-stroke/90 p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:border-violet-300 hover:shadow-[0_4px_16px_rgba(124,58,237,0.06)] transition-all">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {/* Authentic Platform Logo */}
                        {getCertLogo(cert.id)}

                        {/* Title and Detail */}
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-violet-700 transition-colors leading-snug line-clamp-2">
                            {cert.title}
                          </h4>

                          {cert.detail && (
                            <p className="text-[11px] sm:text-xs font-semibold text-violet-600 flex items-center gap-1 mt-0.5">
                              <span>★</span> {cert.detail}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Issuer Pill Badge */}
                      <span className="text-[11px] font-semibold text-copy-secondary bg-slate-50 border border-stroke/80 px-2.5 py-1 rounded-full shrink-0 group-hover:bg-violet-50 group-hover:text-violet-700 group-hover:border-violet-100 transition-colors whitespace-nowrap">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default EducationSection;
