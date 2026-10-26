import React from 'react';
import { getEnquiries } from '@/lib/data';
import EnquiryManagerClient from './EnquiryManagerClient';

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Inbound Business Enquiries & CRM
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review prospect requirements, update lifecycle stages, and record internal consultation notes
        </p>
      </div>

      <EnquiryManagerClient initialEnquiries={enquiries} />
    </div>
  );
}
