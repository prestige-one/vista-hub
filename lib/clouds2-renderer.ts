import {cloudsFragment} from './clouds2-shader';

export function createClouds2(canvas:HTMLCanvasElement):()=>void{
 const gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'low-power',preserveDrawingBuffer:false});
 if(!gl)return ()=>{};
 const shaders:WebGLShader[]=[];
 const compile=(type:number,source:string)=>{
  const shader=gl.createShader(type);if(!shader)return null;
  gl.shaderSource(shader,source);gl.compileShader(shader);shaders.push(shader);
  return gl.getShaderParameter(shader,gl.COMPILE_STATUS)?shader:null;
 };
 const vertex=compile(gl.VERTEX_SHADER,'attribute vec2 position;void main(){gl_Position=vec4(position,0.0,1.0);}');
 const fragment=compile(gl.FRAGMENT_SHADER,cloudsFragment);
 const program=gl.createProgram(),buffer=gl.createBuffer(),texture=gl.createTexture();
 const release=()=>{shaders.forEach(shader=>gl.deleteShader(shader));gl.deleteProgram(program);gl.deleteBuffer(buffer);gl.deleteTexture(texture);};
 if(!vertex||!fragment||!program||!buffer||!texture){release();return ()=>{};}
 gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
 if(!gl.getProgramParameter(program,gl.LINK_STATUS)){release();return ()=>{};}
 gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
 gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
 const position=gl.getAttribLocation(program,'position');
 gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
 gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 gl.uniform1i(gl.getUniformLocation(program,'iTex'),0);
 gl.uniform1f(gl.getUniformLocation(program,'speed'),0.35);
 gl.uniform3f(gl.getUniformLocation(program,'skyColor'),0.23,0.35,0.48);
 gl.uniform3f(gl.getUniformLocation(program,'cloudColor'),0.12,0.21,0.32);
 gl.uniform3f(gl.getUniformLocation(program,'lightColor'),0.91,0.87,0.78);
 const resolution=gl.getUniformLocation(program,'iResolution'),time=gl.getUniformLocation(program,'iTime');
 let disposed=false,loaded=false,inView=true,running=false,frame=0,timer=0,previous=0,elapsed=10;
 let interval=1000/24;
 const stop=()=>{running=false;cancelAnimationFrame(frame);window.clearTimeout(timer);previous=0;};
 const draw=(stamp:number)=>{
  if(!running||disposed)return;
  elapsed+=previous?Math.min((stamp-previous)/1000,0.15):1/24;previous=stamp;
  gl.uniform1f(time,elapsed);gl.drawArrays(gl.TRIANGLES,0,6);
  canvas.dataset.ready='true';
  timer=window.setTimeout(()=>{frame=requestAnimationFrame(draw);},interval);
 };
 const sync=()=>{
  const active=loaded&&inView&&!document.hidden&&!document.querySelector('dialog[open]');
  if(!active){stop();return;}
  if(!running&&!disposed){running=true;frame=requestAnimationFrame(draw);}
 };
 const resize=()=>{
  const rect=canvas.getBoundingClientRect(),mobile=rect.width<760;
  const scale=Math.min(0.7,Math.sqrt((mobile?100000:180000)/Math.max(1,rect.width*rect.height)));
  canvas.width=Math.max(1,Math.floor(rect.width*scale));canvas.height=Math.max(1,Math.floor(rect.height*scale));
  gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(resolution,canvas.width,canvas.height);
  interval=1000/(mobile?18:24);
 };
 const sizes=new ResizeObserver(resize);sizes.observe(canvas);resize();
 const visibility=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;sync();});
 visibility.observe(canvas);
 const dialogs=new MutationObserver(sync);dialogs.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
 document.addEventListener('visibilitychange',sync);
 const image=new Image();image.decoding='async';
 image.onload=()=>{
  if(disposed)return;
  gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
  loaded=true;sync();
 };
 image.src='/images/effects/vanta-clouds2-noise.png';
 const lost=(event:Event)=>{event.preventDefault();dispose();};
 const dispose=()=>{
  if(disposed)return;disposed=true;stop();delete canvas.dataset.ready;
  image.onload=null;image.onerror=null;sizes.disconnect();visibility.disconnect();dialogs.disconnect();
  document.removeEventListener('visibilitychange',sync);canvas.removeEventListener('webglcontextlost',lost);
  release();canvas.width=1;canvas.height=1;
 };
 canvas.addEventListener('webglcontextlost',lost);
 return dispose;
}
