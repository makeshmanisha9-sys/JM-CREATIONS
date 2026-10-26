import React from 'react';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { Building2, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { getClients, getProjects } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Clients & Collaborators | JM Creations',
  description:
    'Verified clients and corporate engagements served by JM Creations across business consulting, lead generation, advertising, and creative production.',
};

export default async function ClientsPage() {
  const [clients, projects] = await Promise.all([
    getClients({ includeUnpublished: false }),
    getProjects({ includeUnpublished: false }),
  ]);

  // Map client ID to project slug if exists
  const projectMap = new Map(projects.map((p) => [p.client_id, p]));

  return (
    <div className="py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-gold-500/30 text-xs text-gold-400 font-medium mb-4">
          <Building2 className="w-3.5 h-3.5 text-gold-500" />
          <span>Client Directory</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Verified Clients & Engagements
        </h1>
        <p className="mt-4 text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto">
          The verified commercial clients and creator collaborations served by JM Creations. We maintain strict fidelity to authentic project details.
        </p>
      </div>

      {/* Clients Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => {
            const project = projectMap.get(client.id);

            return (
              <div
                key={client.id}
                className="bg-[#121214] border border-zinc-800 rounded-2xl p-7 flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    {/* Professional Typographic Client Badge / Monogram Treatment */}
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-gold-500/30 flex items-center justify-center font-bold text-lg text-gold-400 shadow-md group-hover:bg-gold-500 group-hover:text-black transition-colors">
                      {client.name.substring(0, 2).toUpperCase()}
                    </div>

                    <span
                      className={`text-[10px] uppercase font-semibold px-2.5 py-1 rounded-full ${
                        client.pending_confirmation
                          ? 'bg-amber-950/40 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {client.pending_confirmation ? 'Details Pending' : 'Verified Client'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                    {client.name}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {client.notes || 'Verified client partner of JM Creations.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  {project ? (
                    <NextLink
                      href={`/portfolio/${project.slug}`}
                      className="text-xs font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1.5"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </NextLink>
                  ) : (
                    <span className="text-xs text-zinc-400">Case study in preparation</span>
                  )}

                  <span className="text-[10px] text-zinc-400 font-mono">#{client.sort_order}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
