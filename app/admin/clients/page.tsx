import React from 'react';
import { getClients } from '@/lib/data';
import ClientsAdminClient from './ClientsAdminClient';

export default async function AdminClientsPage() {
  const clients = await getClients({ includeUnpublished: true });

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Client Directory Management ({clients.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage verified client records, update scope notes, and mark confirmed assets
          </p>
        </div>
      </div>

      <ClientsAdminClient initialClients={clients} />
    </div>
  );
}
