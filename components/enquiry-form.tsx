'use client';

import {useState} from 'react';
import {PhoneInput} from './phone-input';

export function EnquiryForm(){
 const [preview,setPreview]=useState(false);
 return <form className="vh-enquiry-form" aria-labelledby="vh-enquiry-form-title" onSubmit={event=>{event.preventDefault();setPreview(true);}}>
  <div className="vh-enquiry-form-heading"><h3 id="vh-enquiry-form-title">Start a conversation.</h3><p>Find a space that fits your ambition.</p></div>
  <div className="vh-enquiry-fields"><label htmlFor="vh-name">Full name<input id="vh-name" name="name" placeholder="Your full name" autoComplete="name" required maxLength={100}/></label><label htmlFor="vh-email">Email address<input id="vh-email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required/></label><PhoneInput/><label htmlFor="vh-interest">I’m interested in<select id="vh-interest" name="interest"><option>Corporate office</option><option>Office with balcony</option><option>Retail space</option></select></label><label className="vh-enquiry-role" htmlFor="vh-role">I am a<select id="vh-role" name="role"><option>Business owner</option><option>Investor</option><option>Broker</option></select></label></div>
  <button className="vh-button" type="submit">Preview enquiry<span aria-hidden="true">↗</span></button><p className="vh-enquiry-note" role="status">{preview?'Preview complete. Your details have not been sent or saved.':'Preview only. Enquiry submissions will be enabled soon.'}</p>
 </form>;
}



