import {SectionAppear} from '../../components/section-appear';
import {SignalText} from '../../components/signal-text';
import {Navigation} from '../../components/interactive';
import {Enquiry} from '../../components/enquiry';
import {ActionLink,Eyebrow,HeroMedia} from '../../components/ui';
import {HeroStats} from '../../components/hero-stats';
import {TextCharSlide} from '../../components/text-char-slide';
import {StrategicAddress} from '../../components/strategic-address';
import {Connectivity} from '../../components/connectivity';
import {CommercialStandard} from '../../components/commercial-standard';
import {Amenities} from '../../components/amenities';
import {Partners} from '../../components/partners';
import {Footer} from '../../components/footer';
import {LeadPopup} from '../../components/lead-popup';
import {OfficeGallery} from '../../components/office-gallery';
import {SpaceReveal} from '../../components/space-reveal';

export default function Home() {
 return <><a className="vh-skip" href="#main">Skip to content</a><Navigation/><main id="main">
  <section className="vh-hero" id="top" aria-labelledby="vh-hero-title"><HeroMedia/><div className="vh-hero-shade"/><div className="vh-hero-content vh-container"><Eyebrow>VISTA HUB / MAJAN, DUBAI</Eyebrow><h1 id="vh-hero-title"><SignalText text="Grade A"/> Offices<br/>for Those Who Lead.</h1><p>A distinctive Grade A corporate destination in the heart of Majan, by Prestige One Developments in collaboration with Drake &amp; Scull International. Freehold offices and an exclusive collection of amenities, built around the ambitions of modern enterprise.</p><div className="vh-hero-actions"><ActionLink light intent="enquiry">Enquire now</ActionLink><ActionLink href="#intro" light>Explore Vista Hub</ActionLink></div></div><HeroStats/></section>
  <section className="vh-intro vh-section" id="intro"><div className="vh-container"><TextCharSlide segments={[{text: "The world’s most influential enterprises understand the power of presence. "}, {text: "Vista Hub", accent: true, shimmer: true}, {text: " is where that presence finds its address.", accent: true}]}/><p className="vh-intro-summary">A remarkable business address is an extension of identity: a statement of confidence, an expression of progress and a foundation for everything that follows.</p></div></section>
  <StrategicAddress/>
  <Connectivity/>
  <CommercialStandard/>
  <OfficeGallery/>
  <Amenities/>
  {/* Original collection is temporarily retained in components/legacy-collection.tsx. */}
  <SpaceReveal/>
  <Partners/>
  <Enquiry/>
 </main><Footer/><LeadPopup/><SectionAppear/></>;
}
