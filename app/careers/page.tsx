import React from 'react';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { Briefcase, MapPin, Clock, CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import { getCareers, getSiteSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Careers | JM Creations',
  description:
    'Join JM Creations, part of Jina Groups of Company Pvt. Ltd. Explore career opportunities in commercial sales, digital marketing, and creative production.',
};

export default async function CareersPage() {
  const [careers, settings] = await Promise.all([
    getCareers({ includeUnpublished: false }),
    getSiteSettings(),
  ]);

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-gold-500/30 text-xs text-gold-400 font-medium mb-4">
          <Briefcase className="w-3.5 h-3.5 text-gold-500" />
          <span>Work With Us</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Career Opportunities at JM Creations
        </h1>
        <p className="mt-4 text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto">
          We are building an agile team of business developers, marketing specialists, and media creators across South India.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {careers.map((job) => (
          <div
            key={job.id}
            className="p-8 sm:p-10 rounded-3xl bg-[#121214] border border-zinc-800 hover:border-gold-500/40 transition-all duration-300 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
              <div>
                <span className="text-xs font-bold text-gold-500 uppercase tracking-wider block mb-1">
                  {job.department}
                </span>
                <h2 className="text-2xl font-bold text-white tracking-tight">{job.title}</h2>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                  <MapPin className="w-3.5 h-3.5 text-gold-500" />
                  <span>{job.location}</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
                  <Clock className="w-3.5 h-3.5 text-gold-500" />
                  <span>{job.employment_type}</span>
                </span>
              </div>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed">{job.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Key Responsibilities
                </h3>
                <ul className="space-y-2.5">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="text-xs text-zinc-400 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Candidate Requirements
                </h3>
                <ul className="space-y-2.5">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="text-xs text-zinc-400 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-zinc-400">
                Send your CV/Resume with portfolio to{' '}
                <a
                  href={`mailto:${settings.email}?subject=Job Application: ${encodeURIComponent(job.title)}`}
                  className="text-gold-400 font-semibold underline underline-offset-4"
                >
                  {settings.email}
                </a>
              </span>

              <a
                href={`mailto:${settings.email}?subject=Job Application: ${encodeURIComponent(job.title)}`}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold uppercase tracking-wider transition-colors shadow-gold-glow flex items-center justify-center gap-2"
              >
                <span>Apply via Email</span>
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
