import Image from 'next/image';
import {LeadPopupTrigger} from './lead-popup-trigger';
import type {LeadIntent} from './lead-request';
export function Eyebrow({children}: {children: React.ReactNode}) { return <p className="vh-eyebrow"><span/>{children}</p>; }
export function ActionLink({children, href='#enquire', light=false, arrow='diagonal',intent,unit}: {children: React.ReactNode; href?:string; light?:boolean; arrow?:'diagonal'|'chevron';intent?:LeadIntent;unit?:string}) {
 const className='vh-button'+(light?' vh-button-light':'');
 const content=<>{children}{arrow==='chevron'?<svg className="vh-action-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m8 4 8 8-8 8"/></svg>:<span aria-hidden="true">↗</span>}</>;
 return intent?<LeadPopupTrigger className={className} intent={intent} unit={unit}>{content}</LeadPopupTrigger>:<a className={className} href={href}>{content}</a>;
}
export function Photo({src,alt,className='',priority=false,sizes='(max-width: 760px) 100vw, 50vw',unoptimized=false}: {src:string;alt:string;className?:string;priority?:boolean;sizes?:string;unoptimized?:boolean}) { return <div className={'vh-photo '+className}><Image src={'/images/'+src} alt={alt} fill priority={priority} sizes={sizes} unoptimized={unoptimized}/></div>; }
export function HeroMedia() { const video=process.env.VISTA_HERO_VIDEO_URL; return video ? <video className="vh-hero-video" autoPlay loop muted playsInline preload="metadata" poster="/images/facade-vista.webp" aria-label="Vista Hub architectural film"><source src={video} type="video/mp4"/></video> : <Photo src="facade-vista.webp" alt="Vista Hub building façade" priority sizes="100vw"/>; }



