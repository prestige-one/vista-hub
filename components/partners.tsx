import Image from 'next/image';
import {Eyebrow} from './ui';

export function Partners(){
 return <section id="partners" className="vh-section vh-partners" aria-labelledby="vh-partners-title"><div className="vh-container vh-partners-grid">
  <div className="vh-partners-heading"><Eyebrow>TWO LEGACIES. ONE VISION.</Eyebrow><h2 id="vh-partners-title">Vision designed.<br/>Legacy engineered.</h2></div>
  <div className="vh-partners-copy"><p>The development vision of Prestige One Developments meets the engineering heritage of Drake &amp; Scull International. A shared commitment to architectural distinction, quality and enduring value.</p><div className="vh-partner-logos"><Image className="vh-partner-prestige" src="/images/prestigeone_logo_stacked_black.webp" alt="Prestige One Developments" width={254} height={92} unoptimized/><i aria-hidden="true">|</i><Image className="vh-partner-drake" src="/images/drake-scull-logo-1.webp" alt="Drake & Scull International" width={500} height={269} unoptimized/></div></div>
 </div></section>;
}


