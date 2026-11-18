export const leadMarketing={
 title:'Make a move worthy of your ambition',
 subtitle:"Discover Dubai's Next Commercial Landmark",
 description:'Premium Grade A Corporate offices in Majan, Dubai.',
 button:'Get Priority Access'
} as const;
export type LeadIntent='enquiry'|'floor-plans'|'brochure'|'early-access';
export type LeadRequest={intent:LeadIntent;unit?:string};
export const LEAD_REQUEST_EVENT='vh:open-lead-popup';

export function openLeadPopup(request:LeadRequest){
 window.dispatchEvent(new CustomEvent<LeadRequest>(LEAD_REQUEST_EVENT,{detail:request}));
}

export function getLeadCopy(request:LeadRequest){
 const unit=request.unit?.trim();
 if(request.intent==='early-access')return {
  ...leadMarketing,
  subject:'Vista Hub — Early access request',
  message:'I would like to register my interest for early access to Vista Hub. Please share availability and further details.',
  kind:'Early access request'
 }; 
 if(request.intent==='floor-plans')return {
  ...leadMarketing,
  subject:'Vista Hub — Floor plan request'+(unit?' — '+unit:''),
  message:'I would like to request the floor plans for '+(unit?unit.toLowerCase()+' at Vista Hub':'Vista Hub')+'.',
  kind:'Floor plan request'
 };
 if(request.intent==='brochure')return {
  ...leadMarketing,
  subject:'Vista Hub — Brochure request',
  message:'Please send me the Vista Hub brochure with details about the development.',
  kind:'Brochure request'
 };
 return {
  ...leadMarketing,
  subject:'Vista Hub — General enquiry',
  message:'I would like more information about Vista Hub.',
  kind:'General enquiry'
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
