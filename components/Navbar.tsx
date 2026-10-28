'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
  Mail,
  Clock,
  Sparkles,
  Building2,
  Instagram,
  Linkedin,
  Facebook,
} from 'lucide-react';
import { SiteSettings } from '@/lib/types';

interface NavbarProps {
  settings?: SiteSettings;
}

export default function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [timeString, setTimeString] = useState<string>('');
  const pathname = usePathname();

  // Hide public navigation on admin dashboard routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Live IST Time clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const ist = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(new Date());
        setTimeString(`${ist} IST`);
      } catch (e) {
        setTimeString('');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/', number: '01' },
    { name: 'About', href: '/about', number: '02' },
    { name: 'Services', href: '/services', number: '03' },
    { name: 'Portfolio', href: '/portfolio', number: '04' },
    { name: 'Clients', href: '/clients', number: '05' },
    { name: 'Blog', href: '/blog', number: '06' },
    { name: 'Careers', href: '/careers', number: '07' },
    { name: 'Contact', href: '/contact', number: '08' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl py-3'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Corporate Badge */}
            <NextLink href="/" data-cursor="home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-gold-500/40 flex items-center justify-center shadow-gold-glow group-hover:border-gold-500 transition-colors">
                <span className="font-display font-extrabold text-base tracking-wider text-gold-500 group-hover:scale-105 transition-transform">
                  JM
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg tracking-tight text-white group-hover:text-gold-400 transition-colors">
                  JM CREATIONS
                </span>
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">
                  Jina Groups Enterprise
                </span>
              </div>
            </NextLink>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <NextLink
                    key={link.name}
                    href={link.href}
                    data-cursor="view"
                    className={`px-3.5 py-1.5 text-xs font-mono tracking-wider rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-gold-400 bg-zinc-900 border border-gold-500/30'
                        : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
                    }`}
                  >
                    {link.name}
                  </NextLink>
                );
              })}
            </nav>

            {/* Right Status Indicator & Actions */}
            <div className="hidden md:flex items-center gap-5">
              {timeString && (
                <div className="hidden xl:flex items-center gap-2 text-[10px] font-mono text-zinc-400 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{timeString}</span>
                </div>
              )}

              <NextLink
                href="/contact"
                data-cursor="start"
                className="px-5 py-2.5 rounded-full text-xs font-display font-bold uppercase tracking-wider text-black bg-gold-500 hover:bg-gold-400 shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 flex items-center gap-2"
              >
                <span>Initiate</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </NextLink>

              {/* Fullscreen Drawer Toggle Button */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open Studio Menu"
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-gold-500/50 flex items-center justify-center text-zinc-300 hover:text-gold-400 transition-colors"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Burger Button */}
            <div className="flex md:hidden items-center gap-3">
              <NextLink
                href="/contact"
                className="px-3.5 py-1.5 rounded-full text-[10px] font-display font-bold uppercase tracking-wider text-black bg-gold-500"
              >
                Initiate
              </NextLink>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Navigation Drawer"
                className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-200"
              >
                {isOpen ? <X className="w-5 h-5 text-gold-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Architectural Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9995] bg-[#080808]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
          >
            {/* Top Bar inside Drawer */}
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-zinc-900 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-gold-500/40 flex items-center justify-center text-gold-500 font-display font-bold text-sm">
                  JM
                </div>
                <div>
                  <span className="font-display font-bold text-white text-sm block">
                    JM CREATIONS ARCHITECTURE
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                    Part of Jina Groups of Company Pvt. Ltd.
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                aria-label="Close Navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Grid inside Drawer */}
            <div className="max-w-7xl mx-auto w-full my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Oversized Links */}
              <div className="lg:col-span-7 space-y-2">
                <div className="text-[10px] font-mono text-gold-500 uppercase tracking-widest mb-4">
                  INDEX OF SPACES
                </div>
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <NextLink
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-4 py-2 text-white hover:text-gold-400 transition-colors"
                    >
                      <span className="font-mono text-xs text-zinc-600 group-hover:text-gold-500">
                        {link.number}
                      </span>
                      <span className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        {link.name}
                      </span>
                    </NextLink>
                  </motion.div>
                ))}
              </div>

              {/* Right Column: Studio Contact & Meta */}
              <div className="lg:col-span-5 space-y-8 lg:border-l lg:border-zinc-900 lg:pl-12">
                <div>
                  <div className="text-[10px] font-mono text-gold-500 uppercase tracking-widest mb-3">
                    COMMERCIAL INQUIRIES
                  </div>
                  <div className="space-y-2 text-sm font-mono text-zinc-300">
                    <p>
                      <span className="text-zinc-500 block text-xs">Email:</span>
                      <a
                        href={`mailto:${settings?.email || 'jmcreationinfo@gmail.com'}`}
                        className="hover:text-gold-400 transition-colors"
                      >
                        {settings?.email || 'jmcreationinfo@gmail.com'}
                      </a>
                    </p>
                    <p>
                      <span className="text-zinc-500 block text-xs">Direct Line / WhatsApp:</span>
                      <a
                        href={`tel:${(settings?.phone || '+91 90429 86355').replace(/[^0-9+]/g, '')}`}
                        className="hover:text-gold-400 transition-colors"
                      >
                        {settings?.phone || '+91 90429 86355'}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Parent Company Guarantee */}
                <div className="p-5 rounded-2xl bg-[#121212] border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 uppercase">
                    <Building2 className="w-3.5 h-3.5 text-gold-500" />
                    <span>Jina Groups Corporate Umbrella</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {settings?.parent_company_relationship ||
                      'JM Creations is part of Jina Groups of Company Pvt. Ltd., providing integrated business, creative, and digital solutions to help businesses establish, grow, and scale their presence.'}
                  </p>
                </div>

                {/* Social Channels */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/j_m__creation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jm-creations-971a43423"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/19FRBKVjDX/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/50 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar inside Drawer */}
            <div className="max-w-7xl mx-auto w-full pt-6 border-t border-zinc-900 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500">
              <span>JM CREATIONS · ARCHITECTURAL STUDIO 2026</span>
              <span className="text-gold-500/80">[ 11°39&apos;N · TAMIL NADU ]</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
