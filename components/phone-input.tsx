'use client';

import {useEffect,useMemo,useRef,useState,type KeyboardEvent} from 'react';
import {phoneCountries,type PhoneCountry} from './phone-countries';

export function PhoneInput({id='vh-phone',name='phone'}:{id?:string;name?:string}){
 const [country,setCountry]=useState<PhoneCountry>(()=>phoneCountries.find(value=>value.code==='AE')!);
 const [up,setUp]=useState(false),[menuHeight,setMenuHeight]=useState(232);
 const [open,setOpen]=useState(false),[query,setQuery]=useState(''),[active,setActive]=useState(0);
 const root=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null),search=useRef<HTMLInputElement>(null),list=useRef<HTMLDivElement>(null);
 const filtered=useMemo(()=>{const text=query.trim().toLowerCase();return text?phoneCountries.filter(value=>value.name.toLowerCase().includes(text)||value.code.toLowerCase()===text||value.dialCode.includes(text)):phoneCountries;},[query]);
 const listId=id+'-countries';
 const show=()=>{const rect=root.current?.getBoundingClientRect(),dialog=root.current?.closest('dialog[open]')?.getBoundingClientRect();if(rect){const below=Math.min(window.innerHeight,dialog?.bottom??window.innerHeight)-rect.bottom,above=rect.top-Math.max(0,dialog?.top??0);const upwards=below<302&&above>below;setUp(upwards);setMenuHeight(Math.max(64,Math.min(232,(upwards?above:below)-76)));}setQuery('');setActive(phoneCountries.findIndex(value=>value.code===country.code));setOpen(true);};
 const close=()=>{setOpen(false);trigger.current?.focus({preventScroll:true});};
 const choose=(value:PhoneCountry)=>{setCountry(value);close();};
 useEffect(()=>{if(!open)return;search.current?.focus({preventScroll:true});const outside=(event:PointerEvent)=>{if(!root.current?.contains(event.target as Node))setOpen(false);};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside);},[open]);
 useEffect(()=>{if(!open)return;const scroller=list.current,option=scroller?.children.item(active) as HTMLElement|null;if(!scroller||!option)return;const top=option.offsetTop,bottom=top+option.offsetHeight;if(top<scroller.scrollTop)scroller.scrollTop=top;else if(bottom>scroller.scrollTop+scroller.clientHeight)scroller.scrollTop=bottom-scroller.clientHeight;},[open,active,filtered]);
 const keys=(event:KeyboardEvent<HTMLInputElement>)=>{
  if(event.key==='Escape'){event.preventDefault();close();}
  if(event.key==='ArrowDown'){event.preventDefault();setActive(value=>Math.min(filtered.length-1,value+1));}
  if(event.key==='ArrowUp'){event.preventDefault();setActive(value=>Math.max(0,value-1));}
  if(event.key==='Enter'){event.preventDefault();if(filtered[active])choose(filtered[active]);}
 };
 return <div ref={root} className="vh-phone-field" onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node|null))setOpen(false);}}>
  <label htmlFor={id}><span>Phone number <span className="vh-phone-required" aria-hidden="true">*</span></span></label>
  <div className="vh-phone-controls"><button ref={trigger} className="vh-phone-trigger" type="button" aria-label={'Country code, '+country.name+' '+country.dialCode} aria-haspopup="listbox" aria-expanded={open} aria-controls={open?listId:undefined} onClick={()=>open?close():show()} onKeyDown={event=>{if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();show();}}}><img src={'/images/flags/'+country.code.toLowerCase()+'.svg'} width={22} height={15} alt=""/><span>{country.dialCode}</span><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m3 4.5 3 3 3-3"/></svg></button><input id={id} name={name} type="tel" inputMode="tel" autoComplete="tel-national" required minLength={7} maxLength={25}/></div>
  <input type="hidden" name={name+'_country'} value={country.code}/><input type="hidden" name={name+'_dial_code'} value={country.dialCode}/>
  {open&&<div className="vh-phone-popover" data-up={up}><div className="vh-phone-search"><input ref={search} type="search" role="combobox" aria-label="Search country or calling code" aria-expanded="true" aria-controls={listId} aria-autocomplete="list" aria-activedescendant={filtered[active]?id+'-option-'+filtered[active].code:undefined} value={query} onChange={event=>{setQuery(event.target.value);setActive(0);}} onKeyDown={keys} autoComplete="off"/></div><div ref={list} className="vh-phone-options" style={{maxHeight:menuHeight}} id={listId} role="listbox" aria-label="Countries">{filtered.map((value,index)=><button key={value.code} id={id+'-option-'+value.code} type="button" role="option" tabIndex={-1} aria-selected={country.code===value.code} data-active={index===active} onClick={()=>choose(value)} onMouseMove={()=>setActive(index)}><img src={'/images/flags/'+value.code.toLowerCase()+'.svg'} width={22} height={15} alt="" loading="lazy" decoding="async"/><span>{value.name}</span><strong>{value.dialCode}</strong></button>)}{filtered.length===0&&<p className="vh-phone-empty">No countries found.</p>}</div></div>}
 </div>;
}





