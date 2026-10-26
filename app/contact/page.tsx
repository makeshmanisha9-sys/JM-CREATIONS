import React from 'react';
import { Metadata } from 'next';
import { Mail, Phone, MessageCircle, MapPin, Instagram, Linkedin, Facebook, Clock, ShieldCheck } from 'lucide-react';
import { getServices, getSiteSettings } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | JM Creations',
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
    <div className="py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-gold-500/30 text-xs text-gold-400 font-medium mb-4">
          <Mail className="w-3.5 h-3.5 text-gold-500" />
          <span>Official Contact & Consultation</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Initiate Your Project Consultation
        </h1>
        <p className="mt-4 text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto">
          Connect directly with JM Creations. Every enquiry is registered in our database and promptly dispatched to our commercial team.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#121214] border border-zinc-800 space-y-6">
              <h2 className="text-xl font-bold text-white tracking-tight border-b border-zinc-800 pb-4">
                Official Channels
              </h2>

              <div className="space-y-6 text-xs">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-1">
                      Official Enquiry Email
                    </div>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-white hover:text-gold-400 font-semibold text-sm transition-colors break-all"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-1">
                      Direct Telephone
                    </div>
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                      className="text-white hover:text-gold-400 font-semibold text-sm transition-colors"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-1">
                      WhatsApp Business
                    </div>
                    <a
                      href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(settings.whatsapp_prefill_message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-emerald-400 font-semibold text-sm transition-colors"
                    >
                      {settings.whatsapp}
                    </a>
                  </div>
                </div>

                {/* Office Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-1">
                      Office Address
                    </div>
                    <span className="text-zinc-300 font-medium">
                      {settings.office_address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-zinc-800">
                <div className="text-[11px] text-zinc-400 uppercase tracking-wider mb-3">
                  Connect on Social Platforms
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/j_m__creation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jm-creations-971a43423"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/19FRBKVjDX/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Parent Affiliation Box */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-400 space-y-2">
              <div className="text-gold-500 font-semibold uppercase tracking-wider text-[10px]">
                Corporate Affiliation
              </div>
              <p className="leading-relaxed">
                JM Creations operates as a specialized subsidiary unit under Jina Groups of Company Pvt. Ltd. All commercial proposals and agreements are managed with corporate governance standards.
              </p>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm
              services={services}
              initialServiceSlug={searchParams?.service}
              sourceContext="contact_page"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
