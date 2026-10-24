import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

const SOCIAL_LINKS = [
  { name: 'GitHub', href: PERSONAL_INFO.github, Icon: GithubIcon },
  { name: 'Instagram', href: PERSONAL_INFO.instagram, Icon: InstagramIcon },
  { name: 'LinkedIn', href: PERSONAL_INFO.linkedin, Icon: LinkedinIcon },
  { name: 'Email', href: `mailto:${PERSONAL_INFO.email}`, Icon: Mail },
  { name: 'WhatsApp', href: PERSONAL_INFO.whatsapp, Icon: WhatsappIcon },
];

export const HeroSocialLinks: React.FC<{ motionEnabled: boolean; reducedMotion: boolean }> = ({ motionEnabled, reducedMotion }) => (
  <motion.nav
    aria-label="Social profiles and email"
    className="flex max-w-full flex-wrap items-center gap-2"
    initial={reducedMotion ? false : { opacity: 0, y: motionEnabled ? 8 : 0 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
  >
    {SOCIAL_LINKS.map(({ name, href, Icon }) => (
      <motion.a
        key={name}
        href={href}
        target={name === 'Email' ? undefined : '_blank'}
        rel={name === 'Email' ? undefined : 'noopener noreferrer'}
        aria-label={name === 'Email' ? 'Send an email' : name === 'WhatsApp' ? 'Chat on WhatsApp' : `Visit ${name}`}
        title={name}
        whileHover={motionEnabled ? { y: -2 } : undefined}
        whileTap={motionEnabled ? { scale: 0.97 } : undefined}
        transition={{ duration: 0.18 }}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-900/25 bg-white/70 text-slate-900 backdrop-blur-sm transition-colors duration-200 hover:border-violet-600 hover:bg-violet-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600"
      >
        <Icon aria-hidden="true" className="h-4 w-4" />
      </motion.a>
    ))}
  </motion.nav>
);
