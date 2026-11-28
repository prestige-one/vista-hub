import type {MetadataRoute} from 'next';

export default function robots():MetadataRoute.Robots{
 // Disallow would prevent crawlers from seeing noindex metadata and asset headers.
 // No sitemap is advertised while both public pages are excluded from indexing.
 return {rules:{userAgent:'*',allow:'/'}};
}
