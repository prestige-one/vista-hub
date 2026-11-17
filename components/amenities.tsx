import {amenitySpaces} from './amenity-data';
import {MotionShowcase} from './motion-showcase';
import {Eyebrow} from './ui';

export function Amenities(){
 return <section id="amenities" className="vh-section vh-motion-wrapper" aria-labelledby="vh-amenities-title"><div className="vh-container">
  <header className="vh-standard-heading"><Eyebrow>THE EXECUTIVE PRIVILEGES</Eyebrow><h2 id="vh-amenities-title">Work, Life<br/><span>&amp; Everything In Between.</span></h2><p>An exclusive collection of amenities curated for those who command influence and inspire progress.</p></header>
  <MotionShowcase spaces={amenitySpaces}/>
 </div></section>;
}


