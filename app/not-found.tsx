import React from 'react';
import NextLink from 'next/link';
import { ArrowLeft, Home, Briefcase, Phone, Compass, ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-[#080808] text-white">
      <div className="text-center max-w-xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/30 text-xs font-mono text-gold-400">
          <Compass className="w-3.5 h-3.5 text-gold-500" />
          <span>404 · Uncharted Territory</span>
        </div>

        <div className="font-display font-black text-8xl sm:text-9xl tracking-tighter text-zinc-800 select-none">
          404
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Page Does Not Exist In Our Architecture
        </h1>

        <p className="text-zinc-400 text-sm leading-relaxed font-sans max-w-md mx-auto">
          The requested coordinate could not be found or has been relocated. Explore our 21 disciplines or return to the main studio index.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <NextLink
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-display font-bold uppercase tracking-wider text-xs shadow-gold-glow flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Studio Home</span>
          </NextLink>

          <NextLink
            href="/services"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider border border-zinc-800 hover:border-gold-500/40 flex items-center justify-center gap-2 transition-colors"
          >
            <span>All 21 Disciplines</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gold-500" />
          </NextLink>
        </div>
      </div>
    </div>
  );
}
