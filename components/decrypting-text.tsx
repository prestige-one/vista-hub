'use client';
import {useEffect,useRef,useState} from 'react';

const VH_DECRYPT_SYMBOLS='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?#%&';

export function DecryptingText({text,interval=3000}:{text:string;interval?:number}){
 const [display,setDisplay]=useState(text);
 const root=useRef<HTMLSpanElement>(null);
 useEffect(()=>{
  const element=root.current;
  if(!element)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const characters=Array.from(text);
  let visible=false,cycle:number|undefined,tick:number|undefined;
  const cancel=()=>{window.clearInterval(cycle);window.clearTimeout(tick);cycle=undefined;tick=undefined;};
  const play=()=>{
   if(!visible||document.hidden||reduced.matches)return;
   window.clearTimeout(tick);
   const started=performance.now();
   const frame=()=>{
    const progress=Math.min(1,(performance.now()-started)/750);
    if(progress===1){setDisplay(text);tick=undefined;return;}
    const revealed=Math.floor(progress*characters.length);
    setDisplay(characters.map((character,index)=>index<revealed||/\s/.test(character)?character:VH_DECRYPT_SYMBOLS[Math.floor(Math.random()*VH_DECRYPT_SYMBOLS.length)]).join(''));
    tick=window.setTimeout(frame,55);
   };
   frame();
  };
  const sync=()=>{
   cancel();setDisplay(text);
   if(visible&&!document.hidden&&!reduced.matches){play();cycle=window.setInterval(play,Math.max(1000,interval));}
  };
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.5});
  observer.observe(element);document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
  return ()=>{observer.disconnect();cancel();document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',sync);};
 },[text,interval]);
 const characters=Array.from(display);
 return <span ref={root} className="vh-decrypt-text" data-vh-decrypting={display!==text}><span className="vh-visually-hidden">{text}</span><span className="vh-decrypt-visual" aria-hidden="true">{Array.from(text).map((character,index)=><span className="vh-decrypt-character" key={index}><span className="vh-decrypt-measure">{character}</span><span className={'vh-decrypt-glyph'+(characters[index]!==character?' vh-decrypt-scrambled':' ')}>{characters[index]}</span></span>)}</span></span>;
}