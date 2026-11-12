'use client';

import React from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  FolderKanban,
  Building2,
  FileText,
  Users2,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
} from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Enquiries', href: '/admin/enquiries', icon: Inbox },
    { name: 'Services (21)', href: '/admin/services', icon: Briefcase },
    { name: 'Portfolio', href: '/admin/portfolio', icon: FolderKanban },
    { name: 'Clients (10)', href: '/admin/clients', icon: Building2 },
    { name: 'Blog & Insights', href: '/admin/blog', icon: FileText },
    { name: 'Careers', href: '/admin/careers', icon: Users2 },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      // Clear admin session cookie
      document.cookie = 'jm_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      router.push('/admin/login');
    } catch (e) {
      router.push('/admin/login');
    }
  };

  return (
    <aside className="w-64 bg-[#0D0D0E] border-r border-zinc-800 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-zinc-800">
          <NextLink href="/" target="_blank" className="flex items-center gap-3 group">
            <BrandLogo size="sm" />
            <div>
              <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>JM Creations</span>
                <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-gold-400" />
              </div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                Admin Console
              </div>
            </div>
          </NextLink>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

            return (
              <NextLink
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-800 text-gold-400 border border-gold-500/20 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold-500' : 'text-zinc-500'}`} />
                <span>{item.name}</span>
              </NextLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile & Logout */}
      <div className="p-4 border-t border-zinc-800 space-y-3">
        <div className="flex items-center gap-2.5 px-3 py-2 bg-zinc-900/60 rounded-xl border border-zinc-800/80">
          <div className="w-7 h-7 rounded-full bg-gold-500/20 text-gold-400 font-bold text-xs flex items-center justify-center border border-gold-500/30">
            A
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-white truncate">Administrator</div>
            <div className="text-[10px] text-zinc-400 truncate">jmcreationinfo@gmail.com</div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors border border-transparent hover:border-red-500/20"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
