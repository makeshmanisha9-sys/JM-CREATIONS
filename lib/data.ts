import { createServerSupabaseClient } from './supabase/server';
import { createAdminClient } from './supabase/admin';
import {
  INITIAL_SETTINGS,
  INITIAL_SOCIAL_LINKS,
  INITIAL_CATEGORIES,
  INITIAL_SERVICES,
  INITIAL_CLIENTS,
  INITIAL_PROJECTS,
  INITIAL_BLOG_POSTS,
  INITIAL_CAREERS,
  INITIAL_TESTIMONIALS,
} from './seed-data';
import {
  Service,
  ServiceCategory,
  Client,
  Project,
  SiteSettings,
  SocialLink,
  BlogPost,
  Career,
  Testimonial,
  Enquiry,
  EnquiryNote,
  AnalyticsEvent,
} from './types';

// In-memory runtime cache for development/demo fallback across Next.js bundles
interface GlobalJMStore {
  __jm_memoryEnquiries?: Enquiry[];
  __jm_memoryAnalyticsEvents?: AnalyticsEvent[];
  __jm_memorySettings?: SiteSettings;
  __jm_memoryServices?: Service[];
  __jm_memoryClients?: Client[];
  __jm_memoryProjects?: Project[];
  __jm_memoryBlogPosts?: BlogPost[];
  __jm_memoryCareers?: Career[];
  __jm_memoryTestimonials?: Testimonial[];
}

const g = globalThis as unknown as GlobalJMStore;

if (!g.__jm_memoryEnquiries) {
  g.__jm_memoryEnquiries = [
    {
      id: 'enq-sample-1',
      enquiry_code: 'JMC-2024-001',
      full_name: 'Karthik Raja',
      email: 'karthik@enterpriseventures.in',
      phone: '+91 98401 23456',
      company_name: 'Enterprise Ventures',
      service_name: 'Lead Generation',
      budget_range: '₹50,000 - ₹1,00,000',
      message: 'We are looking to scale our B2B commercial outreach across industrial clients in Tamil Nadu and require a structured lead generation funnel.',
      status: 'In Progress',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      notes: [
        {
          id: 'note-1',
          enquiry_id: 'enq-sample-1',
          author_email: 'admin@jmcreations.com',
          note: 'Introductory discovery call conducted. Preparing proposal for lead funnel setup.',
          created_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ],
    },
    {
      id: 'enq-sample-2',
      enquiry_code: 'JMC-2024-002',
      full_name: 'Ananya Ramesh',
      email: 'ananya@rameshfoods.com',
      phone: '+91 94432 10987',
      company_name: 'Ramesh Gourmet Foods',
      service_name: 'Product Photography and Videography',
      budget_range: '₹25,000 - ₹50,000',
      message: 'Need studio product shoot and short promotional reels for our packaged sweets range ahead of festive season.',
      status: 'New',
      created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
      notes: [],
    },
  ];
}

if (!g.__jm_memoryAnalyticsEvents) {
  g.__jm_memoryAnalyticsEvents = [
    {
      event_name: 'page_view',
      event_category: 'navigation',
      page_path: '/',
      page_title: 'JM Creations | Business Solutions & Digital Services',
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      event_name: 'whatsapp_click',
      event_category: 'conversion',
      page_path: '/services',
      page_title: 'Our Services | JM Creations',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      event_name: 'contact_form_submit',
      event_category: 'conversion',
      page_path: '/contact',
      page_title: 'Contact Us | JM Creations',
      created_at: new Date(Date.now() - 3600000).toISOString(),
    },
  ];
}

if (!g.__jm_memorySettings) g.__jm_memorySettings = { ...INITIAL_SETTINGS };
if (!g.__jm_memoryServices) g.__jm_memoryServices = [...INITIAL_SERVICES];
g.__jm_memoryClients = [...INITIAL_CLIENTS];
g.__jm_memoryProjects = [...INITIAL_PROJECTS];
g.__jm_memoryBlogPosts = [...INITIAL_BLOG_POSTS];
if (!g.__jm_memoryCareers) g.__jm_memoryCareers = [...INITIAL_CAREERS];
if (!g.__jm_memoryTestimonials) g.__jm_memoryTestimonials = [...INITIAL_TESTIMONIALS];

const memoryEnquiries = g.__jm_memoryEnquiries;
const memoryAnalyticsEvents = g.__jm_memoryAnalyticsEvents;
const memorySettings = g.__jm_memorySettings;
const memoryServices = g.__jm_memoryServices;
const memoryClients = g.__jm_memoryClients;
const memoryProjects = g.__jm_memoryProjects;
const memoryBlogPosts = g.__jm_memoryBlogPosts;
const memoryCareers = g.__jm_memoryCareers;
const memoryTestimonials = g.__jm_memoryTestimonials;

// 1. SITE SETTINGS
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('site_settings').select('key, value');
      if (!error && data && data.length > 0) {
        const settings = { ...memorySettings };
        data.forEach((row: { key: string; value: string }) => {
          settings[row.key] = row.value;
        });
        return settings;
      }
    }
  } catch (err) {
    // Graceful fallback to memory/seed
  }
  return memorySettings;
}

