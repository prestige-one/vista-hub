'use client';
import {useEffect,useState} from 'react';
import {LeadPopupTrigger} from './lead-popup-trigger';

export function Navigation() {
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);
 useEffect(()=>{
  const hero=document.getElementById('top');
  if(!hero)return;
  const observer=new IntersectionObserver(([entry])=>setScrolled(!entry.isIntersecting),{rootMargin:'-80px 0px 0px'});
  observer.observe(hero);
  return ()=>observer.disconnect();
 },[]);
 return <header className={'vh-header'+(scrolled?' vh-header-scrolled':'')}><a href="#top" className="vh-wordmark" aria-label="Vista Hub home">VISTA HUB<span>BY PRESTIGE ONE</span></a><nav id="vh-navigation" className={'vh-nav'+(open?' vh-nav-open':'')} aria-label="Main navigation">{[['Offices','offices'],['Amenities','amenities'],['Portfolio','portfolio'],['Location','location']].map(([label,id])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)}>{label}</a>)}</nav><LeadPopupTrigger className="vh-header-cta" intent="early-access">Secure Early Access</LeadPopupTrigger><button type="button" className="vh-menu" aria-label={open?'Close menu':'Open menu'} aria-controls="vh-navigation" aria-expanded={open} onClick={()=>setOpen(!open)}><svg className="vh-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">{open?<path d="m6 6 12 12M18 6 6 18"/>:<path d="M4 6h16M4 12h16M4 18h16"/>}</svg></button></header>;
}



