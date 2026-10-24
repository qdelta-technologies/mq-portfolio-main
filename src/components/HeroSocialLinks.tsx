import React from 'react';
import { Globe, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PERSONAL_INFO } from '../data/portfolioData';

const SOCIAL_LINKS = [
  { name: 'GitHub', href: PERSONAL_INFO.github, Icon: GithubIcon },
  { name: 'LinkedIn', href: PERSONAL_INFO.linkedin, Icon: LinkedinIcon },
  { name: 'QDelta website', href: PERSONAL_INFO.businessSite, Icon: Globe },
  { name: 'Email', href: `mailto:${PERSONAL_INFO.email}`, Icon: Mail },
];

export const HeroSocialLinks: React.FC = () => (
  <nav aria-label="Social profiles and email" className="flex items-center gap-2">
    {SOCIAL_LINKS.map(({ name, href, Icon }) => (
      <a
        key={name}
        href={href}
        target={name === 'Email' ? undefined : '_blank'}
        rel={name === 'Email' ? undefined : 'noopener noreferrer'}
        aria-label={name === 'Email' ? 'Send an email' : `Visit ${name}`}
        title={name}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-900/25 bg-white/70 text-slate-900 backdrop-blur-sm transition-colors duration-200 hover:border-violet-600 hover:bg-violet-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600"
      >
        <Icon aria-hidden="true" className="h-4 w-4" />
      </a>
    ))}
  </nav>
);
