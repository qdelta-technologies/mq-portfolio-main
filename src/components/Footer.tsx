import React from 'react';
import { Globe, Mail } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from './SocialIcons';
import { PERSONAL_INFO, NAV_ITEMS, SOCIAL_LINKS } from '../data/portfolioData';
import { BrandWordmark } from './BrandWordmark';
import { useSiteMotion } from './SiteMotion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { reducedMotion } = useSiteMotion();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <GithubIcon className="w-5 h-5 sm:w-4 sm:h-4" />;
      case 'linkedin':
        return <LinkedinIcon className="w-5 h-5 sm:w-4 sm:h-4" />;
      case 'instagram':
        return <InstagramIcon className="w-5 h-5 sm:w-4 sm:h-4" />;
      case 'whatsapp':
        return <WhatsappIcon className="w-5 h-5 sm:w-4 sm:h-4" />;
      case 'globe':
        return <Globe className="w-5 h-5 sm:w-4 sm:h-4" />;
      default:
        return <Mail className="w-5 h-5 sm:w-4 sm:h-4" />;
    }
  };

  return (
    <footer className="site-footer w-full bg-[#FAF9F6] border-t border-slate-300 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-300">
          
          {/* Brand Identity / Left */}
          <a href="#" className="flex items-center group" aria-label="Mohammed Qais — Back to Top">
            <BrandWordmark />
          </a>

          {/* Section Navigation Links / Center */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label="Footer Navigation">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold text-slate-700 hover:text-violet-700 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social Links / Right */}
          <div className="flex max-w-full flex-wrap justify-center items-center gap-2 sm:gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.icon === 'mail' ? undefined : '_blank'}
                rel={link.icon === 'mail' ? undefined : 'noopener noreferrer'}
                aria-label={link.ariaLabel}
                className="w-12 h-12 sm:w-9 sm:h-9 shrink-0 rounded-full bg-slate-200/80 hover:bg-violet-100 text-slate-800 hover:text-violet-800 border border-slate-300/80 flex items-center justify-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600"
              >
                {getSocialIcon(link.icon)}
              </a>
            ))}

          </div>
        </div>

        <div className="flex justify-center pt-3">
          <button
            type="button"
            onClick={scrollToTop}
            className="min-h-11 px-4 rounded-lg text-sm font-semibold text-violet-800 underline underline-offset-4 decoration-violet-300 hover:text-violet-950 hover:decoration-violet-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
          >
            Move to top
          </button>
        </div>

        {/* Copyright & Subtext Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-copy-secondary font-medium gap-3">
          <p>© {currentYear} {PERSONAL_INFO.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-copy-secondary">
            <span>Crafted with precision & modern web standards</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
