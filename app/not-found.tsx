import React from 'react';
import NextLink from 'next/link';
import { ArrowLeft, Home, Briefcase, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-lg mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-gold-500/40 text-gold-500 font-bold text-2xl flex items-center justify-center mx-auto shadow-gold-glow">
          404
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Page Not Located
        </h1>

        <p className="text-zinc-400 text-sm leading-relaxed">
          The requested page could not be found or has been moved. Explore our core services or return to the JM Creations homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <NextLink
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-wider text-xs shadow-gold-glow flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </NextLink>

          <NextLink
            href="/services"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs border border-zinc-800 flex items-center justify-center gap-2 transition-colors"
          >
            <Briefcase className="w-4 h-4 text-gold-500" />
            <span>View Services</span>
          </NextLink>
        </div>
      </div>
    </div>
  );
}
