import {Navigation} from '../components/interactive';
import {Enquiry} from '../components/enquiry';
import {ActionLink,Eyebrow,HeroMedia} from '../components/ui';
import {HeroStats} from '../components/hero-stats';
import {TextCharSlide} from '../components/text-char-slide';
import {StrategicAddress} from '../components/strategic-address';
import {Connectivity} from '../components/connectivity';
import {CommercialStandard} from '../components/commercial-standard';
import {Amenities} from '../components/amenities';
import {Partners} from '../components/partners';
import {Footer} from '../components/footer';
import {LeadPopup} from '../components/lead-popup';
import {LeadPopupTrigger} from '../components/lead-popup-trigger';
import {SpaceReveal} from '../components/space-reveal';

export default function Home() {
 return <><a className="vh-skip" href="#main">Skip to content</a><Navigation/><main id="main">
  <section className="vh-hero" id="top" aria-labelledby="vh-hero-title"><HeroMedia/><div className="vh-hero-shade"/><div className="vh-hero-content vh-container"><Eyebrow>VISTA HUB / MAJAN, DUBAI</Eyebrow><h1 id="vh-hero-title">A new address.<br/>A higher ambition.</h1><p>Grade A offices for those who lead.</p><div className="vh-hero-actions"><ActionLink href="#intro" light arrow="chevron">Explore Vista Hub</ActionLink><LeadPopupTrigger className="vh-brochure" intent="brochure">Download Brochure<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M12 2v14m-5-5 5 5 5-5M3 17v5h18v-5"/></svg></LeadPopupTrigger></div></div><HeroStats/></section>
  <section className="vh-intro vh-section" id="intro"><div className="vh-container"><TextCharSlide segments={[{text: "The world’s most influential enterprises understand the power of presence. "}, {text: "Vista Hub", accent: true, shimmer: true}, {text: " is where that presence finds its address.", accent: true}]}/><p className="vh-intro-summary">A remarkable business address is an extension of identity: a statement of confidence, an expression of progress and a foundation for everything that follows.</p></div></section>
  <StrategicAddress/>
  <Connectivity/>
  <CommercialStandard/>
  <Amenities/>
  {/* Original collection is temporarily retained in components/legacy-collection.tsx. */}
  <SpaceReveal/>
  <Partners/>
  <Enquiry/>
 </main><Footer/><LeadPopup/></>;
}












