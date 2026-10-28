'use client';

import React from 'react';
import { Mail, Phone, MessageSquare, Building2, Clock, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { Service, SiteSettings } from '@/lib/types';

interface InteractiveProjectStarterProps {
  services: Service[];
  settings: SiteSettings;
}

export default function InteractiveProjectStarter({
  services,
  settings,
}: InteractiveProjectStarterProps) {
  return (
    <section
      id="contact-starter"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#070707] text-white border-t border-zinc-900 overflow-hidden"
    >
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold-500/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Coordinate Bar */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-zinc-300">SCENE 07 / ENGAGE</span>
          </div>
          <span className="hidden md:inline">PROJECT COMMENCEMENT · FAST 24-HOUR RESPONSE</span>
          <span className="text-gold-500/80">[ DIRECT COMMERCIAL CHANNEL ]</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Studio Narrative & Direct Line */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/20 text-[11px] font-mono text-gold-400 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                <span>Start The Conversation</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
                YOUR NEXT BIG IDEA DESERVES A{' '}
                <span className="gold-text-gradient">BIGGER STAGE</span>.
              </h2>
              <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
                Whether you need a complete enterprise rebrand, a high-converting web platform, a viral video shoot, or startup consulting from scratch—our multidisciplinary studio is ready.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              <a
                href={`mailto:${settings.email || 'jmcreationinfo@gmail.com'}`}
                className="group p-5 rounded-2xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/50 hover:bg-[#151515] transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold-500 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                      Official Enquiry Email
                    </div>
                    <div className="text-sm font-mono font-medium text-white group-hover:text-gold-400 transition-colors">
                      {settings.email || 'jmcreationinfo@gmail.com'}
                    </div>
                  </div>
                </div>
                <span className="text-zinc-600 group-hover:text-gold-500 font-mono text-xs">→</span>
              </a>

              <a
                href={`https://wa.me/${(settings.whatsapp || '+91 90429 86355').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  settings.whatsapp_prefill_message || 'Hello JM Creations, I would like to enquire about your services.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/50 hover:bg-[#151515] transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold-500 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                      Direct WhatsApp Channel
                    </div>
                    <div className="text-sm font-mono font-medium text-white group-hover:text-gold-400 transition-colors">
                      {settings.whatsapp || '+91 90429 86355'}
                    </div>
                  </div>
                </div>
                <span className="text-zinc-600 group-hover:text-gold-500 font-mono text-xs">→</span>
              </a>

              <a
                href={`tel:${(settings.phone || '+91 90429 86355').replace(/[^0-9+]/g, '')}`}
                className="group p-5 rounded-2xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/50 hover:bg-[#151515] transition-all duration-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold-500 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                      Telephone Consultation
                    </div>
                    <div className="text-sm font-mono font-medium text-white group-hover:text-gold-400 transition-colors">
                      {settings.phone || '+91 90429 86355'}
                    </div>
                  </div>
                </div>
                <span className="text-zinc-600 group-hover:text-gold-500 font-mono text-xs">→</span>
              </a>
            </div>

            {/* Institutional Guarantee & Parent Lineage */}
            <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gold-400 uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-gold-500" />
                <span>Parent Company Governance</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {settings.parent_company_relationship}
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>Operating Cadence: Mon–Sat, 09:00 – 19:00 IST</span>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Stack Interactive Project Starter Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-3xl bg-[#131313] border border-zinc-800/80 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 blur-3xl pointer-events-none" />

              <div className="mb-8">
                <div className="text-[11px] font-mono text-gold-500 uppercase tracking-widest mb-1">
                  PROJECT SPECIFICATION FORM
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Tell Us About Your Vision
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  All submissions route to our leadership team. We respond within 24 business hours.
                </p>
              </div>

              {/* Real working ContactForm connecting to Supabase and Resend */}
              <ContactForm services={services} sourceContext="Homepage Interactive Starter" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
