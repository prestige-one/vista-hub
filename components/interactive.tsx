'use client';
import {useState} from 'react';
import {Photo,ActionLink} from './ui';
export function Navigation() {
 const [open,setOpen]=useState(false);
 return <header className="vh-header"><a href="#vh-top" className="vh-wordmark" aria-label="Vista Hub home">VISTA HUB<span>BY PRESTIGE ONE</span></a><nav id="vh-navigation" className={'vh-nav'+(open?' vh-nav-open':'')} aria-label="Main navigation">{[['Overview','vh-intro'],['Offices','vh-offices'],['Amenities','vh-amenities'],['Location','vh-address']].map(([label,id])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)}>{label}</a>)}</nav><a className="vh-header-cta" href="#vh-enquire">Enquire now <span aria-hidden="true">↗</span></a><button type="button" className="vh-menu" aria-label={open?'Close menu':'Open menu'} aria-controls="vh-navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?'Close −':'Menu +'}</button></header>;
}
const amenities=[
 {title:'Executive Gathering Suite',image:'executive-gathering-area.webp',text:'A setting for meaningful conversations, shared occasions and a different perspective on business.'},
 {title:'Grill Pavilion',image:'grill-pavillion.webp',text:'Bring your team together over open-air dining in a thoughtfully designed outdoor setting.'},
 {title:'Aqua Vista',image:'aqua-vista.webp',text:'A refreshing change of pace, with tranquil water and open views above the everyday.'},
 {title:'Open-Air Theatre',image:'Open-Air Theatre.webp',text:'An outdoor venue to connect, be inspired and enjoy moments beyond the working day.'},
 {title:'Podcast Studio',image:'podcast.webp',text:'Give your ideas a voice in a dedicated space for creating and sharing conversations.'},
 {title:'Wellness Area',image:'wellness-area.webp',text:'Make space to pause, restore your energy and return with a fresh perspective.'}
];
export function Amenities() {
 const [active,setActive]=useState(0);
 return <div className="vh-amenity-layout"><div className="vh-amenity-tabs" role="tablist" aria-label="Explore amenities" aria-orientation="vertical">{amenities.map((item,i)=><button type="button" key={item.title} id={'vh-amenity-tab-'+i} role="tab" aria-selected={active===i} aria-controls="vh-amenity-panel" tabIndex={active===i?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>{let next=i;if(e.key==='ArrowDown')next=(i+1)%amenities.length;else if(e.key==='ArrowUp')next=(i-1+amenities.length)%amenities.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=amenities.length-1;else return;e.preventDefault();setActive(next);document.getElementById('vh-amenity-tab-'+next)?.focus();}}><span>0{i+1}</span>{item.title}<span aria-hidden="true">{active===i?'↗':'+'}</span></button>)}</div><div id="vh-amenity-panel" role="tabpanel" aria-labelledby={'vh-amenity-tab-'+active}><Photo src={amenities[active].image} alt={amenities[active].title}/><div className="vh-amenity-caption"><h3>{amenities[active].title}</h3><p>{amenities[active].text}</p></div></div></div>;
}
const units=[
 {name:'Corporate offices',title:'Your ambition. A fitting address.',image:'workplace.webp',text:'Grade A offices with generous ceilings and abundant natural light, composed for focus, collaboration and growth.',detail:'4–5 metre ceilings'},
 {name:'Offices with balcony',title:'A broader perspective on business.',image:'pvt-ofc.webp',text:'A considered office environment with a private balcony, bringing fresh air and an outdoor perspective to your working day.',detail:'Private outdoor space'},
 {name:'Retail spaces',title:'Be part of the everyday.',image:'Lobby.webp',text:'Select retail spaces within a distinctive commercial destination, connected to the daily rhythm of Vista Hub.',detail:'Select retail collection'}
];
export function Collection() {
 const [active,setActive]=useState(0);const item=units[active];
 return <><div className="vh-collection-tabs" aria-label="Unit type">{units.map((c,i)=><button type="button" key={c.name} aria-pressed={active===i} onClick={()=>setActive(i)}>{c.name}<span aria-hidden="true">↗</span></button>)}</div><div className="vh-collection-body" aria-live="polite"><Photo src={item.image} alt={item.name}/><div className="vh-collection-copy"><span className="vh-small">0{active+1} / THE COLLECTION</span><h3>{item.title}</h3><p>{item.text}</p><dl><div><dt>Configuration</dt><dd>{item.name}</dd></div><div><dt>Highlights</dt><dd>{item.detail}</dd></div><div><dt>Ownership</dt><dd>Freehold</dd></div></dl><ActionLink>Request floor plans</ActionLink></div></div></>;
}
export function EnquiryForm() {
 const [preview,setPreview]=useState(false);
 return <form className="vh-form" onSubmit={e=>{e.preventDefault();setPreview(true);}}><div className="vh-form-grid"><label htmlFor="vh-name">Full name<input id="vh-name" name="name" placeholder="Your full name" autoComplete="name" required maxLength={100}/></label><label htmlFor="vh-email">Email address<input id="vh-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required/></label><label htmlFor="vh-phone">Phone number<input id="vh-phone" name="phone" type="tel" placeholder="+971" autoComplete="tel" required minLength={7} maxLength={25}/></label><label htmlFor="vh-interest">I’m interested in<select id="vh-interest" name="interest"><option>Corporate office</option><option>Office with balcony</option><option>Retail space</option></select></label></div><label htmlFor="vh-role">I am a<select id="vh-role" name="role"><option>Business owner</option><option>Investor</option><option>Broker</option></select></label><button className="vh-button vh-button-light" type="submit">Preview enquiry<span aria-hidden="true">↗</span></button><p className="vh-form-note" role="status">{preview?'Preview complete. Your details have not been sent or saved.':'Preview only. Enquiry submissions will be enabled soon.'}</p></form>;
}
