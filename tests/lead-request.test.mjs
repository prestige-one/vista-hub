import test from 'node:test';
import assert from 'node:assert/strict';
import {buildLeadEmail,getLeadCopy} from '../components/lead-request.ts';

const fields={name:'Test User',email:'preview@example.com',dialCode:'+971',phone:'500000000',notes:''};
test('each trigger produces its own email subject and request content',()=>{
 const general=buildLeadEmail({intent:'enquiry'},fields);
 const plans=buildLeadEmail({intent:'floor-plans',unit:'Offices with balcony'},fields);
 const brochure=buildLeadEmail({intent:'brochure'},fields);
 assert.equal(new Set([general.subject,plans.subject,brochure.subject]).size,3);
 assert.match(plans.subject,/Floor plan request/);
 assert.match(plans.body,/floor plans for offices with balcony at Vista Hub/i);
 assert.match(brochure.body,/send me the Vista Hub brochure/);
 assert.match(general.body,/Request: General enquiry/);
 assert.match(plans.body,/Phone: \+971 500000000/);
});
test('additional notes preserve the selected request and space metadata',()=>{
 const draft=buildLeadEmail({intent:'floor-plans',unit:'Retail spaces'},{...fields,notes:'Please include available layouts.'});
 assert.match(draft.body,/Request: Floor plan request/);
 assert.match(draft.body,/Space: Retail spaces/);
 assert.match(draft.body,/Please include available layouts/);
 assert.match(getLeadCopy({intent:'brochure'}).title,/worthy of your ambition/);
});


test('early access prepares a distinct registration request',()=>{
 const copy=getLeadCopy({intent:'early-access'});
 const draft=buildLeadEmail({intent:'early-access'},fields);
 assert.equal(copy.button,'Get Priority Access');
 assert.match(draft.subject,/Early access request/);
 assert.match(draft.body,/register my interest for early access/);
 assert.notEqual(draft.subject,buildLeadEmail({intent:'enquiry'},fields).subject);
});
