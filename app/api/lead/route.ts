import {handleLeadRequest} from '../../../lib/lead-webhook';
export const runtime='nodejs';
export async function POST(request:Request){
 return handleLeadRequest(request,{token:process.env.VISTA_LEAD_WEBHOOK_TOKEN,allowedOrigin:process.env.VISTA_FORM_ORIGIN,endpoint:process.env.VISTA_LEAD_WEBHOOK_URL||'https://srv1361662.hstgr.cloud/hooks/lead'});
}