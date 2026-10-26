import React, { useEffect, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

const ROLES = ['Designer', 'Developer', 'Marketer', 'Researcher', 'AI Generalist'];

/** Keep per-character updates local instead of re-rendering the entire hero. */
export const HeroRole = React.memo(function HeroRole({ reducedMotion, visible }: { reducedMotion: boolean; visible: boolean }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete || reducedMotion || !visible) return;
    const currentWord = ROLES[roleIndex];
    const isLastWord = roleIndex === ROLES.length - 1;
    let timer: ReturnType<typeof setTimeout>;
    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        timer = setTimeout(() => setDisplayedText(currentWord.slice(0, displayedText.length + 1)), 45);
      } else if (isLastWord) {
        timer = setTimeout(() => setIsComplete(true), 350);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 850);
      }
    } else if (displayedText.length > 0) {
      timer = setTimeout(() => setDisplayedText(currentWord.slice(0, displayedText.length - 1)), 22);
    } else {
      timer = setTimeout(() => { setIsDeleting(false); setRoleIndex(previous => previous + 1); }, 120);
    }
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, isComplete, reducedMotion, visible]);

  return (
    <div className="mt-2.5 sm:mt-3 h-8 sm:h-9 flex items-center justify-center">
      <div className="inline-flex items-center text-base sm:text-lg md:text-xl font-bold text-slate-800 tracking-tight">
        <span className="sr-only">{PERSONAL_INFO.title}</span>
        <span aria-hidden="true">{reducedMotion ? PERSONAL_INFO.title : displayedText}</span>
        <span
          className={`inline-block w-[2.5px] h-5 sm:h-6 bg-violet-600 ml-1 rounded-full transition-opacity duration-300 ${isComplete || reducedMotion ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-pulse'}`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
});
