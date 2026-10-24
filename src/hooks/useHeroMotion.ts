import { useEffect, useState, type RefObject } from 'react';
import { useInView } from 'framer-motion';

const DESKTOP_QUERY = '(min-width: 1280px) and (hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** Match the hero's CSS layout and stop interactive work when it is not visible. */
export function useHeroMotion(heroRef: RefObject<HTMLElement | null>) {
  // Subscribe directly so live OS preference changes also stop existing effects.
  const [shouldReduceMotion, setShouldReduceMotion] = useState(() =>
    typeof window === 'undefined' || window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
  const isInView = useInView(heroRef, { initial: true, amount: 'some' });
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches
  );
  const [isPageVisible, setIsPageVisible] = useState(() =>
    typeof document === 'undefined' || document.visibilityState !== 'hidden'
  );

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const updateDesktop = () => setIsDesktop(query.matches);
    const updateReducedMotion = () => setShouldReduceMotion(reducedMotionQuery.matches);
    const updateVisibility = () => setIsPageVisible(document.visibilityState !== 'hidden');
    query.addEventListener('change', updateDesktop);
    reducedMotionQuery.addEventListener('change', updateReducedMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    updateDesktop();
    updateReducedMotion();
    updateVisibility();
    return () => {
      query.removeEventListener('change', updateDesktop);
      reducedMotionQuery.removeEventListener('change', updateReducedMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  return {
    shouldReduceMotion,
    isDesktop,
    isVisible: isInView && isPageVisible,
    interactiveMotion: isDesktop && !shouldReduceMotion && isInView && isPageVisible,
  };
}
