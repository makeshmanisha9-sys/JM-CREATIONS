'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { Menu, X, ArrowRight, Phone, MessageSquare } from 'lucide-react';

interface NavbarProps {
  settings?: {
    company_name?: string;
    parent_company?: string;
    phone?: string;
  };
}

export default function Navbar({ settings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Clients', href: '/clients' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-zinc-800 shadow-xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Mark */}
          <NextLink href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-900 to-black border border-gold-500/40 flex items-center justify-center shadow-gold-glow group-hover:border-gold-500 transition-colors">
              <span className="font-bold text-lg tracking-wider text-gold-500 group-hover:scale-105 transition-transform">
                JM
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-gold-400 transition-colors">
                JM CREATIONS
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase font-medium">
                Jina Groups Enterprise
              </span>
            </div>
          </NextLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <NextLink
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive
                      ? 'text-gold-400 bg-zinc-900/80 border border-gold-500/20'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  {link.name}
                </NextLink>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919042986355"
              className="text-xs text-zinc-400 hover:text-gold-400 flex items-center gap-1.5 transition-colors"
              title="Call JM Creations"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span>+91 90429 86355</span>
            </a>
            <NextLink
              href="/contact"
              className="px-4 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider text-black bg-gold-500 hover:bg-gold-400 shadow-gold-glow transition-all duration-300 flex items-center gap-2"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NextLink>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center md:hidden gap-2">
            <NextLink
              href="/contact"
              className="px-3 py-1.5 text-xs font-semibold rounded bg-gold-500 text-black uppercase tracking-wider"
            >
              Enquire
            </NextLink>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-zinc-800 px-4 pt-3 pb-6 mt-2 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <NextLink
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-gold-400 bg-zinc-900 border border-gold-500/20'
                      : 'text-zinc-300 hover:bg-zinc-900/60 hover:text-white'
                  }`}
                >
                  {link.name}
                </NextLink>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
            <a
              href="tel:+919042986355"
              className="flex items-center gap-2 text-sm text-zinc-300 hover:text-gold-400 px-3 py-2"
            >
              <Phone className="w-4 h-4 text-gold-500" />
              <span>Call Us: +91 90429 86355</span>
            </a>
            <NextLink
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-gold-500 hover:bg-gold-400 transition-colors"
            >
              Start Your Project
            </NextLink>
          </div>
        </div>
      )}
    </header>
  );
}
