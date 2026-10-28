import React from 'react';
import { Metadata } from 'next';
import { getSiteSettings, getServices, getProjects, getClients, getBlogPosts } from '@/lib/data';
import HeroScene from '@/components/home/HeroScene';
import BrandStoryScene from '@/components/home/BrandStoryScene';
import ServicesWorldScene from '@/components/home/ServicesWorldScene';
import PortfolioGalleryScene from '@/components/home/PortfolioGalleryScene';
import ApproachTimelineScene from '@/components/home/ApproachTimelineScene';
import ClientWorldScene from '@/components/home/ClientWorldScene';
import JournalScene from '@/components/home/JournalScene';
import InteractiveProjectStarter from '@/components/home/InteractiveProjectStarter';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: `${settings.company_name} | Creative Thinking. Strategic Solutions. Measurable Growth.`,
    description: settings.hero_subheadline,
  };
}

export default async function HomePage() {
  const settings = await getSiteSettings();
  const services = await getServices();
  const projects = await getProjects();
  const clients = await getClients();
  const blogPosts = await getBlogPosts();

  return (
    <div className="flex flex-col w-full overflow-hidden bg-[#080808]">
      {/* SCENE 01 / DISCOVER — Hero with 3D Kinetic Object & Architectural Typography */}
      <HeroScene settings={settings} />

      {/* SCENE 02 / BELIEVE — Editorial Contrast Shift (Warm White Editorial) */}
      <BrandStoryScene settings={settings} />

      {/* SCENE 03 / EXPLORE — Interactive Playground of all 21 Services */}
      <ServicesWorldScene services={services} />

      {/* SCENE 04 / EXPERIENCE — Asymmetric Editorial Portfolio with Real Client Projects */}
      <PortfolioGalleryScene projects={projects} clients={clients} />

      {/* SCENE 05 / UNDERSTAND — Studio Manifesto & 5-Stage Interactive Methodology */}
      <ApproachTimelineScene />

      {/* SCENE 06 / IMAGINE — Dual-Speed Client Marquee, Roster & 4 Core Pillars */}
      <ClientWorldScene clients={clients} />

      {/* STUDIO JOURNAL — High-Aesthetic Insights */}
      <JournalScene posts={blogPosts} />

      {/* SCENE 07 / ENGAGE — Direct Channels & Full-Stack Interactive Project Starter */}
      <InteractiveProjectStarter services={services} settings={settings} />
    </div>
  );
}
