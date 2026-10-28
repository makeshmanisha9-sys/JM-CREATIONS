import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import NextLink from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Building2,
  Target,
  Briefcase,
  Layers,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { getProjectBySlug, getProjects } from '@/lib/data';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found | JM Creations' };

  return {
    title: project.meta_title || `${project.title} | JM Creations Portfolio`,
    description: project.meta_description || project.project_summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 2);

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-16 bg-[#080808] text-white min-h-screen">
      {/* 1. Breadcrumb & Studio Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-8">
          <NextLink
            href="/portfolio"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Portfolio Cases</span>
          </NextLink>

          <span className="hidden sm:inline">AUTHENTIC CASE STUDY · JM CREATIONS</span>
          <span className="text-gold-500/80">[ VERIFIED DEPLOYMENT ]</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/30 text-xs font-mono font-bold text-gold-400">
                <Building2 className="w-3.5 h-3.5 text-gold-500" />
                <span>{project.client?.name || 'Verified Client'}</span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                {project.status || 'Verified Case'}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              {project.title}
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl font-sans">
              {project.project_summary}
            </p>
          </div>

          <div className="lg:col-span-4 p-8 rounded-3xl bg-[#121212] border border-zinc-800 space-y-4 text-xs font-mono">
            <div className="text-gold-500 font-bold uppercase tracking-widest text-[11px]">
              Case Study Record
            </div>
            <div className="space-y-3 text-zinc-300">
              <div className="flex justify-between py-2 border-b border-zinc-800/80">
                <span className="text-zinc-500">Client Organization:</span>
                <span className="text-white font-medium">{project.client?.name}</span>
              </div>
              {project.publication_date && (
                <div className="flex justify-between py-2 border-b border-zinc-800/80">
                  <span className="text-zinc-500">Publication Date:</span>
                  <span className="text-white">{project.publication_date}</span>
                </div>
              )}
              <div className="flex justify-between py-2 text-zinc-300">
                <span className="text-zinc-500">Data Integrity:</span>
                <span className="text-emerald-400 font-semibold">Strict Commercial Truth</span>
              </div>
            </div>

            <NextLink
              href="/contact"
              className="w-full mt-4 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-display font-bold uppercase tracking-wider text-xs shadow-gold-glow flex items-center justify-center gap-2 transition-all block text-center"
            >
              <span>Initiate Similar Project</span>
              <ChevronRight className="w-4 h-4" />
            </NextLink>
          </div>
        </div>
      </div>

      {/* Pending Confirmation Notice if unconfirmed */}
      {project.pending_confirmation && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <div className="font-bold text-amber-300 mb-1">Scope Details In Review</div>
              <p className="text-amber-200/90 leading-relaxed font-sans">
                {project.client?.name} is an active client in JM Creations portfolio. Detailed project deliverables, performance metrics, and media assets will be published as confirmed without fabricating unverified metrics.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Project Scope & Commercial Objective */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.project_overview && (
            <div className="p-8 sm:p-10 rounded-3xl bg-[#121212] border border-zinc-800/80 space-y-4">
              <div className="flex items-center gap-2 text-gold-500 font-mono text-xs uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Scope & Engagement Overview</span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed font-sans">{project.project_overview}</p>
            </div>
          )}

          {project.business_objective && (
            <div className="p-8 sm:p-10 rounded-3xl bg-[#121212] border border-zinc-800/80 space-y-4">
              <div className="flex items-center gap-2 text-gold-500 font-mono text-xs uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>Commercial Objective</span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed font-sans">{project.business_objective}</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Strategy & Approach */}
      {project.strategy_approach && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#121212] border border-zinc-800/80 space-y-4">
            <div className="flex items-center gap-2 text-gold-500 font-mono text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Studio Strategic Approach</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engineering the Commercial Solution
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans max-w-4xl">
              {project.strategy_approach}
            </p>
          </div>
        </section>
      )}

      {/* 4. Deliverables Checklist */}
      {project.deliverables && project.deliverables.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#121212] border border-zinc-800/80 space-y-6">
            <h3 className="font-display text-2xl font-bold text-white">Project Deliverables Delivered</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.deliverables.map((del, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center gap-3 text-xs sm:text-sm text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Verified Results (if available) */}
      {project.results && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#121212] border border-gold-500/30 space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-gold-500">
              VERIFIED IMPACT
            </div>
            <h3 className="font-display text-xl font-bold text-white">Commercial Results</h3>
            <p className="text-zinc-300 text-sm leading-relaxed font-sans">{project.results}</p>
          </div>
        </section>
      )}

      {/* 6. Related Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-[10px] font-mono text-gold-500 uppercase tracking-widest mb-1">
              MORE ENGAGEMENTS
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Further Case Studies</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((p) => (
              <div key={p.id} className="p-8 rounded-3xl bg-[#121212] border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-gold-500 font-bold mb-2">{p.client?.name}</div>
                  <h4 className="font-display text-lg font-bold text-white mb-2">{p.title}</h4>
                  <p className="text-xs text-zinc-400 mb-6 line-clamp-2">{p.project_summary}</p>
                </div>
                <NextLink
                  href={`/portfolio/${p.slug}`}
                  className="text-xs font-mono font-medium text-white hover:text-gold-400 flex items-center gap-1.5 group"
                >
                  <span>Examine Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gold-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </NextLink>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Bottom Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-gold-500/30 text-center max-w-4xl mx-auto space-y-6">
          <div className="text-[10px] font-mono uppercase tracking-widest text-gold-500">
            START YOUR COLLABORATION
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Have a Similar Commercial Challenge?
          </h2>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto font-sans">
            Discuss your enterprise objectives with JM Creations. We craft unified business and digital strategies backed by Jina Groups governance.
          </p>
          <NextLink
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-full bg-gold-500 text-black font-display font-bold uppercase tracking-wider text-xs shadow-gold-glow hover:bg-gold-400 transition-colors"
          >
            Start Your Consultation
          </NextLink>
        </div>
      </section>
    </div>
  );
}
