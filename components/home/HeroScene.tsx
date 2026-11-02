'use client';

import React from 'react';
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Sparkles, Building, Layers } from 'lucide-react';
import HeroKineticObject from './HeroKineticObject';
import { SiteSettings } from '@/lib/types';

interface HeroSceneProps {
  settings: SiteSettings;
}

export default function HeroScene({ settings }: HeroSceneProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-dark-radial pointer-events-none" />

      {/* Top Studio Coordinate Bar */}
      <div className="max-w-7xl mx-auto w-full pt-4 flex flex-wrap items-center justify-between gap-4 text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest border-b border-zinc-900 pb-4 relative z-20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
          <span className="text-zinc-300">SCENE 01 / DISCOVER</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span>A Subsidiary of Jina Groups of Company Pvt. Ltd.</span>
          <span>•</span>
          <span>21 Integrated Solutions</span>
        </div>
        <div className="text-gold-500/90 font-medium">
          [ 11°39&apos;N · TAMIL NADU ]
        </div>
      </div>

      {/* Main Center Stage: Kinetic Object + Oversized Architectural Type */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8 lg:py-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Oversized Statement */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-gold-500/30 text-[11px] font-mono text-gold-400 tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Full-Stack Digital Agency & Creative Production</span>
            </motion.div>

            {/* Oversized Typography with Unexpected Line Breaks */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white tracking-tight leading-[0.98]"
            >
              WE DON&apos;T JUST{' '}
              <span className="block text-zinc-400 font-light">BUILD BRANDS.</span>
              <span className="gold-text-gradient block mt-1">
                WE MAKE THEM IMPOSSIBLE TO IGNORE.
              </span>
            </motion.h1>

            {/* Editorial Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-zinc-300 text-sm sm:text-base lg:text-lg max-w-xl font-sans leading-relaxed pt-2"
            >
              {settings.hero_subheadline}
            </motion.p>

            {/* Magnetic Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <NextLink
                href="#contact-starter"
                data-cursor="start"
                className="magnetic-btn px-8 py-4 rounded-full bg-gold-500 text-black font-display font-bold text-xs uppercase tracking-[0.18em] shadow-gold-glow hover:bg-champagne transition-all duration-300 flex items-center justify-center gap-3 group text-center"
              >
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </NextLink>

              <NextLink
                href="#portfolio-scene"
                data-cursor="explore"
                className="magnetic-btn px-8 py-4 rounded-full bg-zinc-900/90 text-white font-mono text-xs uppercase tracking-wider border border-zinc-800 hover:border-gold-500/40 hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center gap-2 text-center"
              >
                <span>Selected Work</span>
                <ChevronDown className="w-3.5 h-3.5 text-gold-500" />
              </NextLink>
            </motion.div>
          </div>

          {/* Right Column: Interactive Kinetic Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroKineticObject />
          </div>
        </div>
      </div>

      {/* Bottom Ticker & Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 relative z-20">
        <div className="flex items-center gap-4">
          <span className="text-gold-500 font-bold">[ 01 ]</span>
          <span className="truncate max-w-xs sm:max-w-md">
            Strategy · Branding · Web Architecture · Performance Ads · Shoots · Lead Gen
          </span>
        </div>

        <a
          href="#brand-story"
          className="flex items-center gap-2 text-zinc-400 hover:text-gold-400 transition-colors py-1 group"
        >
          <span>Scroll to uncover the story</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform text-gold-500" />
        </a>
      </div>
    </section>
  );
}
