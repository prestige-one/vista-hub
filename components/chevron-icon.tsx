export function ChevronIcon({direction='right'}:{direction?:'left'|'right'}){
 return <svg className="vh-chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={direction==='left'?'m15 5-7 7 7 7':'m9 5 7 7-7 7'}/></svg>;
}
