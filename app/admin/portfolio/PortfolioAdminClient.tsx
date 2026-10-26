'use client';

import React, { useState } from 'react';
import { FolderKanban, Edit2, Eye, EyeOff, Check, Star } from 'lucide-react';
import { Project } from '@/lib/types';

interface PortfolioAdminClientProps {
  initialProjects: Project[];
}

export default function PortfolioAdminClient({ initialProjects }: PortfolioAdminClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const togglePublish = async (id: string, current: boolean) => {
    try {
      const res = await fetch('/api/admin/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_published: !current }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, is_published: !current } : p))
        );
      }
    } catch (e) {}
  };

  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const res = await fetch('/api/admin/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? editingProject : p))
        );
        setEditingProject(null);
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Client</th>
              <th className="py-3 px-4">Project Title</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Publication</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-900/40">
                <td className="py-3 px-4 font-semibold text-gold-400">{p.client?.name}</td>
                <td className="py-3 px-4">
                  <div className="font-bold text-white text-sm">{p.title}</div>
                  <div className="text-[11px] text-zinc-500 truncate max-w-md">{p.project_summary}</div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      p.status === 'Completed'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      p.is_published
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {p.is_published ? 'Published' : 'Hidden'}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => setEditingProject(p)}
                    className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-gold-400"
                    title="Edit Case Study"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => togglePublish(p.id, p.is_published)}
                    className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
                    title={p.is_published ? 'Hide' : 'Publish'}
                  >
                    {p.is_published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={saveProject}
            className="bg-[#121214] border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-lg font-bold text-white">Edit Case Study</h3>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Project Title</label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Summary</label>
              <textarea
                rows={3}
                value={editingProject.project_summary}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, project_summary: e.target.value })
                }
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Commercial Objective</label>
              <input
                type="text"
                value={editingProject.business_objective || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, business_objective: e.target.value })
                }
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Strategy & Approach</label>
              <textarea
                rows={3}
                value={editingProject.strategy_approach || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, strategy_approach: e.target.value })
                }
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
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
