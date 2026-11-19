import type {Metadata} from 'next';
import {VistaLogo} from '../components/vista-logo';
import {Photo} from '../components/ui';
import {LeadPopup} from '../components/lead-popup';
import {LeadPopupTrigger} from '../components/lead-popup-trigger';
import {SocialIcon} from '../components/social-icon';
import {ComingSoonMotion} from '../components/coming-soon-motion';
import {CloudBackground} from '../components/cloud-background';
import {SignalText} from '../components/signal-text';
import {privacyPolicyUrl,termsConditionsUrl} from '../components/site-links';
import './coming-soon.css';

export const metadata:Metadata={title:'Vista Hub | A New Address. Coming Soon.',description:'Grade A offices for those who lead. Request early access to Vista Hub by Prestige One, Majan, Dubai.'};
const whatsappUrl='https://wa.me/971523702269?text='+encodeURIComponent('Hello, I would like early access and more information about Vista Hub.');

export default function ComingSoon(){
 return <><ComingSoonMotion>
  <div className="vh-coming-backdrop" aria-hidden="true"><Photo src="v2/coming-soon-blur.webp" alt="" priority unoptimized sizes="100vw"/></div>
  <CloudBackground/>
  <div className="vh-coming-shade" aria-hidden="true"/>
  <a className="vh-skip" href="#vh-coming-main">Skip to content</a>
  <header className="vh-coming-header"><div className="vh-coming-brand"><VistaLogo priority/></div><span className="vh-coming-header-note">A NEW PERSPECTIVE IS TAKING SHAPE</span></header>
  <main id="vh-coming-main" className="vh-coming-main">
   <div className="vh-coming-announcement"><span/>COMING SOON<span/></div>
   <p className="vh-coming-location">VISTA HUB · MAJAN, DUBAI</p>
   <h1>A new address.<br/><SignalText text="A higher ambition."/></h1>
   <p className="vh-coming-description">Grade A offices for those who lead.<br/>Be among the first to discover Vista Hub.</p>
   <div className="vh-coming-actions" role="group" aria-label="Connect with Vista Hub"><LeadPopupTrigger intent="early-access" className="vh-coming-button vh-coming-button-primary">Request early access</LeadPopupTrigger><a className="vh-coming-button vh-coming-button-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><SocialIcon name="whatsapp"/>WhatsApp us</a></div>
   <nav className="vh-coming-socials" aria-label="Social media"><a href="#" aria-label="Instagram"><SocialIcon name="instagram"/></a><a href="#" aria-label="Facebook"><SocialIcon name="facebook"/></a><a href="#" aria-label="LinkedIn"><SocialIcon name="linkedin"/></a></nav>
  </main>
  <footer className="vh-coming-footer"><p>© {new Date().getFullYear()} All Right Reserved.</p><nav aria-label="Legal"><a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer">Privacy Policy</a><span aria-hidden="true">/</span><a href={termsConditionsUrl} target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a></nav></footer>
 </ComingSoonMotion><LeadPopup autoOpen={false} concealBuilding/></>;
}