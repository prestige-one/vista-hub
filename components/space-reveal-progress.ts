const clamp=(value:number)=>Math.max(0,Math.min(1,value));
const smooth=(value:number)=>value*value*(3-2*value);

export function spaceRevealState(raw:number){
 return {progress:smooth(clamp(raw/.82))};
}

export function spaceCollectionState(top:number,viewportHeight:number){
 const opacity=smooth(clamp((viewportHeight-top)/Math.max(1,viewportHeight*.4)));
 return {opacity,translate:36*(1-opacity)};
}
