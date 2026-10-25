import React from 'react';
import { motion } from 'framer-motion';
import { 
  Laptop, 
  Building2, 
  Brain, 
  Users, 
  Rocket, 
  Calendar,
  MapPin,
  Sparkles
} from 'lucide-react';
import { EXPERIENCE_SECTION_DATA, EXPERIENCE_LIST, ExperienceItem } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';
import { AmbientSection } from './AmbientSection';
import { useSiteMotion } from './SiteMotion';

// Map icon for each experience role
const getExperienceIcon = (id: string, isCurrent: boolean) => {
  const iconClass = isCurrent
    ? 'w-4.5 h-4.5 text-violet-700 group-hover:text-violet-800 transition-colors'
    : 'w-4.5 h-4.5 text-slate-700 group-hover:text-violet-700 transition-colors';

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
  const { reducedMotion: shouldReduceMotion } = useSiteMotion();

  return (
    <AmbientSection
      id="experience"
      pattern="ledger"
      className="w-full py-12 sm:py-16 lg:py-20 bg-[#FAF9F6] border-t border-stroke/75"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="My Journey" watermark="EXPERIENCE">
          <span>{EXPERIENCE_SECTION_DATA.headingPrefix}</span>
          <span className="text-violet-600">{EXPERIENCE_SECTION_DATA.headingHighlight}</span>
        </SectionHeader>
        <p className="text-sm sm:text-base text-copy-secondary font-medium max-w-2xl mx-auto text-center leading-relaxed mb-8 sm:mb-10">
          {EXPERIENCE_SECTION_DATA.description}
        </p>

        <div className="max-w-5xl mx-auto">
          {/* The light numbered-list layout formerly used by Certifications. */}
          <div className="relative">
            <div className="space-y-3 sm:space-y-3.5">
              {EXPERIENCE_LIST.map((item: ExperienceItem, index: number) => {
                const isCurrent = item.id === 'qdelta-founder';
                return (
                  <motion.div
                    key={item.id}
                    data-experience-id={item.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex items-start gap-3 sm:gap-3.5 group before:absolute before:left-[47px] sm:before:left-[51px] before:top-7 before:-bottom-10 sm:before:-bottom-[42px] before:w-0.5 before:bg-violet-200/70 last:before:hidden"
                  >
                    <span className="relative z-10 mt-4 w-8 h-7 sm:w-8.5 rounded-full bg-violet-50 text-violet-700 text-xs font-bold flex items-center justify-center border border-violet-100 shrink-0 shadow-xs">
                      {item.step}
                    </span>
                    <span aria-hidden="true" className="relative z-10 mt-6 w-2 h-2 rounded-full bg-violet-400 ring-2 ring-canvas shrink-0 group-hover:bg-violet-600" />
                    <article className={`experience-card premium-surface flex-1 min-w-0 rounded-xl sm:rounded-2xl bg-white border p-3 sm:p-4 shadow-[0_2px_8px_rgba(15,23,42,0.02)] hover:border-violet-300 hover:shadow-[0_4px_16px_rgba(124,58,237,0.06)] transition-colors ${isCurrent ? 'border-violet-300' : 'border-stroke/90'}`}>
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center shrink-0">
                          {getExperienceIcon(item.id, isCurrent)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
                            <div className="min-w-0">
                              <h4 className="text-sm sm:text-base font-bold text-slate-900 font-display leading-snug">{item.role}</h4>
                              <p className="text-xs sm:text-sm text-copy-secondary font-semibold mt-1">{item.organization}</p>
                            </div>
                            <span className="inline-flex self-start max-w-full items-start gap-1.5 rounded-full border border-stroke/80 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-copy-secondary lg:max-w-[230px] lg:shrink-0">
                              <Calendar aria-hidden="true" className="w-3 h-3 mt-0.5 shrink-0" />
                              <span>{item.period}</span>
                            </span>
                          </div>
                          <p className="flex items-start gap-1.5 text-[11px] sm:text-xs text-copy-muted mt-2">
                            <MapPin aria-hidden="true" className="w-3 h-3 mt-0.5 shrink-0" />
                            {item.location || 'Remote'}
                          </p>
                          <p className="text-xs sm:text-[13px] text-copy-secondary font-medium leading-relaxed mt-2">{item.description}</p>
                        </div>
                      </div>
                    </article>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AmbientSection>
  );
};

export default ExperienceSection;
