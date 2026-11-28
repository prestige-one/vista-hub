import type {NextConfig} from 'next';

const config:NextConfig={
 async headers(){
  // Pre-launch: covers both pages, original/optimized images and any future PDF URLs.
  // Keep these URLs crawlable so search engines can read the noindex response.
  return [{source:'/:path*',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow, noimageindex'}]}];
 },
};
export default config;
