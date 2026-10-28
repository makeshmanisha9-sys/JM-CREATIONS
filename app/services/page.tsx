import React from 'react';
import { Metadata } from 'next';
import { Layers, Sparkles, Building2 } from 'lucide-react';
import { getServices, getServiceCategories } from '@/lib/data';
import ServicesCatalogueClient from './ServicesCatalogueClient';

export const metadata: Metadata = {
  title: 'Services Directory (21 Integrated Capabilities) | JM Creations',
  description:
    'Explore JM Creations full suite of 21 business, digital, and creative solutions. From startup consulting and web architecture to Meta ads, corporate video shoots, and lead generation.',
};

export default async function ServicesPage() {
  const [services, categories] = await Promise.all([
    getServices({ includeUnpublished: false }),
    getServiceCategories(),
  ]);

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-16 bg-[#080808] text-white min-h-screen">
      {/* Studio Header Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-zinc-300">DISCIPLINES DIRECTORY / 21 CAPABILITIES</span>
          </div>
          <span className="hidden md:inline">BUSINESS · BRANDING · TECH · MARKETING · MEDIA</span>
          <span className="text-gold-500/80">[ ZERO OUTSOURCING GAPS ]</span>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/30 text-[11px] font-mono text-gold-400">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>21 Specialized Solutions</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.04]">
            INTEGRATED <span className="gold-text-gradient">CAPABILITIES</span> FOR SCALING ENTERPRISES.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed pt-2 max-w-3xl">
            From company formation and pitch decks to bespoke Next.js web platforms, commercial cinema shoots, and precision lead generation campaigns. Filter by discipline or search deliverables below.
          </p>
        </div>
      </div>

      {/* Interactive Filter & Search Client Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesCatalogueClient initialServices={services} categories={categories} />
      </div>
    </div>
  );
}
