import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, MotionConfig, useScroll } from 'framer-motion';

interface MotionPreferences {
  reducedMotion: boolean;
  ambientMotion: boolean;
  pageVisible: boolean;
}

const MotionContext = createContext<MotionPreferences>({ reducedMotion: true, ambientMotion: false, pageVisible: true });
const DESKTOP_MOTION = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';

function readPreferences(): MotionPreferences {
  if (typeof window === 'undefined') return { reducedMotion: true, ambientMotion: false, pageVisible: true };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return {
    reducedMotion,
    ambientMotion: !reducedMotion && window.matchMedia(DESKTOP_MOTION).matches,
    pageVisible: document.visibilityState !== 'hidden',
  };
}

export const SiteMotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState(readPreferences);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia(DESKTOP_MOTION);
    const update = () => setPreferences(previous => {
      const next = readPreferences();
      return Object.keys(next).every(key => next[key as keyof MotionPreferences] === previous[key as keyof MotionPreferences]) ? previous : next;
    });
    reduced.addEventListener('change', update);
    desktop.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {
      reduced.removeEventListener('change', update);
      desktop.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  return <MotionContext.Provider value={preferences}><MotionConfig reducedMotion={preferences.reducedMotion ? 'always' : 'never'}>{children}</MotionConfig></MotionContext.Provider>;
};

export const useSiteMotion = () => useContext(MotionContext);

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  return <motion.div aria-hidden="true" className="site-scroll-progress" style={{ scaleX: scrollYProgress }} />;
};

export const PageProgress: React.FC = () => {
  const { reducedMotion, pageVisible } = useSiteMotion();
  return reducedMotion || !pageVisible ? null : <ScrollProgress />;
};
