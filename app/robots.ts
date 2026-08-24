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
    sitemap: 'https://lets-date-mu.vercel.app/sitemap.xml',
  };
}
