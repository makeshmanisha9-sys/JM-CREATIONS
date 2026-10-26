import React from 'react';
import { getServices } from '@/lib/data';
import ServicesAdminClient from './ServicesAdminClient';

export default async function AdminServicesPage() {
  const services = await getServices({ includeUnpublished: true });

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Services Management ({services.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage catalogue, deliverables, publication status, and SEO metadata
          </p>
        </div>
      </div>

      <ServicesAdminClient initialServices={services} />
    </div>
  );
}
