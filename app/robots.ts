import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/*.png$', '/*.jpg$', '/*.jpeg$', '/*.webp$', '/*.gif$', '/*.svg$'],
      },
      {
        userAgent: ['Googlebot-Image', 'YandexImages', 'msnbot-media'],
        disallow: '/',
      },
    ],
    sitemap: 'https://letsdate.indxflow.com/sitemap.xml',
  };
}
