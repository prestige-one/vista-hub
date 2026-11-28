import type {MetadataRoute} from 'next';
import {siteUrl} from '../lib/site-url';

export default function robots():MetadataRoute.Robots{
 // Crawlers must access excluded resources to read their noindex response headers.
 return {rules:{userAgent:'*',allow:'/'},sitemap:siteUrl+'/sitemap.xml'};
}
