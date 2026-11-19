type Lead={name:string;email:string;phone:string;source:string;project_interest:'Vista Hub';message:string};
type Options={token?:string;endpoint:string;allowedOrigin?:string;fetcher?:typeof fetch};
const errorResponse=(status:number,error:string)=>Response.json({error},{status,headers:{'Cache-Control':'no-store'}});
export function validateLead(value:unknown):Lead|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const input=value as Record<string,unknown>;
 const text=(key:string,max:number)=>{const v=input[key];return typeof v==='string'&&v.trim().length<=max?v.trim():'';};
 const name=text('name',100),email=text('email',254),phone=text('phone',32),source=text('source',2048),message=text('message',4000);
 if(!name||/[\r\n]/.test(name)||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!/^\+[1-9]\d{6,14}$/.test(phone)||!message)return null;
 try{const url=new URL(source);if(!['http:','https:'].includes(url.protocol)||url.username||url.password)return null;}catch{return null;}
 return {name,email,phone,source,project_interest:'Vista Hub',message};
}
export async function handleLeadRequest(request:Request,{token,endpoint,allowedOrigin,fetcher=fetch}:Options){
 const origin=request.headers.get('origin');
 if(origin&&origin!==(allowedOrigin||new URL(request.url).origin))return errorResponse(403,'This request is not allowed.');
 if(!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))return errorResponse(415,'Please send a valid enquiry.');
 if(Number(request.headers.get('content-length'))>12000)return errorResponse(413,'Your enquiry is too long.');
 const reader=request.body?.getReader();
 if(!reader)return errorResponse(400,'Please check your enquiry details.');
 let raw='',bytes=0;
 const decoder=new TextDecoder();
 try{
  while(true){
   const chunk=await reader.read();if(chunk.done)break;
   bytes+=chunk.value.byteLength;
   if(bytes>12000){await reader.cancel();return errorResponse(413,'Your enquiry is too long.');}
   raw+=decoder.decode(chunk.value,{stream:true});
  }
  raw+=decoder.decode();
 }catch{return errorResponse(400,'Please check your enquiry details.');}
 finally{reader.releaseLock();}
 let input:unknown;try{input=JSON.parse(raw);}catch{return errorResponse(400,'Please check your enquiry details.');}
 const lead=validateLead(input);
 if(!lead)return errorResponse(400,'Please check your name, email and phone number.');
 if(!token?.trim())return errorResponse(503,'Enquiries are temporarily unavailable. Please contact us on WhatsApp.');
 try{
  const result=await fetcher(endpoint,{method:'POST',headers:{Authorization:'Bearer '+token.trim(),'Content-Type':'application/json'},body:JSON.stringify(lead),signal:AbortSignal.timeout(12000),redirect:'error',cache:'no-store'});
  if(!result.ok)return errorResponse(502,'We could not send your enquiry. Please try again.');
  return Response.json({success:true},{headers:{'Cache-Control':'no-store'}});
 }catch{return errorResponse(502,'We could not send your enquiry. Please try again.');}
}