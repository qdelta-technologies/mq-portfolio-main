import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { CONTACT_SECTION_DATA } from '../data/portfolioData';
import { WhatsappIcon } from './SocialIcons';
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
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-violet-700">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-violet-600 shrink-0" />Available for new projects
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold tracking-tight leading-tight text-slate-950 mt-5 mb-4">Good work starts<br className="hidden lg:block" /> with a conversation.</h3>
          <p className="max-w-sm text-sm text-copy-secondary leading-relaxed">Share your idea or ask a question. I’d love to hear from you.</p>
        </div>

        <div className="mt-8 lg:mt-12">
          <a className="contact-channel" href={`mailto:${CONTACT_SECTION_DATA.email}`}>
            <Mail aria-hidden="true" className="h-5 w-5 shrink-0 text-violet-600" />
            <span className="min-w-0 flex-1"><span className="block text-xs text-copy-secondary mb-1">Email</span><span className="block text-sm font-semibold break-words">{CONTACT_SECTION_DATA.email}</span></span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-600" />
          </a>
          <a className="contact-channel" href={CONTACT_SECTION_DATA.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`Chat on WhatsApp at ${CONTACT_SECTION_DATA.whatsappNumber}`}>
            <WhatsappIcon className="h-5 w-5 shrink-0 text-violet-600" />
            <span className="min-w-0 flex-1"><span className="block text-xs text-copy-secondary mb-1">WhatsApp</span><span className="block text-sm font-semibold">{CONTACT_SECTION_DATA.whatsappNumber}</span></span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-violet-600" />
          </a>
        </div>
      </motion.div>
      <motion.div {...reveal(0.1)} className="min-w-0"><ProjectInquiryForm /></motion.div>
    </div>
  );
};
