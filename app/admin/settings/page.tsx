import React from 'react';
import { getSiteSettings } from '@/lib/data';
import SettingsAdminClient from './SettingsAdminClient';

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Corporate Site Settings
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure contact numbers, parent company affiliation, official email, and branding copy
          </p>
        </div>
      </div>

      <SettingsAdminClient initialSettings={settings} />
    </div>
  );
}
