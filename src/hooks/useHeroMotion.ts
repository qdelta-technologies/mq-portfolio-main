import { type RefObject } from 'react';
import { useInView } from 'framer-motion';
import { useSiteMotion } from '../components/SiteMotion';
import { useMediaQuery } from './useMediaQuery';

const DESKTOP_QUERY = '(min-width: 1280px) and (hover: hover) and (pointer: fine)';

/** Match the hero's CSS layout and stop interactive work when it is not visible. */
export function useHeroMotion(heroRef: RefObject<HTMLElement | null>) {
  // The provider already tracks OS preferences and page visibility for every section.
  const { reducedMotion: shouldReduceMotion, pageVisible: isPageVisible } = useSiteMotion();
  const isInView = useInView(heroRef, { initial: true, amount: 'some' });
  const isDesktop = useMediaQuery(DESKTOP_QUERY);

  return {
    shouldReduceMotion,
    isDesktop,
    isVisible: isInView && isPageVisible,
    interactiveMotion: isDesktop && !shouldReduceMotion && isInView && isPageVisible,
  };
}
