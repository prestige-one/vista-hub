'use client';

import Image from 'next/image';
import {useCallback,useEffect,useRef,useState,type CSSProperties} from 'react';
import type {AmenitySpace} from './amenity-data';

type Slide={index:number;incoming:number|null;direction:number;moving:boolean};
const imageSizes='(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) calc(100vw - 64px), (max-width: 1392px) calc(100vw - 112px), 1280px';

export function MotionShowcase({spaces}:{spaces:readonly AmenitySpace[]}){
 const [slide,setSlide]=useState<Slide>({index:0,incoming:null,direction:1,moving:false});
 const [visible,setVisible]=useState(false);
 const root=useRef<HTMLElement>(null),locked=useRef(false),reduced=useRef(false),touch=useRef<{x:number;y:number}|null>(null);
 const item=spaces[slide.moving&&slide.incoming!==null?slide.incoming:slide.index];
 const move=useCallback((step:number)=>{
  if(locked.current||spaces.length<2)return;
  locked.current=true;
  setSlide(value=>({...value,incoming:(value.index+step+spaces.length)%spaces.length,direction:step,moving:false}));
 },[spaces.length]);
 const finish=useCallback(()=>{
  setSlide(value=>value.moving&&value.incoming!==null?{...value,index:value.incoming,incoming:null,moving:false}:value);
  locked.current=false;
 },[]);
 useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>{reduced.current=media.matches;};sync();media.addEventListener('change',sync);return()=>media.removeEventListener('change',sync);},[]);
 useEffect(()=>{const element=root.current;if(!element)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.25});observer.observe(element);return()=>observer.disconnect();},[]);
 useEffect(()=>{if(!visible)return;const timer=window.setInterval(()=>{if(!document.hidden&&!reduced.current)move(1);},4000);return()=>window.clearInterval(timer);},[visible,move]);
 // Animation-end commits the existing incoming element; the timer covers interrupted animations.
 useEffect(()=>{if(!slide.moving)return;const timer=window.setTimeout(finish,1200);return()=>window.clearTimeout(timer);},[slide.moving,finish]);
 const ready=async(index:number,image:HTMLImageElement)=>{
  try{await image.decode();}catch{/* Loaded images can still be displayed when decode is unsupported. */}
  setSlide(value=>{
   if(value.incoming!==index||value.moving)return value;
   if(reduced.current){locked.current=false;return {...value,index,incoming:null,moving:false};}
   return {...value,moving:true};
  });
 };
 const failed=(index:number)=>{setSlide(value=>value.incoming===index?{...value,incoming:null,moving:false}:value);locked.current=false;};
 const frames=slide.incoming===null?[slide.index]:[slide.index,slide.incoming];
 return <section ref={root} className="vh-motion" role="region" aria-roledescription="carousel" aria-label="Vista Hub amenities" tabIndex={0} data-moving={slide.moving} style={{'--vh-motion-direction':slide.direction} as CSSProperties} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1);}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}}} onTouchStart={event=>{const p=event.touches[0];touch.current={x:p.clientX,y:p.clientY};}} onTouchEnd={event=>{if(!touch.current)return;const p=event.changedTouches[0],dx=p.clientX-touch.current.x,dy=p.clientY-touch.current.y;touch.current=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.3)move(dx<0?1:-1);}}>
  <div className="vh-motion-backgrounds" aria-hidden="true">
   {frames.map(index=>{
    const incoming=index===slide.incoming;
    return <div className={'vh-motion-frame '+(incoming?'vh-motion-incoming':slide.moving?'vh-motion-outgoing':'vh-motion-current')} key={spaces[index].id} data-vh-slide={spaces[index].id} onAnimationEnd={event=>{if(incoming&&event.target===event.currentTarget)finish();}}><Image src={'/images/'+spaces[index].image} alt="" fill sizes={imageSizes} unoptimized onLoad={event=>{if(incoming)void ready(index,event.currentTarget);}} onError={()=>{if(incoming)failed(index);}}/></div>;
   })}
  </div>
  <div className="vh-motion-shade" aria-hidden="true"/>
  <header className="vh-motion-header"><div className="vh-motion-brand">VISTA HUB<span>THE AMENITIES</span></div></header>
  <div className="vh-motion-story" key={item.id} aria-live="off"><div className="vh-motion-title"><p>{item.category} / Amenities</p><h2>{item.title}</h2></div></div>
  <div className="vh-motion-bottom"><div className="vh-motion-navigation"><button type="button" aria-label="Previous amenity" disabled={slide.incoming!==null} onClick={()=>move(-1)}>PREV</button><span className="vh-motion-progress" aria-hidden="true"><span style={{width:(((slide.moving&&slide.incoming!==null?slide.incoming:slide.index)+1)/spaces.length*100)+'%'}}/></span><button type="button" aria-label="Next amenity" disabled={slide.incoming!==null} onClick={()=>move(1)}>NEXT</button></div></div>
 </section>;
}





