export const LEAD_POPUP_COOKIE='vh_lead_popup_seen';
export const LEAD_POPUP_TTL=24*60*60*1000;

export function shouldShowLeadPopup(cookies:string,now=Date.now()){
 const entry=cookies.split(';').map(value=>value.trim()).find(value=>value.startsWith(LEAD_POPUP_COOKIE+'='));
 if(!entry)return true;
 try{const expires=Number(decodeURIComponent(entry.slice(LEAD_POPUP_COOKIE.length+1)));return !Number.isFinite(expires)||expires<=now;}catch{return true;}
}

export function createLeadPopupCookie(now=Date.now(),secure=false){
 return LEAD_POPUP_COOKIE+'='+(now+LEAD_POPUP_TTL)+'; Max-Age=86400; Expires='+new Date(now+LEAD_POPUP_TTL).toUTCString()+'; Path=/; SameSite=Lax'+(secure?'; Secure':'');
}
