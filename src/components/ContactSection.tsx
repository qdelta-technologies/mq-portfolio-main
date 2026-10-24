import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Globe, ArrowRight, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { CONTACT_SECTION_DATA } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';

export const ContactSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeIn = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section id="contact" className="w-full py-16 sm:py-20 lg:py-24 bg-[#FAF9F6] border-t border-stroke/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Let's Work Together" watermark="CONTACT">
          <span>Have a </span>
          <span className="text-violet-600">project</span>
          <span> in mind?</span>
        </SectionHeader>
        
        {/* ================= DISTINCTIVE CONTACT BANNER CARD ================= */}
        <motion.div
          {...fadeIn}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100/90 via-purple-50/70 to-indigo-100/80 border border-violet-300 p-8 sm:p-12 lg:p-16 shadow-xl shadow-violet-900/10"
        >
          {/* Subtle Decorative Background Radial Glows */}
          <div 
            className="absolute -right-24 -top-24 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute -left-20 -bottom-20 w-80 h-80 bg-indigo-300/20 rounded-full blur-2xl pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-700 font-medium mb-8 max-w-lg leading-relaxed">
                {CONTACT_SECTION_DATA.subtitle}
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Primary Button: Email */}
                <a
                  href={`mailto:${CONTACT_SECTION_DATA.email}`}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm transition-all duration-200 shadow-md shadow-slate-950/25 group cursor-pointer"
                >
                  <span>{CONTACT_SECTION_DATA.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                {/* Secondary Button: QDelta Business */}
                <a
                  href={CONTACT_SECTION_DATA.businessSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-6 sm:px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-violet-800 font-bold text-sm border border-violet-300 hover:border-violet-400 transition-all duration-200 shadow-sm group cursor-pointer"
                >
                  <span>{CONTACT_SECTION_DATA.secondaryCtaText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Right Information Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4 bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-violet-200 shadow-sm">
              
              {/* Email Direct Contact */}
              <a
                href={`mailto:${CONTACT_SECTION_DATA.email}`}
                className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-violet-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-800 flex items-center justify-center shrink-0 border border-violet-200 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-copy-secondary font-semibold block">Direct Email</span>
                  <span className="text-sm font-bold text-slate-950 group-hover:text-violet-700 transition-colors truncate block">
                    {CONTACT_SECTION_DATA.email}
                  </span>
                </div>
              </a>

              {/* QDelta Technologies Link */}
              <a
                href={CONTACT_SECTION_DATA.businessSite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-violet-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-800 flex items-center justify-center shrink-0 border border-violet-200 group-hover:scale-105 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-copy-secondary font-semibold block">Digital Venture</span>
                  <span className="text-sm font-bold text-slate-950 group-hover:text-violet-700 transition-colors truncate block">
                    www.qdelta.in
                  </span>
                </div>
              </a>

              {/* GitHub Link */}
              <a
                href={CONTACT_SECTION_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-violet-50/80 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs text-copy-muted font-medium block">Open Source & Code</span>
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-violet-700 transition-colors truncate block">
                    github.com/mdqais29
                  </span>
                </div>
              </a>

              {/* Status Badge */}
              <div className="pt-2 border-t border-stroke/75 mt-1">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50/70 border border-emerald-200/60 text-xs font-medium text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{CONTACT_SECTION_DATA.statusText}</span>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
