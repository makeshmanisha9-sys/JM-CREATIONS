'use client';

import React, { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Clock,
  MessageSquare,
  AlertCircle,
  X,
  Plus,
  Send,
  Loader2,
} from 'lucide-react';
import { Enquiry, EnquiryStatus } from '@/lib/types';

interface EnquiryManagerClientProps {
  initialEnquiries: Enquiry[];
}

export default function EnquiryManagerClient({ initialEnquiries }: EnquiryManagerClientProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [noteText, setNoteText] = useState('');
  const [updating, setUpdating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const statuses: EnquiryStatus[] = ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'];

  const filteredEnquiries = enquiries.filter((e) => {
    const matchStatus = statusFilter === 'all' || e.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery =
      !q ||
      e.full_name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.includes(q) ||
      e.enquiry_code.toLowerCase().includes(q) ||
      (e.company_name && e.company_name.toLowerCase().includes(q)) ||
      (e.service_name && e.service_name.toLowerCase().includes(q));

    return matchStatus && matchQuery;
  });

  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    setUpdating(true);
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: enquiryId, status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnquiry || !noteText.trim()) return;

    setUpdating(true);
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enquiry_id: selectedEnquiry.id,
          note: noteText.trim(),
          author_email: 'admin@jmcreations.com',
        }),
      });
      const data = await res.json();
      if (res.ok && data.note) {
        const updatedNotes = selectedEnquiry.notes ? [data.note, ...selectedEnquiry.notes] : [data.note];
        const updatedEnquiry = { ...selectedEnquiry, notes: updatedNotes };

        setSelectedEnquiry(updatedEnquiry);
        setEnquiries((prev) =>
          prev.map((item) => (item.id === selectedEnquiry.id ? updatedEnquiry : item))
        );
        setNoteText('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this enquiry? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry?.id === id) {
          setSelectedEnquiry(null);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-[#121214] p-4 rounded-2xl border border-zinc-800">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search code, name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/60 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-gold-500/70"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === 'all'
                ? 'bg-gold-500 text-black shadow-gold-glow'
                : 'bg-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            All ({enquiries.length})
          </button>
          {statuses.map((s) => {
            const count = enquiries.filter((e) => e.status === s).length;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  statusFilter === s
                    ? 'bg-gold-500 text-black shadow-gold-glow'
                    : 'bg-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                {s} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Code</th>
                <th className="py-3.5 px-4">Customer Contact</th>
                <th className="py-3.5 px-4">Service Required</th>
                <th className="py-3.5 px-4">Budget</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500">
                    No enquiries match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-gold-400">
                      {enq.enquiry_code}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{enq.full_name}</div>
                      <div className="text-[11px] text-zinc-400">{enq.email}</div>
                      <div className="text-[11px] text-zinc-500">{enq.phone}</div>
                      {enq.company_name && (
                        <div className="text-[10px] text-gold-500/80 mt-0.5">{enq.company_name}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-white">
                      {enq.service_name || 'General Inquiry'}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400">
                      {enq.budget_range || 'Flexible'}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                        className={`px-2 py-1 rounded text-[11px] font-semibold bg-zinc-900 border focus:outline-none transition-colors ${
                          enq.status === 'New'
                            ? 'text-blue-400 border-blue-500/40'
                            : enq.status === 'Contacted'
                            ? 'text-amber-400 border-amber-500/40'
                            : enq.status === 'Converted'
                            ? 'text-emerald-400 border-emerald-500/40'
                            : 'text-zinc-400 border-zinc-700'
                        }`}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 whitespace-nowrap">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedEnquiry(enq)}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-gold-400 hover:bg-zinc-700 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(enq.id)}
                          disabled={deletingId === enq.id}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-colors"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Notes Modal / Drawer */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121214] border border-zinc-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <div className="text-xs font-mono font-bold text-gold-500">
                  {selectedEnquiry.enquiry_code}
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                  {selectedEnquiry.full_name}
                </h2>
                <div className="text-xs text-zinc-400 mt-0.5">
                  Logged on {new Date(selectedEnquiry.created_at).toLocaleString()}
                </div>
              </div>

              {/* Contact Information Cards */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                  <div className="text-zinc-500 mb-1">Email:</div>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-gold-400 font-semibold break-all">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                  <div className="text-zinc-500 mb-1">Phone:</div>
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-white font-semibold">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                  <div className="text-zinc-500 mb-1">Company:</div>
                  <div className="text-white font-semibold">
                    {selectedEnquiry.company_name || 'Individual / Not stated'}
                  </div>
                </div>
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                  <div className="text-zinc-500 mb-1">Service & Budget:</div>
                  <div className="text-white font-semibold">
                    {selectedEnquiry.service_name} ({selectedEnquiry.budget_range || 'Flexible'})
                  </div>
                </div>
              </div>

              {/* Requirement Message */}
              <div>
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                  Project Description:
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200 leading-relaxed whitespace-pre-line">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Internal Notes Section */}
              <div className="border-t border-zinc-800 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-gold-500" />
                    <span>Internal CRM Notes ({selectedEnquiry.notes?.length || 0})</span>
                  </h3>
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add follow-up note (e.g. Discovery call completed, proposal sent)..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="flex-grow px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-gold-500"
                  />
                  <button
                    type="submit"
                    disabled={updating || !noteText.trim()}
                    className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors disabled:opacity-50"
                  >
                    Add Note
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedEnquiry.notes && selectedEnquiry.notes.length > 0 ? (
                    selectedEnquiry.notes.map((note) => (
                      <div
                        key={note.id}
                        className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-xs"
                      >
                        <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1">
                          <span className="font-semibold text-zinc-400">{note.author_email}</span>
                          <span>{new Date(note.created_at).toLocaleString()}</span>
                        </div>
                        <div className="text-zinc-200">{note.note}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-zinc-500 text-center py-3">
                      No internal notes recorded yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
