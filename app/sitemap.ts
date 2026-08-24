import { MetadataRoute } from 'next';
import { PROFILES } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lets-date-mu.vercel.app';

  const profileUrls: MetadataRoute.Sitemap = PROFILES.map((p) => ({
    url: `${baseUrl}/user/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...profileUrls,
  ];
}
