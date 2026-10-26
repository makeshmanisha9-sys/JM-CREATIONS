# JM Creations — Official Corporate Website & Full-Stack Platform

> **A subsidiary unit of Jina Groups of Company Pvt. Ltd.**  
> *"Creative Thinking. Strategic Solutions. Measurable Growth."*

---

## 1. Executive Summary

This repository contains the complete full-stack web application and content management system for **JM Creations**, an integrated business solutions, branding, digital marketing, web development, creative production, and startup support company.

The application has been engineered to production-grade standards with strict factual integrity:
- **No simulated buttons, fabricated statistics, or mock admin panels.**
- **Real database-driven architecture** (Supabase PostgreSQL / Next.js Server Actions & API Route Handlers).
- **All 10 verified initial clients** included with exact supplied project notes.
- **Complete 21-service catalogue** with dynamic search, category filtering, structured deliverables, and dedicated individual detail pages.
- **End-to-end inquiry CRM pipeline** with spam honeypot filtering, database persistence, transaction logging, Resend email dispatch, and WhatsApp notifications.
- **Enterprise admin console** (`/admin`) with secure authentication, inquiry lifecycle tracking (New, Contacted, In Progress, Converted, Closed), internal consultation notes, content management, and first-party interaction analytics.

---

## 2. Technology Architecture

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | React Server Components, Route Handlers, Server Actions |
| **Language** | TypeScript 5 | Strict type safety across all database models & APIs |
| **Styling & UI** | Tailwind CSS & Framer Motion | Black (`#0A0A0A`), Gold (`#D4AF37`), White (`#FFFFFF`) |
| **Icons** | Lucide React | Modern, lightweight, accessible SVG icon library |
| **Database** | Supabase (PostgreSQL 15) | Relational schema, foreign keys, triggers, and Row Level Security (RLS) |
| **Auth & Security** | Supabase Auth + Session Cookies | Multi-role authorization (`admin`, `editor`) and middleware protection |
| **Transactional Email** | Resend API | HTML email notifications sent directly to `jmcreationinfo@gmail.com` |
| **WhatsApp Messaging** | WhatsApp Business Cloud API & Floating Web CTA | Pre-filled inquiries dispatched to `+91 90429 86355` |
| **Analytics** | GA4 + First-Party Event Logs | Privacy-conscious interaction logging stored in PostgreSQL |
| **Deployment** | Vercel & Supabase Cloud | Edge-optimized global deployment |

---

## 3. Initial Client Portfolio & Factual Guardrails

In strict adherence to corporate integrity, **no unverified claims, fabricated revenue statistics, or invented endorsements are published**. The initial 10 client records supplied by JM Creations are established as follows:

1. **Strisha Catering** — Lead generation and revenue-generation support initiatives.
2. **Ampiere Educational Institute** — Google Ads campaigns and shoot-based creative production.
3. **Kufo Foundations** — Lead generation activities and shoot-based promotional media shoots.
4. **Truevedha** — Early-stage business start and startup support initiatives.
5. **Gingeephotoofficial** — Instagram influencer collaboration and campaign coordination.
6. **Herbal Life** — Supplied client record; specific deliverables awaiting confirmation (clearly marked pending).
7. **O2Y** — Supplied client record; scope editable in admin console pending confirmation.
8. **Grace Speech and Hearing Aids** — Supplied client record; scope editable pending confirmation.
9. **Waymax** — Supplied client record; scope editable pending confirmation.
10. **Shevroys** — Supplied spelling preserved; deliverables editable pending confirmation.

---

## 4. Complete Catalogue of 21 Services

Categorized under 9 business divisions with dynamic routing at `/services/[slug]`:

| # | Service Name | Division Category |
| :---: | :--- | :--- |
| 1 | Business Consulting | Consulting |
| 2 | Startup Consulting | Consulting |
| 3 | Brand Identity and Logo Design | Branding and Design |
| 4 | Website Design and Development | Website and Technology |
| 5 | E-commerce Website Development | Website and Technology |
| 6 | Digital Marketing | Digital Marketing |
| 7 | Social Media Management | Digital Marketing |
| 8 | Meta Advertising (Facebook & Instagram) | Advertising |
| 9 | Google Ads | Advertising |
| 10 | Search Engine Optimization (SEO) | Digital Marketing |
| 11 | Content Creation and Copywriting | Content and Creative |
| 12 | Graphic Design | Branding and Design |
| 13 | Video Editing and Motion Graphics | Photography and Video |
| 14 | Product Photography and Videography | Photography and Video |
| 15 | WhatsApp Marketing | Digital Marketing |
| 16 | Email Marketing | Digital Marketing |
| 17 | Lead Generation | Lead Generation |
| 18 | Influencer Marketing | Advertising |
| 19 | Printing Solutions | Content and Creative |
| 20 | Event Branding and Management | Business Support |
| 21 | Business Registration and Startup Support | Business Support |

---

## 5. Quick Start (Local Development)

### Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn

### Installation Steps

