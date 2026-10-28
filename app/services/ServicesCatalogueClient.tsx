'use client';

import React, { useState, useMemo } from 'react';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Filter,
  Layers,
  ChevronRight,
  Briefcase,
  Palette,
  TrendingUp,
  Code2,
  Video,
} from 'lucide-react';
import { Service, ServiceCategory } from '@/lib/types';

interface ServicesCatalogueClientProps {
  initialServices: Service[];
  categories: ServiceCategory[];
}

export default function ServicesCatalogueClient({
  initialServices,
  categories,
}: ServicesCatalogueClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = useMemo(() => {
    return initialServices.filter((service) => {
      const matchCategory =
        selectedCategory === 'all' ||
        service.category?.slug === selectedCategory ||
        service.category_id === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.excerpt.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.deliverables?.some((d) => d.toLowerCase().includes(q)) ||
        service.category?.name.toLowerCase().includes(q);

      return matchCategory && matchQuery;
    });
  }, [initialServices, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#121212] border border-zinc-800/90">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search disciplines, deliverables..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-gold-500/70 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-gold-500 text-black font-bold shadow-gold-glow'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            All 21 Disciplines
          </button>

          {categories.map((cat) => {
            const count = initialServices.filter(
              (s) => s.category_id === cat.id || s.category?.slug === cat.slug
            ).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-gold-500 text-black font-bold shadow-gold-glow'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-20 bg-[#121212] border border-zinc-800 rounded-3xl">
          <Filter className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="font-display text-lg font-bold text-white">No matching disciplines found</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or reset your category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-5 px-5 py-2 rounded-full bg-gold-500 text-black text-xs font-display font-bold uppercase tracking-wider"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => {
            const numIndex = String(index + 1).padStart(2, '0');
            return (
              <div
                key={service.id || service.slug}
                className="group p-8 rounded-3xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/50 hover:bg-[#151515] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-6">
                    <span className="text-gold-500 font-semibold">[ {numIndex} / 21 ]</span>
                    <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {service.category?.name || 'Integrated'}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-400 transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                    {service.excerpt}
                  </p>

                  {/* Deliverables tags */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {service.deliverables.slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-1 rounded bg-zinc-900/80 text-zinc-300 border border-zinc-800"
                        >
                          + {item}
                        </span>
                      ))}
                      {service.deliverables.length > 3 && (
                        <span className="text-[10px] font-mono px-2 py-1 rounded bg-zinc-900/40 text-gold-500/80">
                          +{service.deliverables.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between">
                  <NextLink
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="text-xs font-mono text-zinc-400 hover:text-gold-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Initiate Project</span>
                    <ChevronRight className="w-3.5 h-3.5 text-gold-500" />
                  </NextLink>

                  <NextLink
                    href={`/services/${service.slug}`}
                    className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 group-hover:bg-gold-500 group-hover:text-black group-hover:border-gold-500 text-zinc-300 flex items-center justify-center transition-all duration-300"
                    title={`View in-depth specification for ${service.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </NextLink>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
