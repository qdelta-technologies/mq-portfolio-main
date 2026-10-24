import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="absolute top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-3.5 px-4 sm:px-8 lg:px-12 xl:px-16 bg-transparent"
    >
      <div className="w-full max-w-[1680px] mx-auto flex items-center justify-between">
        
        {/* ================= LEFT: Brand Identity (Custom MQ Logo) ================= */}
        <a
          href="#"
          className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 rounded-lg py-1"
          aria-label="Mohammed Qais — Portfolio Home"
        >
          <img
            src="/images/mq-logo.png"
            alt="Mohammed Qais Logo"
            className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-105 select-none"
            style={{
              imageRendering: '-webkit-optimize-contrast',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          />
        </a>

        {/* ================= RIGHT: Merged Navigation Capsule & CTA (Subtle Glassmorphism) ================= */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-1.5 p-1.5 pl-3.5 sm:pl-4 rounded-full bg-slate-950/80 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(15,23,42,0.25),inset_0_1px_0.5px_rgba(255,255,255,0.18)] transition-all duration-300"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 text-[13px] font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-all duration-150"
            >
              {item.label}
            </a>
          ))}

          {/* Merged CTA Button inside the capsule */}
          <a
            href="#contact"
            className="ml-1 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-[13px] font-semibold hover:shadow-md hover:shadow-violet-500/25 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 active:scale-98 shadow-xs shadow-violet-500/20 group"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </nav>

        {/* ================= MOBILE: Hamburger Menu Button ================= */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 transition-colors"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ================= MOBILE: Drawer Menu ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden rounded-2xl mt-2 border border-white/15 bg-slate-950/85 backdrop-blur-xl px-4 pt-3 pb-5 shadow-xl shadow-slate-950/30"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 mt-1 border-t border-slate-800/80">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-all shadow-xs shadow-violet-500/20"
                >
                  <span>Let's Talk</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

