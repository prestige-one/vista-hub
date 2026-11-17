'use client';
import {useCallback,useEffect,useRef,type ReactNode} from 'react';

/** Native scrolling keeps the gallery swipeable without an animation library. */
export function GallerySlider({children,label}:{children:ReactNode;label:string}){
 const track=useRef<HTMLDivElement>(null);
 const move=useCallback((direction:number)=>{
  const element=track.current,item=element?.firstElementChild as HTMLElement|null;
  if(!element||!item)return;
  const gap=parseFloat(getComputedStyle(element).columnGap)||0;
  const behavior=window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
  const end=element.scrollWidth-element.clientWidth;
  if(direction>0&&element.scrollLeft>=end-2){element.scrollTo({left:0,behavior});return;}
  if(direction<0&&element.scrollLeft<=2){element.scrollTo({left:end,behavior});return;}
  element.scrollBy({left:direction*(item.offsetWidth+gap),behavior});
 },[]);
 useEffect(()=>{
  const element=track.current;
  if(!element)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer:number|undefined;
  const stop=()=>{window.clearInterval(timer);timer=undefined;};
  const observer=new IntersectionObserver(([entry])=>{
   if(!entry.isIntersecting){stop();return;}
   if(timer===undefined)timer=window.setInterval(()=>{if(!document.hidden&&!reduced.matches)move(1);},4000);
  },{threshold:.3});
  observer.observe(element);
  return ()=>{observer.disconnect();stop();};
 },[move]);
 return <div className="vh-gallery-slider" role="region" aria-roledescription="carousel" aria-label={label}>
  <div className="vh-gallery-track" ref={track} tabIndex={0} aria-label="Office photos, scroll to explore">{children}</div>
  <div className="vh-gallery-arrows"><button type="button" aria-label="Previous office photos" onClick={()=>move(-1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg></button><button type="button" aria-label="Next office photos" onClick={()=>move(1)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m10 6 6 6-6 6"/></svg></button></div>
 </div>;
}
