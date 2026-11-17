'use client';

import {useEffect,useRef,useState} from 'react';
import {PhoneInput} from './phone-input';
import {Photo} from './ui';
import {createLeadPopupCookie,shouldShowLeadPopup} from './lead-popup-cookie';

import {privacyPolicyUrl} from './site-links';
import {LEAD_REQUEST_EVENT,getLeadCopy,buildLeadEmail,type LeadRequest} from './lead-request';

export function LeadPopup(){
 const [open,setOpen]=useState(false),[request,setRequest]=useState<LeadRequest>({intent:'enquiry'}),[preview,setPreview]=useState<ReturnType<typeof buildLeadEmail>|null>(null);
 const dialog=useRef<HTMLDialogElement>(null),automatic=useRef(true);
 const copy=getLeadCopy(request);
 useEffect(()=>{
  const handler=(event:Event)=>{
   const detail=(event as CustomEvent<LeadRequest>).detail;
   if(!detail||!['enquiry','floor-plans','brochure'].includes(detail.intent))return;
   automatic.current=false;setRequest({intent:detail.intent,unit:detail.unit});setPreview(null);setOpen(true);
  };
  window.addEventListener(LEAD_REQUEST_EVENT,handler);
  return()=>window.removeEventListener(LEAD_REQUEST_EVENT,handler);
 },[]);
 useEffect(()=>{
  if(!shouldShowLeadPopup(document.cookie))return;
  let waiting=false,timer:number;
  const show=()=>{
   if(!shouldShowLeadPopup(document.cookie))return;
   if(document.hidden){waiting=true;return;}
   if(document.querySelector('dialog[open]')){timer=window.setTimeout(show,1000);return;}
   waiting=false;automatic.current=true;setRequest({intent:'enquiry'});setPreview(null);setOpen(true);
  };
  const resume=()=>{if(waiting&&!document.hidden)show();};
  timer=window.setTimeout(show,3000);document.addEventListener('visibilitychange',resume);
  return()=>{window.clearTimeout(timer);document.removeEventListener('visibilitychange',resume);};
 },[]);
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
 return <dialog ref={dialog} className="vh-lead-dialog" aria-labelledby="vh-lead-title" onClose={()=>setOpen(false)} onClick={event=>{if(event.target!==event.currentTarget)return;const r=event.currentTarget.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)setOpen(false);}}>
  {open&&<><div className="vh-lead-close-bar"><button type="button" className="vh-lead-close" aria-label="Close enquiry popup" onClick={()=>setOpen(false)}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><div className="vh-lead-layout"><div className="vh-lead-image"><Photo src="vista-hero.webp" alt="Vista Hub building in Majan, Dubai" unoptimized sizes="(max-width: 760px) 100vw, 500px"/><div className="vh-lead-image-copy">VISTA HUB<span>BY PRESTIGE ONE</span></div></div><form key={request.intent+'-'+(request.unit??'')} className="vh-enquiry-form vh-lead-form" aria-label="Vista Hub popup enquiry" onSubmit={event=>{event.preventDefault();const data=new FormData(event.currentTarget);setPreview(buildLeadEmail(request,{name:String(data.get('name')??''),email:String(data.get('email')??''),phone:String(data.get('phone')??''),dialCode:String(data.get('phone_dial_code')??''),notes:String(data.get('notes')??'')}));}}>
   <input type="hidden" name="lead_intent" value={request.intent}/><input type="hidden" name="unit_type" value={request.unit??''}/><input type="hidden" name="email_subject" value={copy.subject}/><input type="hidden" name="email_body" value={preview?.body??copy.message}/>
   <header className="vh-lead-heading"><h2 id="vh-lead-title">{copy.title}</h2><p>{copy.subtitle}</p></header>
   <div className="vh-lead-fields"><label htmlFor="vh-lead-name"><span>Name <span className="vh-phone-required" aria-hidden="true">*</span></span><input id="vh-lead-name" name="name" autoComplete="name" required maxLength={100}/></label><label htmlFor="vh-lead-email"><span>Email <span className="vh-phone-required" aria-hidden="true">*</span></span><input id="vh-lead-email" name="email" type="email" autoComplete="email" required/></label><PhoneInput id="vh-lead-phone" name="phone"/><label htmlFor="vh-lead-notes">Additional notes (optional)<textarea id="vh-lead-notes" name="notes" defaultValue={copy.message} placeholder="Add any questions or preferences for our team." rows={3} maxLength={2000}/></label></div>
   <label className="vh-lead-consent" htmlFor="vh-lead-consent"><input id="vh-lead-consent" name="consent" type="checkbox" required/><span>I agree to Prestige One using my details to respond to this enquiry, as described in the <a href={privacyPolicyUrl} target="_blank" rel="noreferrer">Privacy Policy</a>.</span></label>
   <button className="vh-button" type="submit">{copy.button} <span aria-hidden="true">↗</span></button><p className="vh-lead-note" role="status">{preview?'Preview complete. Your details have not been sent or saved.':'Preview only. Enquiry submissions will be enabled soon.'}</p>
  </form></div></>}
 </dialog>;
}





