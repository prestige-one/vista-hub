import {Collection} from './collection';
import {Eyebrow} from './ui';

// Retained for restoring the original section; currently not rendered on the home page.
export function LegacyCollection(){return <section className="vh-section vh-collection" id="collection" aria-labelledby="vh-collection-title"><div className="vh-container"><header className="vh-standard-heading"><Eyebrow>THE PRESTIGE COLLECTION</Eyebrow><h2 id="vh-collection-title">Space with <span>purpose.</span></h2><p>Corporate offices, private balconies and select retail.<br/>Find the setting for your professional ambition.</p></header><Collection/><p className="vh-collection-note">Images illustrate the Vista Hub environment. Request floor plans for individual unit layouts.</p></div></section>;}


