'use client';

import type {ReactNode} from 'react';
import {openLeadPopup,type LeadIntent} from './lead-request';

export function LeadPopupTrigger({intent='enquiry',unit,className,children}:{intent?:LeadIntent;unit?:string;className?:string;children:ReactNode}){
 return <button type="button" className={className} onClick={()=>openLeadPopup({intent,unit})}>{children}</button>;
}

