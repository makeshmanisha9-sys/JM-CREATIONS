import React from 'react';
import NextLink from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  Briefcase,
  TrendingUp,
  Code,
  Palette,
  Target,
  Sparkles,
  Shield,
  Layers,
  ChevronRight,
  Phone,
  MessageCircle,
  Building,
  Award,
} from 'lucide-react';
import { getSiteSettings, getServices, getProjects, getClients, getBlogPosts } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

export default async function HomePage() {
  const settings = await getSiteSettings();
  const allServices = await getServices();
  const featuredServices = allServices.filter((s) => s.is_featured).slice(0, 6);
  const allProjects = await getProjects();
  const featuredProjects = allProjects.filter((p) => p.is_featured).slice(0, 4);
  const clients = await getClients();
  const blogPosts = await getBlogPosts();

  const industriesServed = [
    {
      title: 'Food & Hospitality',
      description: 'Catering businesses, gourmet foods, and hospitality brands scaling outreach.',
      examples: 'Strisha Catering',
    },
    {
      title: 'Education & Academics',
      description: 'Educational institutes and academies driving student enrollment.',
      examples: 'Ampiere Educational Institute',
    },
    {
      title: 'Foundations & Social Impact',
      description: 'Non-profits and social trusts expanding awareness and community outreach.',
      examples: 'Kufo Foundations',
    },
    {
      title: 'Startups & Emerging Brands',
      description: 'New ventures launching with structured business and operational setup.',
      examples: 'Truevedha',
    },
    {
      title: 'Influencers & Social Creators',
      description: 'Content creators establishing professional digital collaborations.',
      examples: 'Gingeephotoofficial',
    },
    {
      title: 'Healthcare & Specialized Retail',
      description: 'Hearing care, wellness, and trade suppliers building market credibility.',
      examples: 'Grace Speech and Hearing Aids, Herbal Life',
    },
  ];

  const processSteps = [
    {
      num: '01',
      title: 'Strategic Discovery',
      description: 'We analyze your commercial model, market space, and specific growth objectives to identify high-leverage opportunities.',
    },
    {
      num: '02',
      title: 'Creative & Technical Blueprint',
      description: 'Crafting tailored visual assets, messaging architecture, and technical workflows designed specifically for your audience.',
    },
    {
      num: '03',
      title: 'Deployment & Launch',
      description: 'Building websites, launching ad campaigns, or executing photo/video shoots with strict quality and performance standards.',
    },
    {
      num: '04',
      title: 'Optimization & Scaling',
      description: 'Monitoring incoming enquiries, calibrating conversion channels, and supporting sustainable enterprise expansion.',
    },
  ];

  return (
    <div className="flex flex-col space-y-24 sm:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
        {/* Ambient Dark Gold Radial Glow */}
        <div className="absolute inset-0 bg-dark-radial pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-500/10 blur-[130px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Parent Group Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-gold-500/30 text-xs text-gold-400 font-medium mb-8 backdrop-blur-md">
            <Building className="w-3.5 h-3.5 text-gold-500" />
            <span>A Subsidiary of Jina Groups of Company Pvt. Ltd.</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
            Creative Thinking. <span className="gold-text">Strategic Solutions.</span> Measurable Growth.
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            {settings.hero_subheadline}
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <NextLink
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-wider text-xs shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </NextLink>

            <NextLink
              href="/portfolio"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-white font-medium text-xs tracking-wider border border-zinc-700/80 hover:border-gold-500/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore Our Work</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </NextLink>
          </div>

          {/* Core Service Pillars Highlights */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
              <div className="text-gold-500 text-xs font-semibold uppercase tracking-wider mb-1">21 Solutions</div>
              <div className="text-white text-sm font-medium">End-to-End Capabilities</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
              <div className="text-gold-500 text-xs font-semibold uppercase tracking-wider mb-1">Corporate Group</div>
              <div className="text-white text-sm font-medium">Backed by Jina Groups</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
              <div className="text-gold-500 text-xs font-semibold uppercase tracking-wider mb-1">Real Clients</div>
              <div className="text-white text-sm font-medium">Verified Case Studies</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
              <div className="text-gold-500 text-xs font-semibold uppercase tracking-wider mb-1">Integrated</div>
              <div className="text-white text-sm font-medium">Creative & Tech Power</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE INTRODUCTION & PARENT RELATIONSHIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-bold text-gold-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500"></span>
              About JM Creations
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              An Integrated Agency Built for Business Outcomes
            </h2>
            <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
              {settings.parent_company_relationship}
            </p>
            <p className="text-zinc-400 leading-relaxed text-sm">
              We bridge the traditional divide between business strategy and creative production. Rather than hiring separate vendors for consulting, branding, web development, photography, and advertising, JM Creations acts as your unified commercial partner.
            </p>
            <div className="pt-2">
              <NextLink
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-gold-300 uppercase tracking-wider group"
              >
                <span>Read more about our approach & structure</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </NextLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-[#0F0F11] border border-gold-500/20 shadow-2xl relative">
              <div className="text-xs font-semibold uppercase tracking-wider text-gold-500 mb-6">
                Parent Organization
              </div>
              <div className="text-2xl font-bold text-white mb-2">Jina Groups of Company Pvt. Ltd.</div>
              <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                JM Creations represents the strategic business solutions, digital technology, and creative production arm within the Jina Groups corporate family.
              </p>
              <div className="space-y-3 border-t border-zinc-800 pt-5 text-xs text-zinc-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Integrated multi-disciplinary capabilities</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Commercial consulting & startup support</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-gold-500 shrink-0" />
                  <span>Production-grade creative and technical execution</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED SERVICES OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500"></span>
              Complete Solutions Catalogue
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              End-to-End Business & Digital Services
            </h2>
          </div>
          <NextLink
            href="/services"
            className="text-xs font-bold text-gold-400 hover:text-gold-300 uppercase tracking-wider flex items-center gap-1.5 shrink-0"
          >
            <span>View All 21 Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-semibold text-gold-500 uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
                    {service.category?.name || 'Integrated'}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gold-400 group-hover:border-gold-500/40 transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  {service.excerpt}
                </p>

                {service.benefits && service.benefits.length > 0 && (
                  <ul className="space-y-2 mb-6">
                    {service.benefits.slice(0, 3).map((b, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-gold-500 mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <NextLink
                  href={`/services/${service.slug}`}
                  className="text-xs font-semibold text-white group-hover:text-gold-400 flex items-center gap-1 transition-colors"
                >
                  <span>Explore Deliverables</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </NextLink>
                <NextLink
                  href={`/contact?service=${service.slug}`}
                  className="text-[11px] text-zinc-400 hover:text-white transition-colors"
                >
                  Enquire
                </NextLink>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. VERIFIED CLIENT PORTFOLIO HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500"></span>
              Real Client Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Selected Projects & Engagements
            </h2>
          </div>
          <NextLink
            href="/portfolio"
            className="text-xs font-bold text-gold-400 hover:text-gold-300 uppercase tracking-wider flex items-center gap-1.5 shrink-0"
          >
            <span>Browse Full Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#121214] border border-zinc-800 rounded-2xl p-7 flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-white tracking-wide">
                    {project.client?.name || 'Client Project'}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded ${
                      project.status === 'Completed'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                  {project.project_summary}
                </p>

                {project.deliverables && project.deliverables.length > 0 && (
                  <div className="mb-6">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-gold-500 mb-2">
                      Key Deliverables
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.deliverables.map((del, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-zinc-300"
                        >
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <NextLink
                  href={`/portfolio/${project.slug}`}
                  className="text-xs font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1.5"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </NextLink>
                <span className="text-[11px] text-zinc-400">Verified Client Record</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. VERIFIED CLIENTS DIRECTORY BANNER */}
      <section className="bg-zinc-950 border-y border-zinc-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-2">
              Client Network
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Businesses & Collaborators Served by JM Creations
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Official client list supplied by the company. Genuine client names preserved with unverified details left editable.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {clients.map((client) => (
              <NextLink
                key={client.id}
                href="/clients"
                className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-gold-500/40 text-center transition-all duration-200 group flex flex-col items-center justify-center min-h-[100px]"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-800 text-gold-400 flex items-center justify-center font-bold text-xs mb-2 group-hover:bg-gold-500 group-hover:text-black transition-colors">
                  {client.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                  {client.name}
                </div>
                {client.pending_confirmation && (
                  <span className="text-[9px] text-zinc-400 mt-1 uppercase tracking-wider">
                    Scope Pending
                  </span>
                )}
              </NextLink>
            ))}
          </div>

          <div className="text-center mt-8">
            <NextLink
              href="/clients"
              className="text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              <span>Explore All Verified Client Records</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NextLink>
          </div>
        </div>
      </section>

      {/* 6. INDUSTRIES & BUSINESS TYPES SERVED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-500"></span>
            Cross-Sector Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Industries and Business Types Served
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-3">
            Our multi-disciplinary service approach adapts to commercial requirements across business categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industriesServed.map((ind, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#121214] border border-zinc-800 hover:border-gold-500/30 transition-colors"
            >
              <h3 className="text-base font-bold text-white mb-2">{ind.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">{ind.description}</p>
              <div className="text-[11px] text-zinc-400 pt-3 border-t border-zinc-800/80">
                <span className="text-gold-500 font-semibold">Client Reference:</span> {ind.examples}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. OUR WORKING PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-500"></span>
            Structured Execution
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            How We Execute Projects
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-3">
            A disciplined four-phase approach ensuring transparency, strategic alignment, and measurable delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 relative overflow-hidden group hover:border-gold-500/40 transition-colors"
            >
              <div className="text-3xl font-extrabold text-gold-500/30 mb-4 group-hover:text-gold-500/60 transition-colors">
                {step.num}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. LATEST BLOG INSIGHTS */}
      {blogPosts && blogPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-500"></span>
                Editorial & Insights
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Strategic Perspectives
              </h2>
            </div>
            <NextLink
              href="/blog"
              className="text-xs font-bold text-gold-400 hover:text-gold-300 uppercase tracking-wider flex items-center gap-1.5 shrink-0"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NextLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="p-7 rounded-2xl bg-[#121214] border border-zinc-800 hover:border-gold-500/40 flex flex-col justify-between transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                    <span>{post.read_time}</span>
                    <span>{new Date(post.published_at || Date.now()).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>
                <NextLink
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1.5"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </NextLink>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. CONSULTATION CTA & DIRECT ENQUIRY PORTAL */}
      <section id="contact-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-bold text-gold-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500"></span>
              Start Your Project
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Ready to Build and Scale Your Business?
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Submit your project details or contact our team directly. We evaluate your requirements and structure a tailored strategy session.
            </p>

            <div className="space-y-4 pt-4">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-gold-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-black border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Official Email</div>
                  <div className="text-sm font-semibold text-white">{settings.email}</div>
                </div>
              </a>

              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-gold-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-black border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider">Direct Telephone</div>
                  <div className="text-sm font-semibold text-white">{settings.phone}</div>
                </div>
              </a>

              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(settings.whatsapp_prefill_message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-black border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider">WhatsApp Business</div>
                  <div className="text-sm font-semibold text-white">{settings.whatsapp}</div>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm services={allServices} sourceContext="homepage" />
          </div>
        </div>
      </section>
    </div>
  );
}
