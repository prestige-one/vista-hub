import test from 'node:test';
import assert from 'node:assert/strict';
import {LEAD_POPUP_COOKIE,LEAD_POPUP_TTL,createLeadPopupCookie,shouldShowLeadPopup} from '../components/lead-popup-cookie.ts';

const now=Date.UTC(2026,10,17,10);
test('first visit and expired cookie show the popup',()=>{
 assert.equal(shouldShowLeadPopup('',now),true);
 assert.equal(shouldShowLeadPopup(LEAD_POPUP_COOKIE+'='+(now-1),now),true);
 assert.equal(shouldShowLeadPopup(LEAD_POPUP_COOKIE+'='+now,now),true);
});
test('cookie suppresses repeat visits for exactly 24 hours',()=>{
 const cookie=createLeadPopupCookie(now);
 assert.equal(shouldShowLeadPopup(cookie,now),false);
 assert.equal(shouldShowLeadPopup(cookie,now+LEAD_POPUP_TTL-1),false);
 assert.equal(shouldShowLeadPopup(cookie,now+LEAD_POPUP_TTL),true);
 assert.match(cookie,/Max-Age=86400/);
 assert.match(cookie,/Path=\/; SameSite=Lax/);
 assert.ok(cookie.includes(new Date(now+LEAD_POPUP_TTL).toUTCString()));
});
test('unrelated and malformed cookie values do not suppress the popup',()=>{
 assert.equal(shouldShowLeadPopup('other_cookie=123',now),true);
 assert.equal(shouldShowLeadPopup(LEAD_POPUP_COOKIE+'=not-a-date',now),true);
 assert.equal(shouldShowLeadPopup(LEAD_POPUP_COOKIE+'=%broken',now),true);
 assert.equal(shouldShowLeadPopup('other=1; '+LEAD_POPUP_COOKIE+'='+(now+1000),now),false);
});
test('secure flag follows the site protocol',()=>{
 assert.ok(createLeadPopupCookie(now,true).endsWith('; Secure'));
 assert.ok(!createLeadPopupCookie(now,false).includes('; Secure'));
});
