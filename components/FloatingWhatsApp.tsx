'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
  prefillMessage?: string;
}

export default function FloatingWhatsApp({
  whatsappNumber = '919042986355',
  prefillMessage = 'Hello JM Creations, I would like to know more about your services.',
}: FloatingWhatsAppProps) {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(prefillMessage);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;

  const handleClick = async () => {
    try {
      // Fire-and-forget first party analytics log
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'whatsapp_click',
          event_category: 'conversion',
          page_path: typeof window !== 'undefined' ? window.location.pathname : '/',
          page_title: typeof document !== 'undefined' ? document.title : '',
        }),
      }).catch(() => {});

      // GA4 event if present
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'whatsapp_click', {
          event_category: 'conversion',
          event_label: 'Floating WhatsApp CTA',
        });
      }
    } catch (e) {}
  };

  return (
    <aside
      aria-label="Direct messaging contact"
      className="fixed bottom-6 right-6 z-40 flex items-center group"
    >
      {/* Tooltip Hover Label */}
      <div
        id="whatsapp-chat-desc"
        className="hidden md:block mr-3 bg-zinc-900/95 text-xs text-zinc-200 py-1.5 px-3 rounded-full border border-gold-500/30 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        Chat on WhatsApp
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/20 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        aria-label="Chat with JM Creations on WhatsApp"
        aria-describedby="whatsapp-chat-desc"
      >
        {/* Subtle Pulse Animation Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none"></span>

        <MessageCircle className="w-7 h-7 fill-white stroke-[#25D366]" />
      </a>
    </aside>
  );
}
