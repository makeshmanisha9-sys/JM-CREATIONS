'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck, Mail, MessageSquare } from 'lucide-react';
import { Service } from '@/lib/types';

interface ContactFormProps {
  services?: Service[];
  initialServiceSlug?: string;
  sourceContext?: string;
}

export default function ContactForm({ services = [], initialServiceSlug, sourceContext }: ContactFormProps) {
  // Find matching initial service if passed
  const preselected = services.find((s) => s.slug === initialServiceSlug);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    service_id: preselected?.id || '',
    service_name: preselected?.title || '',
    budget_range: '',
    message: '',
    consent: true,
    website_url_honeypot: '', // Spam bot honeypot
  });

  const [loading, setLoading] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState<{
    success: boolean;
    enquiry_code?: string;
    message?: string;
    notifications?: {
      email?: { success: boolean; message: string };
      whatsapp?: { success: boolean; message: string };
    };
    error?: string;
  } | null>(null);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const budgetOptions = [
    'Under ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹3,00,000',
    '₹3,00,000+',
    'Flexible / To be discussed',
  ];

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const found = services.find((s) => s.id === selectedId);
    setFormData((prev) => ({
      ...prev,
      service_id: selectedId,
      service_name: found ? found.title : 'General Consultation',
    }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.full_name.trim()) {
      errors.full_name = 'Full name is required.';
    } else if (formData.full_name.trim().length < 2) {
      errors.full_name = 'Please provide your complete name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid corporate or personal email address.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errors.phone = 'Please enter a valid phone or mobile number with country/area code.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide a brief description of your project or enquiry.';
    } else if (formData.message.trim().length < 8) {
      errors.message = 'Please provide at least 8 characters describing your requirement.';
    }

    if (!formData.consent) {
      errors.consent = 'Please confirm consent to be contacted regarding your enquiry.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setSubmittedResponse(null);

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source_context: sourceContext || 'contact_page',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setSubmittedResponse({
          success: false,
          error: data.error || 'Unable to submit enquiry. Please check your inputs or call us directly.',
        });
      } else {
        setSubmittedResponse(data);
        // Reset form inputs after successful write
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          company_name: '',
          service_id: '',
          service_name: '',
          budget_range: '',
          message: '',
          consent: true,
          website_url_honeypot: '',
        });
      }
    } catch (err: any) {
      setSubmittedResponse({
        success: false,
        error: 'Network connection error while connecting to server. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#121214] border border-zinc-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Subtle Gold Accent Top Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>

      {/* Success State */}
      {submittedResponse?.success ? (
        <div className="py-6 space-y-6 animate-in fade-in duration-300">
          <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">Enquiry Successfully Logged</h3>
            <p className="text-zinc-300 text-sm max-w-md mx-auto">
              Your inquiry has been stored in our system under reference code:
            </p>
            <div className="inline-block px-4 py-1.5 bg-zinc-900 border border-gold-500/30 rounded-full font-mono text-gold-400 font-bold text-sm tracking-wider">
              {submittedResponse.enquiry_code}
            </div>
          </div>

          {/* Transparent Notification Status Diagnostics */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 text-xs space-y-3 max-w-lg mx-auto">
            <div className="font-semibold text-zinc-300 uppercase tracking-wider text-[11px] pb-1 border-b border-zinc-800">
              System Dispatch Status
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0"></span>
              <div className="text-zinc-300">
                <span className="font-medium text-white">Database Record:</span> Successfully written to database.
              </div>
            </div>

            {submittedResponse.notifications?.email && (
              <div className="flex items-start gap-2.5">
                <Mail className="w-3.5 h-3.5 text-gold-500 mt-0.5 shrink-0" />
                <div className="text-zinc-300">
                  <span className="font-medium text-white">Email Notification (jmcreationinfo@gmail.com):</span>{' '}
                  <span className={submittedResponse.notifications.email.success ? 'text-emerald-400' : 'text-zinc-400'}>
                    {submittedResponse.notifications.email.message}
                  </span>
                </div>
              </div>
            )}

            {submittedResponse.notifications?.whatsapp && (
              <div className="flex items-start gap-2.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <div className="text-zinc-300">
                  <span className="font-medium text-white">WhatsApp Business Alert (+91 90429 86355):</span>{' '}
                  <span className={submittedResponse.notifications.whatsapp.success ? 'text-emerald-400' : 'text-zinc-400'}>
                    {submittedResponse.notifications.whatsapp.message}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setSubmittedResponse(null)}
              className="text-xs text-gold-400 hover:text-gold-300 underline underline-offset-4"
            >
              Submit another project enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot anti-spam field (hidden from real users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_url_honeypot">Leave blank</label>
            <input
              type="text"
              id="website_url_honeypot"
              name="website_url_honeypot"
              value={formData.website_url_honeypot}
              onChange={(e) => setFormData({ ...formData, website_url_honeypot: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {submittedResponse?.error && (
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span>{submittedResponse.error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label htmlFor="full_name" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                Full Name <span className="text-gold-500">*</span>
              </label>
              <input
                type="text"
                id="full_name"
                name="name"
                autoComplete="name"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                aria-invalid={!!fieldErrors.full_name}
                aria-describedby={fieldErrors.full_name ? 'err-full_name' : undefined}
                placeholder="e.g. Anand Kumar"
                className={`w-full px-4 py-3 bg-zinc-900 border rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-colors ${
                  fieldErrors.full_name ? 'border-red-500/80 bg-red-950/10' : 'border-zinc-800 focus:border-gold-500'
                }`}
              />
              {fieldErrors.full_name && (
                <p id="err-full_name" className="text-red-400 text-xs mt-1.5">
                  {fieldErrors.full_name}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                Work Email <span className="text-gold-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? 'err-email' : undefined}
                placeholder="name@company.com"
                className={`w-full px-4 py-3 bg-zinc-900 border rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-colors ${
                  fieldErrors.email ? 'border-red-500/80 bg-red-950/10' : 'border-zinc-800 focus:border-gold-500'
                }`}
              />
              {fieldErrors.email && (
                <p id="err-email" className="text-red-400 text-xs mt-1.5">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                Phone / WhatsApp <span className="text-gold-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="tel"
                autoComplete="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={fieldErrors.phone ? 'err-phone' : undefined}
                placeholder="+91 98765 43210"
                className={`w-full px-4 py-3 bg-zinc-900 border rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-colors ${
                  fieldErrors.phone ? 'border-red-500/80 bg-red-950/10' : 'border-zinc-800 focus:border-gold-500'
                }`}
              />
              {fieldErrors.phone && (
                <p id="err-phone" className="text-red-400 text-xs mt-1.5">
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            {/* Company / Business Name */}
            <div>
              <label htmlFor="company_name" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                Company / Enterprise Name
              </label>
              <input
                type="text"
                id="company_name"
                name="organization"
                autoComplete="organization"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                placeholder="e.g. Enterprise Ltd"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
              />
            </div>

            {/* Service of Interest */}
            <div>
              <label htmlFor="service_id" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                Primary Service Required
              </label>
              <select
                id="service_id"
                value={formData.service_id}
                onChange={handleServiceChange}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
              >
                <option value="">Select a solution or service</option>
                {services.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.title}
                  </option>
                ))}
                <option value="other">Other / Custom Integrated Package</option>
              </select>
            </div>

            {/* Estimated Budget */}
            <div>
              <label htmlFor="budget_range" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
                Estimated Budget Range (Optional)
              </label>
              <select
                id="budget_range"
                value={formData.budget_range}
                onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 transition-colors"
              >
                <option value="">Select approximate budget</option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Project Details / Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
              Project Description & Goals <span className="text-gold-500">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? 'err-message' : undefined}
              placeholder="Tell us about your business objectives, target audience, timeline, or current challenges..."
              className={`w-full px-4 py-3 bg-zinc-900 border rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-colors ${
                fieldErrors.message ? 'border-red-500/80 bg-red-950/10' : 'border-zinc-800 focus:border-gold-500'
              }`}
            ></textarea>
            {fieldErrors.message && (
              <p id="err-message" className="text-red-400 text-xs mt-1.5">
                {fieldErrors.message}
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="w-4 h-4 mt-0.5 rounded border-zinc-700 bg-zinc-900 text-gold-500 focus:ring-gold-500 focus:ring-offset-zinc-900"
            />
            <label htmlFor="consent" className="text-xs text-zinc-400 leading-normal select-none">
              I agree to allow JM Creations to contact me regarding this enquiry via email or phone/WhatsApp.
            </label>
          </div>
          {fieldErrors.consent && <p className="text-red-400 text-xs">{fieldErrors.consent}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-wider text-xs shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Recording Enquiry & Notifying Team...</span>
              </>
            ) : (
              <>
                <span>Submit Business Enquiry</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-center text-[11px] text-zinc-400">
            Official communications dispatched to <span className="text-zinc-300">jmcreationinfo@gmail.com</span>. We respect your confidentiality.
          </p>
        </form>
      )}
    </div>
  );
}
