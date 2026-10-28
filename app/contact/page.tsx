import React from 'react';
import { Metadata } from 'next';
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Instagram,
  Linkedin,
  Facebook,
  Clock,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import { getServices, getSiteSettings } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us & Project Starter | JM Creations',
  description:
    'Get in touch with JM Creations, part of Jina Groups of Company Pvt. Ltd. Reach us via email at jmcreationinfo@gmail.com or phone/WhatsApp at +91 90429 86355.',
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: { service?: string };
}) {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-16 bg-[#080808] text-white min-h-screen">
      {/* Studio Header Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-zinc-300">PROJECT INTAKE / DIRECT COMMUNICATIONS</span>
          </div>
          <span className="hidden md:inline">JINA GROUPS OF COMPANY PVT. LTD.</span>
          <span className="text-gold-500/80">[ 24-HOUR RESPONSE ]</span>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/30 text-[11px] font-mono text-gold-400">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Commercial Project Consultation</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.04]">
            INITIATE YOUR <span className="gold-text-gradient">COMMERCIAL</span> VISION.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed pt-2 max-w-3xl font-sans">
            Connect directly with our multidisciplinary studio. Every enquiry is registered in our database, tracked with an audit code, and promptly reviewed by our senior team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#121212] border border-zinc-800 space-y-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-gold-500">
                OFFICIAL STUDIO CHANNELS
              </div>

              <div className="space-y-6 text-xs font-mono">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                      Official Enquiry Email
                    </div>
                    <a
                      href={`mailto:${settings.email || 'jmcreationinfo@gmail.com'}`}
                      className="text-white hover:text-gold-400 font-semibold text-sm transition-colors break-all"
                    >
                      {settings.email || 'jmcreationinfo@gmail.com'}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                      WhatsApp Business Channel
                    </div>
                    <a
                      href={`https://wa.me/${(settings.whatsapp || '+91 90429 86355').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        settings.whatsapp_prefill_message || 'Hello JM Creations, I would like to enquire about your services.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gold-400 font-semibold text-sm transition-colors"
                    >
                      {settings.whatsapp || '+91 90429 86355'}
                    </a>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                      Direct Telephone Line
                    </div>
                    <a
                      href={`tel:${(settings.phone || '+91 90429 86355').replace(/[^0-9+]/g, '')}`}
                      className="text-white hover:text-gold-400 font-semibold text-sm transition-colors"
                    >
                      {settings.phone || '+91 90429 86355'}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                      Operating Hours
                    </div>
                    <div className="text-zinc-300">Monday – Saturday: 09:00 AM – 07:00 PM IST</div>
                    <div className="text-zinc-500 text-[10px] mt-0.5">Sunday: Closed for Creative Sabbatical</div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-zinc-800/80">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-3">
                  Connect on Social Media
                </div>
                <div className="flex items-center gap-3">
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
            </div>

            {/* Parent Corporate Governance Statement */}
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-gold-400 uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-gold-500" />
                <span>Corporate Lineage</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {settings.parent_company_relationship}
              </p>
            </div>
          </div>

          {/* Right Column: Contact & Project Starter Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#121212] border border-zinc-800/80 shadow-2xl space-y-6">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-gold-500 mb-1">
                  COMMERCIAL INTAKE SPECIFICATION
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Tell Us About Your Enterprise
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-sans">
                  Complete the specification below. Our senior leadership will examine your objectives and get in touch within 24 business hours.
                </p>
              </div>

              {/* Working Contact Form */}
              <ContactForm
                services={services}
                initialServiceSlug={searchParams?.service}
                sourceContext="dedicated_contact_page"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
