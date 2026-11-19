import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source=fs.readFileSync(new URL('../lib/clouds2-renderer.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
function setup({webgl=true,compile=true,width=1280,height=720}={}){
 let next=0,draws=0,releases=0,modal=false,image,intersection,mutation,resize;
 const frames=new Map(),timers=new Map(),documentEvents=new Map(),canvasEvents=new Map();
 const gl=new Proxy({COMPILE_STATUS:1,LINK_STATUS:2,getShaderParameter:()=>compile,getProgramParameter:()=>true,getAttribLocation:()=>0,getUniformLocation:()=>({}),drawArrays:()=>{draws++;}},{get(target,key){if(key in target)return target[key];if(String(key).startsWith('create'))return ()=>({});if(String(key).startsWith('delete'))return ()=>{releases++;};if(String(key).toUpperCase()===key)return 1;return ()=>{};}});
 const document={hidden:false,body:{},querySelector:()=>modal?{}:null,addEventListener:(key,fn)=>documentEvents.set(key,fn),removeEventListener:key=>documentEvents.delete(key)};
 const canvas={dataset:{},width:1,height:1,getContext:()=>webgl?gl:null,getBoundingClientRect:()=>({width,height}),addEventListener:(key,fn)=>canvasEvents.set(key,fn),removeEventListener:key=>canvasEvents.delete(key)};
 const exports={};
 const context={exports,require:()=>({cloudsFragment:'test-shader'}),Float32Array,document,
  requestAnimationFrame:fn=>{const id=++next;frames.set(id,fn);return id;},cancelAnimationFrame:id=>frames.delete(id),
  window:{setTimeout:(fn,delay)=>{const id=++next;timers.set(id,{fn,delay});return id;},clearTimeout:id=>timers.delete(id)},
  ResizeObserver:class{constructor(fn){resize=fn;}observe(){ }disconnect(){resize=null;}},
  IntersectionObserver:class{constructor(fn){intersection=fn;}observe(){ }disconnect(){intersection=null;}},
  MutationObserver:class{constructor(fn){mutation=fn;}observe(){ }disconnect(){mutation=null;}},
  Image:class{constructor(){image=this;}}
 };
 vm.runInNewContext(compiled,context);
 const dispose=exports.createClouds2(canvas);
 return {canvas,dispose,frames,timers,documentEvents,canvasEvents,
  load:()=>image.onload(),frame:()=>{const [id,fn]=frames.entries().next().value;frames.delete(id);fn(100);},
  hide:value=>{document.hidden=value;documentEvents.get('visibilitychange')();},
  modal:value=>{modal=value;mutation();},intersect:value=>intersection([{isIntersecting:value}]),
  get draws(){return draws;},get releases(){return releases;},
 };
}
test('cloud renderer bounds resolution and waits for its texture before drawing',()=>{
 for(const [width,height,budget,fps] of [[1280,720,180000,24],[390,844,100000,18]]){
  const state=setup({width,height});
  assert.ok(state.canvas.width*state.canvas.height<=budget);assert.equal(state.frames.size,0);
  state.load();assert.equal(state.frames.size,1);state.frame();
  assert.equal(state.draws,1);assert.equal(state.canvas.dataset.ready,'true');
  assert.equal(state.timers.size,1);assert.equal([...state.timers.values()][0].delay,1000/fps);
  state.dispose();
 }
});
test('hidden tabs, dialogs and offscreen backgrounds stop scheduling frames',()=>{
 const state=setup();state.load();state.frame();
 state.hide(true);assert.equal(state.frames.size+state.timers.size,0);
 state.hide(false);assert.equal(state.frames.size,1);
 state.modal(true);assert.equal(state.frames.size+state.timers.size,0);
 state.modal(false);assert.equal(state.frames.size,1);
 state.intersect(false);assert.equal(state.frames.size+state.timers.size,0);
 state.intersect(true);assert.equal(state.frames.size,1);
 state.dispose();
});
test('unmount releases resources and listeners once, including a pending image',()=>{
 const state=setup();state.load();state.frame();state.dispose();
 assert.equal(state.frames.size+state.timers.size,0);assert.equal(state.documentEvents.size,0);assert.equal(state.canvasEvents.size,0);
 assert.equal(state.canvas.width*state.canvas.height,1);assert.equal(state.canvas.dataset.ready,undefined);
 assert.equal(state.releases,5);state.dispose();assert.equal(state.releases,5);
 const pending=setup();pending.dispose();assert.equal(pending.frames.size,0);
});
test('unavailable WebGL or shader compilation retain a static fallback',()=>{
 for(const settings of [{webgl:false},{compile:false}]){
  const state=setup(settings);assert.equal(state.frames.size,0);assert.equal(state.canvas.dataset.ready,undefined);state.dispose();
 }
});
test('context loss hides the canvas and stops background work',()=>{
 const state=setup();state.load();state.frame();let prevented=false;
 state.canvasEvents.get('webglcontextlost')({preventDefault:()=>{prevented=true;}});
 assert.equal(prevented,true);assert.equal(state.frames.size+state.timers.size,0);assert.equal(state.canvas.dataset.ready,undefined);
});
