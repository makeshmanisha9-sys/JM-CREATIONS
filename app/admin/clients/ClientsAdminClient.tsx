'use client';

import React, { useState } from 'react';
import { Building2, Edit2, CheckCircle2, Clock } from 'lucide-react';
import { Client } from '@/lib/types';

interface ClientsAdminClientProps {
  initialClients: Client[];
}

export default function ClientsAdminClient({ initialClients }: ClientsAdminClientProps) {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const saveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;

    try {
      const res = await fetch('/api/admin/clients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingClient),
      });
      if (res.ok) {
        setClients((prev) =>
          prev.map((c) => (c.id === editingClient.id ? editingClient : c))
        );
        setEditingClient(null);
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Client Name</th>
              <th className="py-3 px-4">Engagement Notes</th>
              <th className="py-3 px-4">Verification Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
            {clients.map((c) => (
              <tr key={c.id} className="hover:bg-zinc-900/40">
                <td className="py-3 px-4 font-mono text-zinc-500">{c.sort_order}</td>
                <td className="py-3 px-4">
                  <div className="font-bold text-white text-sm">{c.name}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">/{c.slug}</div>
                </td>
                <td className="py-3 px-4 text-zinc-300 max-w-md">
                  {c.notes || 'Client partner of JM Creations.'}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      c.pending_confirmation
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {c.pending_confirmation ? 'Scope Pending' : 'Scope Verified'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setEditingClient(c)}
                    className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-gold-400"
                    title="Edit Client"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingClient && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={saveClient}
            className="bg-[#121214] border border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-lg font-bold text-white">Update Client Record</h3>
              <button
                type="button"
                onClick={() => setEditingClient(null)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Client Name</label>
              <input
                type="text"
                value={editingClient.name}
                onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Engagement Notes / Scope</label>
              <textarea
                rows={3}
                value={editingClient.notes || ''}
                onChange={(e) => setEditingClient({ ...editingClient, notes: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="pending"
                checked={editingClient.pending_confirmation}
                onChange={(e) =>
                  setEditingClient({ ...editingClient, pending_confirmation: e.target.checked })
                }
                className="w-4 h-4 rounded text-gold-500 bg-zinc-900 border-zinc-800"
              />
              <label htmlFor="pending" className="text-xs text-zinc-300">
                Mark as Pending Confirmation (if scope or media is unconfirmed)
              </label>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingClient(null)}
                className="px-4 py-2 bg-zinc-800 text-zinc-300 text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gold-500 text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow"
              >
                Save Client
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
