import {Eyebrow, Photo} from './ui';

const features = [
 {title:'Freehold ownership',description:'Own your address outright, an asset that grows with your enterprise.',image:'v2/evening-view.webp',alt:'Vista Hub commercial tower illuminated at sunset'},
 {title:'4–5 metre ceilings',description:'Generous volumes and natural light that give every idea room to breathe.',image:'v2/Business-Lounge.webp',alt:'Vista Hub lounge with tall windows, generous ceiling heights and work counters'},
 {title:'Executive amenities',description:'An exclusive collection of spaces to meet, host, focus and recharge.',image:'v2/meeting-room.webp',alt:'Vista Hub executive boardroom with a long meeting table and premium finishes'},
];

export function CommercialStandard() {
 return <section className="vh-section vh-commercial-standard" id="offices" aria-labelledby="vh-standard-title"><div className="vh-container">
  <div className="vh-standard-heading"><Eyebrow>THE GRADE A STANDARD</Eyebrow><h2 id="vh-standard-title">A New Standard for<br/><span>Commercial Excellence</span></h2><p>Every element of Vista Hub has been considered to elevate the working day. It is a considered commercial investment, offering the freedom of ownership and a workplace designed for long-term ambition.</p></div>
  <div className="vh-standard-panels">{features.map((feature,index)=><article className="vh-standard-panel" key={feature.title}><Photo src={feature.image} alt={feature.alt} unoptimized sizes="(max-width: 760px) 100vw, (max-width: 1100px) 33vw, 410px"/><span className="vh-standard-panel-number" aria-hidden="true">0{index+1}</span><div className="vh-standard-panel-copy"><h3>{feature.title}</h3><p>{feature.description}</p></div></article>)}</div>
 </div></section>;
}

