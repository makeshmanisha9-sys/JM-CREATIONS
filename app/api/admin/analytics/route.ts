import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsSummary } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const summary = await getAnalyticsSummary();
    return NextResponse.json({ success: true, data: summary });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
