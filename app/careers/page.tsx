import React from 'react';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { Briefcase, MapPin, Clock, CheckCircle2, ArrowUpRight, Mail, Sparkles, Building2 } from 'lucide-react';
import { getCareers, getSiteSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Careers | JM Creations (Jina Groups Subsidiary)',
  description:
    'Join JM Creations, part of Jina Groups of Company Pvt. Ltd. Explore career opportunities in commercial sales, digital marketing, and creative production.',
};

export default async function CareersPage() {
  const [careers, settings] = await Promise.all([
    getCareers({ includeUnpublished: false }),
    getSiteSettings(),
  ]);

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-16 bg-[#080808] text-white min-h-screen">
      {/* Studio Header Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-zinc-300">STUDIO TALENT / RECRUITMENT</span>
          </div>
          <span className="hidden md:inline">JINA GROUPS SUBSIDIARY · TAMIL NADU</span>
          <span className="text-gold-500/80">[ ACTIVE ROLES ]</span>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/30 text-[11px] font-mono text-gold-400">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Join The Studio</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.04]">
            BUILD THE FUTURE OF <span className="gold-text-gradient">COMMERCIAL</span> IMPACT.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed pt-2 max-w-3xl font-sans">
            We are assembling an agile, obsessive team of business developers, full-stack engineers, and visual creators backed by Jina Groups governance.
          </p>
        </div>
      </div>

      {/* Careers List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {careers.map((job) => (
          <div
            key={job.id}
            className="p-8 sm:p-12 rounded-3xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/50 hover:bg-[#151515] transition-all duration-300 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
              <div>
                <span className="text-xs font-mono font-bold text-gold-500 uppercase tracking-wider block mb-1">
                  {job.department}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {job.title}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
                  <MapPin className="w-3.5 h-3.5 text-gold-500" />
                  <span>{job.location}</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
                  <Clock className="w-3.5 h-3.5 text-gold-500" />
                  <span>{job.employment_type}</span>
                </span>
              </div>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed font-sans">{job.description}</p>

            {job.requirements && job.requirements.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Core Requirements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {job.requirements.map((req, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-zinc-300 font-sans"
                    >
                      <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs font-mono text-zinc-400">
                Send CV to <strong className="text-white">{settings.email || 'jmcreationinfo@gmail.com'}</strong>
              </span>

              <a
                href={`mailto:${settings.email || 'jmcreationinfo@gmail.com'}?subject=${encodeURIComponent(
                  `Application for ${job.title} - JM Creations`
                )}`}
                className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-black text-xs font-display font-bold uppercase tracking-wider shadow-gold-glow flex items-center gap-2 transition-all"
              >
                <span>Apply For Position</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}

        {/* Speculative Application Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-gold-500/30 text-center space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-gold-500">
            SPECULATIVE INTAKE
          </div>
          <h3 className="font-display text-2xl font-bold text-white">Don&apos;t See Your Role Listed?</h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-sans leading-relaxed">
            We are always interested in meeting exceptional creative directors, full-stack engineers, and growth strategists. Send your portfolio and background to our leadership team.
          </p>
          <a
            href={`mailto:${settings.email || 'jmcreationinfo@gmail.com'}?subject=Speculative Application - JM Creations`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 hover:border-gold-500/40 text-xs font-mono uppercase tracking-wider text-white hover:bg-zinc-800 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-gold-500" />
            <span>Send Speculative Application</span>
          </a>
        </div>
      </div>
    </div>
  );
}
