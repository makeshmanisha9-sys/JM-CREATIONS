'use client';

import React, { useState, useMemo } from 'react';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowUpRight,
  Briefcase,
  Palette,
  TrendingUp,
  Code2,
  Video,
  Layers,
  CheckCircle2,
  ChevronRight,
  X,
  Sparkles,
} from 'lucide-react';
import { Service } from '@/lib/types';

interface ServicesWorldSceneProps {
  services: Service[];
}

export default function ServicesWorldScene({ services }: ServicesWorldSceneProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectedService, setInspectedService] = useState<Service | null>(null);

  const categories = [
    { id: 'all', name: 'All 21 Disciplines', icon: Layers },
    { id: 'business-and-startup-consulting', name: 'Business & Startup', icon: Briefcase },
    { id: 'branding-and-creative-design', name: 'Branding & Design', icon: Palette },
    { id: 'digital-marketing-and-advertising', name: 'Marketing & Ads', icon: TrendingUp },
    { id: 'web-and-technology-solutions', name: 'Web & Tech', icon: Code2 },
    { id: 'media-and-commercial-production', name: 'Media & Production', icon: Video },
  ];

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        activeCategory === 'all' ||
        service.category?.slug === activeCategory ||
        service.category_id === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.excerpt?.toLowerCase().includes(q) ||
        service.deliverables?.some((d) => d.toLowerCase().includes(q)) ||
        service.benefits?.some((b) => b.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [services, activeCategory, searchQuery]);

  return (
    <section
      id="services-scene"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#080808] text-white border-t border-zinc-900 overflow-hidden"
    >
      {/* Background radial atmosphere */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-gold-500/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Coordinate & Narrative header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-zinc-300">SCENE 03 / EXPLORE</span>
          </div>
          <span className="hidden md:inline">21 SPECIALIZED CAPABILITIES · 5 INTEGRATED PILLARS</span>
          <span className="text-gold-500/80">[ ZERO OUTSOURCED SILOS ]</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/20 text-[11px] font-mono text-gold-400">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Modular Commercial Capabilities</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.02]">
              THE COMPLETE <span className="gold-text-gradient">PLAYGROUND</span> OF CREATIVE & TECHNICAL POWER.
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-zinc-400 text-sm leading-relaxed">
              Every stage of your business growth—from government registrations and investor pitch decks to high-conversion web platforms and commercial cinema shoots.
            </p>
          </div>
        </div>

        {/* Filter Toolbar & Search */}
        <div className="mt-12 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  data-cursor="filter"
                  className={`px-4 py-2.5 rounded-full text-xs font-mono tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gold-500 text-black font-bold shadow-gold-glow'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 21 services, deliverables..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredServices.map((service, index) => {
              const serviceIndex = String(index + 1).padStart(2, '0');
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  key={service.id || service.slug}
                  className="group relative p-8 rounded-2xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/50 hover:bg-[#161616] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Header & Counter */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-6">
                      <span className="text-gold-500 font-semibold">[ {serviceIndex} / 21 ]</span>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {service.category?.name || 'Integrated'}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-400 transition-colors leading-snug">
                      {service.title}
                    </h3>

                    <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                      {service.excerpt || service.description}
                    </p>

                    {/* Deliverables sample pills */}
                    {service.deliverables && service.deliverables.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-1.5">
                        {service.deliverables.slice(0, 3).map((del, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-1 rounded bg-zinc-900/80 text-zinc-300 border border-zinc-800"
                          >
                            + {del}
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
                    <button
                      type="button"
                      onClick={() => setInspectedService(service)}
                      data-cursor="inspect"
                      className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span>Quick Blueprint</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gold-500" />
                    </button>

                    <NextLink
                      href={`/services/${service.slug}`}
                      data-cursor="view"
                      className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 group-hover:bg-gold-500 group-hover:text-black group-hover:border-gold-500 text-zinc-300 flex items-center justify-center transition-all duration-300"
                      title={`View full details for ${service.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </NextLink>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-zinc-950/50 rounded-2xl border border-zinc-900">
            <p className="text-zinc-400 text-sm">No services found matching &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-zinc-900 text-gold-400 text-xs font-mono hover:bg-zinc-800"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick Blueprint Modal / Drawer */}
      <AnimatePresence>
        {inspectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#141414] border border-gold-500/30 p-6 sm:p-8 shadow-2xl text-left"
            >
              <button
                onClick={() => setInspectedService(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-[11px] font-mono text-gold-500 uppercase tracking-widest mb-2">
                SERVICE BLUEPRINT · {inspectedService.category?.name || 'INTEGRATED'}
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {inspectedService.title}
              </h3>

              <p className="text-zinc-300 text-sm mt-3 leading-relaxed">
                {inspectedService.description || inspectedService.excerpt}
              </p>

              {/* Key Deliverables */}
              {inspectedService.deliverables && inspectedService.deliverables.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                    Structured Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {inspectedService.deliverables.map((del, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Strategic Benefits */}
              {inspectedService.benefits && inspectedService.benefits.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                    Commercial Impact & Value
                  </h4>
                  <ul className="space-y-2">
                    {inspectedService.benefits.map((benefit, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <NextLink
                  href={`/services/${inspectedService.slug}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-mono uppercase tracking-wider text-white border border-zinc-700 flex items-center justify-center gap-2"
                >
                  <span>Read Full In-Depth Page</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gold-400" />
                </NextLink>

                <NextLink
                  href={`/contact?service=${encodeURIComponent(inspectedService.title)}`}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-black text-xs font-display font-bold uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <span>Enquire For This Discipline</span>
                  <ChevronRight className="w-4 h-4" />
                </NextLink>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
