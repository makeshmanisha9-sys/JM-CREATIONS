import React from 'react';
import { BarChart3, Eye, Phone, MessageCircle, MousePointer, ShieldCheck } from 'lucide-react';
import { getAnalyticsSummary } from '@/lib/data';

export default async function AdminAnalyticsPage() {
  const summary = await getAnalyticsSummary();

  const metrics = [
    { title: 'Page Views Tracked', value: summary.pageViewsCount, icon: Eye, color: 'text-blue-400' },
    { title: 'WhatsApp Clicks', value: summary.whatsappClicks, icon: MessageCircle, color: 'text-emerald-400' },
    { title: 'Phone Call Clicks', value: summary.phoneClicks, icon: Phone, color: 'text-cyan-400' },
    { title: 'Contact Submissions', value: summary.totalEnquiries, icon: MousePointer, color: 'text-gold-400' },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-zinc-800 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Visitor & Interaction Analytics
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            First-party privacy-respecting interaction events and conversion tracking
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl bg-[#121214] border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-zinc-400 uppercase font-medium">{m.title}</span>
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-white">{m.value}</div>
            </div>
          );
        })}
      </div>

      {/* Raw Event Audit Log */}
      <div className="p-6 rounded-2xl bg-[#121214] border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white">Event Stream Log</h2>
            <p className="text-xs text-zinc-400">Chronological interaction audit recorded in database</p>
          </div>
          <span className="text-xs text-gold-400 font-mono">Live Stream</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Event Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Page Path</th>
                <th className="py-3 px-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
              {summary.recentEvents.map((e, i) => (
                <tr key={i} className="hover:bg-zinc-900/40">
                  <td className="py-3 px-4 font-mono font-bold text-gold-400">{e.event_name}</td>
                  <td className="py-3 px-4 text-zinc-400">{e.event_category || 'general'}</td>
                  <td className="py-3 px-4 text-white font-medium">{e.page_path}</td>
                  <td className="py-3 px-4 text-zinc-500 font-mono">
                    {new Date(e.created_at || Date.now()).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
