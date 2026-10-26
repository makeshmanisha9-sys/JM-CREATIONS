import { MetadataRoute } from 'next';
import { getServices, getProjects, getBlogPosts } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jmcreations.in';

  const [services, projects, blogs] = await Promise.all([
    getServices({ includeUnpublished: false }),
    getProjects({ includeUnpublished: false }),
    getBlogPosts({ includeUnpublished: false }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/clients',
    '/blog',
    '/careers',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${siteUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/portfolio/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${siteUrl}/blog/${b.slug}`,
    lastModified: new Date(b.published_at || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
