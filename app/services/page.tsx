import React from 'react';
import { Metadata } from 'next';
import { getServices, getServiceCategories } from '@/lib/data';
import ServicesCatalogueClient from './ServicesCatalogueClient';

export const metadata: Metadata = {
  title: 'Services Catalogue (21 Complete Solutions) | JM Creations',
  description:
    'Explore JM Creations full suite of 21 business, digital, and creative solutions. From consulting and web development to Meta ads and lead generation.',
};

export default async function ServicesPage() {
  const [services, categories] = await Promise.all([
    getServices({ includeUnpublished: false }),
    getServiceCategories(),
  ]);

  return (
    <div className="py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-gold-500/30 text-xs text-gold-400 font-medium mb-4">
          <span>Complete 21-Service Catalogue</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Integrated Business & Digital Solutions
        </h1>
        <p className="mt-4 text-zinc-300 text-sm sm:text-base max-w-3xl mx-auto">
          Tailored capabilities spanning commercial strategy, visual design, custom web engineering, performance advertising, and sales lead generation.
        </p>
      </div>

      {/* Interactive Filter & Search Client Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesCatalogueClient initialServices={services} categories={categories} />
      </div>
    </div>
  );
}
