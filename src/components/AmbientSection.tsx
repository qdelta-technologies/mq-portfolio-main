import React, { forwardRef, useCallback, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useSiteMotion } from './SiteMotion';

export type SectionPattern = 'blueprint' | 'studio' | 'ledger' | 'constellation' | 'credentials' | 'contact';

interface AmbientSectionProps extends React.HTMLAttributes<HTMLElement> {
  pattern: SectionPattern;
}

/** CSS-only atmosphere; animation runs only in a visible section on a capable desktop. */
export const AmbientSection = forwardRef<HTMLElement, AmbientSectionProps>(function AmbientSection(
  { pattern, className = '', children, ...props }, forwardedRef
) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { ambientMotion, pageVisible } = useSiteMotion();
  const inView = useInView(sectionRef, { amount: 0.08 });
  const setRef = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }, [forwardedRef]);

  return (
    <section
      {...props}
      ref={setRef}
      className={`ambient-section ${className}`}
      data-pattern={pattern}
      data-ambient-active={ambientMotion && pageVisible && inView}
    >
      <div className="section-backdrop" aria-hidden="true">
        <div className="section-backdrop__wash" />
        <div className="section-backdrop__grid" />
        <div className="section-backdrop__dots" />
        <div className="section-backdrop__glow section-backdrop__glow--one" />
        <div className="section-backdrop__glow section-backdrop__glow--two" />
        <div className="section-backdrop__orbits"><span /><span /><span /></div>
        <div className="section-backdrop__crosshair section-backdrop__crosshair--one" />
        <div className="section-backdrop__crosshair section-backdrop__crosshair--two" />
      </div>
      {children}
    </section>
  );
});
