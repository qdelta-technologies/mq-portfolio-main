import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'framer-motion';

interface HeroMagneticLinkProps extends HTMLMotionProps<'a'> {
  magnetic: boolean;
}

/** Tiny desktop-only attraction; the actual link, focus ring and hit area stay native. */
export const HeroMagneticLink: React.FC<HeroMagneticLinkProps> = ({ magnetic, children, ...props }) => {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 320, damping: 28, mass: 0.45 });
  const y = useSpring(targetY, { stiffness: 320, damping: 28, mass: 0.45 });
  const reset = () => { targetX.set(0); targetY.set(0); };

  useEffect(() => {
    if (!magnetic) { targetX.set(0); targetY.set(0); }
  }, [magnetic, targetX, targetY]);

  return (
    <motion.a
      {...props}
      style={{ x: magnetic ? x : 0, y: magnetic ? y : 0 }}
      onPointerMove={magnetic ? event => {
        if (event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const normalizedX = (event.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2);
        const normalizedY = (event.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2);
        targetX.set(Math.max(-1, Math.min(1, normalizedX)) * 3);
        targetY.set(Math.max(-1, Math.min(1, normalizedY)) * 2);
      } : undefined}
      onPointerLeave={reset}
      onBlur={reset}
      whileTap={magnetic ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.a>
  );
};
