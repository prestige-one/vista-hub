import {Eyebrow,Photo} from './ui';
import {EnquiryForm} from './enquiry-form';

export function Enquiry(){
 return <section className="vh-section vh-enquiry" id="enquire" aria-labelledby="vh-enquiry-title"><div className="vh-container">
  <header className="vh-standard-heading"><Eyebrow>TAKE THE LEAD</Eyebrow><h2 id="vh-enquiry-title">Your next move <span>starts here.</span></h2><p>Discover Grade A corporate offices at Vista Hub.<br/>A new address for your ambition.</p></header>
  <div className="vh-enquiry-panel"><div className="vh-enquiry-visual"><Photo src="vista-hero.webp" alt="Vista Hub tower and landscaped surroundings" unoptimized sizes="(max-width: 760px) 100vw, 45vw"/><div className="vh-enquiry-visual-copy"><p>VISTA HUB / MAJAN, DUBAI</p><a href="tel:80077378443"><span><small>Speak with our team</small>800 PRESTIGE</span><span className="vh-enquiry-call-arrow" aria-hidden="true">↗</span></a></div></div><EnquiryForm/></div>
 </div></section>;
}

