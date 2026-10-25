import React from 'react';
import { motion } from 'framer-motion';

const METRICS = [
  { value: '2', title: 'Years of experience', detail: 'Design & development', position: 'lg:col-start-1' },
  { value: '10', title: 'Happy clients', detail: 'Global businesses & teams', position: 'lg:col-start-3' },
  { value: '12', title: 'Projects shipped', detail: 'Websites, Content & Automation', position: 'lg:col-start-1' },
];

/** Desktop-only glass capsules with inset navy number medallions. */
export const HeroMetrics: React.FC<{ motionEnabled: boolean; reducedMotion: boolean }> = ({ motionEnabled, reducedMotion: shouldReduceMotion }) => {
  return (
    <div className="w-full text-left">
      <dl className="grid grid-cols-3 gap-2 sm:gap-2.5 lg:grid-cols-12 lg:gap-x-0 lg:gap-y-5" style={{ perspective: 1000 }}>
        {METRICS.map((metric, index) => (
          <motion.div
            key={metric.title}
            data-floating={motionEnabled && !shouldReduceMotion}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={!motionEnabled || shouldReduceMotion ? undefined : {
              y: -2,
              rotateX: 1.5,
              rotateY: -2,
              transition: { duration: 0.2, delay: 0 },
            }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.24 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`hero-metric-glass relative col-span-1 lg:col-span-10 ${metric.position} flex min-h-[84px] items-center gap-3 rounded-full px-2.5 py-2.5`}
          >
            <dt className="order-2 min-w-0">
              <span className="flex min-h-7 items-center justify-center text-center text-[10.5px] sm:text-[11px] lg:block lg:min-h-0 lg:text-left lg:text-xs font-bold tracking-tight text-slate-900 leading-snug">
                {metric.title}
              </span>
              <span className="sr-only lg:not-sr-only lg:mt-1 lg:block lg:text-[11px] font-medium leading-relaxed text-copy-secondary">
                {metric.detail}
              </span>
            </dt>
            <dd className="order-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 font-display text-[28px] font-semibold tracking-[-0.06em] leading-none text-white tabular-nums shadow-[0_4px_10px_rgba(15,23,42,0.18),inset_0_1px_1px_rgba(255,255,255,0.16)]">
              {metric.value}<span className="relative -top-1.5 ml-0.5 text-xs font-semibold tracking-normal text-violet-300">+</span>
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  );
};
