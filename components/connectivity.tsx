'use client';

import {useEffect, useRef, useState} from 'react';


const VH_CONNECTIVITY_AUTOPLAY_MS=4000;

type DestinationIcon = 'park' | 'science' | 'home' | 'wheel' | 'mall' | 'tower' | 'palm' | 'plane';
const destinations: readonly {name: string; minutes: number; icon: DestinationIcon}[] = [
 {name:'Al Barari',minutes:4,icon:'park'},
 {name:'Global Village',minutes:7,icon:'wheel'},
 {name:'Dubai Silicon Oasis',minutes:7,icon:'tower'},
 {name:'Dubai Science Park',minutes:12,icon:'science'},
 {name:'Arabian Ranches',minutes:12,icon:'home'},
 {name:'Dubai Hills Mall',minutes:13,icon:'mall'},
 {name:'Downtown Dubai',minutes:17,icon:'tower'},
 {name:'Dubai Mall',minutes:18,icon:'mall'},
 {name:'Dubai International Airport',minutes:20,icon:'plane'},
 {name:'Palm Jumeirah',minutes:20,icon:'palm'},
];

const iconPaths: Record<DestinationIcon,string> = {
 park:'M9 21V11m-6 7h18M9 3C7 3 3 9 3 12a6 6 0 0 0 12 0c0-3-4-9-6-9Zm9 18v-8m-2-6c1-2 2-3 2-3s4 6 4 9a4 4 0 0 1-6 3',
 science:'M9 3h6m-5 0v7L4 19a1.3 1.3 0 0 0 1 2h14a1.3 1.3 0 0 0 1-2l-6-9V3M7 15h10',
 home:'m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7',
 wheel:'M12 21v-9m-4 9h8M12 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0v18M3 11h18M6 5l12 12M18 5 6 17',
 mall:'M4 8h16l1 13H3L4 8Zm4 2V6a4 4 0 0 1 8 0v4',
 tower:'M12 1v5m-2 4V6h4v4M8 15v-5h8v5M6 21v-6h12v6M3 21h18M12 11v10',
 palm:'M10 22c2-5 3-9 2-14m3 14c0-6-1-10-3-14M2 8c4-4 7-4 10 0-1-6-6-7-9-5m9 5c3-5 7-5 10-3M12 8c6-2 9 1 10 4M12 8c-6 0-9 3-10 6m10-6c3 0 5 4 6 7',
 plane:'M22 3 9 14l-6-2-2 2 6 4 4 5 2-2-2-6L22 3ZM9 14 4 3l3-1 8 7M7 18l-4 4',
};
function DestinationSymbol({icon}: {icon: DestinationIcon}) {
 return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[icon]}/></svg>;
}

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
  <div className="vh-container vh-connectivity-bottom"><div className="vh-destination-panel"><div className="vh-destination-panel-heading"><h3>Destinations &amp; drive times</h3><span>FROM VISTA HUB</span></div><div className="vh-destination-grid" role="group" aria-label="Select a destination to preview">{destinations.map((item,index)=><button id={'vh-destination-'+index} key={item.name} type="button" className={'vh-destination'+(active===index?' vh-destination-active':'')} aria-pressed={active===index} onClick={()=>setActive(index)} onKeyDown={event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%destinations.length;else if(event.key==='ArrowLeft')next=(index-1+destinations.length)%destinations.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=destinations.length-1;else return;event.preventDefault();setActive(next);document.getElementById('vh-destination-'+next)?.focus();}}><span className="vh-destination-time"><DestinationSymbol icon={item.icon}/><strong>{item.minutes}</strong><span>MIN</span></span><span className="vh-destination-name">{item.name}</span></button>)}</div></div><div className="vh-connectivity-note"><p>Select a destination to preview.</p><p>Approximate drive times. Subject to traffic.</p></div></div>
 </section>;
}



