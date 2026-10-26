import { NextRequest, NextResponse } from 'next/server';
import { getSiteSettings, updateSiteSettings } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateSiteSettings(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
