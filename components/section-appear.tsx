'use client';

import {useEffect} from 'react';

/** One shared observer; animations run once, without a scroll listener or React updates. */
export function SectionAppear(){
 useEffect(()=>{
  if(!('IntersectionObserver' in window))return;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets=new Set<HTMLElement>();
  let observer:IntersectionObserver|undefined;
  const clear=()=>{
   observer?.disconnect();
   targets.forEach(el=>el.classList.remove('vh-appear-ready','vh-title-reveal-ready','vh-appear-visible'));
   targets.clear();
  };
  const setup=()=>{
   clear();
   if(motion.matches)return;
   observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
     if(!entry.isIntersecting)return;
     entry.target.classList.add('vh-appear-visible');
     observer?.unobserve(entry.target);
    });
   },{threshold:0,rootMargin:'0px 0px -36px 0px'});
   document.querySelectorAll<HTMLElement>('#main > section').forEach(section=>{
    // Never transform the pinned portfolio stage or duplicate the existing character reveal.
    const content=section.matches('.vh-hero,.vh-space-reveal,.vh-intro')?null:section.querySelector<HTMLElement>(':scope > .vh-container');
    if(content){content.classList.add('vh-appear-ready');targets.add(content);observer?.observe(content);}
    const titleId=section.getAttribute('aria-labelledby');
    const title=titleId?document.getElementById(titleId):null;
    if(title&&!title.classList.contains('vh-char-slide')){
     title.classList.add('vh-title-reveal-ready');targets.add(title);observer?.observe(title);
    }
   });
  };
  const focus=(event:FocusEvent)=>{
   if(!(event.target instanceof HTMLElement))return;
   const section=event.target.closest('section');
   targets.forEach(el=>{if(section?.contains(el)){el.classList.add('vh-appear-visible');observer?.unobserve(el);}});
  };
  setup();motion.addEventListener('change',setup);document.addEventListener('focusin',focus);
  return()=>{clear();motion.removeEventListener('change',setup);document.removeEventListener('focusin',focus);};
 },[]);
 return null;
}