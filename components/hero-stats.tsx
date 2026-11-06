'use client';

import {useEffect, useRef} from 'react';

export function HeroStats() {
 const strip = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const element = strip.current;
  if (!element) return;
  let frame = 0;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal = () => {
   element.classList.add('vh-stat-strip-visible');
   if (reducedMotion) return;
   const counters = Array.from(element.querySelectorAll<HTMLElement>('[data-vh-count]'));
   const started = performance.now();
   const tick = (now: number) => {
    const progress = Math.min((now - started) / 1100, 1);
    const eased = 1 - (1 - progress) ** 3;
    counters.forEach(counter => { counter.textContent = String(Math.round(Number(counter.dataset.vhCount) * eased)); });
    if (progress < 1) frame = requestAnimationFrame(tick);
   };
   frame = requestAnimationFrame(tick);
  };
  if (reducedMotion || !('IntersectionObserver' in window)) { reveal(); return; }
  const observer = new IntersectionObserver(entries => {
   if (entries.some(entry => entry.isIntersecting)) { reveal(); observer.disconnect(); }
  }, {threshold: 0.25});
  observer.observe(element);
  return () => { observer.disconnect(); cancelAnimationFrame(frame); };
 }, []);
 return <div className="vh-stat-strip" ref={strip} aria-label="Vista Hub at a glance"><div className="vh-stat-strip-inner">
  <div className="vh-stat"><strong aria-label="41 commercial units"><span data-vh-count="41" aria-hidden="true">41</span></strong><span>Commercial units</span></div>
  <div className="vh-stat"><strong>4–5 m</strong><span>Ceiling heights</span></div>
  <div className="vh-stat"><strong aria-label="25 plus amenities"><span data-vh-count="25" aria-hidden="true">25</span><span aria-hidden="true">+</span></strong><span>Amenities</span></div>
  <div className="vh-stat"><strong>Freehold</strong><span>Ownership</span></div>
 </div></div>;
}

