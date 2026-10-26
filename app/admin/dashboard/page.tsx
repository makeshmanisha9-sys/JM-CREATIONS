import React from 'react';
import NextLink from 'next/link';
import {
  Inbox,
  Briefcase,
  FolderKanban,
  FileText,
  BarChart3,
  Phone,
  MessageCircle,
  Eye,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { getAnalyticsSummary, getEnquiries } from '@/lib/data';

export default async function AdminDashboardPage() {
  const [summary, recentEnquiries] = await Promise.all([
    getAnalyticsSummary(),
    getEnquiries(),
  ]);

  const cards = [
    {
      title: 'Total Enquiries',
      value: summary.totalEnquiries,
      sub: `${summary.newEnquiries} awaiting initial contact`,
      icon: Inbox,
      color: 'text-gold-500',
      href: '/admin/enquiries',
    },
    {
      title: 'Published Services',
      value: summary.totalServices,
      sub: 'All 21 catalogued solutions',
      icon: Briefcase,
      color: 'text-blue-400',
      href: '/admin/services',
    },
    {
      title: 'Client Projects',
      value: summary.totalProjects,
      sub: 'Verified client engagements',
      icon: FolderKanban,
      color: 'text-purple-400',
      href: '/admin/portfolio',
    },
    {
      title: 'WhatsApp Clicks',
      value: summary.whatsappClicks,
      sub: 'Direct customer chat triggers',
      icon: MessageCircle,
      color: 'text-emerald-400',
      href: '/admin/analytics',
    },
    {
      title: 'Phone Calls',
      value: summary.phoneClicks,
      sub: 'Direct tel: link clicks',
      icon: Phone,
      color: 'text-cyan-400',
      href: '/admin/analytics',
    },
    {
      title: 'Page Impressions',
      value: summary.pageViewsCount,
      sub: 'First-party tracked views',
      icon: Eye,
      color: 'text-amber-400',
      href: '/admin/analytics',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Executive Operations Dashboard
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time business performance, incoming inquiries, and verified content metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <NextLink
            href="/admin/enquiries"
            className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold uppercase tracking-wider transition-colors shadow-gold-glow"
          >
            Manage Enquiries
          </NextLink>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <NextLink
              key={i}
              href={card.href}
              className="p-6 rounded-2xl bg-[#121214] border border-zinc-800 hover:border-gold-500/40 transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Icon className={`w-4 h-4 ${card.color}`} />
                </div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white tracking-tight mb-1">
                  {card.value}
                </div>
                <div className="text-xs text-zinc-400">{card.sub}</div>
              </div>
            </NextLink>
          );
        })}
      </div>

      {/* Pipeline & Analytics Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Enquiry Funnel Status */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#121214] border border-zinc-800 space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Enquiry Pipeline Status
            </h2>
            <NextLink href="/admin/enquiries" className="text-xs text-gold-400 hover:underline">
              View All
            </NextLink>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-300 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>New / Uncontacted</span>
              </span>
              <span className="font-mono font-bold text-white">{summary.newEnquiries}</span>
            </div>

            <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-300 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Contacted</span>
              </span>
              <span className="font-mono font-bold text-white">{summary.contactedEnquiries}</span>
            </div>

            <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-zinc-300 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Converted Clients</span>
              </span>
              <span className="font-mono font-bold text-white">{summary.convertedEnquiries}</span>
            </div>
          </div>
        </div>

        {/* Real-time Interaction Events */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#121214] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Visitor Interactions
            </h2>
            <span className="text-[11px] text-zinc-500 font-mono">First-party analytics</span>
          </div>

          <div className="space-y-2">
            {summary.recentEvents.slice(0, 5).map((evt, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-zinc-800 font-mono text-[10px] text-gold-400">
                    {evt.event_name}
                  </span>
                  <span className="text-zinc-300 truncate max-w-xs">{evt.page_path}</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {new Date(evt.created_at || Date.now()).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="p-6 rounded-2xl bg-[#121214] border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">Recent Business Enquiries</h2>
            <p className="text-xs text-zinc-400">Inbound inquiries from website visitors</p>
          </div>
          <NextLink
            href="/admin/enquiries"
            className="text-xs text-gold-400 hover:text-gold-300 font-semibold flex items-center gap-1"
          >
            <span>Full CRM View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        {recentEnquiries.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 text-xs">
            No inquiries recorded yet. Submissions from the contact form will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/80 text-zinc-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-lg">Code</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-lg">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {recentEnquiries.slice(0, 5).map((enq) => (
                  <tr key={enq.id} className="hover:bg-zinc-900/40">
                    <td className="py-3 px-4 font-mono font-bold text-gold-400">
                      {enq.enquiry_code}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{enq.full_name}</div>
                      <div className="text-[11px] text-zinc-400">{enq.email}</div>
                    </td>
                    <td className="py-3 px-4">{enq.service_name || 'General Inquiry'}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          enq.status === 'New'
                            ? 'bg-blue-950/60 text-blue-400 border border-blue-500/30'
                            : enq.status === 'Contacted'
                            ? 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                            : enq.status === 'Converted'
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-300'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-zinc-400">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
