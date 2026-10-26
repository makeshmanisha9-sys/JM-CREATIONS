'use client';

import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface SettingsAdminClientProps {
  initialSettings: SiteSettings;
}

export default function SettingsAdminClient({ initialSettings }: SettingsAdminClientProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to update settings');
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Error updating settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Site settings successfully updated and persisted. Changes are live on public website.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Brand & Corporate Affiliation */}
      <div className="p-8 rounded-2xl bg-[#121214] border border-zinc-800 space-y-6">
        <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3">
          Corporate Identity & Parent Group
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
              Brand Name
            </label>
            <input
              type="text"
              value={settings.company_name}
              onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
              Parent Entity Name
            </label>
            <input
              type="text"
              value={settings.parent_company}
              onChange={(e) => setSettings({ ...settings, parent_company: e.target.value })}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
            Parent Company Relationship Statement
          </label>
          <textarea
            rows={3}
            value={settings.parent_company_relationship}
            onChange={(e) =>
              setSettings({ ...settings, parent_company_relationship: e.target.value })
            }
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs leading-relaxed"
          />
        </div>
      </div>

      {/* Communication & Channels */}
      <div className="p-8 rounded-2xl bg-[#121214] border border-zinc-800 space-y-6">
        <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3">
          Official Contact & Messaging Channels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
              Official Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
              Contact Telephone
            </label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
              WhatsApp Business Number
            </label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
              Office Address
            </label>
            <input
              type="text"
              value={settings.office_address}
              onChange={(e) => setSettings({ ...settings, office_address: e.target.value })}
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
            WhatsApp Prefill Message
          </label>
          <input
            type="text"
            value={settings.whatsapp_prefill_message}
            onChange={(e) =>
              setSettings({ ...settings, whatsapp_prefill_message: e.target.value })
            }
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
          />
        </div>
      </div>

      {/* Hero Section Copy */}
      <div className="p-8 rounded-2xl bg-[#121214] border border-zinc-800 space-y-6">
        <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3">
          Homepage Hero & Positioning
        </h2>

        <div>
          <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
            Hero Headline
          </label>
          <input
            type="text"
            value={settings.hero_headline}
            onChange={(e) => setSettings({ ...settings, hero_headline: e.target.value })}
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
            Hero Subtitle / Value Proposition
          </label>
          <textarea
            rows={3}
            value={settings.hero_subheadline}
            onChange={(e) => setSettings({ ...settings, hero_subheadline: e.target.value })}
            className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs leading-relaxed"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-wider text-xs shadow-gold-glow flex items-center gap-2 transition-all duration-300 disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-black" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save & Publish Changes</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
