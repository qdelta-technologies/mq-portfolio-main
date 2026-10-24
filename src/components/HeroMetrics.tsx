import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const METRICS = [
  { value: '2', title: 'Years of experience', detail: 'Design & development', position: 'lg:col-start-1' },
  { value: '10', title: 'Happy clients', detail: 'Global businesses & teams', position: 'lg:col-start-3' },
  { value: '12', title: 'Projects shipped', detail: 'Websites, Content & Automation', position: 'lg:col-start-1' },
];

/** Compact summary tiles on mobile; staggered glass capsules on desktop. */
export const HeroMetrics: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full text-left">
      <dl className="grid grid-cols-3 gap-2 sm:gap-2.5 lg:grid-cols-12 lg:gap-x-0 lg:gap-y-5" style={{ perspective: 1000 }}>
        {METRICS.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={shouldReduceMotion ? undefined : {
              y: -3,
              rotateX: 2,
              rotateY: -3,
              transition: { duration: 0.22, delay: 0 },
            }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`hero-metric-glass relative col-span-1 lg:col-span-10 ${metric.position} flex min-h-[100px] lg:min-h-[84px] flex-col lg:flex-row items-center justify-center lg:justify-start gap-1.5 lg:gap-3 rounded-2xl lg:rounded-full px-2 lg:px-4 py-3`}
          >
            <dt className="order-2 min-w-0">
              <span className="flex min-h-7 items-center justify-center text-center text-[10.5px] sm:text-[11px] lg:block lg:min-h-0 lg:text-left lg:text-xs font-bold tracking-tight text-slate-900 leading-snug">
                {metric.title}
              </span>
              <span className="sr-only lg:not-sr-only lg:mt-1 lg:block lg:text-[11px] font-medium leading-relaxed text-copy-secondary">
                {metric.detail}
              </span>
            </dt>
            <dd className="order-1 shrink-0 font-display text-[34px] sm:text-[36px] lg:text-[42px] font-medium tracking-[-0.075em] leading-none text-slate-950 tabular-nums">
              {metric.value}<span className="relative -top-2.5 lg:-top-3 ml-0.5 text-sm lg:text-[17px] font-medium tracking-normal text-violet-600">+</span>
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  );
};
