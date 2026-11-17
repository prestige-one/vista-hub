export type LeadIntent='enquiry'|'floor-plans'|'brochure'|'early-access';
export type LeadRequest={intent:LeadIntent;unit?:string};
export const LEAD_REQUEST_EVENT='vh:open-lead-popup';

export function openLeadPopup(request:LeadRequest){
 window.dispatchEvent(new CustomEvent<LeadRequest>(LEAD_REQUEST_EVENT,{detail:request}));
}

export function getLeadCopy(request:LeadRequest){
 const unit=request.unit?.trim();
 if(request.intent==='early-access')return {
  title:'Secure your early access.',
  subtitle:'Be among the first to discover Vista Hub.',
  subject:'Vista Hub — Early access request',
  message:'I would like to register my interest for early access to Vista Hub. Please share availability and further details.',
  button:'Secure Early Access',kind:'Early access request'
 }; 
 if(request.intent==='floor-plans')return {
  title:'Request Vista Hub floor plans.',
  subtitle:unit?'Floor plans for '+unit.toLowerCase()+'.':'Explore the available office and retail configurations.',
  subject:'Vista Hub — Floor plan request'+(unit?' — '+unit:''),
  message:'I would like to request the floor plans for '+(unit?unit.toLowerCase()+' at Vista Hub':'Vista Hub')+'.',
  button:'Request floor plans',kind:'Floor plan request'
 };
 if(request.intent==='brochure')return {
  title:'Discover Vista Hub.',
  subtitle:'Request the Vista Hub brochure.',
  subject:'Vista Hub — Brochure request',
  message:'Please send me the Vista Hub brochure with details about the development.',
  button:'Request brochure',kind:'Brochure request'
 };
 return {
  title:'Your next business address awaits.',
  subtitle:'Vista Hub by Prestige One',
  subject:'Vista Hub — General enquiry',
  message:'I would like more information about Vista Hub.',
  button:'Enquire now',kind:'General enquiry'
 };
}

export function buildLeadEmail(request:LeadRequest,fields:{name:string;email:string;phone:string;dialCode:string;notes:string}){
 const copy=getLeadCopy(request);
 return {subject:copy.subject,body:[
  'Project: Vista Hub','Request: '+copy.kind,
  ...(request.unit?['Space: '+request.unit]:[]),'',
  'Name: '+fields.name.trim(),'Email: '+fields.email.trim(),
  'Phone: '+[fields.dialCode.trim(),fields.phone.trim()].filter(Boolean).join(' '),'',
  'Message:',fields.notes.trim()||copy.message
 ].join('\n')};
}
