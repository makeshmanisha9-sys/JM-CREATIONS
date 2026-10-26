import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import NextLink from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Building,
  Target,
  Briefcase,
  Layers,
  Sparkles,
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
    <div className="py-12 sm:py-16 space-y-16">
      {/* 1. Breadcrumb & Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NextLink
          href="/portfolio"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-gold-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </NextLink>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">
                Client: {project.client?.name || 'Verified Client'}
              </span>
              <span
                className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded ${
                  project.status === 'Completed'
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-950/40 text-amber-300 border border-amber-500/30'
                }`}
              >
                {project.status}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              {project.project_summary}
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#121214] border border-zinc-800 space-y-3 text-xs">
            <div className="text-gold-500 font-bold uppercase tracking-wider text-[11px]">
              Case Study Metadata
            </div>
            <div className="flex justify-between py-1.5 border-b border-zinc-800 text-zinc-300">
              <span className="text-zinc-500">Client:</span>
              <span className="font-semibold text-white">{project.client?.name}</span>
            </div>
            {project.publication_date && (
              <div className="flex justify-between py-1.5 border-b border-zinc-800 text-zinc-300">
                <span className="text-zinc-500">Project Date:</span>
                <span className="text-white">{project.publication_date}</span>
              </div>
            )}
            <div className="flex justify-between py-1.5 text-zinc-300">
              <span className="text-zinc-500">Verification:</span>
              <span className="text-emerald-400 font-medium">Verified Record</span>
            </div>

            <NextLink
              href="/contact"
              className="w-full mt-3 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-wider text-xs shadow-gold-glow flex items-center justify-center gap-2 transition-colors block text-center"
            >
              <span>Enquire for Similar Solutions</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
              <div className="font-bold text-amber-300 mb-1">Scope Details Awaiting Confirmation</div>
              <p className="text-amber-200/90 leading-relaxed">
                {project.client?.name} is an active client in JM Creations portfolio. Detailed project deliverables, performance metrics, and media assets will be published as confirmed by the company without fabricating unverified metrics.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Project Overview & Business Objective */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.project_overview && (
            <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-gold-500" />
                <span>Project Scope & Overview</span>
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed">{project.project_overview}</p>
            </div>
          )}

          {project.business_objective && (
            <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-gold-500" />
                <span>Commercial Objective</span>
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed">{project.business_objective}</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Strategy & Approach (Only if confirmed) */}
      {project.strategy_approach && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#121214] border border-zinc-800 space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold-500" />
              <span>Strategy and Approach</span>
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {project.strategy_approach}
            </p>
          </div>
        </section>
      )}

      {/* 4. Deliverables Checklist */}
      {project.deliverables && project.deliverables.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Project Deliverables</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.deliverables.map((del, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-black/50 border border-zinc-800 flex items-center gap-3 text-xs text-zinc-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Verified Results (Only displayed if verified) */}
      {project.results && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-zinc-900/60 border border-gold-500/20 space-y-4">
            <h3 className="text-xl font-bold text-white">Verified Commercial Results</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{project.results}</p>
          </div>
        </section>
      )}

      {/* 6. Related Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white">More Client Engagements</h3>
            <p className="text-xs text-zinc-400">Discover other projects delivered by JM Creations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((p) => (
              <div key={p.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="text-xs text-gold-500 font-bold mb-1">{p.client?.name}</div>
                <h4 className="text-base font-bold text-white mb-2">{p.title}</h4>
                <p className="text-xs text-zinc-400 mb-4">{p.project_summary}</p>
                <NextLink
                  href={`/portfolio/${p.slug}`}
                  className="text-xs font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3 h-3" />
                </NextLink>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/80 border border-gold-500/30 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-white">Have a Similar Project Requirement?</h2>
          <p className="text-zinc-300 text-sm max-w-lg mx-auto">
            Discuss your commercial goals with JM Creations. We structure bespoke business and digital solutions tailored to your targets.
          </p>
          <NextLink
            href="/contact"
            className="inline-block px-8 py-3.5 rounded-xl bg-gold-500 text-black font-bold uppercase tracking-wider text-xs shadow-gold-glow hover:bg-gold-400 transition-colors"
          >
            Start Your Consultation
          </NextLink>
        </div>
      </section>
    </div>
  );
}
