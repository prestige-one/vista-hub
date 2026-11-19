'use client';
import {ChevronIcon} from './chevron-icon';
import {FormStatus} from './form-status';

import {buildLeadPayload} from './lead-payload';
import {useLeadSubmission} from './use-lead-submission';
import {PhoneInput} from './phone-input';
import {leadMarketing} from './lead-request';

export function EnquiryForm(){
 const submission=useLeadSubmission();
 return <form className="vh-enquiry-form" aria-labelledby="vh-enquiry-form-title" aria-busy={submission.busy} onSubmit={event=>{event.preventDefault();void submission.submit(buildLeadPayload(new FormData(event.currentTarget),{kind:"Priority access request",message:"I would like to request priority access to Vista Hub."},window.location.href),event.currentTarget);}}>
  <div className="vh-enquiry-form-heading"><h3 id="vh-enquiry-form-title">EXPRESS YOUR INTEREST!</h3><p>{leadMarketing.description}</p></div>
  <div className="vh-enquiry-fields"><label htmlFor="vh-name">Full name<input id="vh-name" name="name" autoComplete="name" required maxLength={100}/></label><label htmlFor="vh-email">Email address<input id="vh-email" name="email" type="email" autoComplete="email" required/></label><PhoneInput/><label htmlFor="vh-interest">I’m interested in<select id="vh-interest" name="interest"><option>Corporate office</option><option>Office with balcony</option><option>Retail space</option></select></label><label className="vh-enquiry-role" htmlFor="vh-role">I am a<select id="vh-role" name="role"><option>Business owner</option><option>Investor</option><option>Broker</option></select></label></div>
  <button className="vh-button" type="submit" disabled={submission.busy||submission.complete}>{submission.busy?"Sending…":submission.complete?"Request sent":leadMarketing.button}<span aria-hidden="true"><ChevronIcon/></span></button><FormStatus status={submission.status} message={submission.message}/>
  <a className="vh-enquiry-contact" href="tel:80077378443"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M5 20v-5a11 11 0 0 1 22 0v8c0 5-4 6-8 6M5 15H3v10h5V15H5Zm22 0h2v10h-5V15h3ZM15 28h5"/></svg><span><small>Speak with our team</small><strong>800 PRESTIGE</strong></span><ChevronIcon/></a>
 </form>;
}



