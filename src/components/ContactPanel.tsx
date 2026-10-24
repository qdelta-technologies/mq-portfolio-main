import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Mail, Sparkles } from 'lucide-react';
import { CONTACT_SECTION_DATA } from '../data/portfolioData';
import { GithubIcon, WhatsappIcon } from './SocialIcons';
import { ProjectInquiryForm } from './ProjectInquiryForm';
import { useSiteMotion } from './SiteMotion';

export const ContactPanel: React.FC = () => {
  const { reducedMotion } = useSiteMotion();
  const reveal = (delay: number) => ({
    initial: reducedMotion ? false as const : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reducedMotion ? 0 : 0.55, delay: reducedMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  });

  return (
    <div className="contact-layout">
      <motion.div {...reveal(0)} className="contact-invitation">
        <div className="contact-orbits" aria-hidden="true" />
        <div>
          <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-violet-300/30 bg-violet-300/10 px-3 py-2 text-[10px] sm:text-[11px] font-semibold text-violet-100 leading-relaxed">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-violet-300 shrink-0" />{CONTACT_SECTION_DATA.statusText}
          </span>
          <h3 className="text-[32px] sm:text-[40px] font-display font-bold tracking-tight leading-[1.1] text-balance mt-7 mb-5">Let’s make your<br className="hidden sm:block" /> next idea <span className="text-violet-200">real.</span></h3>
          <p className="max-w-sm text-sm sm:text-base text-copy-on-dark leading-relaxed">A new website, a smarter workflow, or a stronger online presence—let’s find the right approach together.</p>
          <div className="flex items-center gap-2 mt-6 text-[10px] uppercase font-semibold tracking-[0.16em] text-violet-200"><Sparkles aria-hidden="true" className="h-3.5 w-3.5" />Ideas welcome. Good conversations, too.</div>
        </div>

        <div className="mt-9 lg:mt-12 space-y-3">
          <a className="contact-channel" href={`mailto:${CONTACT_SECTION_DATA.email}`}>
            <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-violet-200" />
            <span className="min-w-0 flex-1"><span className="block text-[10px] font-semibold text-copy-on-dark mb-1">DIRECT EMAIL</span><span className="block text-sm sm:text-base font-semibold break-words">{CONTACT_SECTION_DATA.email}</span></span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-200" />
          </a>
          <a className="contact-channel" href={CONTACT_SECTION_DATA.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Chat on WhatsApp at ${CONTACT_SECTION_DATA.whatsappNumber}`}>
            <WhatsappIcon className="h-5 w-5 shrink-0 text-violet-200" />
            <span className="min-w-0 flex-1"><span className="block text-[10px] font-semibold text-copy-on-dark mb-1">LET’S CHAT ON WHATSAPP</span><span className="block text-sm sm:text-base font-semibold">{CONTACT_SECTION_DATA.whatsappNumber}</span></span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-200" />
          </a>
          <div className="flex flex-wrap gap-2 pt-4">
            <a className="contact-small-link" href={CONTACT_SECTION_DATA.businessSite} target="_blank" rel="noopener noreferrer"><Globe aria-hidden="true" className="h-4 w-4" />Visit QDelta<ArrowUpRight aria-hidden="true" className="h-3 w-3" /></a>
            <a className="contact-small-link" href={CONTACT_SECTION_DATA.github} target="_blank" rel="noopener noreferrer"><GithubIcon className="h-4 w-4" />GitHub<ArrowUpRight aria-hidden="true" className="h-3 w-3" /></a>
          </div>
        </div>
      </motion.div>
      <motion.div {...reveal(0.1)} className="min-w-0"><ProjectInquiryForm /></motion.div>
    </div>
  );
};
