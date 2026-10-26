import { Resend } from 'resend';
import { Enquiry } from './types';
import { createAdminClient } from './supabase/admin';

export type NotificationResult = {
  channel: 'email' | 'whatsapp';
  success: boolean;
  message: string;
  providerId?: string;
};

// 1. Transactional Email via Resend
export async function sendEnquiryEmailNotification(enquiry: Enquiry): Promise<NotificationResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.NOTIFICATION_RECIPIENT_EMAIL || 'jmcreationinfo@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'JM Creations <onboarding@resend.dev>';

  if (!apiKey || apiKey.startsWith('re_your_')) {
    const msg = 'Email notification skipped: RESEND_API_KEY not configured in environment.';
    await logNotificationAudit('email', recipient, 'skipped', { enquiry_code: enquiry.enquiry_code }, msg);
    return {
      channel: 'email',
      success: false,
      message: msg,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipient,
      replyTo: enquiry.email,
      subject: `[New Enquiry ${enquiry.enquiry_code}] ${enquiry.full_name} — ${enquiry.service_name || 'Business Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #F4F4F5; border: 1px solid #D4AF37; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #18181B 0%, #0A0A0A 100%); padding: 24px; border-bottom: 1px solid #27272A;">
            <h1 style="color: #D4AF37; margin: 0 0 8px 0; font-size: 22px;">JM Creations — New Business Enquiry</h1>
            <p style="margin: 0; color: #A1A1AA; font-size: 14px;">Part of Jina Groups of Company Pvt. Ltd.</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA; width: 140px;">Enquiry Code:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #D4AF37;">${enquiry.enquiry_code}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Customer Name:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #FFFFFF;">${enquiry.full_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Email Address:</td>
                <td style="padding: 8px 0;"><a href="mailto:${enquiry.email}" style="color: #D4AF37;">${enquiry.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Phone Number:</td>
                <td style="padding: 8px 0;"><a href="tel:${enquiry.phone}" style="color: #D4AF37;">${enquiry.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Company Name:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${enquiry.company_name || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Service Required:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${enquiry.service_name || 'General Inquiry'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Budget Range:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${enquiry.budget_range || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #A1A1AA;">Received At:</td>
                <td style="padding: 8px 0; color: #FFFFFF;">${new Date(enquiry.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 16px; background: #18181B; border-left: 3px solid #D4AF37; border-radius: 4px;">
              <p style="margin: 0 0 6px 0; font-size: 13px; color: #D4AF37; text-transform: uppercase; font-weight: bold;">Enquiry Message:</p>
              <p style="margin: 0; white-space: pre-line; line-height: 1.5; color: #E4E4E7;">${enquiry.message}</p>
            </div>
          </div>
          <div style="padding: 16px 24px; background: #121214; border-top: 1px solid #27272A; text-align: center; font-size: 12px; color: #71717A;">
            This notification was generated automatically from the JM Creations website contact portal.
          </div>
        </div>
      `,
    });

    if (error) {
      const errMessage = `Resend delivery failed: ${error.message}`;
      await logNotificationAudit('email', recipient, 'failed', { error }, errMessage);
      return { channel: 'email', success: false, message: errMessage };
    }

    const okMsg = `Email sent successfully to ${recipient} (Resend ID: ${data?.id})`;
    await logNotificationAudit('email', recipient, 'sent', { id: data?.id }, okMsg);
    return { channel: 'email', success: true, message: okMsg, providerId: data?.id };
  } catch (err: any) {
    const errText = `Email dispatch exception: ${err.message || err}`;
    await logNotificationAudit('email', recipient, 'failed', { error: errText }, errText);
    return { channel: 'email', success: false, message: errText };
  }
}

// 2. WhatsApp Notification via WhatsApp Business Cloud API
export async function sendEnquiryWhatsAppNotification(enquiry: Enquiry): Promise<NotificationResult> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipientNumber = process.env.WHATSAPP_RECIPIENT_NUMBER || '919042986355';

  if (!token || !phoneNumberId || token.startsWith('EAAG...')) {
    const msg = 'WhatsApp API notification skipped: WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID not configured.';
    await logNotificationAudit('whatsapp', recipientNumber, 'skipped', { enquiry_code: enquiry.enquiry_code }, msg);
    return {
      channel: 'whatsapp',
      success: false,
      message: msg,
    };
  }

  try {
    const payload = {
      messaging_product: 'whatsapp',
      to: recipientNumber.replace(/[^0-9]/g, ''),
      type: 'text',
      text: {
        body: `*New JM Creations Enquiry [${enquiry.enquiry_code}]*\n\n` +
          `*Name:* ${enquiry.full_name}\n` +
          `*Phone:* ${enquiry.phone}\n` +
          `*Email:* ${enquiry.email}\n` +
          `*Company:* ${enquiry.company_name || 'N/A'}\n` +
          `*Service:* ${enquiry.service_name || 'General'}\n` +
          `*Budget:* ${enquiry.budget_range || 'N/A'}\n\n` +
          `*Message:*\n${enquiry.message}`,
      },
    };

    const res = await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      const errDetail = data.error?.message || res.statusText;
      const failMsg = `WhatsApp Cloud API error: ${errDetail}`;
      await logNotificationAudit('whatsapp', recipientNumber, 'failed', data, failMsg);
      return { channel: 'whatsapp', success: false, message: failMsg };
    }

    const msgId = data.messages?.[0]?.id;
    const successMsg = `WhatsApp alert delivered to +${recipientNumber} (Message ID: ${msgId})`;
    await logNotificationAudit('whatsapp', recipientNumber, 'sent', data, successMsg);
    return { channel: 'whatsapp', success: true, message: successMsg, providerId: msgId };
  } catch (err: any) {
    const errText = `WhatsApp Cloud API dispatch exception: ${err.message || err}`;
    await logNotificationAudit('whatsapp', recipientNumber, 'failed', { error: errText }, errText);
    return { channel: 'whatsapp', success: false, message: errText };
  }
}

// 3. Notification Audit Trail Logger
async function logNotificationAudit(
  channel: 'email' | 'whatsapp',
  recipient: string,
  status: 'sent' | 'failed' | 'skipped',
  payload: any,
  responseMessage: string
) {
  try {
    const admin = createAdminClient();
    if (admin) {
      await admin.from('notification_logs').insert([
        {
          channel,
          recipient,
          status,
          payload,
          response_message: responseMessage,
          created_at: new Date().toISOString(),
        },
      ]);
    }
  } catch (err) {
    // Non-blocking logger
  }
}
