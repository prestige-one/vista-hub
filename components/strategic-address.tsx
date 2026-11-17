import {Eyebrow, Photo} from './ui';

const highlights = [
 'Strategically positioned in the heart of Majan',
 'Close to landscaped green spaces',
 'Established residential communities nearby',
 'Connected to Dubai’s wider business landscape',
];
const connections = [
 {value:'Metro', label:'Future metro connectivity'},
 {value:'AED 2 Billion', label:'Upcoming road infrastructure'},
 {value:'E311', label:'Strategic highway access'},
];

export function StrategicAddress() {
 return <section className="vh-section vh-navy vh-address" id="address" aria-labelledby="vh-address-title"><div className="vh-container vh-address-container">
  <div className="vh-address-layout">
   <div className="vh-address-copy">
    <Eyebrow>LOCATION · MAJAN</Eyebrow>
    <h2 id="vh-address-title">An Address of<br/><span>Strategic Advantage</span></h2>
    <p className="vh-address-description">A coveted business address where location becomes an expression of foresight, opportunity and lasting value.</p>
    <ul className="vh-address-highlights">{highlights.map(text=><li key={text}><span aria-hidden="true"/>{text}</li>)}</ul>
   </div>
   <figure className="vh-address-map">
    <a className="vh-address-map-link" href="https://www.google.com/maps/search/?api=1&query=Vista+Hub+Majan+Dubai" target="_blank" rel="noreferrer" aria-label="Explore Vista Hub in Majan on Google Maps">
     <Photo src="vista-hub-map.webp" alt="Aerial location of Vista Hub in Majan, showing nearby Al Barari, Downtown Dubai, parks and IMG Worlds of Adventure" unoptimized sizes="(max-width: 760px) 100vw, (max-width: 1200px) 55vw, 620px"/>
    </a>
   </figure>
  </div>
  <dl className="vh-address-connections">{connections.map(item=><div key={item.value}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>
 </div></section>;
}

