'use client';

import {useEffect,useRef} from 'react';

/** Short sliced-text glitch, driven entirely by CSS while on screen. */
export function SignalText({text}:{text:string}){
 const root=useRef<HTMLSpanElement>(null);
 useEffect(()=>{
  const el=root.current;if(!el)return;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false;
  const sync=()=>{el.dataset.running=String(visible&&!document.hidden&&!motion.matches);};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.2});
  observer.observe(el);
  document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);motion.removeEventListener('change',sync);};
 },[]);
 return <span ref={root} className="vh-signal-text" data-running="false"><span className="vh-visually-hidden">{text}</span><span className="vh-signal-base" aria-hidden="true">{text}</span><span className="vh-signal-upper" aria-hidden="true">{text}</span><span className="vh-signal-lower" aria-hidden="true">{text}</span></span>;
}