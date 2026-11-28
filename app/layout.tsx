import type { Metadata } from 'next';
import './globals.css';
import './hero.css';
import './hero-stats.css';
import './strategic-address.css';
import './connectivity.css';
import './commercial-standard.css';
import './office-gallery.css';
import './hero-update.css';
import './section-typography.css';
import './amenities.css';
import './collection.css';
import './partners.css';
import './enquiry.css';
import './panels.css';
import './footer.css';
import './lead-popup.css';
import './space-reveal.css';
import './section-appear.css';
import './mobile-refinements.css';
import './tablet-refinements.css';
export const metadata: Metadata = { robots:{index:false,follow:false,noimageindex:true,googleBot:{index:false,follow:false,noimageindex:true}}, icons:{icon:{url:'/images/v2/vista-hub-fav.webp',type:'image/webp',sizes:'200x200'},shortcut:'/images/v2/vista-hub-fav.webp'}, title: 'Vista Hub | Grade A Offices in Majan, Dubai', description: 'A new address for modern business. Discover freehold Grade A offices, select retail spaces and executive amenities at Vista Hub by Prestige One Developments.' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }







