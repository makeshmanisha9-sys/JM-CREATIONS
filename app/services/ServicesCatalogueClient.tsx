'use client';

import React, { useState, useMemo } from 'react';
import NextLink from 'next/link';
import { Search, ArrowRight, CheckCircle2, Sparkles, Filter } from 'lucide-react';
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
        selectedCategory === 'all' || service.category?.slug === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.excerpt.toLowerCase().includes(q) ||
        service.description.toLowerCase().includes(q) ||
        service.category?.name.toLowerCase().includes(q);

      return matchCategory && matchQuery;
    });
  }, [initialServices, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Controls: Search & Category Filter Pills */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between bg-zinc-900/70 p-4 sm:p-5 rounded-2xl border border-zinc-800 backdrop-blur-md">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search all 21 services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-gold-500/70 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-gold-500 text-black shadow-gold-glow'
                : 'bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            All Solutions ({initialServices.length})
          </button>

          {categories.map((cat) => {
            const count = initialServices.filter((s) => s.category_id === cat.id).length;
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-gold-500 text-black shadow-gold-glow'
                    : 'bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-800'
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
        <div className="text-center py-20 bg-[#121214] border border-zinc-800 rounded-2xl">
          <Filter className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No matching services found</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or select &quot;All Solutions&quot; to browse our full catalogue.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-4 py-2 bg-zinc-800 text-xs text-gold-400 font-semibold rounded-lg hover:bg-zinc-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl p-7 flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-gold-500 uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
                    {service.category?.name || 'Service'}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">#{service.sort_order}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  {service.excerpt}
                </p>

                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider">
                      Included Deliverables:
                    </div>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="text-xs text-zinc-400 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-5 border-t border-zinc-800/80 flex items-center justify-between">
                <NextLink
                  href={`/services/${service.slug}`}
                  className="text-xs font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1.5"
                >
                  <span>Detailed Specifications</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </NextLink>
                <NextLink
                  href={`/contact?service=${service.slug}`}
                  className="text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Enquire
                </NextLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
