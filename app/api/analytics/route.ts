import { NextRequest, NextResponse } from 'next/server';
import { logAnalyticsEvent } from '@/lib/data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event_name, event_category, page_path, page_title, referrer, meta_data } = body;

    if (!event_name || !page_path) {
      return NextResponse.json({ success: false, error: 'event_name and page_path are required.' }, { status: 400 });
    }

    // Ensure no PII like raw passwords, emails, or phone numbers are saved to analytics payloads
    const sanitizedMeta = { ...meta_data };
    delete sanitizedMeta.email;
    delete sanitizedMeta.phone;
    delete sanitizedMeta.password;
    delete sanitizedMeta.message;

    await logAnalyticsEvent({
      event_name,
      event_category: event_category || 'interaction',
      page_path,
      page_title,
      referrer,
      meta_data: sanitizedMeta,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
