import {FooterGrid} from './footer-grid';
import {privacyPolicyUrl,termsConditionsUrl} from './site-links';

export function Footer(){
 return <footer className="vh-site-footer"><FooterGrid/><div className="vh-container vh-site-footer-grid">
  <div className="vh-site-footer-about"><a href="#top" className="vh-site-footer-brand">VISTA HUB<span>BY PRESTIGE ONE</span></a><p>A new address for ambition.<br/>Grade A offices in Majan, Dubai.</p><div className="vh-site-footer-contact"><a href="https://www.google.com/maps/search/?api=1&query=Vista+Hub+Majan+Dubai" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>Majan, Dubai, United Arab Emirates</a><a href="tel:80077378443"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="m5 3 4 1 1 5-3 2a15 15 0 0 0 6 6l2-3 5 1 1 4c-1 4-8 2-13-3S1 4 5 3Z"/></svg>800 PRESTIGE</a></div></div>
  <nav aria-label="Footer explore"><h3>Explore Vista Hub</h3><a href="#intro">Overview</a><a href="#offices">Offices</a><a href="#amenities">Amenities</a><a href="#location">Location</a></nav>
  <nav aria-label="Footer development"><h3>The development</h3><a href="#portfolio">Portfolio</a><a href="#partners">Our partners</a><a href="#enquire">Enquire now</a><a href="#top">Back to top <span aria-hidden="true">↑</span></a></nav>
 </div><div className="vh-site-footer-bottom"><div className="vh-container"><p>© {new Date().getFullYear()} Prestige One Developments. All rights reserved.</p><nav aria-label="Legal"><a href={termsConditionsUrl} target="_blank" rel="noopener noreferrer">Terms &amp; conditions</a><a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer">Privacy policy</a></nav></div></div></footer>;
}


