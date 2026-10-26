import http from 'http';

const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('🚀 Running JM Creations Full-Stack Verification Suite...\n');
  let failures = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`Testing: ${name}... `);
      await fn();
      console.log('✅ PASS');
    } catch (err) {
      console.log('❌ FAIL');
      console.error('   Error:', err.message);
      failures++;
    }
  }

  // Helper fetcher
  const api = async (path, options = {}) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    const data = await res.json().catch(() => ({}));
    return { status: res.status, ok: res.ok, data };
  };

  // 1. Submit Enquiry API
  let createdEnquiryCode = '';
  let createdEnquiryId = '';

  await test('POST /api/enquiries (Contact Form Submission & Database Write)', async () => {
    const res = await api('/api/enquiries', {
      method: 'POST',
      body: JSON.stringify({
        full_name: 'Test Client Verification',
        email: 'test@verification.com',
        phone: '+91 90429 86355',
        company_name: 'Apex Industrial Solutions',
        service_name: 'Lead Generation',
        budget_range: '₹50,000 – ₹1,00,000',
        message: 'Comprehensive verification test for JM Creations full-stack business portal.',
      }),
    });

    if (!res.ok || !res.data.success) {
      throw new Error(`Failed to submit enquiry: ${JSON.stringify(res.data)}`);
    }

    if (!res.data.enquiry_code) {
      throw new Error('No enquiry_code returned');
    }

    createdEnquiryCode = res.data.enquiry_code;
    console.log(`[Code: ${createdEnquiryCode}]`);
  });

  // 2. Anti-spam honeypot
  await test('POST /api/enquiries (Spam Honeypot Handling)', async () => {
    const res = await api('/api/enquiries', {
      method: 'POST',
      body: JSON.stringify({
        full_name: 'Spam Bot',
        email: 'spam@bot.com',
        phone: '12345678',
        message: 'Spam test',
        website_url_honeypot: 'http://spam-link.com',
      }),
    });

    if (!res.ok || !res.data.success) {
      throw new Error('Honeypot did not return friendly success');
    }
  });

  // 3. Analytics Tracking API
  await test('POST /api/analytics (First-Party Interaction Logging)', async () => {
    const res = await api('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        event_name: 'whatsapp_click',
        event_category: 'conversion',
        page_path: '/services',
        page_title: 'Our Services | JM Creations',
      }),
    });

    if (!res.ok || !res.data.success) {
      throw new Error(`Failed to log analytics: ${JSON.stringify(res.data)}`);
    }
  });

  // 4. Admin Enquiries API
  await test('GET /api/admin/enquiries (CRM Inbound Retrieval)', async () => {
    const res = await api('/api/admin/enquiries');
    if (!res.ok || !res.data.success || !Array.isArray(res.data.data)) {
      throw new Error(`Failed to retrieve enquiries: ${JSON.stringify(res.data)}`);
    }

    const found = res.data.data.find((e) => e.enquiry_code === createdEnquiryCode);
    if (!found) {
      throw new Error(`Created enquiry ${createdEnquiryCode} not found in database records`);
    }
    createdEnquiryId = found.id;
  });

  // 5. Admin Enquiry Status Update
  await test('PATCH /api/admin/enquiries (Update Lifecycle Status to Contacted)', async () => {
    const res = await api('/api/admin/enquiries', {
      method: 'PATCH',
      body: JSON.stringify({
        id: createdEnquiryId,
        status: 'Contacted',
      }),
    });

    if (!res.ok || !res.data.success) {
      throw new Error(`Failed to update status: ${JSON.stringify(res.data)}`);
    }
  });

  // 6. Admin Add Note
  await test('POST /api/admin/enquiries (Add Internal CRM Note)', async () => {
    const res = await api('/api/admin/enquiries', {
      method: 'POST',
      body: JSON.stringify({
        enquiry_id: createdEnquiryId,
        note: 'Customer contacted via telephone. Requirement scoping session scheduled.',
        author_email: 'admin@jmcreations.com',
      }),
    });

    if (!res.ok || !res.data.success || !res.data.note) {
      throw new Error(`Failed to add note: ${JSON.stringify(res.data)}`);
    }
  });

  // 7. Admin Settings Update & Persistence
  await test('PUT /api/admin/settings (Update & Persist Site Settings)', async () => {
    const res = await api('/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify({
        phone: '+91 90429 86355',
        email: 'jmcreationinfo@gmail.com',
      }),
    });

    if (!res.ok || !res.data.success) {
      throw new Error(`Failed to update settings: ${JSON.stringify(res.data)}`);
    }
  });

  // 8. Admin Analytics Summary
  await test('GET /api/admin/analytics (Summary & Metrics Computation)', async () => {
    const res = await api('/api/admin/analytics');
    if (!res.ok || !res.data.success || typeof res.data.data.totalEnquiries !== 'number') {
      throw new Error(`Invalid analytics response: ${JSON.stringify(res.data)}`);
    }
  });

  // Summary
  console.log('\n======================================================');
  if (failures === 0) {
    console.log('🎉 ALL INTEGRATION TESTS PASSED SUCCESSFULLY! (0 Failures)');
  } else {
    console.log(`⚠️ ${failures} TESTS FAILED.`);
    process.exit(1);
  }
  console.log('======================================================\n');
}

runTests();
