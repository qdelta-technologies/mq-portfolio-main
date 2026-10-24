import React from 'react';
import { TICKER_ITEMS } from '../data/portfolioData';

/**
 * 3D Faceted Sparkle Star Component
 * Features realistic 8-facet bevel lighting, specular highlight, and glowing ambient depth.
 */
const Sparkle3D: React.FC<{ className?: string }> = ({ className = "w-4.5 h-4.5 sm:w-5 sm:h-5" }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
    aria-hidden="true"
  >
    <defs>
      {/* Top-Left: Bright Specular White to Light Violet */}
      <linearGradient id="facet-tl" x1="13.2" y1="1" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#F5F3FF" />
        <stop offset="100%" stopColor="#DDD6FE" />
      </linearGradient>

      {/* Top-Right: High-Mid Violet */}
      <linearGradient id="facet-tr" x1="18.8" y1="1" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#DDD6FE" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>

      {/* Right-Top: Mid Violet */}
      <linearGradient id="facet-rt" x1="31" y1="13.2" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>

      {/* Right-Bottom: Dark Violet Shadow */}
      <linearGradient id="facet-rb" x1="31" y1="18.8" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#4C1D95" />
      </linearGradient>

      {/* Bottom-Right: Deepest Shadow */}
      <linearGradient id="facet-br" x1="18.8" y1="31" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6D28D9" />
        <stop offset="100%" stopColor="#2E1065" />
      </linearGradient>

      {/* Bottom-Left: Reflected Midtone */}
      <linearGradient id="facet-bl" x1="13.2" y1="31" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#5B21B6" />
      </linearGradient>

      {/* Left-Bottom: Ambient Tone */}
      <linearGradient id="facet-lb" x1="1" y1="18.8" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#A78BFA" />
        <stop offset="100%" stopColor="#6D28D9" />
      </linearGradient>

      {/* Left-Top: Specular Flare */}
      <linearGradient id="facet-lt" x1="1" y1="13.2" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#C4B5FD" />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
    </defs>

    {/* Diagonal 4-point micro flare star */}
    <path
      d="M16 9 L17.5 14.5 L23 16 L17.5 17.5 L16 23 L14.5 17.5 L9 16 L14.5 14.5 Z"
      fill="#DDD6FE"
      opacity="0.45"
    />

    {/* 3D Faceted Primary 4-Point Diamond Star */}
    <path d="M16 16 L16 1 L13.2 13.2 Z" fill="url(#facet-tl)" />
    <path d="M16 16 L16 1 L18.8 13.2 Z" fill="url(#facet-tr)" />
    <path d="M16 16 L31 16 L18.8 13.2 Z" fill="url(#facet-rt)" />
    <path d="M16 16 L31 16 L18.8 18.8 Z" fill="url(#facet-rb)" />
    <path d="M16 16 L16 31 L18.8 18.8 Z" fill="url(#facet-br)" />
    <path d="M16 16 L16 31 L13.2 18.8 Z" fill="url(#facet-bl)" />
    <path d="M16 16 L1 16 L13.2 18.8 Z" fill="url(#facet-lb)" />
    <path d="M16 16 L1 16 L13.2 13.2 Z" fill="url(#facet-lt)" />

    {/* Specular Center Point */}
    <circle cx="16" cy="16" r="1.3" fill="#FFFFFF" />
  </svg>
);

export const ExpertiseTicker: React.FC = () => {
  // Duplicate array for seamless infinite marquee scroll
  const marqueeItems = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="w-full bg-slate-950 text-white py-3.5 sm:py-4 overflow-hidden border-y border-slate-900 select-none shrink-0 shadow-inner relative z-20">
      <div className="flex items-center space-x-8 sm:space-x-10 whitespace-nowrap animate-marquee">
        {marqueeItems.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center space-x-8 sm:space-x-10 shrink-0">
            <span className="text-xs sm:text-[13px] font-semibold tracking-wider text-slate-100 uppercase">
              {item}
            </span>
            <Sparkle3D />
          </div>
        ))}
      </div>
    </div>
  );
};
