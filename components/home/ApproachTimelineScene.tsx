'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  FileCode,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function ApproachTimelineScene() {
  const [activeStep, setActiveStep] = useState(0);

  const stages = [
    {
      step: '01',
      title: 'Strategic Discovery & Commercial Audit',
      badge: 'Foundation',
      icon: Compass,
      duration: 'Week 1 - 2',
      summary:
        'We deconstruct your market positioning, commercial model, competitive moat, and customer acquisition channels before touching a single line of code or design file.',
      deliverables: [
        'Commercial Model & Revenue Stream Analysis',
        'Competitive Differentiation Audit',
        'Target Audience Archetypes & Buying Triggers',
        'Technology & Platform Requirements Matrix',
      ],
      keyQuestion: 'What unique commercial advantage makes your business irreplaceable to your customers?',
    },
    {
      step: '02',
      title: 'Creative Direction & Technical Blueprint',
      badge: 'Architecture',
      icon: Layers,
      duration: 'Week 2 - 3',
      summary:
        'We engineer the unified architecture: brand messaging hierarchy, visual style direction, user experience wireframes, database schemas, and conversion pathways.',
      deliverables: [
        'Visual Identity Style Direction & Moodboards',
        'Information Architecture & Content Wireframes',
        'Database Entity-Relationship Schema',
        'Digital Marketing & Ad Campaign Blueprint',
      ],
      keyQuestion: 'How does every customer touchpoint reinforce confidence and remove conversion friction?',
    },
    {
      step: '03',
      title: 'Craft, Engineering & Production',
      badge: 'Execution',
      icon: FileCode,
      duration: 'Week 3 - 6',
      summary:
        'Our multidisciplinary team builds the entire ecosystem in parallel: modern web development, brand asset creation, commercial video production, and advertising creative.',
      deliverables: [
        'Modern Full-Stack Web Development (Next.js & Supabase)',
        'Vector Logo Suites & Comprehensive Brand Guidelines',
        'High-Resolution Commercial Photo & Video Shoots',
        'Ad Creative Variations & Lead Generation Copy',
      ],
      keyQuestion: 'Is every asset built to the highest production standard without cutting corners?',
    },
    {
      step: '04',
      title: 'Performance Tuning & Rigorous Hardening',
      badge: 'Refinement',
      icon: ShieldCheck,
      duration: 'Week 6 - 7',
      summary:
        'Every component undergoes cross-browser testing, Core Web Vitals performance tuning, end-to-end security audits, and analytics event tracking verification.',
      deliverables: [
        '60fps Interaction & Core Web Vitals Optimization',
        'Responsive Verification across Mobile, Tablet, Desktop',
        'Form Validation & Transactional Email Testing',
        'Google Analytics 4 & Custom Conversion Tracking',
      ],
      keyQuestion: 'Does the application load in milliseconds and withstand real commercial traffic?',
    },
    {
      step: '05',
      title: 'Deployment, Launch & Scaled Growth',
      badge: 'Amplification',
      icon: TrendingUp,
      duration: 'Week 7 onward',
      summary:
        'We orchestrate smooth production launch, configure DNS and SSL, initiate targeted ad campaigns, and provide ongoing business support backed by Jina Groups.',
      deliverables: [
        'Production Cloud Deployment on Enterprise Edge',
        'Google Ads & Meta Advertising Campaign Rollout',
        'Lead Pipeline Monitoring & CRM Integration',
        'Iterative Feature Enhancements & SLA Support',
      ],
      keyQuestion: 'How do we systematically scale revenue, inbound enquiries, and market share?',
    },
  ];

  return (
    <section
      id="approach-scene"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#090909] text-white border-t border-zinc-900 overflow-hidden"
    >
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[160px] rounded-full pointer-events-none" />

      {/* Coordinate Bar */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-zinc-300">SCENE 05 / UNDERSTAND</span>
          </div>
          <span className="hidden md:inline">5 STAGES OF COMMERCIAL DELIVERY · ZERO GUESSWORK</span>
          <span className="text-gold-500/80">[ RIGOROUS EXECUTION ]</span>
        </div>

        {/* Manifesto Block */}
        <div className="mb-20 py-12 border-y border-zinc-800/80 bg-zinc-950/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-gold-500 to-transparent" />
          <div className="text-[11px] font-mono text-gold-400 uppercase tracking-widest mb-4">
            STUDIO MANIFESTO · THE JM CREATIONS CODE
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl">
            &ldquo;GOOD DESIGN GETS ATTENTION.{' '}
            <span className="gold-text-gradient">GREAT EXPERIENCES STAY WITH YOU.&rdquo;</span>
          </h2>
          <p className="mt-6 text-zinc-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            We reject the industry trend of treating web development, advertising, and branding as disposable templates. Every commercial initiative deserves deliberate thinking, architectural discipline, and obsessive craft.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/20 text-[11px] font-mono text-gold-400">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Disciplined Methodology</span>
            </div>
            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
              HOW WE TRANSFORM <span className="gold-text-gradient">AMBITIONS</span> INTO ASSETS.
            </h3>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Click each phase to inspect timeline benchmarks, strategic deliverables, and the foundational questions we answer.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Process Pipeline */}
      <div className="max-w-7xl mx-auto">
        {/* Stage Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStep(idx)}
                data-cursor="inspect"
                className={`p-4 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-900 border-gold-500 shadow-gold-glow-lg text-white'
                    : 'bg-[#121212] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-4">
                  <span className={isSelected ? 'text-gold-500 font-bold' : 'text-zinc-500'}>
                    STAGE {stage.step}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 border border-zinc-800">
                    {stage.badge}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-gold-500' : 'text-zinc-500'}`} />
                  <span className="font-display text-xs sm:text-sm font-bold line-clamp-1">
                    {stage.title.split('&')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="rounded-3xl bg-[#131313] border border-zinc-800/80 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none select-none font-display font-black text-8xl sm:text-9xl text-gold-500">
            {stages[activeStep].step}
          </div>

          <div className="relative z-10 max-w-4xl space-y-8">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-semibold">
                STAGE {stages[activeStep].step} OF 05
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                <span>Estimated Cadence: {stages[activeStep].duration}</span>
              </span>
            </div>

            <h4 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              {stages[activeStep].title}
            </h4>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {stages[activeStep].summary}
            </p>

            {/* Core Question Callout */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-gold-500/20">
              <div className="text-[10px] font-mono uppercase tracking-widest text-gold-500 mb-1">
                Foundational Strategic Inquiry
              </div>
              <div className="text-xs sm:text-sm font-serif italic text-zinc-200">
                &ldquo;{stages[activeStep].keyQuestion}&rdquo;
              </div>
            </div>

            {/* Structured Deliverables */}
            <div>
              <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4">
                Guaranteed Phase Deliverables
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stages[activeStep].deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs sm:text-sm text-zinc-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
