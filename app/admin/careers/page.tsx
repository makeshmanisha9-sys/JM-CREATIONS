import React from 'react';
import { getCareers } from '@/lib/data';
import { Briefcase, MapPin, Clock } from 'lucide-react';

export default async function AdminCareersPage() {
  const careers = await getCareers({ includeUnpublished: true });

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Careers & Positions ({careers.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage active job listings, descriptions, and hiring deadlines
          </p>
        </div>
      </div>

      <div className="bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Role Title</th>
              <th className="py-3 px-4">Department</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
            {careers.map((job) => (
              <tr key={job.id} className="hover:bg-zinc-900/40">
                <td className="py-3.5 px-4 font-bold text-white text-sm">{job.title}</td>
                <td className="py-3.5 px-4 text-gold-500">{job.department}</td>
                <td className="py-3.5 px-4 text-zinc-300">{job.location}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      job.is_published
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {job.is_published ? 'Active Listing' : 'Closed'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right text-zinc-400 font-mono">
                  {job.deadline || 'Open'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
