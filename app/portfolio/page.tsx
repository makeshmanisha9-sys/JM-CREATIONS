import React from 'react';
import { Metadata } from 'next';
import { FolderGit2, Sparkles, Building2 } from 'lucide-react';
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
    <div className="pt-28 sm:pt-36 pb-24 space-y-16 bg-[#080808] text-white min-h-screen">
      {/* Studio Header Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-zinc-300">CASE STUDY ARCHIVE / VERIFIED DEPLOYMENTS</span>
          </div>
          <span className="hidden md:inline">10 AUTHENTIC COMMERCIAL CLIENT RECORDS</span>
          <span className="text-gold-500/80">[ ZERO SIMULATED METRICS ]</span>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/30 text-[11px] font-mono text-gold-400">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Proven Enterprise Impact</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.04]">
            SELECTED <span className="gold-text-gradient">WORK</span> &amp; CASE STUDIES.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed pt-2 max-w-3xl font-sans">
            Explore authentic commercial initiatives delivered for catering businesses, educational academies, foundations, creators, and healthcare providers. Every project reflects verified deliverables and rigorous execution.
          </p>
        </div>
      </div>

      {/* Portfolio Client Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioClient initialProjects={projects} />
      </div>
    </div>
  );
}
