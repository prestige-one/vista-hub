import type {NextConfig} from 'next';

const config:NextConfig={
 async headers(){
  // Coming Soon is indexable; the landing page, images and PDF files remain excluded.
  // Keep resources crawlable so search engines can read their noindex headers.
  return [
   {source:'/',headers:[{key:'X-Robots-Tag',value:'index, follow, noimageindex'}]},
   {source:'/:path+',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow, noimageindex'}]},
  ];
 },
};
export default config;
