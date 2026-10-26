import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Console | JM Creations',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col md:flex-row antialiased">
      {/* Sidebar (handles desktop and hides on login page inside client component or wrapper) */}
      <AdminSidebar />

      {/* Main Administrative Work Area */}
      <main className="flex-1 overflow-y-auto max-h-screen p-6 sm:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
