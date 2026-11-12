import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CinematicPreloader from '@/components/CinematicPreloader';
import CustomCursor from '@/components/CustomCursor';
import NoiseOverlay from '@/components/NoiseOverlay';
import CinematicProductionBackground from '@/components/three/CinematicProductionBackground';
import FuturisticGlowOverlays from '@/components/three/FuturisticGlowOverlays';
import { getSiteSettings, getSocialLinks } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jmcreations.in';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${settings.company_name} | Integrated Business, Creative & Digital Solutions`,
      template: `%s | ${settings.company_name}`,
    },
    description: settings.hero_subheadline,
    keywords: [
      'JM Creations',
      'Jina Groups of Company Pvt. Ltd.',
      'Business Consulting',
      'Startup Consulting',
      'Branding and Logo Design',
      'Website Development Next.js',
      'Digital Marketing Strategy',
      'Google Ads Meta Advertising',
      'Lead Generation',
      'Commercial Photography and Videography',
      'Tamil Nadu Digital Agency',
    ],
    authors: [{ name: 'JM Creations' }],
    creator: 'JM Creations (Jina Groups of Company Pvt. Ltd.)',
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: siteUrl,
      title: `${settings.company_name} | Creative Thinking. Strategic Solutions. Measurable Growth.`,
      description: settings.hero_subheadline,
      siteName: settings.company_name,
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.company_name,
      description: settings.hero_subheadline,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.png',
      apple: '/apple-touch-icon.png',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const socialLinks = await getSocialLinks();

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-[#080808] text-zinc-100 flex flex-col antialiased selection:bg-gold-500 selection:text-black relative">
        {/* Preloader & Ambient Studio Utilities */}
        <CinematicPreloader />
        <CustomCursor />
        <NoiseOverlay />

        {/* Live 3D Cinematic Production Background & Studio Atmosphere */}
        <CinematicProductionBackground />
        <FuturisticGlowOverlays />

        {/* Analytics */}
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>

        {/* Global Architectural Navigation */}
        <Navbar settings={settings} />

        {/* Main Body */}
        <main className="flex-grow relative z-10">{children}</main>

        {/* Global Architectural Footer */}
        <Footer settings={settings} socialLinks={socialLinks} />

        {/* Floating WhatsApp Quick Connect */}
        <FloatingWhatsApp
          whatsappNumber={settings.whatsapp}
          prefillMessage={settings.whatsapp_prefill_message}
        />
      </body>
    </html>
  );
}
