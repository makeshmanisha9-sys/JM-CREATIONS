import React from 'react';
import { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { getSiteSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Terms & Conditions | JM Creations',
  description: 'Terms and Conditions of service for JM Creations, part of Jina Groups of Company Pvt. Ltd.',
};

export default async function TermsAndConditionsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/30 text-xs text-gold-400">
            <FileText className="w-3.5 h-3.5 text-gold-500" />
            <span>Service Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms and Conditions</h1>
          <p className="text-xs text-zinc-400">Effective Date: October 2024</p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-[#121214] border border-zinc-800 text-zinc-300 text-sm leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Scope of Engagement</h2>
            <p>
              These Terms and Conditions govern the use of this website and the preliminary commercial consultations provided by JM Creations, a business solutions company operating as part of <strong>Jina Groups of Company Pvt. Ltd.</strong>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Proposals & Service Contracts</h2>
            <p>
              Submitting an enquiry via our website does not create a binding service agreement. Formal engagements commence only upon mutual execution of a customized Scope of Work (SOW), commercial contract, or project proposal outlining specific deliverables, milestone dates, and payment schedules.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Intellectual Property</h2>
            <p>
              All website content, visual identity marks, design architectures, and editorial texts are proprietary to JM Creations and Jina Groups of Company Pvt. Ltd. Client assets, logos, and trademarks displayed in our portfolio remain the intellectual property of their respective owners.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Governing Law</h2>
            <p>
              Any disputes arising from the use of this portal or our business agreements are subject to the jurisdiction of the courts of Tamil Nadu, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
