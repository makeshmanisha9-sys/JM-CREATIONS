import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import NextLink from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  CheckCircle,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Layers,
  FileCheck,
  Building2,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { getServiceBySlug, getServices, getProjects } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: 'Service Not Found | JM Creations' };

  return {
    title: service.meta_title || `${service.title} | JM Creations`,
    description: service.meta_description || service.excerpt,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const [allServices, allProjects] = await Promise.all([
    getServices(),
    getProjects(),
  ]);

  // Find related projects that match this service
  const relatedProjects = allProjects.filter((p) => {
    const titleMatch = p.title.toLowerCase().includes(service.title.toLowerCase());
    const summaryMatch = p.project_summary.toLowerCase().includes(service.title.toLowerCase());
    const objectiveMatch = p.business_objective?.toLowerCase().includes(service.title.toLowerCase());
    return titleMatch || summaryMatch || objectiveMatch;
  });

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-20 bg-[#080808] text-white min-h-screen">
      {/* 1. Breadcrumbs & Studio Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-8">
          <NextLink
            href="/services"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All 21 Disciplines</span>
          </NextLink>

          <span className="hidden sm:inline">DISCIPLINE SPECIFICATION · JM CREATIONS</span>
          <span className="text-gold-500/80">[ MANAGED EXECUTION ]</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/30 text-[11px] font-mono text-gold-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>{service.category?.name || 'Integrated Solution'}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
              {service.title}
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl font-sans">
              {service.excerpt}
            </p>
          </div>

          {/* Service Fast Facts Card */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-[#121212] border border-zinc-800 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-gold-500">
              Discipline Metadata
            </div>
            <div className="space-y-3 text-xs font-mono text-zinc-300">
              <div className="flex justify-between py-2 border-b border-zinc-800/80">
                <span className="text-zinc-500">Pillar:</span>
                <span className="text-white font-medium">{service.category?.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-800/80">
                <span className="text-zinc-500">Governance:</span>
                <span className="text-white font-medium">Jina Groups</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-800/80">
                <span className="text-zinc-500">Delivery:</span>
                <span className="text-white font-medium">Full-Stack Managed</span>
              </div>
            </div>

            <a
              href="#service-enquiry"
              className="w-full mt-4 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-black font-display font-bold uppercase tracking-wider text-xs shadow-gold-glow flex items-center justify-center gap-2 transition-all block text-center"
            >
              <span>Initiate This Project</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Detailed Service Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#121212] border border-zinc-800/80 space-y-6">
          <div className="text-[10px] font-mono uppercase tracking-widest text-gold-500">
            STRATEGIC OVERVIEW & VALUE
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Why this discipline matters for your enterprise
          </h2>
          <div className="text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans max-w-4xl">
            <p>{service.description}</p>
          </div>
        </div>
      </section>

      {/* 3. Benefits & Deliverables Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Benefits */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#121212] border border-zinc-800/80 space-y-6">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-gold-500" />
              <h3 className="font-display text-xl font-bold text-white">Commercial Benefits</h3>
            </div>
            <ul className="space-y-4">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables Checklist */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#121212] border border-zinc-800/80 space-y-6">
            <div className="flex items-center gap-2.5">
              <FileCheck className="w-5 h-5 text-gold-500" />
              <h3 className="font-display text-xl font-bold text-white">Guaranteed Deliverables</h3>
            </div>
            <ul className="space-y-4">
              {service.deliverables.map((deliverable, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Execution Methodology Stages */}
      {service.process_steps && service.process_steps.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-[10px] font-mono text-gold-500 uppercase tracking-widest mb-1">
              EXECUTION BLUEPRINT
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Phased Implementation Cadence
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.process_steps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#121212] border border-zinc-800 text-left relative flex flex-col justify-between"
              >
                <div className="text-gold-500 font-mono text-xs font-bold mb-3">
                  STAGE 0{idx + 1}
                </div>
                <div className="font-display text-sm font-bold text-white leading-snug">{step}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Related Projects (if any) */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-[10px] font-mono text-gold-500 uppercase tracking-widest mb-1">
              EVIDENCE OF CAPABILITY
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Related Verified Deployments</h3>
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

      {/* 6. Dedicated Service Enquiry Portal */}
      <section id="service-enquiry" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8 p-8 sm:p-12 rounded-3xl bg-[#121212] border border-zinc-800">
          <div className="text-center space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-gold-500">
              DISCIPLINE INTAKE
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Request Project Commencement for {service.title}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Our specialists will review your requirements and provide tailored strategic recommendations within 24 hours.
            </p>
          </div>

          <ContactForm
            services={allServices}
            initialServiceSlug={service.slug}
            sourceContext={`service_page_${service.slug}`}
          />
        </div>
      </section>
    </div>
  );
}
