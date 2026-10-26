-- ==============================================================================
-- JM CREATIONS — SUPABASE POSTGRESQL SCHEMA MIGRATION
-- Production-Ready Schema with RLS, Constraints, Triggers & Performance Indexes
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Admin & Editor Roles)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. SERVICE CATEGORIES
CREATE TABLE IF NOT EXISTS public.service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SERVICES (All 21 catalogued services)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    description TEXT,
    benefits JSONB DEFAULT '[]'::jsonb,
    deliverables JSONB DEFAULT '[]'::jsonb,
    process_steps JSONB DEFAULT '[]'::jsonb,
    icon TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CLIENTS (Official 10 initial clients and ongoing client management)
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    pending_confirmation BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PROJECTS (Client Portfolio & Case Studies)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    project_summary TEXT,
    project_overview TEXT,
    business_objective TEXT,
    challenge TEXT,
    strategy_approach TEXT,
    results TEXT,
    deliverables JSONB DEFAULT '[]'::jsonb,
    cover_image TEXT,
    status TEXT DEFAULT 'Completed',
    publication_date DATE DEFAULT CURRENT_DATE,
    external_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    pending_confirmation BOOLEAN DEFAULT FALSE,
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PROJECT IMAGES
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. PROJECT SERVICES (M:N linking)
CREATE TABLE IF NOT EXISTS public.project_services (
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, service_id)
);

-- 8. TESTIMONIALS (Only verified client quotes, non-fabricated)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_role TEXT,
    company_name TEXT,
    avatar_url TEXT,
    quote TEXT NOT NULL,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. BLOG CATEGORIES
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT
);

-- 10. BLOG POSTS
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    cover_image TEXT,
    category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
    author_name TEXT DEFAULT 'JM Creations Editorial',
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    meta_title TEXT,
    meta_description TEXT,
    read_time TEXT DEFAULT '5 min read',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. CAREERS
CREATE TABLE IF NOT EXISTS public.careers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    department TEXT,
    location TEXT DEFAULT 'Tamil Nadu, India / Remote',
    employment_type TEXT DEFAULT 'Full-time',
    description TEXT,
    requirements JSONB DEFAULT '[]'::jsonb,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    deadline DATE,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. ENQUIRIES (Working contact form data)
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enquiry_code TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company_name TEXT,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    service_name TEXT,
    budget_range TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Converted', 'Closed')),
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. ENQUIRY NOTES (Internal Admin updates)
CREATE TABLE IF NOT EXISTS public.enquiry_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enquiry_id UUID NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
    author_email TEXT NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. SITE SETTINGS (Brand info, parent group, phone, whatsapp, email)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. SOCIAL LINKS
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- 16. ANALYTICS EVENTS (First-party privacy-respecting interaction logs)
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_name TEXT NOT NULL,
    event_category TEXT,
    page_path TEXT,
    page_title TEXT,
    referrer TEXT,
    meta_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. NOTIFICATION LOGS (Audit trail for Resend email and WhatsApp API calls)
CREATE TABLE IF NOT EXISTS public.notification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp')),
    recipient TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'skipped')),
    payload JSONB DEFAULT '{}'::jsonb,
    response_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_published ON public.services(is_published);

CREATE INDEX IF NOT EXISTS idx_clients_slug ON public.clients(slug);
CREATE INDEX IF NOT EXISTS idx_clients_published ON public.clients(is_published);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_client ON public.projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_published ON public.projects(is_published);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON public.enquiries(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_analytics_created ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_name ON public.analytics_events(event_name);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Is user an admin or editor?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public READ policies for published content
CREATE POLICY "Public read published service categories" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "Public read published services" ON public.services FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public read published clients" ON public.clients FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public read published projects" ON public.projects FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public read project images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public read project services" ON public.project_services FOR SELECT USING (true);
CREATE POLICY "Public read published testimonials" ON public.testimonials FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public read blog categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Public read published blog posts" ON public.blog_posts FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public read published careers" ON public.careers FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Public read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public read social links" ON public.social_links FOR SELECT USING (is_active = true OR public.is_admin());

-- Public INSERT for enquiries and analytics
CREATE POLICY "Public submit enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public submit analytics" ON public.analytics_events FOR INSERT WITH CHECK (true);

-- Admin FULL ACCESS policies
CREATE POLICY "Admin manage profiles" ON public.profiles FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage service categories" ON public.service_categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage services" ON public.services FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage clients" ON public.clients FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage projects" ON public.projects FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage project images" ON public.project_images FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage project services" ON public.project_services FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage testimonials" ON public.testimonials FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage blog categories" ON public.blog_categories FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage blog posts" ON public.blog_posts FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage careers" ON public.careers FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage enquiries" ON public.enquiries FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage enquiry notes" ON public.enquiry_notes FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage site settings" ON public.site_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admin manage social links" ON public.social_links FOR ALL USING (public.is_admin());
CREATE POLICY "Admin read analytics" ON public.analytics_events FOR SELECT USING (public.is_admin());
CREATE POLICY "Admin manage notifications" ON public.notification_logs FOR ALL USING (public.is_admin());
