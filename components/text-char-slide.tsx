'use client';

import {useEffect, useRef, type CSSProperties} from 'react';

type TextSegment = {text: string; accent?: boolean; shimmer?: boolean};

/** A single viewport observer starts the CSS cascade; no animation dependency. */
export function TextCharSlide({segments}: {segments: readonly TextSegment[]}) {
 const title = useRef<HTMLHeadingElement>(null);
 const text = segments.map(segment => segment.text).join('');
 useEffect(() => {
  const element = title.current;
  if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  element.classList.add('vh-char-ready');
  const observer = new IntersectionObserver(entries => {
   if (entries.some(entry => entry.isIntersecting)) {
    element.classList.add('vh-char-visible');
    observer.disconnect();
   }
  }, {threshold: .3});
  observer.observe(element);
  return () => observer.disconnect();
 }, []);
 let offset = 0;
 return <h2 ref={title} className="vh-char-slide" aria-label={text} onAnimationEnd={event => {
  if (event.animationName === 'vh-char-slide-in' && event.target instanceof HTMLElement && event.target.dataset.vhLast === 'true') title.current?.classList.add('vh-char-complete');
 }}><span aria-hidden="true">{segments.map((segment, index) => {
  const content = segment.text.split(/(\s+)/).map((word, wordIndex) => {
   const start = offset;
   offset += word.length;
   if (/^\s+$/.test(word)) return word;
   return <span className="vh-char-word" key={wordIndex}>{Array.from(word).map((char, charIndex) => <span className="vh-title-char" key={charIndex} data-vh-last={start + charIndex === text.length - 1 ? 'true' : undefined} style={{'--vh-char-delay': `${((start + charIndex) / text.length) * .65}s`} as CSSProperties}>{char}</span>)}</span>;
  });
  return <span key={index} className={[segment.accent ? 'vh-title-accent' : '',segment.shimmer ? 'vh-text-shimmer' : ''].filter(Boolean).join(' ')}>{content}</span>;
 })}</span></h2>;
}
