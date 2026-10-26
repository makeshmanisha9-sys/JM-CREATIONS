import React from 'react';
import { Metadata } from 'next';
import NextLink from 'next/link';
import {
  Building2,
  Target,
  Compass,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { getSiteSettings, getServices } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us | JM Creations',
  description:
    'JM Creations is part of Jina Groups of Company Pvt. Ltd., providing integrated business, creative, and digital solutions to help businesses establish, grow, and scale their presence.',
};

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const services = await getServices();

  const values = [
    {
      title: 'Strategic Clarity',
      description: 'We believe marketing and design must be grounded in real commercial fundamentals rather than superficial vanity metrics.',
    },
    {
      title: 'Integrated Execution',
      description: 'By housing business consulting, creative media production, and digital technology under one roof, we eliminate fragmentation.',
    },
    {
      title: 'Direct Accountability',
      description: 'We communicate transparently regarding project deliverables, campaign outcomes, and timelines with factual reporting.',
    },
    {
      title: 'Long-Term Partnership',
      description: 'From business-start consulting to multi-channel customer acquisition, we support clients through multiple stages of growth.',
    },
  ];

  const capabilities = [
    'Business & Startup Consulting',
    'Brand Identity & Visual Architecture',
    'Full-Stack Web & E-Commerce Engineering',
    'Performance Advertising (Google & Meta)',
    'Commercial Photography & Creative Video Shoots',
    'Structured B2B/B2C Lead Generation Funnels',
    'Influencer Collaborations & Media Reach',
    'Corporate Print Collaterals & Event Branding',
  ];

  return (
    <div className="py-12 sm:py-16 space-y-24">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-gold-500/30 text-xs text-gold-400 font-medium mb-6">
          <Building2 className="w-3.5 h-3.5 text-gold-500" />
          <span>Corporate Profile</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto">
          Strategic Solutions & Creative Power Behind Growing Enterprises
        </h1>
        <p className="mt-6 text-zinc-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          {settings.parent_company_relationship}
        </p>
      </section>

      {/* 2. Company Overview & Group Relationship */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-bold text-gold-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500"></span>
              Business Purpose
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Bridging Commercial Strategy with High-Impact Digital Production
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              JM Creations operates as an end-to-end business solutions, branding, digital marketing, web development, creative production, and startup support company.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Modern enterprises operate in a fiercely competitive environment where fragmented service providers often cause communication breakdowns and inconsistent brand presentation. JM Creations resolves this by combining strategic consulting with actual creative execution—ensuring every logo, website, photoshoot, and advertising campaign aligns directly with commercial targets.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              As part of <strong>Jina Groups of Company Pvt. Ltd.</strong>, we draw on corporate governance principles to deliver dependable solutions across diverse sectors including food & hospitality, education, early-stage startups, non-profit trusts, and independent creator collaborations.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-zinc-900/80 border border-gold-500/30 shadow-2xl relative">
              <div className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-4">
                Parent Company Relationship
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Jina Groups of Company Pvt. Ltd.
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                &ldquo;{settings.parent_company_relationship}&rdquo;
              </p>
              <div className="p-4 rounded-xl bg-black/60 border border-zinc-800 text-xs text-zinc-300 space-y-2">
                <div className="text-gold-400 font-semibold">Corporate Verification:</div>
                <div>Parent Holding: Jina Groups of Company Pvt. Ltd.</div>
                <div>Operating Brand: JM Creations</div>
                <div>Official Communications: {settings.email}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, and Core Pillars */}
      <section className="bg-zinc-950 border-y border-zinc-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Mission */}
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                To empower startups, local businesses, and established enterprises with unified business advisory, creative media production, and high-performance digital marketing solutions that convert customer interest into sustainable commercial revenue.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                To become the premier business transformation and digital solutions partner for enterprises across South India, recognized for integrity, disciplined execution, and measurable growth.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-white">Our Operating Principles</h3>
            <p className="text-xs text-zinc-400 mt-2">
              The fundamental standards guiding our customer interactions and delivery methods.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="text-gold-500 font-mono text-sm font-bold mb-3">0{idx + 1}</div>
                <h4 className="text-base font-bold text-white mb-2">{val.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Business Capabilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-500"></span>
            Scope of Expertise
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Integrated Business Capabilities
          </h2>
          <p className="text-xs text-zinc-400 mt-2">
            Comprehensive services covering the complete business lifecycle from initial setup to customer acquisition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-[#121214] border border-zinc-800 flex items-center gap-3 text-sm font-medium text-zinc-200"
            >
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{cap}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <NextLink
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold-glow"
          >
            <span>Explore All 21 Individual Services</span>
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        </div>
      </section>

      {/* 5. Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-[#14120C] border border-gold-500/30 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Let Us Discuss Your Business Objectives
          </h2>
          <p className="text-zinc-300 text-sm max-w-xl mx-auto leading-relaxed">
            Whether you need startup support, a corporate website, high-converting lead generation, or professional media production, our team is ready to evaluate your requirements.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <NextLink
              href="/contact"
              className="px-8 py-3.5 rounded-xl bg-gold-500 text-black font-bold uppercase tracking-wider text-xs shadow-gold-glow hover:bg-gold-400 transition-colors"
            >
              Submit Project Enquiry
            </NextLink>
            <NextLink
              href="/portfolio"
              className="px-8 py-3.5 rounded-xl bg-zinc-800 text-white font-medium text-xs hover:bg-zinc-700 transition-colors"
            >
              Review Client Work
            </NextLink>
          </div>
        </div>
      </section>
    </div>
  );
}
