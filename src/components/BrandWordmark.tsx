import React from 'react';
import { OptimizedImage } from './OptimizedImage';

export const BrandWordmark: React.FC = () => (
  <span
    aria-hidden="true"
    className="inline-flex items-center gap-2.5 select-none"
  >
    <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-900/25 bg-white/80 p-0.5">
      <OptimizedImage
        src="/images/qais-portrait.png"
        sizes="(min-width: 640px) 26px, 22px"
        alt=""
        loading="eager"
        className="h-full w-full rounded-full object-cover"
      />
    </span>
    <span className="inline-flex items-baseline font-wordmark text-[28px] sm:text-[32px] font-black leading-none tracking-[-0.06em] text-slate-950">
      MQ<span className="ml-0.5 text-violet-600">.</span>
    </span>
  </span>
);
