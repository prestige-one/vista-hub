'use client';
import {useEffect,useRef,useState} from 'react';
import type {LeadPayload} from './lead-payload';
type State={status:'idle'|'submitting'|'success'|'error';message:string};
const initial:State={status:'idle',message:''};
export function useLeadSubmission(){
 const [state,setState]=useState<State>(initial);
 const controller=useRef<AbortController|null>(null),sent=useRef(false);
 useEffect(()=>()=>controller.current?.abort(),[]);
 const reset=()=>{controller.current?.abort();controller.current=null;sent.current=false;setState(initial);};
 const submit=async(payload:LeadPayload)=>{
  if(controller.current||sent.current)return;
  const active=new AbortController();controller.current=active;
  setState({status:'submitting',message:'Sending your enquiry…'});
  try{
   const response=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:active.signal});
   const result=await response.json().catch(()=>null);
   if(!response.ok||result?.success!==true)throw new Error(typeof result?.error==='string'?result.error:'We could not send your enquiry. Please try again.');
   if(controller.current!==active)return;
   sent.current=true;setState({status:'success',message:'Thank you. Your enquiry has been received. Our team will be in touch.'});
  }catch(error){
   if(active.signal.aborted||controller.current!==active)return;
   setState({status:'error',message:error instanceof Error&&!(error instanceof TypeError)&&!(error instanceof SyntaxError)?error.message:'We could not send your enquiry. Please try again.'});
  }finally{if(controller.current===active)controller.current=null;}
 };
 return {...state,submit,reset,busy:state.status==='submitting',complete:state.status==='success'};
}