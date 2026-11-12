'use client';

import React, { useState, useMemo } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { Search, ArrowUpRight, CheckCircle2, Clock, Building2, Filter, Sparkles } from 'lucide-react';
import { Project } from '@/lib/types';

interface PortfolioClientProps {
  initialProjects: Project[];
}

export default function PortfolioClient({ initialProjects }: PortfolioClientProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchStatus =
        filterStatus === 'all' ||
        (filterStatus === 'completed' && project.status?.toLowerCase() === 'completed') ||
        (filterStatus === 'pending' && project.pending_confirmation);

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.project_summary?.toLowerCase().includes(q) ||
        project.client?.name?.toLowerCase().includes(q);

      return matchStatus && matchQuery;
    });
  }, [initialProjects, filterStatus, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Controls: Search and Status Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#121212] border border-zinc-800/90">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search projects, client names..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-gold-500/70 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 ${
              filterStatus === 'all'
                ? 'bg-gold-500 text-black font-bold shadow-gold-glow'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            All Work ({initialProjects.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('completed')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 ${
              filterStatus === 'completed'
                ? 'bg-gold-500 text-black font-bold shadow-gold-glow'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            Delivered Case Studies
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('pending')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-200 ${
              filterStatus === 'pending'
                ? 'bg-gold-500 text-black font-bold shadow-gold-glow'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            In Progress / Scope
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-[#121212] border border-zinc-800 rounded-3xl">
          <Filter className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="font-display text-lg font-bold text-white">No matching projects found</h3>
          <button
            onClick={() => {
              setFilterStatus('all');
              setSearchQuery('');
            }}
            className="mt-4 px-5 py-2 rounded-full bg-gold-500 text-black text-xs font-display font-bold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const clientName = project.client?.name || 'Verified Client';
            const numIndex = String(index + 1).padStart(2, '0');

            return (
              <div
                key={project.id || project.slug}
                className="group rounded-3xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/50 hover:bg-[#151515] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Header with Real Image or Client Monogram */}
                <div className="relative aspect-[16/10] w-full bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-b border-zinc-800/60">
                  {project.cover_image ? (
                    <>
                      <Image
                        src={project.cover_image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30 group-hover:via-black/40 transition-colors duration-500" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 to-[#101010]" />
                  )}

                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/75 border border-zinc-700/80 backdrop-blur-md">
                      <Building2 className="w-3.5 h-3.5 text-gold-500" />
                      <span className="text-xs font-mono text-white font-medium">{clientName}</span>
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/75 border border-zinc-800 text-zinc-300 backdrop-blur-md">
                      {project.status || 'Verified'}
                    </span>
                  </div>

                  {!project.cover_image && (
                    <div className="relative z-10 py-6 text-center">
                      <span className="font-display font-black text-6xl text-zinc-800 group-hover:text-gold-500/30 transition-colors select-none tracking-tighter">
                        {clientName.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-gold-400 transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                      {project.project_summary || project.project_overview}
                    </p>

                    {/* Deliverables tags */}
                    {project.deliverables && project.deliverables.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-1.5">
                        {project.deliverables.slice(0, 3).map((item, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Action */}
                  <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between">
                    <NextLink
                      href={`/portfolio/${project.slug}`}
                      className="text-xs font-mono font-medium text-white group-hover:text-gold-400 flex items-center gap-2 transition-colors"
                    >
                      <span>Examine Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gold-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </NextLink>

                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      CASE / {numIndex}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
