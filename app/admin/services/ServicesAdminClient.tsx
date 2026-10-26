'use client';

import React, { useState } from 'react';
import { Search, CheckCircle, Eye, EyeOff, Edit2, Check, ArrowUpDown } from 'lucide-react';
import { Service } from '@/lib/types';

interface ServicesAdminClientProps {
  initialServices: Service[];
}

export default function ServicesAdminClient({ initialServices }: ServicesAdminClientProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [search, setSearch] = useState('');
  const [editingService, setEditingService] = useState<Service | null>(null);

  const filtered = services.filter((s) => {
    const q = search.toLowerCase();
    return s.title.toLowerCase().includes(q) || s.category?.name.toLowerCase().includes(q);
  });

  const togglePublish = async (id: string, current: boolean) => {
    try {
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_published: !current }),
      });
      if (res.ok) {
        setServices((prev) =>
          prev.map((s) => (s.id === id ? { ...s, is_published: !current } : s))
        );
      }
    } catch (e) {}
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const res = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingService),
      });
      if (res.ok) {
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id ? editingService : s))
        );
        setEditingService(null);
      }
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-[#121214] p-4 rounded-2xl border border-zinc-800">
        <input
          type="text"
          placeholder="Search services by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md w-full px-4 py-2 bg-black/60 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-gold-500"
        />
        <div className="text-xs text-zinc-400">Total: {filtered.length} services</div>
      </div>

      <div className="bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Service Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-zinc-900/40">
                <td className="py-3 px-4 font-mono text-zinc-500">{s.sort_order}</td>
                <td className="py-3 px-4 font-semibold text-white">
                  {s.title}
                  <div className="text-[11px] text-zinc-500 font-normal truncate max-w-sm">
                    {s.excerpt}
                  </div>
                </td>
                <td className="py-3 px-4 text-gold-500 font-medium">{s.category?.name}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      s.is_published
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {s.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => setEditingService(s)}
                    className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-gold-400"
                    title="Edit Service"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => togglePublish(s.id, s.is_published)}
                    className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                    title={s.is_published ? 'Unpublish' : 'Publish'}
                  >
                    {s.is_published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={saveEdit}
            className="bg-[#121214] border border-zinc-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-lg font-bold text-white">Edit Service</h3>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Service Title</label>
              <input
                type="text"
                value={editingService.title}
                onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Short Excerpt</label>
              <textarea
                rows={2}
                value={editingService.excerpt}
                onChange={(e) => setEditingService({ ...editingService, excerpt: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Full Description</label>
              <textarea
                rows={4}
                value={editingService.description}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 bg-zinc-800 text-zinc-300 text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gold-500 text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
