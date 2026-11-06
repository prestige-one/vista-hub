import type { Metadata } from 'next';
import './globals.css';
import './hero.css';
import './hero-stats.css';
import './strategic-address.css';
export const metadata: Metadata = { title: 'Vista Hub | Grade A Offices in Majan, Dubai', description: 'A new address for modern business. Discover freehold Grade A offices, select retail spaces and executive amenities at Vista Hub by Prestige One Developments.' };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
