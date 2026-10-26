import React from 'react';
import { Metadata } from 'next';
import { getProjects, getServiceCategories } from '@/lib/data';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Client Portfolio & Case Studies | JM Creations',
  description:
    'Explore verified client engagements and case studies delivered by JM Creations across lead generation, Google Ads, creative shoots, startup support, and digital marketing.',
};

export default async function PortfolioPage() {
  const [projects, categories] = await Promise.all([
    getProjects({ includeUnpublished: false }),
    getServiceCategories(),
  ]);

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-gold-500/30 text-xs text-gold-400 font-medium mb-4">
          <span>Verified Client Work</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Client Portfolio & Case Studies
        </h1>
        <p className="mt-4 text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto">
          Actual projects delivered for commercial clients. Unverified project details remain editable in our management system to preserve strict factual integrity.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioClient initialProjects={projects} />
      </div>
    </div>
  );
}
