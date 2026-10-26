// ==============================================================================
// JM CREATIONS — DOMAIN TYPE DEFINITIONS
// ==============================================================================

export type ServiceCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sort_order: number;
  created_at?: string;
};

export type Service = {
  id: string;
  category_id?: string;
  category?: ServiceCategory;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  benefits: string[];
  deliverables: string[];
  process_steps: string[];
  icon?: string;
  is_featured: boolean;
  sort_order: number;
  is_published: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
  updated_at?: string;
};

export type Client = {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  website_url?: string;
  sort_order: number;
  is_published: boolean;
  is_featured: boolean;
  pending_confirmation: boolean;
  notes?: string;
  created_at?: string;
  updated_at?: string;
};

export type ProjectImage = {
  id: string;
  project_id: string;
  image_url: string;
  caption?: string;
  sort_order: number;
  created_at?: string;
};

export type Project = {
  id: string;
  client_id?: string;
  client?: Client;
  title: string;
  slug: string;
  project_summary: string;
  project_overview?: string;
  business_objective?: string;
  challenge?: string;
  strategy_approach?: string;
  results?: string;
  deliverables: string[];
  cover_image?: string;
  status: 'Completed' | 'In Progress' | 'Pending Confirmation' | string;
  publication_date?: string;
  external_url?: string;
  is_featured: boolean;
  is_published: boolean;
  pending_confirmation: boolean;
  meta_title?: string;
  meta_description?: string;
  images?: ProjectImage[];
  services?: Service[];
  created_at?: string;
  updated_at?: string;
};

export type Testimonial = {
  id: string;
  client_name: string;
  client_role?: string;
  company_name?: string;
  avatar_url?: string;
  quote: string;
  rating: number;
  is_featured: boolean;
  is_published: boolean;
  created_at?: string;
};

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  category_id?: string;
  category?: BlogCategory;
  author_name: string;
  is_published: boolean;
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  read_time: string;
  created_at?: string;
  updated_at?: string;
};

export type Career = {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  deadline?: string;
  is_published: boolean;
  created_at?: string;
};

export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed';

export type Enquiry = {
  id: string;
  enquiry_code: string;
  full_name: string;
  email: string;
  phone: string;
  company_name?: string;
  service_id?: string;
  service_name?: string;
  budget_range?: string;
  message: string;
  status: EnquiryStatus;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  updated_at?: string;
  notes?: EnquiryNote[];
};

export type EnquiryNote = {
  id: string;
  enquiry_id: string;
  author_email: string;
  note: string;
  created_at: string;
};

export type SiteSettings = {
  company_name: string;
  parent_company: string;
  parent_company_relationship: string;
  email: string;
  phone: string;
  whatsapp: string;
  whatsapp_prefill_message: string;
  office_address: string;
  hero_headline: string;
  hero_subheadline: string;
  footer_tagline: string;
  [key: string]: string | undefined;
};

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  icon?: string;
  sort_order: number;
  is_active: boolean;
};

export type AnalyticsEvent = {
  id?: string;
  event_name: string;
  event_category?: string;
  page_path: string;
  page_title?: string;
  referrer?: string;
  meta_data?: Record<string, any>;
  created_at?: string;
};
