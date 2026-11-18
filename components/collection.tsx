'use client';
import {ChevronIcon} from './chevron-icon';

import {useState} from 'react';
import {Photo,ActionLink} from './ui';

import {collectionSpaces as units} from './collection-data';

export function Collection({idPrefix='vh-collection',label='Unit type'}:{idPrefix?:string;label?:string}){
 const [active,setActive]=useState(0);
 const item=units[active];
 return <>
  <div className="vh-collection-choices" role="group" aria-label={label}>{units.map((unit,index)=><button type="button" key={unit.name} aria-pressed={active===index} aria-controls={idPrefix+'-feature'} onClick={()=>setActive(index)}><span className="vh-collection-choice-number">0{index+1}</span><span>{unit.name}</span><span className="vh-collection-choice-arrow" aria-hidden="true"><ChevronIcon/></span></button>)}</div>
  <div className="vh-collection-feature" id={idPrefix+'-feature'}>
   <figure className="vh-collection-visual"><Photo src={item.image} alt={item.name+' at Vista Hub'} unoptimized sizes="(max-width: 760px) 100vw, 60vw"/><figcaption><span>{item.name}</span><span>0{active+1} / THE COLLECTION</span></figcaption></figure>
   <div className="vh-collection-details" aria-live="polite"><p className="vh-collection-kicker">A SPACE FOR YOUR NEXT CHAPTER</p><h3>{item.title}</h3><p className="vh-collection-description">{item.text}</p><dl><div><dt>Configuration</dt><dd>{item.name}</dd></div><div><dt>Highlights</dt><dd>{item.detail}</dd></div><div><dt>Ownership</dt><dd>Freehold</dd></div></dl><ActionLink intent="floor-plans" unit={item.name}>Request floor plans</ActionLink></div>
  </div>
 </>;
}




