import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { REDESIGNS } from '@/components/redesigns/data';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/case-studies/vantage`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/case-studies/aidoos-proposal-flow`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/case-studies/zenzio`, changeFrequency: 'monthly', priority: 0.7 },
    ...REDESIGNS.map((r) => ({
      url: `${SITE_URL}/redesigns/${r.slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
