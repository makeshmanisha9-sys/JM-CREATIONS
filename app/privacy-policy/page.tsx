import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { getSiteSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Privacy Policy | JM Creations',
  description: 'Privacy Policy and data governance for JM Creations, part of Jina Groups of Company Pvt. Ltd.',
};

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/30 text-xs text-gold-400">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-500" />
            <span>Data Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-zinc-400">Last updated: October 2024</p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-[#121214] border border-zinc-800 text-zinc-300 text-sm leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Introduction</h2>
            <p>
              JM Creations (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), part of <strong>Jina Groups of Company Pvt. Ltd.</strong>, respects your privacy and is committed to protecting the personal information you share with us through our corporate website and digital communication channels.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
            <p>
              When you submit a project inquiry or contact us via our website, we may collect your:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400 text-xs">
              <li>Full name</li>
              <li>Official email address</li>
              <li>Telephone and WhatsApp contact number</li>
              <li>Company or commercial enterprise name</li>
              <li>Service interests, estimated budget, and project requirements</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. How We Use Your Data</h2>
            <p>
              We process your submitted details solely to evaluate your business requirements, prepare proposals, correspond regarding your inquiries, and provide contractual services. We do not sell, rent, or trade your personal information to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Communications & Notifications</h2>
            <p>
              Inquiry submissions are delivered to our authorized commercial inbox at{' '}
              <a href={`mailto:${settings.email}`} className="text-gold-400 underline">
                {settings.email}
              </a>{' '}
              and official WhatsApp dispatch channel at {settings.whatsapp}. You may withdraw consent or request data removal at any time by emailing us.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">5. Contact Information</h2>
            <p>
              For privacy-related questions, please contact our administrative team at{' '}
              <a href={`mailto:${settings.email}`} className="text-gold-400 underline">
                {settings.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
