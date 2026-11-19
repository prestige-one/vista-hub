'use client';
import {useEffect,useRef} from 'react';
import type {ReactNode} from 'react';

export function ComingSoonMotion({children}:{children:ReactNode}){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const sync=()=>{if(root.current)root.current.dataset.playing=String(!document.hidden);};
  sync();document.addEventListener('visibilitychange',sync);
  return()=>document.removeEventListener('visibilitychange',sync);
 },[]);
 return <div ref={root} className="vh-coming-page" data-playing="false">{children}</div>;
}