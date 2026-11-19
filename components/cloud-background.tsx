'use client';
import {useEffect,useRef} from 'react';

export function CloudBackground(){
 const canvas=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const element=canvas.current;if(!element)return;
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const connection=(navigator as Navigator&{connection?:{saveData?:boolean}}).connection;
  const scheduleIdle=window.requestIdleCallback as typeof window.requestIdleCallback|undefined;
  let generation=0,idle=0,timer=0,dispose:(()=>void)|undefined;
  const cancel=()=>{generation++;window.clearTimeout(timer);if(idle&&'cancelIdleCallback'in window)window.cancelIdleCallback(idle);dispose?.();dispose=undefined;};
  const sync=()=>{
   cancel();if(motion.matches||connection?.saveData)return;
   const current=generation;
   const load=()=>{void import('../lib/clouds2-renderer').then(({createClouds2})=>{if(current===generation)dispose=createClouds2(element);}).catch(()=>{});};
   if(scheduleIdle)idle=scheduleIdle.call(window,load,{timeout:1800});
   else timer=window.setTimeout(load,500);
  };
  sync();motion.addEventListener('change',sync);
  return()=>{cancel();motion.removeEventListener('change',sync);};
 },[]);
 return <canvas ref={canvas} className="vh-coming-clouds" width={1} height={1} aria-hidden="true"/>;
}
