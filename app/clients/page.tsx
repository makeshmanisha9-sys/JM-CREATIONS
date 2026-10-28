import React from 'react';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { Building2, ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { getClients, getProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Verified Client Directory | JM Creations',
  description:
    'Discover the 10 verified commercial clients and creator collaborations served by JM Creations across business consulting, lead generation, advertising, and creative production.',
};

export default async function ClientsPage() {
  const [clients, projects] = await Promise.all([
    getClients({ includeUnpublished: false }),
    getProjects({ includeUnpublished: false }),
  ]);

  // Map client ID to project if exists
  const projectMap = new Map(projects.map((p) => [p.client_id, p]));

  const clientSectorMap: Record<string, { sector: string; location: string; scope: string }> = {
    'strisha-catering': {
      sector: 'Food & Premium Catering',
      location: 'Tamil Nadu, India',
      scope: 'Brand Identity, Digital Collaterals & Campaign Strategy',
    },
    'ampiere-educational-institute': {
      sector: 'Higher Education & Academics',
      location: 'Tamil Nadu, India',
      scope: 'Admissions Campaign Strategy & Digital Presence',
    },
    'herbal-life': {
      sector: 'Wellness & Nutrition Retail',
      location: 'India',
      scope: 'Product Showcase & Digital Promotion Strategy',
    },
    'kufo-foundations': {
      sector: 'Non-Profit & Social Empowerment',
      location: 'India',
      scope: 'Institutional Branding & Awareness Architecture',
    },
    'gingeephotoofficial': {
      sector: 'Commercial Photography & Media',
      location: 'Tamil Nadu, India',
      scope: 'Creator Portfolio System & Visual Production',
    },
    'truevedha': {
      sector: 'Ayurvedic & Healthcare Retail',
      location: 'India',
      scope: 'Brand Narrative & E-Commerce Asset Blueprint',
    },
    'o2y': {
      sector: 'Lifestyle & Youth Enterprise',
      location: 'India',
      scope: 'Modern Visual Identity & Digital Launch Strategy',
    },
    'grace-speech-and-hearing-aids': {
      sector: 'Specialized Healthcare & Audiology',
      location: 'Tamil Nadu, India',
      scope: 'Patient Outreach Strategy & Credibility Architecture',
    },
    'waymax': {
      sector: 'Logistics & Trade Solutions',
      location: 'India',
      scope: 'Corporate Identity & Business Positioning',
    },
    'shevroys': {
      sector: 'Hospitality & Leisure Tourism',
      location: 'Yercaud, Tamil Nadu',
      scope: 'Hospitality Brand Direction & Guest Marketing Strategy',
    },
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-16 bg-[#080808] text-white min-h-screen">
      {/* Studio Header Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-zinc-300">ENTERPRISE CLIENT DIRECTORY / 10 PARTNERSHIPS</span>
          </div>
          <span className="hidden md:inline">FOOD · EDUCATION · NON-PROFIT · HEALTHCARE · COMMERCE</span>
          <span className="text-gold-500/80">[ VERIFIED COLLABORATIONS ]</span>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/30 text-[11px] font-mono text-gold-400">
            <Building2 className="w-3.5 h-3.5 text-gold-500" />
            <span>Verified Commercial Roster</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.04]">
            PARTNERS IN <span className="gold-text-gradient">COMMERCIAL</span> GROWTH.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed pt-2 max-w-3xl font-sans">
            The authentic commercial enterprises, healthcare academies, institutions, and creator brands served by JM Creations. Every partnership reflects real engagements and verified deliverables.
          </p>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client) => {
            const project = projectMap.get(client.id);
            const meta = clientSectorMap[client.slug] || {
              sector: 'Commercial Enterprise',
              location: 'India',
              scope: 'Integrated Solutions',
            };

            return (
              <div
                key={client.id || client.slug}
                className="rounded-3xl bg-[#121212] border border-zinc-800/80 p-8 flex flex-col justify-between hover:border-gold-500/50 hover:bg-[#151515] transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    {/* Monogram Badge */}
                    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-gold-500/30 flex items-center justify-center font-display font-black text-2xl text-gold-400 shadow-gold-glow group-hover:bg-gold-500 group-hover:text-black transition-all">
                      {client.name.substring(0, 2).toUpperCase()}
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Verified Client</span>
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-gold-400 transition-colors">
                    {client.name}
                  </h3>

                  <div className="mt-2 text-xs font-mono text-gold-500/90">
                    {meta.sector} · {meta.location}
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-sm mt-4 leading-relaxed font-sans">
                    {client.notes || meta.scope}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between">
                  {project ? (
                    <NextLink
                      href={`/portfolio/${project.slug}`}
                      className="text-xs font-mono font-medium text-white group-hover:text-gold-400 flex items-center gap-1.5 transition-colors"
                    >
                      <span>Examine Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gold-500" />
                    </NextLink>
                  ) : (
                    <NextLink
                      href={`/portfolio?client=${encodeURIComponent(client.slug)}`}
                      className="text-xs font-mono font-medium text-zinc-400 group-hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <span>View In Portfolio</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gold-500" />
                    </NextLink>
                  )}

                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    JM / PARTNER
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