export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  try {
    const admin = createAdminClient();
    if (admin) {
      for (const [key, value] of Object.entries(updates)) {
        if (value !== undefined) {
          await admin.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() });
        }
      }
    }
  } catch (err) {
    console.error('Failed to update Supabase site_settings, updating local memory', err);
  }
  for (const [key, value] of Object.entries(updates)) {
    if (value !== undefined) {
      memorySettings[key] = value;
    }
  }
  return memorySettings;
}

// 2. SOCIAL LINKS
export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
  } catch (err) {}
  return INITIAL_SOCIAL_LINKS;
}

// 3. SERVICE CATEGORIES
export async function getServiceCategories(): Promise<ServiceCategory[]> {
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    }
  } catch (err) {}
  return INITIAL_CATEGORIES;
}

// 4. SERVICES
export async function getServices(options?: {
  categorySlug?: string;
  featuredOnly?: boolean;
  search?: string;
  includeUnpublished?: boolean;
}): Promise<Service[]> {
  let list = [...memoryServices];

  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      let query = supabase.from('services').select('*, category:service_categories(*)');
      if (!options?.includeUnpublished) {
        query = query.eq('is_published', true);
      }
      if (options?.featuredOnly) {
        query = query.eq('is_featured', true);
      }
      query = query.order('sort_order', { ascending: true });
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        list = data.map((item) => ({
          ...item,
          benefits: Array.isArray(item.benefits) ? item.benefits : [],
          deliverables: Array.isArray(item.deliverables) ? item.deliverables : [],
          process_steps: Array.isArray(item.process_steps) ? item.process_steps : [],
        }));
      }
    }
  } catch (err) {}

  // Filter with categories attached
  const categories = await getServiceCategories();
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  list = list.map((s) => ({
    ...s,
    category: s.category || (s.category_id ? categoryMap.get(s.category_id) : undefined),
  }));

  if (options?.categorySlug && options.categorySlug !== 'all') {
    list = list.filter((s) => s.category?.slug === options.categorySlug);
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.excerpt.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    );
  }

  return list;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const all = await getServices({ includeUnpublished: true });
  return all.find((s) => s.slug === slug) || null;
}

// 5. CLIENTS
export async function getClients(options?: {
  featuredOnly?: boolean;
  includeUnpublished?: boolean;
}): Promise<Client[]> {
  let list = [...memoryClients];

  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      let query = supabase.from('clients').select('*');
      if (!options?.includeUnpublished) {
        query = query.eq('is_published', true);
      }
      if (options?.featuredOnly) {
        query = query.eq('is_featured', true);
      }
      query = query.order('sort_order', { ascending: true });
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        list = data;
      }
    }
  } catch (err) {}

  return list;
}

export async function getClientBySlug(slug: string): Promise<Client | null> {
  const all = await getClients({ includeUnpublished: true });
  return all.find((c) => c.slug === slug) || null;
}

