'use client';
import {ChevronIcon} from './chevron-icon';
import {FormStatus} from './form-status';

import {useEffect,useRef,useState} from 'react';
import {PhoneInput} from './phone-input';
import {Photo} from './ui';
import {VistaLogo} from './vista-logo';
import {buildLeadPayload} from './lead-payload';
import {useLeadSubmission} from './use-lead-submission';
import {createLeadPopupCookie,shouldShowLeadPopup} from './lead-popup-cookie';

import {privacyPolicyUrl} from './site-links';
import {LEAD_REQUEST_EVENT,getLeadCopy,type LeadRequest} from './lead-request';

export function LeadPopup({autoOpen=true,concealBuilding=false}:{autoOpen?:boolean;concealBuilding?:boolean}){
 const [open,setOpen]=useState(false),[request,setRequest]=useState<LeadRequest>({intent:'enquiry'});
 const dialog=useRef<HTMLDialogElement>(null),automatic=useRef(true);
 const copy=getLeadCopy(request);
 const submission=useLeadSubmission();
 useEffect(()=>{
  const handler=(event:Event)=>{
   const detail=(event as CustomEvent<LeadRequest>).detail;
   if(!detail||!['enquiry','floor-plans','brochure','early-access'].includes(detail.intent))return;
   automatic.current=false;setRequest({intent:detail.intent,unit:detail.unit});submission.reset();setOpen(true);
  };
  window.addEventListener(LEAD_REQUEST_EVENT,handler);
  return()=>window.removeEventListener(LEAD_REQUEST_EVENT,handler);
 },[]);
 useEffect(()=>{
  if(!autoOpen||!shouldShowLeadPopup(document.cookie))return;
  let waiting=false,timer:number;
  const show=()=>{
   if(!shouldShowLeadPopup(document.cookie))return;
   if(document.hidden){waiting=true;return;}
   if(document.querySelector('dialog[open]')){timer=window.setTimeout(show,1000);return;}
   waiting=false;automatic.current=true;setRequest({intent:'enquiry'});submission.reset();setOpen(true);
  };
  const resume=()=>{if(waiting&&!document.hidden)show();};
  timer=window.setTimeout(show,3000);document.addEventListener('visibilitychange',resume);
  return()=>{window.clearTimeout(timer);document.removeEventListener('visibilitychange',resume);};
 },[autoOpen]);
 useEffect(()=>{
  const element=dialog.current;if(!element)return;
  if(!open){element.close();return;}
  // Recheck after the delay in case another tab has already displayed the popup.
  if(automatic.current&&!shouldShowLeadPopup(document.cookie)){setOpen(false);return;}
  element.showModal();
  document.cookie=createLeadPopupCookie(Date.now(),window.location.protocol==='https:');
  const priorOverflow=document.body.style.overflow,priorPadding=document.body.style.paddingRight;
  const gutter=window.innerWidth-document.documentElement.clientWidth;
  document.body.style.overflow='hidden';if(gutter>0)document.body.style.paddingRight=gutter+'px';
  return()=>{document.body.style.overflow=priorOverflow;document.body.style.paddingRight=priorPadding;};
 },[open]);
 return <dialog ref={dialog} className={'vh-lead-dialog'+(concealBuilding?' vh-lead-teaser':'')} aria-labelledby="vh-lead-title" onClose={()=>setOpen(false)} onClick={event=>{if(event.target!==event.currentTarget)return;const r=event.currentTarget.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)setOpen(false);}}>
  {open&&<><div className="vh-lead-close-bar"><button type="button" className="vh-lead-close" aria-label="Close enquiry popup" onClick={()=>setOpen(false)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><div className="vh-lead-layout"><div className="vh-lead-image"><Photo src="vista-hero.webp" alt="Vista Hub building in Majan, Dubai" unoptimized sizes="(max-width: 760px) 100vw, 500px"/><header className="vh-lead-heading"><h2 id="vh-lead-title">{copy.title}</h2><p>{copy.subtitle}</p><p>{copy.description}</p></header><div className="vh-lead-image-copy"><VistaLogo/></div></div><form key={request.intent+'-'+(request.unit??'')} className="vh-enquiry-form vh-lead-form" aria-label="Vista Hub popup enquiry" aria-busy={submission.busy} onSubmit={event=>{event.preventDefault();void submission.submit(buildLeadPayload(new FormData(event.currentTarget),{...copy,unit:request.unit},window.location.href),event.currentTarget);}}>
   <input type="hidden" name="lead_intent" value={request.intent}/><input type="hidden" name="unit_type" value={request.unit??''}/>

   <div className="vh-lead-fields"><label htmlFor="vh-lead-name"><span>Name <span className="vh-phone-required" aria-hidden="true">*</span></span><input id="vh-lead-name" name="name" autoComplete="name" required maxLength={100}/></label><label htmlFor="vh-lead-email"><span>Email <span className="vh-phone-required" aria-hidden="true">*</span></span><input id="vh-lead-email" name="email" type="email" autoComplete="email" required/></label><PhoneInput id="vh-lead-phone" name="phone"/><label htmlFor="vh-lead-notes">Additional notes (optional)<textarea id="vh-lead-notes" name="notes" defaultValue={copy.message} rows={3} maxLength={2000}/></label></div>
   <label className="vh-lead-consent" htmlFor="vh-lead-consent"><input id="vh-lead-consent" name="consent" type="checkbox" required/><span>I agree to Prestige One using my details to respond to this enquiry, as described in the <a href={privacyPolicyUrl} target="_blank" rel="noreferrer">Privacy Policy</a>.</span></label>
   <button className="vh-button" type="submit" disabled={submission.busy||submission.complete}>{submission.busy?"Sending…":submission.complete?"Request sent":copy.button} <span aria-hidden="true"><ChevronIcon/></span></button><FormStatus status={submission.status} message={submission.message}/>
  </form></div></>}
 </dialog>;
}
