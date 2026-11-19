import test from 'node:test';
import assert from 'node:assert/strict';
import {buildLeadPayload} from '../components/lead-payload.ts';
import {handleLeadRequest,validateLead} from '../lib/lead-webhook.ts';

const lead={name:'Integration Test',email:'test@example.com',phone:'+971500000000',source:'https://vistahub.example/home-launch',project_interest:'Vista Hub',message:'Request: Early access request\nPlease share early access details.'};
const request=(body=lead,headers={})=>new Request('https://vistahub.example/api/lead',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://vistahub.example',...headers},body:JSON.stringify(body)});
const options={token:'test-token',endpoint:'https://webhook.example/hooks/lead'};

test('on-page form maps the six webhook fields and selected interest/role',()=>{
 const data=new FormData();
 for(const [key,value] of Object.entries({name:' Test User ',email:'user@example.com',phone:'050 123 4567',phone_dial_code:'+971',interest:'Corporate office',role:'Investor'}))data.set(key,value);
 const payload=buildLeadPayload(data,{kind:'Priority access request',message:'I would like priority access to Vista Hub.'},lead.source);
 assert.deepEqual(Object.keys(payload).sort(),['email','message','name','phone','project_interest','source']);
 assert.equal(payload.phone,'+971501234567');assert.equal(payload.project_interest,'Vista Hub');
 assert.match(payload.message,/Interested in: Corporate office/);assert.match(payload.message,/I am a: Investor/);
 assert.equal(payload.name,'Test User');
});
test('popup preserves floor-plan/brochure/early-access intent and notes',()=>{
 const data=new FormData();data.set('phone','+44 7700 900000');data.set('phone_dial_code','+971');data.set('notes','Please include terrace layouts.');
 for(const kind of ['Floor plan request','Brochure request','Early access request']){
  const payload=buildLeadPayload(data,{kind,message:'Please share details.',unit:'Offices with Private Terraces'},lead.source);
  assert.equal(payload.phone,'+447700900000');assert.match(payload.message,new RegExp(kind));assert.match(payload.message,/terrace layouts/);assert.match(payload.message,/Space: Offices with Private Terraces/);
 }
});
test('relay sends one flat JSON object with required headers and fixed project',async()=>{
 let captured;
 const result=await handleLeadRequest(request({...lead,project_interest:'Other'}),{...options,fetcher:async(url,init)=>{captured={url,init};return new Response(null,{status:204});}});
 assert.equal(result.status,200);assert.deepEqual(await result.json(),{success:true});
 assert.equal(captured.url,options.endpoint);assert.equal(captured.init.headers.Authorization,'Bearer test-token');assert.equal(captured.init.headers['Content-Type'],'application/json');
 const payload=JSON.parse(captured.init.body);assert.equal(Array.isArray(payload),false);assert.equal(payload.project_interest,'Vista Hub');assert.deepEqual(Object.keys(payload).sort(),Object.keys(lead).sort());
 assert.equal(captured.init.redirect,'error');assert.ok(captured.init.signal instanceof AbortSignal);
});
test('invalid fields and cross-origin requests never reach the webhook',async()=>{
 let calls=0;const opts={...options,fetcher:async()=>{calls++;return new Response();}};
 for(const body of [{...lead,email:'bad'},{...lead,phone:'500'},{...lead,name:''},{...lead,source:'javascript:alert(1)'},[lead]]){
  assert.equal((await handleLeadRequest(request(body),opts)).status,400);
 }
 assert.equal((await handleLeadRequest(request(lead,{Origin:'https://unrelated.example'}),opts)).status,403);assert.equal(calls,0);
});
test('upstream failures and network errors return retryable errors without secrets',async()=>{
 for(const fetcher of [async()=>new Response('private upstream details',{status:401}),async()=>{throw new Error('private upstream details');}]){
  const result=await handleLeadRequest(request(),{...options,fetcher});
  assert.equal(result.status,502);const text=await result.text();assert.ok(!text.includes('test-token'));assert.ok(!text.includes('private upstream'));
 }
});
test('missing configuration returns a clear unavailable response',async()=>{
 let called=false;const result=await handleLeadRequest(request(),{...options,token:undefined,fetcher:async()=>{called=true;return new Response();}});
 assert.equal(result.status,503);assert.equal(called,false);
});
test('malformed JSON, wrong content type and oversized input are rejected',async()=>{
 const malformed=new Request('https://vistahub.example/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:'{'});
 assert.equal((await handleLeadRequest(malformed,options)).status,400);
 assert.equal((await handleLeadRequest(request(lead,{'Content-Type':'text/plain'}),options)).status,415);
 assert.equal((await handleLeadRequest(request({...lead,message:'x'.repeat(13000)}),options)).status,413);
});
test('validation retains only expected fields and normalizes whitespace',()=>{
 assert.equal(validateLead({...lead,name:'  Test User  ',extra:'unused'}).name,'Test User');
 assert.equal(validateLead({...lead,name:'Test\nInjected'}),null);
 assert.equal(validateLead({...lead,source:'https://user:password@example.com'}),null);
});
test('explicit configured origin supports a proxy without trusting spoofed forwarded headers',async()=>{
 let calls=0;const fetcher=async()=>{calls++;return new Response(null,{status:204});};
 const proxyRequest=()=>new Request('http://internal:3001/api/lead',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://vistahub.example'},body:JSON.stringify(lead)});
 assert.equal((await handleLeadRequest(proxyRequest(),{...options,allowedOrigin:'https://vistahub.example',fetcher})).status,200);
 const spoofed=request(lead,{Origin:'https://unrelated.example','X-Forwarded-Host':'unrelated.example','X-Forwarded-Proto':'https'});
 assert.equal((await handleLeadRequest(spoofed,{...options,allowedOrigin:'https://vistahub.example',fetcher})).status,403);
 assert.equal(calls,1);
});
test('oversized streamed requests are cancelled before forwarding',async()=>{
 let cancelled=false,forwarded=false;
 const body=new ReadableStream({start(controller){controller.enqueue(new Uint8Array(13000));},cancel(){cancelled=true;}});
 const incoming=new Request('https://vistahub.example/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body,duplex:'half'});
 const result=await handleLeadRequest(incoming,{...options,fetcher:async()=>{forwarded=true;return new Response();}});
 assert.equal(result.status,413);assert.equal(cancelled,true);assert.equal(forwarded,false);
});