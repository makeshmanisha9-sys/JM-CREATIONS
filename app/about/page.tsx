import React from 'react';
import { Metadata } from 'next';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Building2,
  Target,
  Compass,
  Award,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { getSiteSettings, getServices } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us | JM Creations (Jina Groups Subsidiary)',
  description:
    'JM Creations is part of Jina Groups of Company Pvt. Ltd., providing integrated business, creative, and digital solutions to help businesses establish, grow, and scale their presence.',
};

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const services = await getServices();

  const values = [
    {
      title: 'Commercial Truth',
      description:
        'We believe marketing and design must be grounded in real commercial fundamentals rather than superficial vanity metrics.',
    },
    {
      title: 'Integrated Execution',
      description:
        'By housing business consulting, creative media production, and digital technology under one roof, we eliminate fragmentation.',
    },
    {
      title: 'Direct Accountability',
      description:
        'We communicate transparently regarding project deliverables, campaign outcomes, and timelines with factual reporting.',
    },
    {
      title: 'Long-Term Partnership',
      description:
        'From business-start consulting to multi-channel customer acquisition, we support clients through multiple stages of growth.',
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
    <div className="pt-28 sm:pt-36 pb-24 space-y-24 bg-[#080808] text-white min-h-screen">
      {/* 1. Studio Header Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-zinc-300">STUDIO GENESIS / CORPORATE PROFILE</span>
          </div>
          <span className="hidden md:inline">A SUBSIDIARY OF JINA GROUPS OF COMPANY PVT. LTD.</span>
          <span className="text-gold-500/80">[ INTEGRATED SOLUTIONS ]</span>
        </div>

        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/30 text-[11px] font-mono text-gold-400">
            <Building2 className="w-3.5 h-3.5 text-gold-500" />
            <span>Corporate Heritage</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.04]">
            STRATEGIC SOLUTIONS &amp; <span className="gold-text-gradient">CREATIVE POWER</span> BEHIND GROWING ENTERPRISES.
          </h1>

          <p className="text-zinc-300 text-base sm:text-lg lg:text-xl leading-relaxed pt-2 max-w-3xl font-sans">
            {settings.parent_company_relationship}
          </p>
        </div>
      </section>

      {/* 2. Company Overview & Institutional Backing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono font-bold text-gold-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              <span>Commercial Purpose</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Bridging Business Consulting with High-Impact Digital Production
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
              JM Creations operates as an end-to-end business solutions, branding, digital marketing, web development, creative production, and startup support company.
            </p>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
              Modern enterprises operate in a fiercely competitive environment where fragmented service providers often cause communication breakdowns and inconsistent brand presentation. JM Creations resolves this by combining strategic consulting with actual creative execution—ensuring every logo, website, photoshoot, and advertising campaign aligns directly with commercial targets.
            </p>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
              As part of <strong>Jina Groups of Company Pvt. Ltd.</strong>, we draw on corporate governance principles to deliver dependable solutions across diverse sectors including food & hospitality, education, early-stage startups, non-profit trusts, and independent creator collaborations.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#121212] border border-gold-500/30 shadow-2xl relative space-y-6">
              <div className="text-xs font-mono font-bold text-gold-500 uppercase tracking-wider">
                Corporate Lineage
              </div>

              <h3 className="font-display text-2xl font-bold text-white">
                Jina Groups of Company Pvt. Ltd.
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                &ldquo;{settings.parent_company_relationship}&rdquo;
              </p>

              <div className="p-5 rounded-2xl bg-black/60 border border-zinc-800 text-xs font-mono text-zinc-300 space-y-2.5">
                <div className="text-gold-400 font-semibold uppercase tracking-wider">
                  Corporate Governance Record:
                </div>
                <div>Parent Holding: Jina Groups of Company Pvt. Ltd.</div>
                <div>Operating Studio: JM Creations</div>
                <div>Official Channel: {settings.email || 'jmcreationinfo@gmail.com'}</div>
                <div>Headquarters: Tamil Nadu, India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Agency Showcase: Production, Consulting & Engineering */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Production Shoots */}
          <div className="group rounded-3xl bg-[#121212] border border-zinc-800/80 overflow-hidden hover:border-gold-500/50 transition-all duration-500 flex flex-col justify-between">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-950">
              <Image
                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80"
                alt="Commercial Cinema Production"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 border border-zinc-700/80 backdrop-blur-md text-[10px] font-mono text-gold-400">
                DISCIPLINE 01
              </div>
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                Commercial Cinema &amp; Shoots
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                Professional studio lighting, high-refraction optical glass, and multi-format video capture tailored for high-converting brand campaigns.
              </p>
            </div>
          </div>

          {/* Card 2: Strategic Advisory */}
          <div className="group rounded-3xl bg-[#121212] border border-zinc-800/80 overflow-hidden hover:border-gold-500/50 transition-all duration-500 flex flex-col justify-between">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-950">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Strategic Business Consulting"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 border border-zinc-700/80 backdrop-blur-md text-[10px] font-mono text-gold-400">
                DISCIPLINE 02
              </div>
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                Strategic Enterprise Consulting
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                Grounded commercial advisory, business registration facilitation, and revenue funnel structuring for emerging startups and market leaders.
              </p>
            </div>
          </div>

          {/* Card 3: Web & Tech Engineering */}
          <div className="group rounded-3xl bg-[#121212] border border-zinc-800/80 overflow-hidden hover:border-gold-500/50 transition-all duration-500 flex flex-col justify-between">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-950">
              <Image
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                alt="Web and Digital Engineering"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 border border-zinc-700/80 backdrop-blur-md text-[10px] font-mono text-gold-400">
                DISCIPLINE 03
              </div>
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                High-Performance Web Engineering
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                Next-generation full-stack corporate portals, responsive UI architectures, and conversion-optimized sales workflows built for scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, and Core Pillars */}
      <section className="bg-zinc-950/70 border-y border-zinc-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Mission */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#121212] border border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                To empower startups, local businesses, and established enterprises with unified business advisory, creative media production, and high-performance digital marketing solutions that convert customer interest into sustainable commercial revenue.
              </p>
            </div>

            {/* Vision */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#121212] border border-zinc-800">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                To become the premier business transformation and digital solutions partner for enterprises across South India, recognized for integrity, disciplined execution, and measurable growth.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[10px] font-mono uppercase tracking-widest text-gold-500 mb-1">
              OPERATIONAL CODE
            </div>
            <h3 className="font-display text-3xl font-extrabold text-white">Our Operating Principles</h3>
            <p className="text-xs text-zinc-400 mt-2 font-sans">
              The fundamental standards guiding our customer interactions, execution rigor, and delivery methods.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-[#121212] border border-zinc-800">
                <div className="text-gold-500 font-mono text-xs font-bold mb-4">[ 0{idx + 1} ]</div>
                <h4 className="font-display text-lg font-bold text-white mb-2">{val.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Business Capabilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[10px] font-mono text-gold-500 uppercase tracking-widest mb-1">
            SCOPE OF EXPERTISE
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Integrated Business Capabilities
          </h2>
          <p className="text-xs text-zinc-400 mt-2 font-sans">
            Comprehensive services covering the complete business lifecycle from initial setup to customer acquisition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#121212] border border-zinc-800 flex items-center gap-3 text-xs sm:text-sm font-medium text-zinc-200"
            >
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
              <span>{cap}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <NextLink
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-black text-xs font-display font-bold uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold-glow"
          >
            <span>Explore All 21 Individual Services</span>
            <ArrowUpRight className="w-4 h-4" />
          </NextLink>
        </div>
      </section>

      {/* 5. Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-950 border border-gold-500/30 p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
          <div className="text-[10px] font-mono uppercase tracking-widest text-gold-500">
            START YOUR JOURNEY
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let Us Discuss Your Business Objectives
          </h2>
          <p className="text-zinc-300 text-sm max-w-xl mx-auto leading-relaxed font-sans">
            Whether you need startup support, a corporate website, high-converting lead generation, or professional media production, our team is ready to evaluate your requirements.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <NextLink
              href="/contact"
              className="px-8 py-4 rounded-full bg-gold-500 text-black font-display font-bold uppercase tracking-wider text-xs shadow-gold-glow hover:bg-gold-400 transition-colors"
            >
              Submit Project Enquiry
            </NextLink>
            <NextLink
              href="/portfolio"
              className="px-8 py-4 rounded-full bg-zinc-900 text-white font-mono text-xs uppercase tracking-wider border border-zinc-800 hover:border-gold-500/40 hover:bg-zinc-800 transition-colors"
            >
              Review Client Work
            </NextLink>
          </div>
        </div>
      </section>
    </div>
  );
}
