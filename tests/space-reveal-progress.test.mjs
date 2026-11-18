import test from 'node:test';
import assert from 'node:assert/strict';
import {spaceCollectionState,spaceRevealState} from '../components/space-reveal-progress.ts';

test('panel begins compact and expands fully before the pinned intro ends',()=>{
 assert.deepEqual(spaceRevealState(0),{progress:0});
 assert.deepEqual(spaceRevealState(.82),{progress:1});
 assert.deepEqual(spaceRevealState(2),spaceRevealState(.82));
 assert.deepEqual(spaceRevealState(-1),spaceRevealState(0));
 let last=0;for(let raw=0;raw<=1;raw+=.01){const next=spaceRevealState(raw).progress;assert.ok(next>=last&&next<=1);last=next;}
});
test('collection content reveals in order as each group enters view',()=>{
 assert.deepEqual(spaceCollectionState(900,800),{opacity:0,translate:36});
 assert.deepEqual(spaceCollectionState(800,800),{opacity:0,translate:36});
 assert.ok(spaceCollectionState(650,800).opacity>0);
 assert.deepEqual(spaceCollectionState(480,800),{opacity:1,translate:0});
 assert.ok(spaceCollectionState(600,800).opacity>spaceCollectionState(700,800).opacity);
 assert.deepEqual(spaceCollectionState(-100,800),{opacity:1,translate:0});
});

test('collection remains hidden until expansion completes and then fades in smoothly',()=>{
 assert.deepEqual(spaceCollectionState(300,800,0),{opacity:0,translate:36});
 assert.deepEqual(spaceCollectionState(300,800,-1),{opacity:0,translate:36});
 assert.deepEqual(spaceCollectionState(300,800,.5),{opacity:.5,translate:18});
 assert.deepEqual(spaceCollectionState(300,800,1),{opacity:1,translate:0});
});