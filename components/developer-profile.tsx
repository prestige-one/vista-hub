import {Eyebrow} from './ui';

const milestones=[
 {value:'20 Years',label:'Dubai real estate experience'},
 {value:'30+',label:'Projects in development'},
 {value:'6,000+',label:'Residential & commercial units'},
 {value:'21+',label:'Destinations worldwide'}
];
const awards=[
 {title:'Arabian Property Awards',detail:'Best Branded Residence in Dubai · 2026–2027'},
 {title:'Luxury Lifestyle Awards',detail:'Best Luxury Residential Developer · 2026'}
];

export function DeveloperProfile(){
 return <div className="vh-developer-profile">
  <Eyebrow>THE DEVELOPER</Eyebrow>
  <h2 id="vh-enquiry-title">Prestige One Developments</h2>
  <p>Prestige One Developments is a Dubai-based real estate developer creating residential and commercial spaces shaped around how people live, work, and experience the city.</p>
  <p>Backed by a group business legacy spanning more than 58 years, our approach brings together local market experience, considered design and a long-term vision for Dubai.</p>
  <div className="vh-developer-leadership">
   <p>With more than 20 years of experience across Dubai and international real estate markets, founder and CEO <strong>Dr. Ajmal Saifi</strong> leads Prestige One with a focus on thoughtful design and quality execution.</p>
   <p>His approach combines the right location, considered spaces and a clear understanding of everyday life. Under his leadership, Prestige One continues to grow with a commitment to lasting value and places people can trust.</p>
  </div>
  <dl className="vh-developer-milestones">{milestones.map(item=><div key={item.value}><dt>{item.value}</dt><dd>{item.label}</dd></div>)}</dl>
  <div className="vh-developer-awards"><Eyebrow>RECOGNISED FOR EXCELLENCE</Eyebrow><div>{awards.map(award=><article key={award.title}>
   <svg viewBox="0 0 32 36" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M9 3h14v7c0 7-3 11-7 13-4-2-7-6-7-13V3Zm14 2h6c0 9-3 12-8 12M9 5H3c0 9 3 12 8 12m5 6v9m-7 1h14"/></svg>
   <div><h3>{award.title}</h3><p>{award.detail}</p></div>
  </article>)}</div></div>
 </div>;
}