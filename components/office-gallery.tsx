import {Eyebrow,Photo} from './ui';
import {GallerySlider} from './gallery-slider';

const rooms=[
 {image:'v2/workspace.webp',title:'The Workspace',caption:'Space to focus, room to grow',alt:'Bright Vista Hub workspace with desks and generous ceiling heights'},
 {image:'v2/work-space-1.webp',title:'The Private Office',caption:'A space for your next chapter',alt:'Vista Hub executive office with full-height windows overlooking landscaped green spaces'},
 {image:'v2/meeting-room.webp',title:'The Boardroom',caption:'Put your next move on the table',alt:'Vista Hub boardroom with a long meeting table and upholstered executive chairs'},
 {image:'v2/work-place-night.webp',title:'The Evening Perspective',caption:'An address beyond the ordinary',alt:'Vista Hub private office at night overlooking the illuminated Dubai skyline'},
];

export function OfficeGallery(){
 return <section className="vh-office-gallery vh-section" id="office-gallery" aria-labelledby="vh-office-gallery-title"><div className="vh-container">
  <div className="vh-office-gallery-heading"><Eyebrow>GRADE A CORPORATE OFFICES</Eyebrow><h2 id="vh-office-gallery-title">Lead with <span>Ambition</span></h2></div>
  <GallerySlider label="Vista Hub office interiors">{rooms.map(room=><figure className="vh-office-gallery-room" key={room.image}><Photo src={room.image} alt={room.alt} unoptimized/><figcaption><strong>{room.title}</strong><span aria-hidden="true"> · </span>{room.caption}</figcaption></figure>)}</GallerySlider>
 </div></section>;
}
