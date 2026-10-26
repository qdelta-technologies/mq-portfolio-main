import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES_SECTION_DATA, SERVICES_LIST, ServiceItem } from '../data/portfolioData';
import { SectionHeader } from './SectionHeader';
import { AmbientSection } from './AmbientSection';
import { useSiteMotion } from './SiteMotion';

// Custom icons matching the reference image
const ServiceIcon: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'web-dev':
      // Monitor with </ > code brackets
      return (
        <svg
          className="w-7 h-7 text-violet-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <path d="M7 8.5L5 10l2 1.5M17 8.5l2 1.5-2 1.5M13 7l-2 6" />
        </svg>
      );

    case 'ui-ux':
      // 4-square UI layout grid
      return (
        <svg
          className="w-7 h-7 text-violet-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );

    case 'landing-page':
      // Browser window with rising chart line
      return (
        <svg
          className="w-7 h-7 text-violet-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="18" rx="2.5" />
          <line x1="2" y1="8" x2="22" y2="8" />
          <circle cx="5" cy="5.5" r="0.75" fill="currentColor" />
          <circle cx="7.5" cy="5.5" r="0.75" fill="currentColor" />
          <circle cx="10" cy="5.5" r="0.75" fill="currentColor" />
          <polyline points="6 16 10 12 14 15 18 11" strokeWidth="2" />
          <polyline points="15 11 18 11 18 14" strokeWidth="2" />
        </svg>
      );

    case 'social-media':
      // Social cluster: Instagram on top, LinkedIn and YouTube underneath
      return (
        <div className="flex flex-col items-center justify-center -space-y-0.5 select-none">
          {/* Instagram Icon */}
          <svg
            className="w-4.5 h-4.5 text-violet-600 mb-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
          </svg>
          <div className="flex items-center gap-1">
            {/* LinkedIn 'in' Icon */}
            <div className="w-3.5 h-3.5 rounded-xs bg-violet-600 text-white flex items-center justify-center text-[7.5px] font-bold font-sans">
              in
            </div>
            {/* YouTube Play Icon */}
            <div className="w-4 h-3.5 rounded-xs bg-violet-600 text-white flex items-center justify-center">
              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      );

    case 'content-writing':
      // Document with writing pen
      return (
        <svg
          className="w-7 h-7 text-violet-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
          <path d="M18 14l2-2a1.4 1.4 0 0 1 2 2l-2 2" />
        </svg>
      );

    case 'ai-automation':
      // Gear / Cog with connected automation network flow
      return (
        <svg
          className="w-7 h-7 text-violet-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="12" r="3" />
          <path d="M8 7V5M8 19v-2M3 12H1M15 12h-2M4.5 8.5L3 7M13 17l-1.5-1.5M4.5 15.5L3 17M13 7l-1.5 1.5" />
          {/* Connected Network Nodes */}
          <circle cx="18" cy="7" r="2" fill="currentColor" />
          <circle cx="18" cy="17" r="2" fill="currentColor" />
          <path d="M11 12h3M14 12l2-5M14 12l2 5" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
        </svg>
      );

    default:
      return null;
  }
};

export const ServicesSection: React.FC = () => {
  const { reducedMotion: shouldReduceMotion, ambientMotion } = useSiteMotion();

  return (
    <AmbientSection id="services" pattern="blueprint" className="services-section relative w-full py-14 sm:py-16 lg:py-20 bg-[#FAF9F6] sm:overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader label={SERVICES_SECTION_DATA.label} watermark={SERVICES_SECTION_DATA.watermark}>
          <span className="text-violet-600">{SERVICES_SECTION_DATA.headingHighlight} </span>
          <span>{SERVICES_SECTION_DATA.headingSuffix}</span>
        </SectionHeader>

        {/* ================= 6-CARD SERVICES GRID (2 ROWS X 3 COLS) ================= */}
        <div className="services-stack grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SERVICES_LIST.map((service: ServiceItem, index: number) => (
            <motion.div
              key={service.id}
              style={{ '--service-index': index } as React.CSSProperties}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={ambientMotion ? { y: -4, transition: { duration: 0.2, delay: 0 } } : undefined}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.45,
                delay: shouldReduceMotion ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="service-card premium-surface group relative rounded-xl sm:rounded-2xl bg-white p-6 sm:p-7.5 border border-[#8C72AA] shadow-[0_5px_22px_-6px_rgba(49,25,78,0.16)] hover:shadow-[0_20px_45px_-10px_rgba(124,58,237,0.2)] hover:border-violet-700 transition-[border-color,box-shadow] duration-300 overflow-hidden flex flex-col justify-start"
            >
              {/* Left Vertical Purple Accent Bar */}
              <span className="w-1.5 h-8.5 rounded-full bg-violet-600 absolute left-4 top-6.5 group-hover:h-11 group-hover:bg-violet-700 transition-all duration-300" />

              {/* Circular Lavender Icon Badge */}
              <div className="w-13 h-13 rounded-full bg-violet-100 border border-[#A88ACB] flex items-center justify-center mb-5 ml-1.5 group-hover:bg-violet-100 group-hover:scale-105 group-hover:border-violet-600 transition-all duration-300 shadow-xs shrink-0">
                <ServiceIcon id={service.id} />
              </div>

              {/* Service Title */}
              <h3 className="text-lg sm:text-xl font-bold text-black group-hover:text-violet-700 transition-colors tracking-tight mb-2 font-display leading-snug">
                {service.title}
              </h3>

              {/* Service Description - High Contrast */}
              <p className="text-sm text-slate-800 font-medium leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </AmbientSection>
  );
};

export default ServicesSection;
