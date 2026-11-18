import type {ReactNode} from 'react';

export function CircledText({children}:{children:ReactNode}){
 return <span className="vh-circled-text">{children}<svg className="vh-circled-text-mark" viewBox="0 0 220 84" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false"><path pathLength="1" d="M199 18C169 1 74-1 32 14C-6 28-1 58 43 72C87 86 178 78 205 58C228 40 209 17 174 12"/></svg></span>;
}