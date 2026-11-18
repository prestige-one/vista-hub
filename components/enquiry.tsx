import {EnquiryForm} from './enquiry-form';
import {DeveloperProfile} from './developer-profile';

export function Enquiry(){
 return <section className="vh-section vh-enquiry" id="enquire" aria-labelledby="vh-enquiry-title"><div className="vh-container vh-enquiry-layout">
  <DeveloperProfile/><div className="vh-enquiry-panel"><EnquiryForm/></div>
 </div></section>;
}