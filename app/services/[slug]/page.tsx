import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import NextLink from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  FileCheck,
  Building,
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
    <div className="py-12 sm:py-16 space-y-20">
      {/* 1. Breadcrumbs & Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NextLink
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-gold-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All 21 Services</span>
        </NextLink>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-[11px] font-bold text-gold-500 uppercase tracking-wider">
              <span>{service.category?.name || 'Integrated Solution'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {service.title}
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
              {service.excerpt}
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#121214] border border-zinc-800 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-gold-500">
              Service Fast Facts
            </div>
            <div className="space-y-2.5 text-xs text-zinc-300">
              <div className="flex justify-between py-1.5 border-b border-zinc-800">
                <span className="text-zinc-500">Classification:</span>
                <span className="font-medium text-white">{service.category?.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800">
                <span className="text-zinc-500">Execution Model:</span>
                <span className="font-medium text-white">Full-Stack Managed</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-zinc-800">
                <span className="text-zinc-500">Provider:</span>
                <span className="font-medium text-white">JM Creations</span>
              </div>
            </div>

            <a
              href="#service-enquiry"
              className="w-full mt-4 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-wider text-xs shadow-gold-glow flex items-center justify-center gap-2 transition-colors block text-center"
            >
              <span>Enquire for this Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Detailed Service Description */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Overview & Strategic Value</h2>
          <div className="text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
            <p>{service.description}</p>
          </div>
        </div>
      </section>

      {/* 3. Benefits & Deliverables Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Benefits */}
          <div className="p-8 rounded-3xl bg-[#121214] border border-zinc-800 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-gold-500" />
              <span>Key Business Benefits</span>
            </h3>
            <ul className="space-y-4">
              {service.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables Checklist */}
          <div className="p-8 rounded-3xl bg-[#121214] border border-zinc-800 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2.5">
              <FileCheck className="w-5 h-5 text-gold-500" />
              <span>Structured Deliverables</span>
            </h3>
            <ul className="space-y-4">
              {service.deliverables.map((deliverable, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Process Steps */}
      {service.process_steps && service.process_steps.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-2">
              Implementation Timeline
            </div>
            <h3 className="text-2xl font-bold text-white">Our Execution Methodology</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process_steps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-left relative"
              >
                <div className="text-gold-500 font-mono text-sm font-bold mb-2">
                  Stage 0{idx + 1}
                </div>
                <div className="text-sm font-semibold text-white">{step}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Related Projects (if any) */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white">Related Client Work</h3>
            <p className="text-xs text-zinc-400">Verified engagements featuring this service.</p>
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

      {/* 6. Dedicated Service Enquiry Portal */}
      <section id="service-enquiry" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Request a Consultation for {service.title}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Our specialists will review your requirements and provide tailored strategic recommendations.
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