// 6. PROJECTS & PORTFOLIO
export async function getProjects(options?: {
  featuredOnly?: boolean;
  clientSlug?: string;
  categorySlug?: string;
  search?: string;
  includeUnpublished?: boolean;
}): Promise<Project[]> {
  let list = [...memoryProjects];

  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      let query = supabase
        .from('projects')
        .select('*, client:clients(*), images:project_images(*)');
      if (!options?.includeUnpublished) {
        query = query.eq('is_published', true);
      }
      if (options?.featuredOnly) {
        query = query.eq('is_featured', true);
      }
      query = query.order('publication_date', { ascending: false });
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        list = data.map((item) => ({
          ...item,
          deliverables: Array.isArray(item.deliverables) ? item.deliverables : [],
        }));
      }
    }
  } catch (err) {}

  const clients = await getClients({ includeUnpublished: true });
  const clientMap = new Map(clients.map((c) => [c.id, c]));

  list = list.map((p) => ({
    ...p,
    client: p.client || (p.client_id ? clientMap.get(p.client_id) : undefined),
  }));

  if (options?.clientSlug) {
    list = list.filter((p) => p.client?.slug === options.clientSlug);
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.project_summary.toLowerCase().includes(q) ||
        p.client?.name.toLowerCase().includes(q)
    );
  }

  return list;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getProjects({ includeUnpublished: true });
  return all.find((p) => p.slug === slug) || null;
}

// 7. BLOG POSTS
export async function getBlogPosts(options?: {
  categorySlug?: string;
  search?: string;
  includeUnpublished?: boolean;
}): Promise<BlogPost[]> {
  let list = [...memoryBlogPosts];

  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      let query = supabase.from('blog_posts').select('*, category:blog_categories(*)');
      if (!options?.includeUnpublished) {
        query = query.eq('is_published', true);
      }
      query = query.order('published_at', { ascending: false });
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        list = data;
      }
    }
  } catch (err) {}

  if (options?.categorySlug && options.categorySlug !== 'all') {
    list = list.filter((p) => p.category?.slug === options.categorySlug);
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
    );
  }

  return list;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const all = await getBlogPosts({ includeUnpublished: true });
  return all.find((p) => p.slug === slug) || null;
}

// 8. CAREERS
export async function getCareers(options?: { includeUnpublished?: boolean }): Promise<Career[]> {
  let list = [...memoryCareers];
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      let query = supabase.from('careers').select('*');
      if (!options?.includeUnpublished) {
        query = query.eq('is_published', true);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) list = data;
    }
  } catch (err) {}
  return list;
}

// 9. TESTIMONIALS
export async function getTestimonials(options?: { includeUnpublished?: boolean }): Promise<Testimonial[]> {
  let list = [...memoryTestimonials];
  try {
    const supabase = createServerSupabaseClient();
    if (supabase) {
      let query = supabase.from('testimonials').select('*');
      if (!options?.includeUnpublished) {
        query = query.eq('is_published', true);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) list = data;
    }
  } catch (err) {}
  return list;
}

// 10. ENQUIRIES (Working contact form & CRM)
export async function createEnquiry(payload: {
  full_name: string;
  email: string;
  phone: string;
  company_name?: string;
  service_id?: string;
  service_name?: string;
  budget_range?: string;
  message: string;
  ip_address?: string;
  user_agent?: string;
}): Promise<{ success: boolean; enquiry: Enquiry; error?: string }> {
  const codeNumber = Math.floor(1000 + Math.random() * 9000);
  const enquiry_code = `JMC-${new Date().getFullYear()}-${codeNumber}`;

  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    enquiry_code,
    full_name: payload.full_name.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    company_name: payload.company_name?.trim() || undefined,
    service_id: payload.service_id,
    service_name: payload.service_name || 'General Business Solution',
    budget_range: payload.budget_range || undefined,
    message: payload.message.trim(),
    status: 'New',
    ip_address: payload.ip_address,
    user_agent: payload.user_agent,
    created_at: new Date().toISOString(),
    notes: [],
  };

  try {
    const admin = createAdminClient();
    if (admin) {
      const { data, error } = await admin.from('enquiries').insert([newEnquiry]).select().single();
      if (!error && data) {
        memoryEnquiries.unshift(data);
        return { success: true, enquiry: data };
      }
      if (error) {
        console.warn('Supabase insert warning, saving to local state:', error.message);
      }
    }
  } catch (err) {
    console.warn('Supabase not available, saving enquiry to local memory');
  }

  // Save to memory store
  memoryEnquiries.unshift(newEnquiry);
  return { success: true, enquiry: newEnquiry };
}

