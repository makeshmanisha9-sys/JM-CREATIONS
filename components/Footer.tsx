import React from 'react';
import NextLink from 'next/link';
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SiteSettings, SocialLink } from '@/lib/types';

interface FooterProps {
  settings?: SiteSettings;
  socialLinks?: SocialLink[];
}

export default function Footer({ settings, socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const servicesQuickList = [
    { name: 'Business Consulting', href: '/services/business-consulting' },
    { name: 'Startup Consulting', href: '/services/startup-consulting' },
    { name: 'Brand Identity & Logo', href: '/services/brand-identity-and-logo-design' },
    { name: 'Website Development', href: '/services/website-design-and-development' },
    { name: 'Digital Marketing', href: '/services/digital-marketing' },
    { name: 'Google & Meta Ads', href: '/services/google-ads' },
    { name: 'Product Shoots & Video', href: '/services/product-photography-and-videography' },
    { name: 'Lead Generation', href: '/services/lead-generation' },
  ];

  const quickNav = [
    { name: 'About Us', href: '/about' },
    { name: 'All 21 Services', href: '/services' },
    { name: 'Client Portfolio', href: '/portfolio' },
    { name: 'Verified Clients', href: '/clients' },
    { name: 'Insights & Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact & Enquiry', href: '/contact' },
    { name: 'Admin Portal', href: '/admin/login' },
  ];

  return (
    <footer className="bg-[#070708] border-t border-zinc-800/80 text-zinc-400 text-sm">
      {/* Upper Footer: Main Information Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Company Bio & Parent Group Relationship */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-gold-500/40 flex items-center justify-center">
                <span className="font-bold text-lg text-gold-500">JM</span>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  JM CREATIONS
                </span>
                <span className="text-[10px] tracking-widest text-zinc-400 uppercase">
                  Part of Jina Groups of Company Pvt. Ltd.
                </span>
              </div>
            </div>

            <p className="text-zinc-300 text-xs leading-relaxed max-w-md pt-2">
              {settings?.parent_company_relationship ||
                'JM Creations is part of Jina Groups of Company Pvt. Ltd., providing integrated business, creative, and digital solutions to help businesses establish, grow, and scale their presence.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/j_m__creation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                aria-label="JM Creations Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/jm-creations-971a43423"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                aria-label="JM Creations LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/share/19FRBKVjDX/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                aria-label="JM Creations Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Key Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
              Key Solutions
            </h3>
            <ul className="space-y-2.5 text-xs">
              {servicesQuickList.map((item) => (
                <li key={item.name}>
                  <NextLink
                    href={item.href}
                    className="hover:text-gold-400 transition-colors flex items-center justify-between group"
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-gold-400 transition-colors" />
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs">
              {quickNav.map((item) => (
                <li key={item.name}>
                  <NextLink href={item.href} className="hover:text-gold-400 transition-colors">
                    {item.name}
                  </NextLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Verified Contact Details */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
              Official Contacts
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <div className="text-[11px] uppercase tracking-wider text-zinc-400">Email Address</div>
                <a
                  href={`mailto:${settings?.email || 'jmcreationinfo@gmail.com'}`}
                  className="text-white hover:text-gold-400 font-medium transition-colors break-all"
                >
                  {settings?.email || 'jmcreationinfo@gmail.com'}
                </a>
              </li>
              <li>
                <div className="text-[11px] uppercase tracking-wider text-zinc-400">Phone & WhatsApp</div>
                <a
                  href={`tel:${settings?.phone?.replace(/\s+/g, '') || '+919042986355'}`}
                  className="text-white hover:text-gold-400 font-medium transition-colors"
                >
                  {settings?.phone || '+91 90429 86355'}
                </a>
              </li>
              <li>
                <div className="text-[11px] uppercase tracking-wider text-zinc-400">Office Location</div>
                <span className="text-zinc-400 block">
                  {settings?.office_address || 'To be provided later.'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Legal, Parent Entity Notice & Copyright */}
      <div className="border-t border-zinc-800/60 py-6 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>
            © {currentYear} JM Creations. All rights reserved. A subsidiary unit of Jina Groups of Company Pvt. Ltd.
          </div>
          <div className="flex items-center gap-6">
            <NextLink href="/privacy-policy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </NextLink>
            <NextLink href="/terms-and-conditions" className="hover:text-gold-400 transition-colors">
              Terms & Conditions
            </NextLink>
            <NextLink href="/admin/login" className="text-zinc-400 hover:text-zinc-400 transition-colors">
              Staff Portal
            </NextLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
