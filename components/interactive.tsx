'use client';
import {useState} from 'react';
import {LeadPopupTrigger} from './lead-popup-trigger';

export function Navigation() {
 const [open,setOpen]=useState(false);
 return <header className="vh-header"><a href="#top" className="vh-wordmark" aria-label="Vista Hub home">VISTA HUB<span>BY PRESTIGE ONE</span></a><nav id="vh-navigation" className={'vh-nav'+(open?' vh-nav-open':'')} aria-label="Main navigation">{[['Offices','offices'],['Amenities','amenities'],['Collection','space-reveal'],['Location','address']].map(([label,id])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)}>{label}</a>)}</nav><LeadPopupTrigger className="vh-header-cta" intent="early-access">Secure Early Access</LeadPopupTrigger><button type="button" className="vh-menu" aria-label={open?'Close menu':'Open menu'} aria-controls="vh-navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?'Close −':'Menu +'}</button></header>;
}



