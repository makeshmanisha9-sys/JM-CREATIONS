'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Layers,
  Award,
} from 'lucide-react';
import { Client } from '@/lib/types';

interface ClientWorldSceneProps {
  clients: Client[];
}

export default function ClientWorldScene({ clients }: ClientWorldSceneProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Industry sectors metadata mapped cleanly to the 10 verified clients
  const clientSectorMap: Record<string, { sector: string; location: string; scope: string }> = {
    'strisha-catering': {
      sector: 'Food & Premium Catering',
      location: 'Tamil Nadu, India',
      scope: 'Brand Identity, Digital Collaterals & Campaign Strategy',
    },
    'ampiere-educational-institute': {
      sector: 'Higher Education & Academics',
      location: 'Tamil Nadu, India',
      scope: 'Admissions Campaign Strategy & Digital Presence',
    },
    'herbal-life': {
      sector: 'Wellness & Nutrition Retail',
      location: 'India',
      scope: 'Product Showcase & Digital Promotion Strategy',
    },
    'kufo-foundations': {
      sector: 'Non-Profit & Social Empowerment',
      location: 'India',
      scope: 'Institutional Branding & Awareness Architecture',
    },
    'gingeephotoofficial': {
      sector: 'Commercial Photography & Media',
      location: 'Tamil Nadu, India',
      scope: 'Creator Portfolio System & Visual Production',
    },
    'truevedha': {
      sector: 'Ayurvedic & Healthcare Retail',
      location: 'India',
      scope: 'Brand Narrative & E-Commerce Asset Blueprint',
    },
    'o2y': {
      sector: 'Lifestyle & Youth Enterprise',
      location: 'India',
      scope: 'Modern Visual Identity & Digital Launch Strategy',
    },
    'grace-speech-and-hearing-aids': {
      sector: 'Specialized Healthcare & Audiology',
      location: 'Tamil Nadu, India',
      scope: 'Patient Outreach Strategy & Credibility Architecture',
    },
    'waymax': {
      sector: 'Logistics & Trade Solutions',
      location: 'India',
      scope: 'Corporate Identity & Business Positioning',
    },
    'shevroys': {
      sector: 'Hospitality & Leisure Tourism',
      location: 'Yercaud, Tamil Nadu',
      scope: 'Hospitality Brand Direction & Guest Marketing Strategy',
    },
  };

  // Split client array for dual-speed marquee tickers
  const topTicker = clients.length > 0 ? clients : [];
  const bottomTicker = [...topTicker].reverse();

  return (
    <section
      id="clients-scene"
      className="relative py-24 sm:py-32 bg-transparent text-white border-t border-zinc-900/80 overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/5 blur-[140px] pointer-events-none" />

      {/* Coordinate & Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-zinc-300">SCENE 06 / IMAGINE</span>
          </div>
          <span className="hidden md:inline">ENTERPRISE PARTNERSHIPS · AUTHENTIC TRUST</span>
          <span className="text-gold-500/80">[ VERIFIED COLLABORATIONS ]</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/20 text-[11px] font-mono text-gold-400">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Verified Client Network</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.02]">
              TRUSTED ACROSS <span className="gold-text-gradient">INDUSTRIES</span>, FROM LOCAL ICONS TO GROWING ENTERPRISES.
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-zinc-400 text-sm leading-relaxed">
              We collaborate with visionary founders, institutions, and hospitality brands across South India to engineer enduring market presence.
            </p>
          </div>
        </div>
      </div>

      {/* Ticker Row 1: Forward Marquee */}
      <div className="py-3 border-y border-zinc-900/80 bg-zinc-950/60 overflow-hidden relative select-none">
        <div className="flex w-max animate-marquee space-x-6 items-center">
          {[...topTicker, ...topTicker, ...topTicker].map((client, idx) => {
            const meta = clientSectorMap[client.slug] || {
              sector: 'Commercial Enterprise',
              location: 'India',
              scope: 'Integrated Solutions',
            };
            return (
              <div
                key={`top-${client.id || client.slug}-${idx}`}
                onClick={() => setSelectedClient(client)}
                className="cursor-pointer group flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/60 hover:bg-[#161616] transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 group-hover:border-gold-500/50 flex items-center justify-center text-gold-500 font-display font-bold text-xs relative shrink-0">
                  {client.logo_url ? (
                    <Image src={client.logo_url} alt={client.name} fill sizes="32px" className="object-cover" />
                  ) : (
                    client.name.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div className="text-left">
                  <div className="text-xs font-display font-bold text-white group-hover:text-gold-400 transition-colors">
                    {client.name}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    {meta.sector}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ticker Row 2: Reverse Marquee */}
      <div className="py-3 border-b border-zinc-900/80 bg-zinc-950/40 overflow-hidden relative select-none mt-2">
        <div className="flex w-max animate-marquee-reverse space-x-6 items-center">
          {[...bottomTicker, ...bottomTicker, ...bottomTicker].map((client, idx) => {
            const meta = clientSectorMap[client.slug] || {
              sector: 'Commercial Enterprise',
              location: 'India',
              scope: 'Integrated Solutions',
            };
            return (
              <div
                key={`bottom-${client.id || client.slug}-${idx}`}
                onClick={() => setSelectedClient(client)}
                className="cursor-pointer group flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/60 hover:bg-[#161616] transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 group-hover:border-gold-500/50 flex items-center justify-center text-gold-500 font-display font-bold text-xs relative shrink-0">
                  {client.logo_url ? (
                    <Image src={client.logo_url} alt={client.name} fill sizes="32px" className="object-cover" />
                  ) : (
                    client.name.slice(0, 2).toUpperCase()
                  )}
                </div>
                <div className="text-left">
                  <div className="text-xs font-display font-bold text-white group-hover:text-gold-400 transition-colors">
                    {client.name}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500">
                    {meta.location}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Static Interactive 10-Client Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-gold-500">
              Complete Client Roster
            </h3>
            <p className="text-sm font-display font-bold text-white mt-1">
              Select any client record to inspect engagement scope
            </p>
          </div>
          <NextLink
            href="/clients"
            className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5"
          >
            <span>Explore Dedicated Directory</span>
            <ChevronRight className="w-3.5 h-3.5 text-gold-500" />
          </NextLink>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {clients.map((client) => {
            const meta = clientSectorMap[client.slug] || {
              sector: 'Commercial Enterprise',
              location: 'India',
              scope: 'Integrated Solutions',
            };
            const isSelected = selectedClient?.slug === client.slug;

            return (
              <button
                key={client.id || client.slug}
                onClick={() => setSelectedClient(client)}
                data-cursor="inspect"
                className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-900 border-gold-500 shadow-gold-glow'
                    : 'bg-[#121212] border-zinc-800/80 hover:border-zinc-700 hover:bg-[#151515]'
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold-500 font-display font-bold text-sm mb-4 relative shrink-0">
                    {client.logo_url ? (
                      <Image src={client.logo_url} alt={client.name} fill sizes="40px" className="object-cover" />
                    ) : (
                      client.name.slice(0, 2).toUpperCase()
                    )}
                  </div>
                  <h4 className="font-display text-sm font-bold text-white line-clamp-1">
                    {client.name}
                  </h4>
                  <p className="text-[11px] font-mono text-zinc-400 mt-1 line-clamp-1">
                    {meta.sector}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>{meta.location.split(',')[0]}</span>
                  <span className="text-gold-500">Scope →</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Client Inspection Drawer */}
        <AnimatePresence>
          {selectedClient && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#141414] border border-gold-500/40 relative text-left"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-gold-500 mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>VERIFIED CLIENT PARTNERSHIP RECORD</span>
                  </div>
                  <h4 className="font-display text-2xl font-bold text-white">
                    {selectedClient.name}
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-2xl">
                    {selectedClient.notes ||
                      clientSectorMap[selectedClient.slug]?.scope ||
                      'Comprehensive business solutions, branding strategy, digital assets, and enterprise consulting.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <NextLink
                    href={`/portfolio?client=${encodeURIComponent(selectedClient.slug)}`}
                    className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-display font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2"
                  >
                    <span>View Projects</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </NextLink>
                  <button
                    onClick={() => setSelectedClient(null)}
                    className="px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-mono"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Value Experience Section: 4 Core Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-20 border-t border-zinc-900">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-[11px] font-mono text-gold-500 uppercase tracking-widest mb-3">
            ARCHITECTURAL ADVANTAGE
          </div>
          <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white">
            FOUR REASONS ENTERPRISES CHOOSE <span className="gold-text-gradient">JM CREATIONS</span>.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 rounded-3xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/40 transition-colors">
            <div className="text-gold-500 font-mono text-xs font-bold mb-4">[ 01 / UNIFIED ]</div>
            <h4 className="font-display text-lg font-bold text-white mb-2">Zero Vendor Fragmentation</h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Business consulting, branding, custom software, and video production managed under one roof with one unified strategy.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/40 transition-colors">
            <div className="text-gold-500 font-mono text-xs font-bold mb-4">[ 02 / ACCOUNTABLE ]</div>
            <h4 className="font-display text-lg font-bold text-white mb-2">Backed by Jina Groups</h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Institutional corporate governance, established operating stability, and transparent commercial accountability.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/40 transition-colors">
            <div className="text-gold-500 font-mono text-xs font-bold mb-4">[ 03 / RIGOROUS ]</div>
            <h4 className="font-display text-lg font-bold text-white mb-2">Modern Technical Standards</h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Enterprise-grade Next.js, Supabase, 60fps animations, accessible UI, and sub-second load times built for real scale.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/40 transition-colors">
            <div className="text-gold-500 font-mono text-xs font-bold mb-4">[ 04 / MEASURABLE ]</div>
            <h4 className="font-display text-lg font-bold text-white mb-2">Commercial ROI Focus</h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Design and code that exists to drive actual customer acquisition, qualified leads, and brand authority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
