import { NextRequest, NextResponse } from 'next/server';
import { getEnquiries, updateEnquiryStatus, addEnquiryNote, deleteEnquiry } from '@/lib/data';
import { EnquiryStatus } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || undefined;
  const search = searchParams.get('search') || undefined;

  const data = await getEnquiries({ status, search });
  return NextResponse.json({ success: true, data });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'id and status are required' }, { status: 400 });
    }

    const validStatuses: EnquiryStatus[] = ['New', 'Contacted', 'In Progress', 'Converted', 'Closed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const success = await updateEnquiryStatus(id, status);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { enquiry_id, author_email, note } = body;

    if (!enquiry_id || !note) {
      return NextResponse.json({ success: false, error: 'enquiry_id and note are required' }, { status: 400 });
    }

    const savedNote = await addEnquiryNote(enquiry_id, author_email || 'admin@jmcreations.com', note);
    return NextResponse.json({ success: true, note: savedNote });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
    }

    const success = await deleteEnquiry(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
