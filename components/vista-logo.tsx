import Image from 'next/image';

export function VistaLogo({priority=false}:{priority?:boolean}){
 return <Image className="vh-brand-logo" src="/images/v2/Vista-Hub-Logo.webp" alt="Vista Hub" width={600} height={82} unoptimized priority={priority}/>;
}