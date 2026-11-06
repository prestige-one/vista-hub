import {Eyebrow, Photo} from './ui';

const highlights = [
 {title:'Positioned for opportunity',text:'Strategically positioned in the heart of Majan',path:'M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z'},
 {title:'A greener perspective',text:'Close to landscaped green spaces',path:'M20 4C8 2 3 8 6 14c4 7 15 1 14-10ZM4 21 16 9'},
 {title:'An established neighbourhood',text:'Established residential communities nearby',path:'M3 21V8h7v13M10 21V3h10v18M1 21h22M6 11v2m0 3v2M14 7h2m-2 4h2m-2 4h2'},
 {title:'Connected to the city',text:'Connected to Dubai’s wider business landscape',path:'M8 8h8v8H8zM12 8V2m0 14v6M8 12H2m14 0h6M5 5l3 3m8 8 3 3M19 5l-3 3M8 16l-3 3'},
];

export function StrategicAddress() {
 return <section className="vh-section vh-navy vh-address" id="vh-address" aria-labelledby="vh-address-title"><div className="vh-container">
  <div className="vh-address-topline"><Eyebrow>LOCATION · MAJAN</Eyebrow><span>DUBAI, UNITED ARAB EMIRATES</span></div>
  <div className="vh-address-heading"><h2 id="vh-address-title">An Address of<br/><span>Strategic Advantage</span><span className="vh-address-heading-dot" aria-hidden="true">.</span></h2><div><p>A coveted business address where location becomes an expression of foresight, opportunity and lasting value.</p><a href="#vh-location" className="vh-text-link">Discover your connections <span aria-hidden="true">↗</span></a></div></div>
  <figure className="vh-address-map"><Photo src="majan-location.webp" alt="Dubai location map showing Majan, Sheikh Mohammed Bin Zayed Road and connections to the wider city" sizes="(max-width: 760px) 100vw, 90vw"/><figcaption><div><span className="vh-address-map-overline">A FRESH PERSPECTIVE ON DUBAI</span><strong>Majan<span> / Dubai</span></strong></div><a href="https://www.google.com/maps/search/?api=1&query=Vista+Hub+Majan+Dubai" target="_blank" rel="noreferrer">Explore the neighbourhood <span aria-hidden="true">↗</span></a></figcaption></figure>
  <div className="vh-address-highlights">{highlights.map((item,i)=><article key={item.title}><div className="vh-address-highlight-top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={item.path}/></svg><span>0{i+1}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
 </div></section>;
}

