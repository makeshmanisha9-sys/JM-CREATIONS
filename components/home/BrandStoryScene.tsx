'use client';

import React from 'react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, Shield, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface BrandStorySceneProps {
  settings: SiteSettings;
}

export default function BrandStoryScene({ settings }: BrandStorySceneProps) {
  return (
    <section
      id="brand-story"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F7F5F0] text-[#151515] transition-colors duration-700 overflow-hidden"
    >
      {/* Editorial Decorative Grid & Metadata Marks */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-300 pb-3 pointer-events-none">
        <span>SCENE 02 / BELIEVE</span>
        <span className="hidden sm:inline">STUDIO PHILOSOPHY & INTEGRATED CAPABILITIES</span>
        <span>JM / CREATIONS · 2026</span>
      </div>

      <div className="max-w-7xl mx-auto pt-8">
        {/* Massive Editorial Headline */}
        <div className="space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/80 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-700">
            <Compass className="w-3.5 h-3.5 text-zinc-900" />
            <span>The Foundational Belief</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#151515] leading-[1.05] max-w-5xl">
            EVERY GREAT BRAND{' '}
            <span className="italic font-serif font-light text-zinc-500">starts with</span>{' '}
            AN UNCOMPROMISING IDEA.
          </h2>
        </div>

        {/* Asymmetric Editorial Studio Collage Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Side: Editorial Manifesto & Governance Statement */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-base sm:text-lg lg:text-xl text-zinc-800 leading-relaxed font-sans font-medium">
              JM Creations was built to resolve a fundamental commercial problem: businesses are exhausted by managing fragmented vendors who don&apos;t talk to each other.
            </p>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              When business consulting operates in isolation from visual branding, web architecture is outsourced separately from marketing campaigns, and photo shoots lack advertising direction, businesses waste capital on misaligned assets.
            </p>

            {/* Parent Group Institutional Anchor */}
            <div className="p-6 rounded-2xl bg-white border border-zinc-300 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-gold-600" />
                <span>Corporate Lineage: Jina Groups</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {settings.parent_company_relationship}
              </p>
            </div>

            <div className="pt-2">
              <NextLink
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-900 hover:text-gold-700 uppercase tracking-widest border-b border-zinc-900 pb-1 transition-colors"
              >
                <span>Read Full Corporate Profile & Mission</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </NextLink>
            </div>
          </div>

          {/* Right Side: Layered Architectural Visual Collage */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Studio Card 1: Strategic Blueprint */}
              <div className="p-6 rounded-2xl bg-[#080808] text-white shadow-xl flex flex-col justify-between min-h-[220px]">
                <div className="flex justify-between items-start text-xs font-mono text-zinc-400">
                  <span>DISCIPLINE 01</span>
                  <span className="text-gold-400">STRATEGY</span>
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-white mb-2">
                    Commercial Diagnostics
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Analyzing business friction, pricing models, and market positioning before designing a single pixel.
                  </p>
                </div>
              </div>

              {/* Studio Card 2: Visual & Tech */}
              <div className="p-6 rounded-2xl bg-white border border-zinc-300 shadow-sm flex flex-col justify-between min-h-[220px]">
                <div className="flex justify-between items-start text-xs font-mono text-zinc-500">
                  <span>DISCIPLINE 02</span>
                  <span className="text-gold-600 font-bold">TECH & CRAFT</span>
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-zinc-900 mb-2">
                    Bespoke Engineering
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Custom web systems, high-intent lead funnels, and motion production built for conversion.
                  </p>
                </div>
              </div>

              {/* Studio Card 3: Performance Ads */}
              <div className="p-6 rounded-2xl bg-white border border-zinc-300 shadow-sm flex flex-col justify-between min-h-[220px]">
                <div className="flex justify-between items-start text-xs font-mono text-zinc-500">
                  <span>DISCIPLINE 03</span>
                  <span className="text-gold-600 font-bold">DISTRIBUTION</span>
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-zinc-900 mb-2">
                    Disciplined Ads
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Targeted Google search intent and high-converting Meta reels that acquire qualified buyers.
                  </p>
                </div>
              </div>

              {/* Studio Card 4: Verified Execution */}
              <div className="p-6 rounded-2xl bg-zinc-900 text-white shadow-xl flex flex-col justify-between min-h-[220px] border border-gold-500/30">
                <div className="flex justify-between items-start text-xs font-mono text-zinc-400">
                  <span>DISCIPLINE 04</span>
                  <span className="text-gold-400">ACCOUNTABILITY</span>
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-gold-400 mb-2">
                    Factual Standards
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Zero fake metrics. Clear deliverables, verified client records, and transparent reporting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
