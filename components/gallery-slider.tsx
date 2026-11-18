'use client';
import {ChevronIcon} from './chevron-icon';
import {Children,cloneElement,isValidElement,useCallback,useEffect,useRef,type HTMLAttributes,type ReactElement,type ReactNode} from 'react';

/** Native scrolling keeps the gallery swipeable without an animation library. */
export function GallerySlider({children,label}:{children:ReactNode;label:string}){
 const track=useRef<HTMLDivElement>(null),backwardFrame=useRef(0);
 const slides=Children.toArray(children),count=slides.length;
 // Only the first two images are repeated: enough to bridge the two-column view.
 const bridge=count>1?slides.slice(0,2).map((child,index)=>isValidElement(child)?cloneElement(child as ReactElement<HTMLAttributes<HTMLElement>>,{key:'vh-gallery-bridge-'+index,'aria-hidden':true,inert:true}):null):[];
 const stepWidth=(element:HTMLDivElement)=>{
  const item=element.firstElementChild as HTMLElement|null;
  return item?item.getBoundingClientRect().width+(parseFloat(getComputedStyle(element).columnGap)||0):0;
 };
 useEffect(()=>{
  const element=track.current;
  if(!element||count<2)return;
  let settled:number|undefined,logical=0,lastWidth=element.clientWidth;
  const normalize=()=>{
   const step=stepWidth(element);
   if(!step)return;
   const index=Math.round(element.scrollLeft/step);
   logical=index%count;
   // The bridge and original are visually identical, so this reset is invisible.
   if(index>=count)element.scrollTo({left:logical*step,behavior:'instant'});
  };
  const scroll=()=>{
   window.clearTimeout(settled);
   const step=stepWidth(element);
   if(step)logical=Math.round(element.scrollLeft/step)%count;
   settled=window.setTimeout(normalize,140);
  };
  const resize=new ResizeObserver(()=>{
   if(element.clientWidth===lastWidth)return;
   lastWidth=element.clientWidth;
   element.scrollTo({left:logical*stepWidth(element),behavior:'instant'});
  });
  resize.observe(element);element.addEventListener('scroll',scroll,{passive:true});
  return ()=>{resize.disconnect();element.removeEventListener('scroll',scroll);window.clearTimeout(settled);cancelAnimationFrame(backwardFrame.current);};
 },[count]);
 const move=useCallback((direction:number)=>{
  const element=track.current;
  if(!element||count<2)return;
  const step=stepWidth(element);
  if(!step)return;
  const behavior=window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
  cancelAnimationFrame(backwardFrame.current);
  let index=Math.round(element.scrollLeft/step);
  if(direction<0&&index===0){
   element.scrollTo({left:count*step,behavior:'instant'});
   backwardFrame.current=requestAnimationFrame(()=>element.scrollTo({left:(count-1)*step,behavior}));
   return;
  }
  if(index>=count){index%=count;element.scrollTo({left:index*step,behavior:'instant'});}
  element.scrollTo({left:(index+direction)*step,behavior});
 },[count]);
 useEffect(()=>{
  const element=track.current;
  if(!element||count<2)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer:number|undefined;
  const stop=()=>{window.clearInterval(timer);timer=undefined;};
  const observer=new IntersectionObserver(([entry])=>{
   if(!entry.isIntersecting){stop();return;}
   if(timer===undefined)timer=window.setInterval(()=>{if(!document.hidden&&!reduced.matches)move(1);},4000);
  },{threshold:.3});
  observer.observe(element);
  return ()=>{observer.disconnect();stop();};
 },[move,count]);
 return <div className="vh-gallery-slider" role="region" aria-roledescription="carousel" aria-label={label}>
  <div className="vh-gallery-track" ref={track} tabIndex={0} aria-label="Office photos, scroll to explore">{slides}{bridge}</div>
  <div className="vh-gallery-arrows"><button type="button" aria-label="Previous office photos" onClick={()=>move(-1)}><ChevronIcon direction="left"/></button><button type="button" aria-label="Next office photos" onClick={()=>move(1)}><ChevronIcon/></button></div>
 </div>;
}
