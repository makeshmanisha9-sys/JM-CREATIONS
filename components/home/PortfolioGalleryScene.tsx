'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, FolderGit2, CheckCircle2, Sparkles, Building2, ExternalLink } from 'lucide-react';
import { Project, Client } from '@/lib/types';

interface PortfolioGallerySceneProps {
  projects: Project[];
  clients: Client[];
}

export default function PortfolioGalleryScene({ projects, clients }: PortfolioGallerySceneProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterOptions = [
    { id: 'all', label: 'All Verified Work' },
    { id: 'featured', label: 'Curated Highlights' },
    { id: 'completed', label: 'Delivered Deployments' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'featured') return p.is_featured;
    if (selectedFilter === 'completed') return p.status?.toLowerCase() === 'completed';
    return true;
  });

  return (
    <section
      id="portfolio-scene"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0C0C0C] text-white border-t border-zinc-900 overflow-hidden"
    >
      {/* Narrative Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-zinc-300">SCENE 04 / EXPERIENCE</span>
          </div>
          <span className="hidden md:inline">10 VERIFIED CLIENT PORTFOLIOS · CROSS-INDUSTRY WORK</span>
          <span className="text-gold-500/80">[ ZERO FICTIONAL CASE STUDIES ]</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/20 text-[11px] font-mono text-gold-400">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Real Commercial Deployments</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.02]">
              WORK CRAFTED WITH <span className="gold-text-gradient">RIGOR</span>, MEASURED BY RESULTS.
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-zinc-400 text-sm leading-relaxed">
              Explore authentic initiatives delivered for emerging ventures, catering enterprises, non-profits, healthcare institutions, and educational academies.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                data-cursor="filter"
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  selectedFilter === opt.id
                    ? 'bg-gold-500 text-black font-bold shadow-gold-glow'
                    : 'bg-zinc-900/70 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <NextLink
            href="/portfolio"
            data-cursor="explore"
            className="text-xs font-mono text-gold-400 hover:text-gold-300 flex items-center gap-2 group"
          >
            <span>View Full Portfolio Archive ({projects.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </NextLink>
        </div>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              // Asymmetric column spans for visual rhythm:
              // Index 0: 7 cols
              // Index 1: 5 cols
              // Index 2: 5 cols
              // Index 3: 7 cols
              // Index 4+: 6 cols each
              const colSpan =
                index % 4 === 0
                  ? 'lg:col-span-7'
                  : index % 4 === 1
                  ? 'lg:col-span-5'
                  : index % 4 === 2
                  ? 'lg:col-span-5'
                  : 'lg:col-span-7';

              const clientName = project.client?.name || 'Verified Client';

              return (
                <motion.div
                  layout
                  key={project.id || project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`${colSpan} group relative rounded-3xl bg-[#141414] border border-zinc-800/80 hover:border-gold-500/50 overflow-hidden transition-all duration-500 flex flex-col justify-between`}
                >
                  {/* Top Visual Card Area with Geometric Ambient Monogram */}
                  <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 flex flex-col justify-between overflow-hidden">
                    {/* Background Noise & Radial Light */}
                    <div className="absolute inset-0 bg-dark-radial opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-gold-500/10 blur-3xl group-hover:bg-gold-500/20 transition-all duration-700" />

                    {/* Top Row: Client badge & Project Status */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700 backdrop-blur-md">
                        <Building2 className="w-3 h-3 text-gold-500" />
                        <span className="text-[11px] font-mono font-medium text-white tracking-wide">
                          {clientName}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-400">
                        {project.status || 'Verified Case'}
                      </span>
                    </div>

                    {/* Center Monogram / Typographic Mark */}
                    <div className="relative z-10 flex flex-col items-center justify-center py-6 text-center">
                      <span className="font-display font-black text-5xl sm:text-7xl text-zinc-800 group-hover:text-gold-500/30 transition-colors duration-500 tracking-tighter select-none">
                        {clientName.slice(0, 2).toUpperCase()}
                      </span>
                    </div>

                    {/* Deliverables tags */}
                    <div className="relative z-10 flex flex-wrap gap-1.5">
                      {project.deliverables && project.deliverables.slice(0, 3).map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-zinc-900/80 text-zinc-300 border border-zinc-800 backdrop-blur-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Editorial Content Area */}
                  <div className="p-8 flex flex-col justify-between flex-grow bg-[#141414]">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white group-hover:text-gold-400 transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                        {project.project_summary || project.project_overview}
                      </p>
                    </div>

                    {/* Card Footer with Link */}
                    <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between">
                      <NextLink
                        href={`/portfolio/${project.slug}`}
                        data-cursor="case study"
                        className="text-xs font-mono font-medium text-white group-hover:text-gold-400 flex items-center gap-2 transition-colors"
                      >
                        <span>Examine Case Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-gold-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </NextLink>

                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        JM / {project.slug.slice(0, 8)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
