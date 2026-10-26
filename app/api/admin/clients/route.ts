import { NextRequest, NextResponse } from 'next/server';
import { getClients } from '@/lib/data';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  const data = await getClients({ includeUnpublished: true });
  return NextResponse.json({ success: true, data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const admin = createAdminClient();
    if (admin) {
      const { data, error } = await admin.from('clients').insert([body]).select().single();
      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }
    return NextResponse.json({ success: true, message: 'Client added in memory mode', data: body });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    const admin = createAdminClient();
    if (admin) {
      const { data, error } = await admin.from('clients').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return NextResponse.json({ success: true, data });
    }
    return NextResponse.json({ success: true, message: 'Client updated in memory mode', data: body });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 });

    const admin = createAdminClient();
    if (admin) {
      const { error } = await admin.from('clients').delete().eq('id', id);
      if (error) throw error;
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
