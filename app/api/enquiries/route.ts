import { NextRequest, NextResponse } from 'next/server';
import { createEnquiry, logAnalyticsEvent } from '@/lib/data';
import { sendEnquiryEmailNotification, sendEnquiryWhatsAppNotification } from '@/lib/notifications';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Spam honeypot check
    if (body.website_url_honeypot) {
      return NextResponse.json({ success: true, message: 'Enquiry received.' });
    }

    // Required fields validation
    const { full_name, email, phone, message, company_name, service_id, service_name, budget_range } = body;

    if (!full_name || typeof full_name !== 'string' || full_name.trim().length < 2) {
      return NextResponse.json({ success: false, error: 'Please enter a valid full name.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!phone || phone.trim().length < 7) {
      return NextResponse.json({ success: false, error: 'Please enter a valid phone number.' }, { status: 400 });
    }

    if (!message || message.trim().length < 5) {
      return NextResponse.json({ success: false, error: 'Please provide details about your project or inquiry.' }, { status: 400 });
    }

    // Extract IP and User Agent for verification
    const ip_address = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';
    const user_agent = req.headers.get('user-agent') || 'Browser';

    // 1. Save Enquiry to Database
    const dbResult = await createEnquiry({
      full_name,
      email,
      phone,
      company_name,
      service_id,
      service_name,
      budget_range,
      message,
      ip_address,
      user_agent,
    });

    if (!dbResult.success) {
      return NextResponse.json(
        { success: false, error: dbResult.error || 'Failed to save enquiry in database.' },
        { status: 500 }
      );
    }

    const enquiry = dbResult.enquiry;

    // 2. Trigger External Notifications (Email + WhatsApp)
    const [emailRes, whatsappRes] = await Promise.all([
      sendEnquiryEmailNotification(enquiry),
      sendEnquiryWhatsAppNotification(enquiry),
    ]);

    // 3. Log Analytics Event (Without sensitive PII in event payload)
    await logAnalyticsEvent({
      event_name: 'contact_form_submit',
      event_category: 'conversion',
      page_path: '/contact',
      meta_data: {
        enquiry_code: enquiry.enquiry_code,
        service: enquiry.service_name,
        email_delivered: emailRes.success,
        whatsapp_delivered: whatsappRes.success,
      },
    });

    return NextResponse.json({
      success: true,
      enquiry_code: enquiry.enquiry_code,
      message: 'Your enquiry has been successfully submitted. Our team will review your requirements and reach out promptly.',
      notifications: {
        email: emailRes,
        whatsapp: whatsappRes,
      },
    });
  } catch (err: any) {
    console.error('Enquiry submission error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error processing enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
