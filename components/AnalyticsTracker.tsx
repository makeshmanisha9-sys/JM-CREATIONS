'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const fullUrl = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

    // Log page view event
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: 'page_view',
        event_category: 'navigation',
        page_path: fullUrl,
        page_title: typeof document !== 'undefined' ? document.title : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
      }),
    }).catch(() => {});

    // Google Analytics 4 page_view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: fullUrl,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
