import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { getSiteSettings, getSocialLinks } from '@/lib/data';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jmcreations.in';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${settings.company_name} | Integrated Business & Digital Solutions`,
      template: `%s | ${settings.company_name}`,
    },
    description: settings.hero_subheadline,
    keywords: [
      'JM Creations',
      'Jina Groups of Company',
      'Business Consulting',
      'Startup Consulting',
      'Branding and Logo Design',
      'Website Development',
      'Digital Marketing',
      'Google Ads',
      'Meta Advertising',
      'Lead Generation',
      'Tamil Nadu Business Services',
      'Commercial Production',
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col antialiased selection:bg-gold-500 selection:text-black">
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>

        <Navbar settings={settings} />

        <main className="flex-grow pt-20">{children}</main>

        <Footer settings={settings} socialLinks={socialLinks} />

        <FloatingWhatsApp
          whatsappNumber={settings.whatsapp}
          prefillMessage={settings.whatsapp_prefill_message}
        />
      </body>
    </html>
  );
}
