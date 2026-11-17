'use client';
import {useState} from 'react';
import {LeadPopupTrigger} from './lead-popup-trigger';

export function Navigation() {
 const [open,setOpen]=useState(false);
 return <header className="vh-header"><a href="#top" className="vh-wordmark" aria-label="Vista Hub home">VISTA HUB<span>BY PRESTIGE ONE</span></a><nav id="vh-navigation" className={'vh-nav'+(open?' vh-nav-open':'')} aria-label="Main navigation">{[['Overview','intro'],['Offices','offices'],['Amenities','amenities'],['Location','address']].map(([label,id])=><a key={id} href={'#'+id} onClick={()=>setOpen(false)}>{label}</a>)}</nav><LeadPopupTrigger className="vh-header-cta" intent="enquiry">Enquire now <span aria-hidden="true">↗</span></LeadPopupTrigger><button type="button" className="vh-menu" aria-label={open?'Close menu':'Open menu'} aria-controls="vh-navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?'Close −':'Menu +'}</button></header>;
}



