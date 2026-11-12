'use client';

import React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
  ArrowUpRight,
  ArrowUp,
  Building2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SiteSettings, SocialLink } from '@/lib/types';
import BrandLogo from '@/components/BrandLogo';

interface FooterProps {
  settings?: SiteSettings;
  socialLinks?: SocialLink[];
}

export default function Footer({ settings, socialLinks }: FooterProps) {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const disciplines = [
    { name: 'Business Consulting', href: '/services/business-consulting' },
    { name: 'Startup Consulting', href: '/services/startup-consulting' },
    { name: 'Brand Identity & Logo', href: '/services/brand-identity-and-logo-design' },
    { name: 'Website Development', href: '/services/website-design-and-development' },
    { name: 'Digital Marketing Strategy', href: '/services/digital-marketing' },
    { name: 'Google Ads & PPC', href: '/services/google-ads' },
    { name: 'Commercial Videography', href: '/services/product-photography-and-videography' },
    { name: 'All 21 Disciplines', href: '/services' },
  ];

  const quickNav = [
    { name: 'Studio Philosophy', href: '/about' },
    { name: 'Client Case Studies', href: '/portfolio' },
    { name: 'Verified Client Roster', href: '/clients' },
    { name: 'Journal & Insights', href: '/blog' },
    { name: 'Open Careers', href: '/careers' },
    { name: 'Start A Project', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
    { name: 'Admin Operations', href: '/admin/login' },
  ];

  return (
    <footer className="bg-[#050505] text-zinc-400 text-sm border-t border-zinc-900 relative overflow-hidden select-none">
      {/* Top Studio Coordinate Ribbon */}
      <div className="border-b border-zinc-900/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span>JM CREATIONS · ARCHITECTURAL FOOTER</span>
          </div>
          <div className="hidden sm:inline">
            A SUBSIDIARY OF JINA GROUPS OF COMPANY PVT. LTD.
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="top"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-gold-400 transition-colors uppercase font-mono"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-gold-500" />
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Col 1: Brand & Parent Company Statement (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <BrandLogo
              size="md"
              showText
              textClassName="text-xl"
              subtext="Part of Jina Groups of Company Pvt. Ltd."
            />

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
              {settings?.parent_company_relationship ||
                'JM Creations is part of Jina Groups of Company Pvt. Ltd., providing integrated business, creative, and digital solutions to help businesses establish, grow, and scale their presence.'}
            </p>

            {/* Direct Channel Badges */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-500" />
                <a
                  href={`mailto:${settings?.email || 'jmcreationinfo@gmail.com'}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {settings?.email || 'jmcreationinfo@gmail.com'}
                </a>
              </div>
              <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-500" />
                <a
                  href={`tel:${(settings?.phone || '+91 90429 86355').replace(/[^0-9+]/g, '')}`}
                  className="hover:text-gold-400 transition-colors"
                >
                  {settings?.phone || '+91 90429 86355'}
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/j_m__creation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/jm-creations-971a43423"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/19FRBKVjDX/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Key Disciplines (4 cols) */}
          <div className="lg:col-span-4 text-left">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Key Disciplines
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              {disciplines.map((item) => (
                <li key={item.name}>
                  <NextLink
                    href={item.href}
                    className="text-zinc-400 hover:text-gold-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-zinc-600 group-hover:text-gold-500">→</span>
                    <span>{item.name}</span>
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation Index (3 cols) */}
          <div className="lg:col-span-3 text-left">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Navigation Index
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              {quickNav.map((item) => (
                <li key={item.name}>
                  <NextLink
                    href={item.href}
                    className="text-zinc-400 hover:text-gold-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="text-zinc-600 group-hover:text-gold-500">→</span>
                    <span>{item.name}</span>
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Rights Bar */}
      <div className="border-t border-zinc-900/80 py-6 px-4 sm:px-6 lg:px-8 bg-black/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500 text-center sm:text-left">
          <div>
            © {currentYear} JM Creations. Part of Jina Groups of Company Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <NextLink href="/privacy-policy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </NextLink>
            <NextLink href="/terms-and-conditions" className="hover:text-zinc-300 transition-colors">
              Terms & Conditions
            </NextLink>
            <NextLink href="/admin/login" className="text-zinc-600 hover:text-gold-500 transition-colors">
              [ Admin Portal ]
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
