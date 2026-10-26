import React from 'react';
import { getTestimonials } from '@/lib/data';
import { MessageSquareQuote, ShieldAlert } from 'lucide-react';

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials({ includeUnpublished: true });

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Client Testimonials Management
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Store and publish verified client quotes and endorsements
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-amber-300">Corporate Integrity Policy:</span> JM Creations strictly prohibits fabricating testimonials, customer reviews, or endorsements. Only genuine, verified feedback provided directly by client representatives may be approved and published.
        </div>
      </div>

      <div className="bg-[#121214] border border-zinc-800 rounded-2xl p-12 text-center text-xs text-zinc-400 space-y-3">
        <MessageSquareQuote className="w-10 h-10 text-zinc-600 mx-auto" />
        <h2 className="text-base font-bold text-white">No Verified Testimonials Pending Approval</h2>
        <p className="max-w-md mx-auto text-zinc-400">
          As client project reviews and official quotes are authorized by clients, they can be uploaded and toggled for display on the public website.
        </p>
      </div>
    </div>
  );
}
