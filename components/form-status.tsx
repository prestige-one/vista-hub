type FormStatusProps={status:'idle'|'submitting'|'success'|'error';message:string};

export function FormStatus({status,message}:FormStatusProps){
 return <p className="vh-form-status" data-status={status} role={status==='error'?'alert':'status'} aria-atomic="true">
  {status==='success'&&<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>}
  <span>{message}</span>
 </p>;
}