```bash
# 1. Clone the repository / navigate to project root
cd jm-creations

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Supabase Database Setup & Migrations

The database schema, constraints, triggers, and Row Level Security policies are located in `supabase/migrations/001_initial_schema.sql`, and initial data is located in `supabase/seed.sql`.

### Option A: Using the Supabase Web Dashboard
1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in the Supabase dashboard.
3. Open `supabase/migrations/001_initial_schema.sql` and run the script.
4. Open `supabase/seed.sql` and run the script to populate the 21 services, 10 initial clients, case studies, categories, and settings.
5. In **Project Settings > API**, copy the `Project URL`, `anon public key`, and `service_role secret key`.
6. Add them to your `.env.local` or Vercel environment variables.

### Option B: Using the Supabase CLI
```bash
npx supabase init
npx supabase db push
npx supabase db reset # loads schema and seed automatically
```

---

## 7. Storage Bucket Setup

To support media, logo, and cover image uploads:
1. In the Supabase Dashboard, navigate to **Storage**.
2. Create the following public buckets:
   - `clients` (Allowed MIME types: `image/*`, Max file size: 5MB)
   - `portfolio` (Allowed MIME types: `image/*`, `video/*`, Max file size: 25MB)
   - `blog` (Allowed MIME types: `image/*`, Max file size: 5MB)
3. Set public access policies allowing public read access, and authenticated writes for users with `admin` role.

---

## 8. External Integrations Configuration

### 1. Transactional Email via Resend
1. Sign up at [resend.com](https://resend.com) and obtain an API key.
2. In your domain settings, verify your sending domain (e.g., `jmcreations.in`).
3. Set in `.env.local`:
   ```env
   RESEND_API_KEY=re_your_api_key
   RESEND_FROM_EMAIL="JM Creations <notifications@jmcreations.in>"
   NOTIFICATION_RECIPIENT_EMAIL=jmcreationinfo@gmail.com
   ```

### 2. WhatsApp Business Cloud API
1. Create a Meta for Developers account at [developers.facebook.com](https://developers.facebook.com).
2. Add the **WhatsApp** product to your app.
3. In WhatsApp settings, obtain your `Phone Number ID` and a system user `Access Token`.
4. Configure in `.env.local`:
   ```env
   WHATSAPP_ACCESS_TOKEN=EAAG...your_token
   WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
   WHATSAPP_RECIPIENT_NUMBER=919042986355
   ```

### 3. Google Analytics 4
1. In Google Analytics, create a GA4 Web Stream for your domain.
2. Copy the Measurement ID (format: `G-XXXXXXXXXX`).
3. Set in `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

---

## 9. Production Build & Deployment

### Production Build Verification
To test a production build locally:

```bash
npm run build
npm start
```

### Deploying to Vercel
1. Push the code to GitHub / GitLab / Bitbucket.
2. Import the project into [Vercel](https://vercel.com).
3. Under **Environment Variables**, supply all variables specified in `.env.example`.
4. Deploy. Vercel will automatically build the Next.js App Router application and deploy it to global edge servers.

### Custom Domain & SSL Configuration
1. In the Vercel dashboard, navigate to **Settings > Domains**.
2. Add your custom domain (e.g., `jmcreations.in` and `www.jmcreations.in`).
3. Configure the following DNS records at your domain registrar:
   - **A Record**: `@` pointing to `76.76.21.21`
   - **CNAME Record**: `www` pointing to `cname.vercel-dns.com`
4. Vercel automatically generates and renews a free Let's Encrypt SSL/TLS certificate.

---

## 10. Admin Portal & Staff Operations

- Access URL: `/admin/login`
- Default Credentials (Demo / Offline mode): `admin@jmcreations.com` / `admin123`
- In production, staff users can be created in the Supabase Auth panel, and assigned role `'admin'` in the `profiles` table.
- Accessible modules:
  - **Dashboard**: Real-time inquiry counts, visitor impressions, WhatsApp triggers, and recent CRM entries.
  - **Enquiries**: Lifecycle CRM pipeline (`New`, `Contacted`, `In Progress`, `Converted`, `Closed`), internal consultation notes, and deletion.
  - **Services (21)**: Manage descriptions, benefits, structured deliverables, and publication status.
  - **Portfolio**: Manage client case studies, deliverables, and featured status.
  - **Clients (10)**: Manage verified client names, unconfirmed status notes, and monograms.
  - **Blog & Careers**: Publish articles and manage hiring opportunities.
  - **Site Settings**: Live updates for company phone, WhatsApp number, prefill message, email, parent company statement, and address.

---

## 11. Security & Compliance Summary

- **Server-Side Credentials Isolation**: All API secrets (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `WHATSAPP_ACCESS_TOKEN`) are never exposed to browser clients.
- **Spam Defense**: Honeypot detection suppresses bot submissions automatically.
- **Privacy Compliance**: No private customer PII (emails, phone numbers, or inquiry text) is injected into public analytics events.
- **Row Level Security (RLS)**: Public users can only read published content and insert inquiries; administrative data and inquiry logs are strictly restricted to authenticated administrators.