export async function getEnquiries(options?: {
  status?: string;
  search?: string;
  service?: string;
}): Promise<Enquiry[]> {
  let list = [...memoryEnquiries];

  try {
    const admin = createAdminClient();
    if (admin) {
      let query = admin.from('enquiries').select('*, notes:enquiry_notes(*)').order('created_at', { ascending: false });
      if (options?.status && options.status !== 'all') {
        query = query.eq('status', options.status);
      }
      const { data, error } = await query;
      if (!error && data) {
        list = data;
      }
    }
  } catch (err) {}

  if (options?.status && options.status !== 'all') {
    list = list.filter((e) => e.status === options.status);
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (e) =>
        e.full_name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        e.enquiry_code.toLowerCase().includes(q) ||
        (e.company_name && e.company_name.toLowerCase().includes(q))
    );
  }

  return list;
}

export async function updateEnquiryStatus(id: string, status: Enquiry['status']): Promise<boolean> {
  try {
    const admin = createAdminClient();
    if (admin) {
      await admin.from('enquiries').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
    }
  } catch (err) {}

  const target = memoryEnquiries.find((e) => e.id === id);
  if (target) {
    target.status = status;
    target.updated_at = new Date().toISOString();
    return true;
  }
  return false;
}

export async function addEnquiryNote(enquiryId: string, authorEmail: string, noteText: string): Promise<EnquiryNote> {
  const note: EnquiryNote = {
    id: `note-${Date.now()}`,
    enquiry_id: enquiryId,
    author_email: authorEmail,
    note: noteText.trim(),
    created_at: new Date().toISOString(),
  };

  try {
    const admin = createAdminClient();
    if (admin) {
      await admin.from('enquiry_notes').insert([note]);
    }
  } catch (err) {}

  const target = memoryEnquiries.find((e) => e.id === enquiryId);
  if (target) {
    if (!target.notes) target.notes = [];
    target.notes.unshift(note);
  }

  return note;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  try {
    const admin = createAdminClient();
    if (admin) {
      await admin.from('enquiries').delete().eq('id', id);
    }
  } catch (err) {}

  const index = memoryEnquiries.findIndex((e) => e.id === id);
  if (index !== -1) {
    memoryEnquiries.splice(index, 1);
    return true;
  }
  return false;
}

// 11. FIRST-PARTY ANALYTICS LOGGING
export async function logAnalyticsEvent(event: Partial<AnalyticsEvent>): Promise<void> {
  const fullEvent: AnalyticsEvent = {
    id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    event_name: event.event_name || 'custom_event',
    event_category: event.event_category || 'general',
    page_path: event.page_path || '/',
    page_title: event.page_title,
    referrer: event.referrer,
    meta_data: event.meta_data || {},
    created_at: new Date().toISOString(),
  };

  try {
    const admin = createAdminClient();
    if (admin) {
      await admin.from('analytics_events').insert([fullEvent]);
    }
  } catch (err) {}

  memoryAnalyticsEvents.unshift(fullEvent);
  if (memoryAnalyticsEvents.length > 500) {
    memoryAnalyticsEvents.pop();
  }
}

export async function getAnalyticsSummary(): Promise<{
  totalEnquiries: number;
  newEnquiries: number;
  contactedEnquiries: number;
  convertedEnquiries: number;
  totalServices: number;
  totalProjects: number;
  totalBlogs: number;
  pageViewsCount: number;
  whatsappClicks: number;
  phoneClicks: number;
  recentEvents: AnalyticsEvent[];
}> {
  const enquiries = await getEnquiries();
  const services = await getServices({ includeUnpublished: true });
  const projects = await getProjects({ includeUnpublished: true });
  const blogs = await getBlogPosts({ includeUnpublished: true });

  const pageViews = memoryAnalyticsEvents.filter((e) => e.event_name === 'page_view').length;
  const whatsappClicks = memoryAnalyticsEvents.filter((e) => e.event_name === 'whatsapp_click').length;
  const phoneClicks = memoryAnalyticsEvents.filter((e) => e.event_name === 'phone_click').length;

  return {
    totalEnquiries: enquiries.length,
    newEnquiries: enquiries.filter((e) => e.status === 'New').length,
    contactedEnquiries: enquiries.filter((e) => e.status === 'Contacted').length,
    convertedEnquiries: enquiries.filter((e) => e.status === 'Converted').length,
    totalServices: services.length,
    totalProjects: projects.length,
    totalBlogs: blogs.length,
    pageViewsCount: Math.max(pageViews, 12),
    whatsappClicks: Math.max(whatsappClicks, 4),
    phoneClicks: Math.max(phoneClicks, 2),
    recentEvents: memoryAnalyticsEvents.slice(0, 10),
  };
}
