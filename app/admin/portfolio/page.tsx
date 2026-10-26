import React from 'react';
import { getProjects } from '@/lib/data';
import PortfolioAdminClient from './PortfolioAdminClient';

export default async function AdminPortfolioPage() {
  const projects = await getProjects({ includeUnpublished: true });

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Portfolio & Case Studies ({projects.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Publish case studies, update deliverables, and manage verified outcomes
          </p>
        </div>
      </div>

      <PortfolioAdminClient initialProjects={projects} />
    </div>
  );
}
