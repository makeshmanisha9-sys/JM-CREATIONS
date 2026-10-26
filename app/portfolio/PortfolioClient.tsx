'use client';

import React, { useState, useMemo } from 'react';
import NextLink from 'next/link';
import { Search, ArrowRight, CheckCircle2, Clock, Check } from 'lucide-react';
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
        (filterStatus === 'completed' && project.status === 'Completed') ||
        (filterStatus === 'pending' && project.pending_confirmation);

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.project_summary.toLowerCase().includes(q) ||
        project.client?.name.toLowerCase().includes(q);

      return matchStatus && matchQuery;
    });
  }, [initialProjects, filterStatus, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Controls: Search and Status Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-zinc-900/70 p-4 rounded-2xl border border-zinc-800">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search projects or clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-gold-500/70 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              filterStatus === 'all'
                ? 'bg-gold-500 text-black shadow-gold-glow'
                : 'bg-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            All Projects ({initialProjects.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('completed')}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              filterStatus === 'completed'
                ? 'bg-gold-500 text-black shadow-gold-glow'
                : 'bg-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            Completed Case Studies
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('pending')}
            className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              filterStatus === 'pending'
                ? 'bg-gold-500 text-black shadow-gold-glow'
                : 'bg-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            Scope Pending
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#121214] border border-zinc-800 rounded-2xl p-7 flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-white tracking-wide">
                  {project.client?.name || 'Client Project'}
                </span>
                <span
                  className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded ${
                    project.status === 'Completed'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-950/40 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                {project.project_summary}
              </p>

              {project.deliverables && project.deliverables.length > 0 && (
                <div className="mb-6">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-gold-500 mb-2">
                    Delivered Solutions
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.deliverables.map((del, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-300"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <NextLink
                href={`/portfolio/${project.slug}`}
                className="text-xs font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1.5"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </NextLink>
              <span className="text-[11px] text-zinc-400">
                {project.pending_confirmation ? 'Awaiting verification' : 'Verified Client'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
