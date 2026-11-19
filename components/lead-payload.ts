export type LeadPayload={name:string;email:string;phone:string;source:string;project_interest:'Vista Hub';message:string};
type RequestContext={kind:string;message:string;unit?:string};
export function buildLeadPayload(data:FormData,context:RequestContext,source:string):LeadPayload{
 const value=(key:string)=>String(data.get(key)??'').trim();
 const entered=value('phone').replace(/[^\d+]/g,'');
 const phone=entered.startsWith('+')?entered:entered.startsWith('00')?'+'+entered.slice(2):value('phone_dial_code')+entered.replace(/^0+/,'');
 const notes=value('notes');
 const details=['Request: '+context.kind,context.message,context.unit?'Space: '+context.unit:'',value('interest')?'Interested in: '+value('interest'):'',value('role')?'I am a: '+value('role'):'',notes&&notes!==context.message?'Additional notes: '+notes:''].filter(Boolean);
 return {name:value('name'),email:value('email'),phone,source,project_interest:'Vista Hub',message:details.join('\n')};
}