'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';


const VH_CONNECTIVITY_AUTOPLAY_MS=4000;

const destinations: readonly {name: string; minutes: number; icon: string}[] = [
 {name:'Al Barari',minutes:4,icon:'rarari.webp'},
 {name:'Global Village',minutes:7,icon:'global-village.webp'},
 {name:'Dubai Silicon Oasis',minutes:7,icon:'silicon.webp'},
 {name:'Dubai Science Park',minutes:12,icon:'science-park.webp'},
 {name:'Arabian Ranches',minutes:12,icon:'arabian-ranches.webp'},
 {name:'Dubai Hills Mall',minutes:13,icon:'dubai-hills-mall.webp'},
 {name:'Downtown Dubai',minutes:17,icon:'downtown.webp'},
 {name:'Dubai Mall',minutes:18,icon:'dubai-mall.webp'},
 {name:'Dubai International Airport',minutes:20,icon:'dxb.webp'},
 {name:'Palm Jumeirah',minutes:20,icon:'palm-jumeirah.webp'},
];

export function Connectivity() {
 const [active,setActive] = useState(6);
 const section = useRef<HTMLElement>(null);

 useEffect(() => {
  const element = section.current;
  if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let visible = false;
  const observer = new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); }, {threshold: .15});
  observer.observe(element);
  const timer = window.setInterval(() => {
   if (visible && !document.hidden) setActive(index => (index + 1) % destinations.length);
  }, VH_CONNECTIVITY_AUTOPLAY_MS);
  return () => { observer.disconnect(); window.clearInterval(timer); };
 }, []);
 return <section ref={section} className="vh-connectivity" id="connectivity" aria-labelledby="vh-connectivity-title">
  <div className="vh-connectivity-stage">
   <div className="vh-container vh-connectivity-stage-content"><div className="vh-connectivity-heading"><p>VISTA HUB / CONNECTIVITY</p><h2 id="vh-connectivity-title">Well connected. <span>In every direction.</span></h2><span>Explore Dubai from Majan.</span></div></div>
  </div>
  <div className="vh-container vh-connectivity-bottom"><div className="vh-destination-panel"><div className="vh-destination-panel-heading"><h3>Destinations &amp; drive times</h3><span>FROM VISTA HUB</span></div><div className="vh-destination-grid" role="group" aria-label="Select a destination to preview">{destinations.map((item,index)=><button id={'vh-destination-'+index} key={item.name} type="button" className={'vh-destination'+(active===index?' vh-destination-active':'')} aria-pressed={active===index} onClick={()=>setActive(index)} onKeyDown={event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%destinations.length;else if(event.key==='ArrowLeft')next=(index-1+destinations.length)%destinations.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=destinations.length-1;else return;event.preventDefault();setActive(next);document.getElementById('vh-destination-'+next)?.focus();}}><span className="vh-destination-time"><Image className="vh-destination-icon" src={"/images/v2/icons/"+item.icon} alt="" width={400} height={300} unoptimized/><strong>{item.minutes}</strong><span>MIN</span></span><span className="vh-destination-name">{item.name}</span></button>)}</div></div><div className="vh-connectivity-note"><p>Select a destination to preview.</p><p>Approximate drive times. Subject to traffic.</p></div></div>
 </section>;
}



