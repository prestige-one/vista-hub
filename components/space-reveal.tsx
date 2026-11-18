'use client';

import {useEffect,useRef} from 'react';
import {Photo} from './ui';
import {Collection} from './collection';
import {spaceCollectionState,spaceRevealState} from './space-reveal-progress';

export function SpaceReveal(){
 const root=useRef<HTMLElement>(null),intro=useRef<HTMLDivElement>(null),panel=useRef<HTMLDivElement>(null),details=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const section=root.current,opening=intro.current,box=panel.current,collection=details.current;if(!section||!opening||!box||!collection)return;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const groups=Array.from(collection.querySelectorAll<HTMLElement>('.vh-collection-choices,.vh-collection-feature,.vh-collection-note'));
  let frame=0,visible=false;
  const update=()=>{
   frame=0;
   const staticView=motion.matches||window.innerHeight<560;
   section.dataset.static=String(staticView);
   const raw=staticView?1:-opening.getBoundingClientRect().top/Math.max(1,opening.offsetHeight-(opening.firstElementChild as HTMLElement).offsetHeight);
   const state=spaceRevealState(raw),side=window.innerWidth<=760?14:window.innerWidth<=1100?22:35;
   box.style.setProperty('--vh-space-x',side*(1-state.progress)+'%');
   box.style.setProperty('--vh-space-y',24*(1-state.progress)+'%');
   box.style.setProperty('--vh-space-radius',10*(1-state.progress)+'px');
   section.dataset.progress=state.progress.toFixed(3);
   const heading=box.querySelector<HTMLElement>('.vh-space-content');
   section.style.setProperty('--vh-space-copy-half',((heading?.offsetHeight??270)/2)+'px');
   const top=collection.getBoundingClientRect().top;
   for(const group of groups){
    const reveal=spaceCollectionState(staticView?0:top+group.offsetTop,window.innerHeight,staticView?1:(raw-.82)/.18);
    group.style.opacity=String(reveal.opacity);group.style.transform='translateY('+reveal.translate+'px)';
    group.inert=reveal.opacity<.1;
   }
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const scroll=()=>{if(visible)schedule();};
  const observer=new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);if(visible)schedule();},{rootMargin:'150px 0px'});
  observer.observe(section);window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',schedule);motion.addEventListener('change',schedule);update();
  return()=>{observer.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',schedule);motion.removeEventListener('change',schedule);};
 },[]);
 return <section ref={root} id="portfolio" className="vh-space-reveal" aria-labelledby="vh-space-reveal-title">
  <div ref={intro} className="vh-space-intro"><div className="vh-space-stage">
   <div className="vh-space-backdrop" aria-hidden="true"><Photo src="v2/vita-hub-view-outside.webp" alt="" unoptimized sizes="100vw"/></div>
   <div ref={panel} className="vh-space-panel"><header className="vh-space-content">
    <p className="vh-eyebrow">THE PRESTIGE COLLECTION</p><h2 id="vh-space-reveal-title">The address of <span>success</span></h2><span className="vh-space-divider" aria-hidden="true"/><p className="vh-space-description">Corporate offices, private balconies and select retail.<br/>Find the setting for your professional ambition.</p>
   </header></div>
  </div></div>
  <div className="vh-space-collection"><div ref={details} className="vh-container vh-space-collection-inner"><Collection idPrefix="vh-space-collection" label="Expanded collection unit type"/><p className="vh-collection-note">Images illustrate the Vista Hub environment. Request floor plans for individual unit layouts.</p></div></div>
 </section>;
}


