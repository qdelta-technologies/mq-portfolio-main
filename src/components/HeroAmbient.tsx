import React, { type RefObject } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from 'framer-motion';

interface AmbientLayersProps {
  violet?: MotionStyle;
  amber?: MotionStyle;
  lavender?: MotionStyle;
  grid?: MotionStyle;
}

const AmbientLayers: React.FC<AmbientLayersProps> = ({ violet, amber, lavender, grid }) => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
    <motion.div style={violet} className="absolute top-[20%] right-[12%] w-[580px] h-[580px] bg-violet-300/35 rounded-full blur-3xl opacity-80" />
    <motion.div style={amber} className="absolute top-[35%] left-[8%] w-[520px] h-[520px] bg-amber-100/50 rounded-full blur-3xl opacity-75" />
    <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[640px]">
      <motion.div style={lavender} className="h-full w-full bg-purple-200/35 rounded-full blur-3xl opacity-70" />
    </div>
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(100,116,139,0.20) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,0.20) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        maskImage: 'radial-gradient(ellipse 85% 75% at 50% 45%, black 45%, transparent 95%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 45%, black 45%, transparent 95%)',
        ...grid,
      }}
    />
  </div>
);

interface HeroAmbientProps {
  active: boolean;
  heroRef: RefObject<HTMLElement | null>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}

/** Only mounted on visible desktops: touch/reduced-motion views have no scroll listener. */
const AnimatedAmbient: React.FC<Omit<HeroAmbientProps, 'active'>> = ({ heroRef, pointerX, pointerY }) => {
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const x = useSpring(pointerX, { stiffness: 100, damping: 28, mass: 0.7 });
  const y = useSpring(pointerY, { stiffness: 100, damping: 28, mass: 0.7 });
  const violetX = useTransform(x, value => value * 7);
  const violetY = useTransform([scrollYProgress, y], ([scroll, pointer]) => Number(scroll) * 28 + Number(pointer) * 5);
  const amberX = useTransform(x, value => value * -5);
  const amberY = useTransform([scrollYProgress, y], ([scroll, pointer]) => Number(scroll) * -18 - Number(pointer) * 4);
  const lavenderY = useTransform(scrollYProgress, [0, 1], [0, 14]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 8]);

  return <AmbientLayers violet={{ x: violetX, y: violetY }} amber={{ x: amberX, y: amberY }} lavender={{ y: lavenderY }} grid={{ y: gridY }} />;
};

export const HeroAmbient = React.memo(function HeroAmbient({ active, ...props }: HeroAmbientProps) {
  return active ? <AnimatedAmbient {...props} /> : <AmbientLayers />;
});
