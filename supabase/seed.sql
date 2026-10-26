-- ==============================================================================
-- JM CREATIONS — SEED DATA SCRIPT
-- Populates 21 Services, 10 Initial Clients, Initial Case Studies, Site Settings & Categories
-- ==============================================================================

-- 1. SITE SETTINGS
INSERT INTO public.site_settings (key, value, description) VALUES
('company_name', 'JM Creations', 'Official Brand Name'),
('parent_company', 'Jina Groups of Company Pvt. Ltd.', 'Parent Holding Group'),
('parent_company_relationship', 'JM Creations is part of Jina Groups of Company Pvt. Ltd., providing integrated business, creative, and digital solutions to help businesses establish, grow, and scale their presence.', 'Official parent company affiliation statement'),
('email', 'jmcreationinfo@gmail.com', 'Official enquiry and communications email'),
('phone', '+91 90429 86355', 'Official contact phone number'),
('whatsapp', '+91 90429 86355', 'Official WhatsApp Business number'),
('whatsapp_prefill_message', 'Hello JM Creations, I would like to know more about your services.', 'Standard WhatsApp inquiry prompt'),
('office_address', 'To be provided later.', 'Physical office and correspondence address'),
('hero_headline', 'Creative Thinking. Strategic Solutions. Measurable Growth.', 'Homepage hero banner headline'),
('hero_subheadline', 'JM Creations delivers integrated business and digital solutions, combining strategy, branding, web development, digital marketing, and creative production to help businesses build their identity and reach their goals.', 'Homepage hero supporting description'),
('footer_tagline', 'Integrated business, creative, and digital solutions engineered for sustainable growth.', 'Footer summary text')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 2. SOCIAL LINKS
INSERT INTO public.social_links (platform, url, icon, sort_order, is_active) VALUES
('Instagram', 'https://www.instagram.com/j_m__creation', 'instagram', 1, true),
('LinkedIn', 'https://www.linkedin.com/in/jm-creations-971a43423', 'linkedin', 2, true),
('Facebook', 'https://www.facebook.com/share/19FRBKVjDX/', 'facebook', 3, true);

-- 3. SERVICE CATEGORIES
INSERT INTO public.service_categories (id, name, slug, description, sort_order) VALUES
('11111111-1111-1111-1111-000000000001', 'Consulting', 'consulting', 'Strategic advisory and business roadmap development for startups and established enterprises.', 1),
('11111111-1111-1111-1111-000000000002', 'Branding and Design', 'branding-and-design', 'High-impact corporate visual identity, logos, and cohesive brand systems.', 2),
('11111111-1111-1111-1111-000000000003', 'Website and Technology', 'website-and-technology', 'Custom web engineering, responsive corporate portals, and high-performance digital platforms.', 3),
('11111111-1111-1111-1111-000000000004', 'Digital Marketing', 'digital-marketing', 'Data-informed campaigns, search optimization, and omnichannel digital visibility.', 4),
('11111111-1111-1111-1111-000000000005', 'Advertising', 'advertising', 'Paid performance advertising across Meta, Google, and targeted influencer networks.', 5),
('11111111-1111-1111-1111-000000000006', 'Content and Creative', 'content-and-creative', 'Compelling copywriting, graphic design, and print collaterals that command attention.', 6),
('11111111-1111-1111-1111-000000000007', 'Photography and Video', 'photography-and-video', 'Studio and on-location product photography, video production, and motion graphics.', 7),
('11111111-1111-1111-1111-000000000008', 'Lead Generation', 'lead-generation', 'Targeted B2B and B2C sales pipeline acceleration and qualified customer acquisition.', 8),
('11111111-1111-1111-1111-000000000009', 'Business Support', 'business-support', 'End-to-end startup registration, trade compliance, and corporate event management.', 9)
ON CONFLICT (slug) DO NOTHING;

-- 4. ALL 21 SERVICES
INSERT INTO public.services (id, category_id, title, slug, excerpt, description, benefits, deliverables, process_steps, icon, is_featured, sort_order, is_published, meta_title, meta_description) VALUES
(
  '22222222-2222-2222-2222-000000000001',
  '11111111-1111-1111-1111-000000000001',
  'Business Consulting',
  'business-consulting',
  'Actionable business diagnostics, strategic roadmap planning, and operational alignment for competitive market positioning.',
  'JM Creations delivers comprehensive business consulting tailored to enterprise goals and emerging ventures. We analyze internal structures, market opportunities, and commercial bottlenecks to engineer structured growth pathways.',
  '["Strategic clarity and roadmap definition", "Operational bottleneck resolution", "Market positioning alignment", "Scalable business model structuring"]'::jsonb,
  '["Diagnostic report and operational review", "Quarterly strategic execution roadmap", "Revenue model assessment", "Executive briefing sessions"]'::jsonb,
  '["Discovery and business audit", "Strategic formulation", "Execution milestone planning", "Review and optimization"]'::jsonb,
  'Briefcase',
  true,
  1,
  true,
  'Business Consulting Services | JM Creations',
  'Professional business consulting, strategy formulation, and operational guidance from JM Creations.'
),
(
  '22222222-2222-2222-2222-000000000002',
  '11111111-1111-1111-1111-000000000001',
  'Startup Consulting',
  'startup-consulting',
  'Early-stage incubation advisory, business model validation, and structured guidance from concept to commercial launch.',
  'Launching a new venture requires structured preparation. JM Creations provides hands-on startup consulting covering market validation, initial service offerings, go-to-market planning, and commercial readiness.',
  '["Risk reduction during launch phase", "Clear value proposition formulation", "Cost-effective market entry strategy", "Investor and stakeholder readiness"]'::jsonb,
  '["Startup feasibility analysis", "Go-to-market action plan", "Service matrix definition", "Founders advisory roadmap"]'::jsonb,
  '["Concept validation", "Business model design", "Launch preparation", "Post-launch milestone tracking"]'::jsonb,
  'Rocket',
  true,
  2,
  true,
  'Startup Consulting & Launch Advisory | JM Creations',
  'Guiding emerging entrepreneurs and new business initiatives from ideation to scalable market operations.'
),
(
  '22222222-2222-2222-2222-000000000003',
  '11111111-1111-1111-1111-000000000002',
  'Brand Identity and Logo Design',
  'brand-identity-and-logo-design',
  'Iconic visual identities, logo architecture, typography, and cohesive brand guideline systems.',
  'A memorable brand begins with visual distinction. We construct distinctive brand identities that reflect your business values and resonate with your target clientele across digital and physical touchpoints.',
  '["Memorable visual market presence", "Consistent customer touchpoints", "Scalable vector asset library", "Comprehensive brand identity guidelines"]'::jsonb,
  '["Primary and secondary logo marks", "Brand style guide and color palette", "Typography pairings", "Stationery and digital asset kit"]'::jsonb,
  '["Brand discovery and visual moodboard", "Concept sketching and iterations", "Refinement and vector drafting", "Asset package and brand book handoff"]'::jsonb,
  'Palette',
  true,
  3,
  true,
  'Brand Identity & Logo Design | JM Creations',
  'Distinctive logo design and corporate identity systems engineered for lasting impression.'
),
(
  '22222222-2222-2222-2222-000000000004',
  '11111111-1111-1111-1111-000000000003',
  'Website Design and Development',
  'website-design-and-development',
  'Modern, responsive, high-performance corporate websites built with cutting-edge web engineering.',
  'Your website is your premier digital asset. We engineer fast, responsive, and secure websites optimized for search engines, brand credibility, and seamless user experiences across all devices.',
  '["Lightning-fast load performance", "100% mobile-first responsive layout", "Built-in search engine optimization", "Intuitive content management capability"]'::jsonb,
  '["Full responsive web application", "Custom CMS integration", "Contact and lead capture workflows", "SSL and production deployment setup"]'::jsonb,
  '["Architecture and wireframing", "UI/UX design prototype", "Full-stack development and testing", "Launch and ongoing maintenance support"]'::jsonb,
  'Code',
  true,
  4,
  true,
  'Website Design & Development | JM Creations',
  'Custom corporate websites and web applications engineered for speed, security, and conversion.'
),
(
  '22222222-2222-2222-2222-000000000005',
  '11111111-1111-1111-1111-000000000003',
  'E-commerce Website Development',
  'ecommerce-website-development',
  'Robust digital storefronts with secure payment gateway integration, inventory tracking, and smooth checkout.',
  'Accelerate digital retail operations with our tailored e-commerce platforms. From product catalog management to frictionless payment gateways, we build storefronts focused on customer retention and transactional reliability.',
  '["Streamlined checkout flows", "Multi-payment gateway support", "Real-time inventory and order management", "Automated customer email notifications"]'::jsonb,
  '["Custom e-commerce store setup", "Payment gateway integration", "Product taxonomy and catalog upload", "Admin order management dashboard"]'::jsonb,
  '["Storefront architecture", "UX design and catalog structuring", "Checkout and gateway integration", "Payment testing and store go-live"]'::jsonb,
  'ShoppingCart',
  false,
  5,
  true,
  'E-commerce Development Solutions | JM Creations',
  'Scalable, secure digital commerce platforms built to elevate your online retail revenue.'
),
(
  '22222222-2222-2222-2222-000000000006',
  '11111111-1111-1111-1111-000000000004',
  'Digital Marketing',
  'digital-marketing',
  'Comprehensive 360-degree digital marketing solutions driving awareness, customer acquisition, and brand engagement.',
  'We coordinate omnichannel digital strategies that amplify your brand presence. By harmonizing organic distribution, content, and conversion optimization, we connect your business with ready buyers.',
  '["Holistic digital presence across channels", "Consistent audience acquisition", "Clear KPI tracking and performance metrics", "Audience retention and nurturing"]'::jsonb,
  '["Monthly digital marketing roadmap", "Campaign performance reporting", "Channel-specific creative assets", "Audience demographic insights"]'::jsonb,
  '["Market and competitive analysis", "Channel strategy development", "Campaign rollout and management", "Continuous metric tracking"]'::jsonb,
  'TrendingUp',
  true,
  6,
  true,
  'Digital Marketing Services | JM Creations',
  'End-to-end digital marketing strategies designed to expand reach and cultivate qualified business opportunities.'
),
(
  '22222222-2222-2222-2222-000000000007',
  '11111111-1111-1111-1111-000000000004',
  'Social Media Management',
  'social-media-management',
  'Strategic content planning, feed curation, audience engagement, and community building across major social platforms.',
  'Maintain an active, polished corporate persona across Instagram, LinkedIn, and Facebook. We design high-quality social posts, manage publishing calendars, and foster meaningful community conversations.',
  '["Consistent brand voice and aesthetic", "Active community engagement", "Scheduled content calendars", "Time saved for core business tasks"]'::jsonb,
  '["Monthly content editorial calendar", "Custom designed social graphics and reels", "Copywriting with strategic hashtags", "Monthly engagement audit"]'::jsonb,
  '["Brand tone and audience assessment", "Content theme and calendar planning", "Asset creation and approval", "Publishing and community monitoring"]'::jsonb,
  'Share2',
  false,
  7,
  true,
  'Social Media Management | JM Creations',
  'Professional social media curation and audience engagement across leading digital platforms.'
),
(
  '22222222-2222-2222-2222-000000000008',
  '11111111-1111-1111-1111-000000000005',
  'Meta Advertising — Facebook and Instagram',
  'meta-advertising-facebook-and-instagram',
  'High-precision targeted paid campaigns across Meta ecosystems driving leads, traffic, and sales.',
  'Leverage advanced demographic, interest, and behavioral targeting on Facebook and Instagram. We craft conversion-focused ad creatives, test audience segments, and optimize campaigns for maximum ROAS.',
  '["Laser-focused audience targeting", "Creative ad formats including reels and carousels", "Pixel and conversion tracking setup", "Budget efficiency and ongoing optimization"]'::jsonb,
  '["Meta Ads Manager account configuration", "Custom audience and pixel integration", "Creative ad sets and copy variations", "Performance analytics dashboard"]'::jsonb,
  '["Audience research and campaign structure", "Ad creative and copy production", "Live campaign launch and A/B testing", "Scaling winning ad sets"]'::jsonb,
  'Target',
  true,
  8,
  true,
  'Meta Advertising: Facebook & Instagram Ads | JM Creations',
  'Data-driven Meta advertising campaigns engineered to capture qualified leads and drive conversions.'
),
(
  '22222222-2222-2222-2222-000000000009',
  '11111111-1111-1111-1111-000000000005',
  'Google Ads',
  'google-ads',
  'Intent-driven search, display, and performance max campaigns targeting customers actively looking for your solutions.',
  'Capture high-intent prospects precisely when they search for your products or services. We manage Google Search, Display, and Performance Max campaigns with disciplined keyword bidding and negative keyword filtering.',
  '["Immediate visibility for commercial keywords", "High-intent buyer traffic", "Transparent cost-per-click management", "Conversion tracking across forms and phone calls"]'::jsonb,
  '["Google Ads campaign architecture", "Keyword research and match type setup", "High-converting ad copy and extensions", "Weekly bid adjustments and search term reports"]'::jsonb,
  '["Keyword and competitor audit", "Campaign setup and conversion tag linking", "Launch and bid calibration", "Continuous negative keyword expansion"]'::jsonb,
  'Globe',
  true,
  9,
  true,
  'Google Ads Campaign Management | JM Creations',
  'Targeted Google Search and Display advertising to capture high-intent commercial demand.'
),
(
  '22222222-2222-2222-2222-000000000010',
  '11111111-1111-1111-1111-000000000004',
  'Search Engine Optimization',
  'search-engine-optimization',
  'Technical, on-page, and local SEO strategies to build sustainable organic search prominence on Google.',
  'Establish long-term organic authority. Our SEO methodology integrates technical site architecture, keyword-optimized content, structured schema markup, and Google Business Profile optimization for local prominence.',
  '["Sustainable organic search traffic", "Improved domain authority and credibility", "Higher quality organic leads without ad spend", "Enhanced local search ranking in maps"]'::jsonb,
  '["Technical SEO audit and fix checklist", "Keyword research and content mapping", "On-page title, meta, and schema markup", "Monthly organic ranking report"]'::jsonb,
  '["Comprehensive site and technical crawl", "Keyword and content gap analysis", "On-page and technical implementation", "Monitoring indexation and search console trends"]'::jsonb,
  'Search',
  false,
  10,
  true,
  'Search Engine Optimization (SEO) | JM Creations',
  'Organic search optimization and technical SEO to build lasting visibility in Google search results.'
),
(
  '22222222-2222-2222-2222-000000000011',
  '11111111-1111-1111-1111-000000000006',
  'Content Creation and Copywriting',
  'content-creation-and-copywriting',
  'Persuasive corporate copywriting, case study documentation, articles, and brand storytelling.',
  'Words that articulate your value and motivate action. Our copywriting spans website content, marketing collateral, business proposals, and editorial articles that communicate authority and professionalism.',
  '["Clear, persuasive corporate messaging", "Brand tone aligned with decision-makers", "SEO-informed editorial content", "Higher engagement and conversion rates"]'::jsonb,
  '["Website landing page copy", "Corporate capability brochures", "SEO articles and company announcements", "Sales deck copy and email templates"]'::jsonb,
  '["Tone of voice workshop", "Drafting and messaging hierarchy", "Client review and editing rounds", "Final copy sign-off and publication"]'::jsonb,
  'FileText',
  false,
  11,
  true,
  'Content Creation & Copywriting | JM Creations',
  'Impactful corporate copywriting and content strategies that engage audiences and drive decisions.'
),
(
  '22222222-2222-2222-2222-000000000012',
  '11111111-1111-1111-1111-000000000002',
  'Graphic Design',
  'graphic-design',
  'High-end visual collaterals, digital banners, presentation decks, and marketing media.',
  'Elevate your brand presentation with refined design. We produce crisp marketing materials, infographics, exhibition banners, and investor pitch decks adhering to strict corporate branding standards.',
  '["Polished visual consistency", "Fast turnaround for campaign requirements", "High-resolution print and screen files", "Clear visual communication of complex ideas"]'::jsonb,
  '["Digital ad creative suites", "Brochures, flyers, and corporate stationery", "Presentation slide decks and pitch kits", "Exhibition backdrops and standee designs"]'::jsonb,
  '["Design brief and requirement gathering", "Conceptual draft presentations", "Feedback implementation", "Delivery of production-ready vector assets"]'::jsonb,
  'Layout',
  false,
  12,
  true,
  'Professional Graphic Design Services | JM Creations',
  'Creative graphic design for digital and print media, tailored to corporate identity standards.'
),
(
  '22222222-2222-2222-2222-000000000013',
  '11111111-1111-1111-1111-000000000007',
  'Video Editing and Motion Graphics',
  'video-editing-and-motion-graphics',
  'Dynamic corporate videos, promo reels, motion title sequences, and explainer animations.',
  'Visual storytelling through motion. We assemble raw footage into engaging corporate films, high-energy promotional reels, and informative motion graphics optimized for social distribution and web presentation.',
  '["Higher viewer retention and social engagement", "Professional sound design and color grading", "Custom animated logo stingers and lower thirds", "Platform-specific video aspect ratios"]'::jsonb,
  '["Edited promotional and brand videos", "Social reels and short-form video assets", "Animated motion graphics and infographics", "Full-HD and 4K exported master files"]'::jsonb,
  '["Footage review and storyboarding", "Rough cut assembly and pacing", "Color grading, audio mixing, and motion typography", "Final render delivery"]'::jsonb,
  'Film',
  true,
  13,
  true,
  'Video Editing & Motion Graphics | JM Creations',
  'Captivating video production, editing, and motion design engineered for modern digital audiences.'
),
(
  '22222222-2222-2222-2222-000000000014',
  '11111111-1111-1111-1111-000000000007',
  'Product Photography and Videography',
  'product-photography-and-videography',
  'Studio-grade product photography, commercial shoots, and on-location corporate visual production.',
  'Showcase your offerings with crisp, professional imagery. We conduct commercial photography and video shoots highlighting product aesthetics, craftsmanship, and business premises for catalog and marketing use.',
  '["High-resolution commercial imagery", "Studio lighting and backdrop staging", "Retouched, ready-for-print catalog photos", "Compelling visual trust for prospective buyers"]'::jsonb,
  '["Studio and on-site photo shoot session", "Fully retouched commercial image files", "E-commerce white-background product angles", "Behind-the-scenes and lifestyle action shots"]'::jsonb,
  '["Pre-production shoot planning and shot list", "Execution of photography and video shoot", "Image culling, color correction, and retouching", "Secure digital gallery delivery"]'::jsonb,
  'Camera',
  true,
  14,
  true,
  'Product Photography & Videography | JM Creations',
  'High-impact commercial photography and videography for corporate catalogues and marketing campaigns.'
),
(
  '22222222-2222-2222-2222-000000000015',
  '11111111-1111-1111-1111-000000000004',
  'WhatsApp Marketing',
  'whatsapp-marketing',
  'Direct customer broadcast campaigns, automated enquiry workflows, and conversational lead nurturing.',
  'Engage your audience on the platform they use every day. We structure WhatsApp Business communication strategies, verified message templates, and automated responder flows for rapid customer inquiry resolution.',
  '["High open and response rates", "Direct, personalized customer interaction", "Rapid response times for inbound enquiries", "Official WhatsApp Business API compliance"]'::jsonb,
  '["WhatsApp Business API setup and template approval", "Automated welcome and FAQ sequences", "Targeted customer broadcast campaign setup", "Delivery and read receipt metrics"]'::jsonb,
  '["Audience segmentation and list sanitization", "Message template drafting and submission", "Automation logic configuration", "Campaign dispatch and response handling"]'::jsonb,
  'MessageSquare',
  false,
  15,
  true,
  'WhatsApp Marketing Solutions | JM Creations',
  'Conversational WhatsApp marketing and automated customer interaction for rapid inquiry handling.'
),
(
  '22222222-2222-2222-2222-000000000016',
  '11111111-1111-1111-1111-000000000004',
  'Email Marketing',
  'email-marketing',
  'Targeted email newsletters, automated drip sequences, and B2B client re-engagement campaigns.',
  'Cultivate long-term client relationships. We design professional HTML email templates, write engaging copy, and set up automated sequences that keep your brand top-of-mind with prospects and existing customers.',
  '["Direct owned-channel communication", "Automated lead nurturing sequences", "Segmented campaigns based on customer lifecycle", "Detailed open, click, and bounce analytics"]'::jsonb,
  '["Responsive branded email templates", "Drip sequence and onboarding workflows", "Broadcast newsletter design and copywriting", "Subscriber list hygiene and deliverability audit"]'::jsonb,
  '["List segmentation and strategy alignment", "Template design and copy development", "Inbox rendering and spam filter testing", "Send execution and engagement reporting"]'::jsonb,
  'Mail',
  false,
  16,
  true,
  'Email Marketing & Automation | JM Creations',
  'Targeted email campaigns and automated drip workflows engineered for customer retention and lead nurture.'
),
(
  '22222222-2222-2222-2222-000000000017',
  '11111111-1111-1111-1111-000000000008',
  'Lead Generation',
  'lead-generation',
  'Systematic B2B and B2C lead acquisition funnels designed to fill your sales pipeline with verified prospects.',
  'Consistent revenue depends on predictable pipelines. JM Creations develops multi-channel lead acquisition funnels combining landing pages, ad traffic, qualification questionnaires, and CRM integrations to deliver actionable prospects.',
  '["Predictable stream of commercial enquiries", "Pre-qualified prospects aligned with target criteria", "Integrated lead capture workflows", "Measurable cost per acquisition (CPA)"]'::jsonb,
  '["High-converting lead funnel architecture", "Dedicated conversion landing pages", "Lead qualification criteria and questionnaire", "Real-time enquiry notification triggers"]'::jsonb,
  '["Ideal customer profile (ICP) definition", "Funnel and landing page engineering", "Traffic channel activation", "Lead verification and optimization"]'::jsonb,
  'Users',
  true,
  17,
  true,
  'Lead Generation Solutions | JM Creations',
  'Targeted lead generation funnels designed to connect businesses with qualified commercial opportunities.'
),
(
  '22222222-2222-2222-2222-000000000018',
  '11111111-1111-1111-1111-000000000005',
  'Influencer Marketing',
  'influencer-marketing',
  'Strategic creator collaborations and influencer partnerships that amplify brand credibility.',
  'Collaborate with creators whose audiences match your ideal customers. We assist with influencer identification, campaign alignment, deliverable tracking, and creative direction to ensure authentic promotional impact.',
  '["Enhanced social proof and credibility", "Access to engaged niche communities", "Authentic user-generated style content", "Targeted demographic reach"]'::jsonb,
  '["Influencer shortlist and audience alignment", "Campaign brief and deliverable guidelines", "Coordination and content review", "Campaign reach and engagement summary"]'::jsonb,
  '["Campaign objective and budget definition", "Creator outreach and alignment", "Content production and approval", "Publishing coordination and performance review"]'::jsonb,
  'Award',
  false,
  18,
  true,
  'Influencer Marketing & Creator Collaboration | JM Creations',
  'Connecting your brand with relevant social creators to build authentic market resonance.'
),
(
  '22222222-2222-2222-2222-000000000019',
  '11111111-1111-1111-1111-000000000006',
  'Printing Solutions',
  'printing-solutions',
  'Corporate printing for brochures, packaging, business cards, merchandise, and exhibition displays.',
  'Tangible touchpoints that convey excellence. We oversee the prepress preparation and quality printing of business collateral, brochures, custom merchandise, packaging, and large-format exhibition graphics.',
  '["Premium paper stocks and specialty finishes", "Accurate color reproduction matching brand codes", "End-to-end print file preparation and oversight", "Reliable delivery for events and operations"]'::jsonb,
  '["High-res print-ready PDF/X files with bleed", "Corporate stationery and business cards", "Product brochures and catalogs", "Large format banners and promotional stands"]'::jsonb,
  '["Material selection and print specifications", "Prepress file preparation and color proofing", "Print production management", "Quality inspection and dispatch"]'::jsonb,
  'Printer',
  false,
  19,
  true,
  'Corporate Printing Solutions | JM Creations',
  'High-quality corporate print collaterals, brochures, packaging, and commercial displays.'
),
(
  '22222222-2222-2222-2222-000000000020',
  '11111111-1111-1111-1111-000000000009',
  'Event Branding and Management',
  'event-branding-and-management',
  'Comprehensive event identity, stage graphics, promotional collaterals, and experiential brand presence.',
  'Make your corporate gatherings, launch events, and exhibitions unforgettable. We develop holistic visual themes, stage backdrops, attendee kits, and promotional collateral that create a cohesive branded experience.',
  '["Unifying visual theme across all event stages", "Professional attendee impression and trust", "Seamless coordination of print and digital signage", "Memorable photo and video backdrops"]'::jsonb,
  '["Event logo and visual branding suite", "Stage backdrops and venue signage", "Delegate kits, badges, and lanyards", "Digital presentation and video screen graphics"]'::jsonb,
  '["Event scope and venue spatial review", "Visual theme conceptualization", "Collateral production and vendor briefing", "On-site setup inspection"]'::jsonb,
  'Calendar',
  false,
  20,
  true,
  'Event Branding & Management | JM Creations',
  'Holistic visual branding, stage design, and collateral management for corporate events and launches.'
),
(
  '22222222-2222-2222-2222-000000000021',
  '11111111-1111-1111-1111-000000000009',
  'Business Registration and Startup Support',
  'business-registration-and-startup-support',
  'Guidance for formal business establishment, trade registrations, documentation, and operational onboarding.',
  'Lay a sound formal foundation for your commercial journey. We guide founders through registration requirements, documentation structuring, basic compliance awareness, and the foundational setup required to commence operations.',
  '["Structured guidance through procedural steps", "Clarity on business registration structures", "Foundational documentation organization", "Accelerated path to commercial readiness"]'::jsonb,
  '["Business structure comparison overview", "Documentation checklist and preparation advisory", "Application coordination roadmap", "Post-incorporation operational checklist"]'::jsonb,
  '["Initial consultation and entity selection", "Documentation collection and review", "Registration facilitation", "Handover of operational credentials"]'::jsonb,
  'ShieldCheck',
  true,
  21,
  true,
  'Business Registration & Startup Support | JM Creations',
  'Foundational guidance and structured advisory for formal business registration and startup launch.'
)
ON CONFLICT (slug) DO NOTHING;

-- 5. INITIAL CLIENTS (The 10 officially supplied clients)
INSERT INTO public.clients (id, name, slug, sort_order, is_published, is_featured, pending_confirmation, notes) VALUES
('33333333-3333-3333-3333-000000000001', 'Strisha Catering', 'strisha-catering', 1, true, true, false, 'Client served with Lead generation and Revenue generation support.'),
('33333333-3333-3333-3333-000000000002', 'Ampiere Educational Institute', 'ampiere-educational-institute', 2, true, true, false, 'Client served with Google Ads and creative production shoots.'),
('33333333-3333-3333-3333-000000000003', 'Kufo Foundations', 'kufo-foundations', 3, true, true, false, 'Client served with Lead generation and creative production shoots.'),
('33333333-3333-3333-3333-000000000004', 'Truevedha', 'truevedha', 4, true, true, false, 'Client supported with business start / startup support initiatives.'),
('33333333-3333-3333-3333-000000000005', 'Gingeephotoofficial', 'gingeephotoofficial', 5, true, true, false, 'Creator collaboration in Instagram influencer category.'),
('33333333-3333-3333-3333-000000000006', 'Herbal Life', 'herbal-life', 6, true, false, true, 'Supplied client name. Specific project scope and deliverables awaiting confirmation.'),
('33333333-3333-3333-3333-000000000007', 'O2Y', 'o2y', 7, true, false, true, 'Supplied client name. Scope and deliverables awaiting confirmation.'),
('33333333-3333-3333-3333-000000000008', 'Grace Speech and Hearing Aids', 'grace-speech-and-hearing-aids', 8, true, false, true, 'Supplied client name. Scope and deliverables awaiting confirmation.'),
('33333333-3333-3333-3333-000000000009', 'Waymax', 'waymax', 9, true, false, true, 'Supplied client name. Scope and deliverables awaiting confirmation.'),
('33333333-3333-3333-3333-000000000010', 'Shevroys', 'shevroys', 10, true, false, true, 'Supplied client name. Scope and deliverables awaiting confirmation.')
ON CONFLICT (slug) DO NOTHING;

-- 6. INITIAL CLIENT PORTFOLIO ENTRIES (Exact prompt fidelity)
INSERT INTO public.projects (
  id, client_id, title, slug, project_summary, project_overview, business_objective,
  strategy_approach, deliverables, status, is_featured, is_published, pending_confirmation,
  meta_title, meta_description
) VALUES
(
  '44444444-4444-4444-4444-000000000001',
  '33333333-3333-3333-3333-000000000001',
  'Strisha Catering — Lead Generation & Revenue Support',
  'strisha-catering-lead-generation',
  'JM Creations supported Strisha Catering with lead generation and revenue-generation initiatives designed to help the business connect with potential customers and develop sales opportunities.',
  'Strisha Catering engaged JM Creations to drive commercial outreach and revenue-generation support. Our focus centered on structuring practical customer acquisition funnels to connect catering offerings with corporate and event hosts.',
  'Lead generation and revenue generation support',
  'Conducted outreach and structured lead generation channels tailored to catering event opportunities and customer inquiries.',
  '["Targeted lead generation campaign", "Inquiry capture process", "Revenue development support"]'::jsonb,
  'Completed',
  true,
  true,
  false,
  'Strisha Catering Case Study | JM Creations Portfolio',
  'Discover how JM Creations supported Strisha Catering with targeted lead generation and revenue-generation initiatives.'
),
(
  '44444444-4444-4444-4444-000000000002',
  '33333333-3333-3333-3333-000000000002',
  'Ampiere Educational Institute — Google Ads & Creative Shoots',
  'ampiere-educational-institute-google-ads',
  'JM Creations supported Ampiere Educational Institute through Google Ads campaigns and shoot-based creative production to support its digital promotion and marketing activities.',
  'Ampiere Educational Institute partnered with JM Creations for digital promotional visibility and marketing media. We executed high-intent Google Ads campaigns coupled with on-site creative production shoots to deliver polished promotional assets.',
  'Digital promotion, student inquiry acquisition, and creative production',
  'Formulated Google Ads keyword campaigns targeting academic programs while coordinating photo and video shoots for institutional promotional assets.',
  '["Google Ads campaign setup and management", "Shoot-based creative production", "Institutional marketing visual assets"]'::jsonb,
  'Completed',
  true,
  true,
  false,
  'Ampiere Educational Institute Case Study | JM Creations',
  'Overview of Google Ads and creative shoot production executed by JM Creations for Ampiere Educational Institute.'
),
(
  '44444444-4444-4444-4444-000000000003',
  '33333333-3333-3333-3333-000000000003',
  'Kufo Foundations — Lead Generation & Creative Production',
  'kufo-foundations-lead-generation',
  'JM Creations supported Kufo Foundations with lead-generation activities and shoot-based creative production for its promotional and outreach requirements.',
  'Kufo Foundations required structured promotional outreach and high-quality creative assets. JM Creations provided lead-generation activities combined with creative shoot production to fulfill their outreach requirements.',
  'Promotional outreach and lead generation',
  'Executed promotional media shoots and structured lead-generation channels aligned with Kufo Foundations outreach initiatives.',
  '["Lead-generation campaign workflow", "Creative production photo and video shoots", "Outreach promotional collaterals"]'::jsonb,
  'Completed',
  true,
  true,
  false,
  'Kufo Foundations Case Study | JM Creations Portfolio',
  'Lead-generation activities and shoot-based creative production delivered for Kufo Foundations.'
),
(
  '44444444-4444-4444-4444-000000000004',
  '33333333-3333-3333-3333-000000000004',
  'Truevedha — Business Start & Startup Support',
  'truevedha-startup-support',
  'JM Creations supported Truevedha in connection with its business-start initiative. The project showcases JM Creations ability to support business initiatives from their early stages.',
  'Truevedha engaged JM Creations for business startup guidance. The project exemplifies JM Creations capability to assist emerging business initiatives during their critical launch and early operational stages.',
  'Business start / startup support',
  'Structured early-stage advisory and business setup assistance to prepare the enterprise for operational rollout.',
  '["Business start advisory", "Startup support framework"]'::jsonb,
  'Completed',
  true,
  true,
  false,
  'Truevedha Startup Case Study | JM Creations Portfolio',
  'Read about JM Creations early-stage startup support for Truevedha business start initiative.'
),
(
  '44444444-4444-4444-4444-000000000005',
  '33333333-3333-3333-3333-000000000005',
  'Gingeephotoofficial — Influencer Collaboration',
  'gingeephotoofficial-influencer-collaboration',
  'JM Creations has worked with Gingeephotoofficial in the Instagram influencer category. This portfolio entry highlights the influencer-related work associated with the collaboration.',
  'Collaboration with Instagram creator Gingeephotoofficial. The project highlights influencer marketing coordination and promotional collaboration under JM Creations digital media umbrella.',
  'Instagram influencer collaboration and campaign coordination',
  'Facilitated creator engagement and promotional content coordination within the Instagram ecosystem.',
  '["Influencer collaboration framework", "Promotional social assets"]'::jsonb,
  'Completed',
  true,
  true,
  false,
  'Gingeephotoofficial Collaboration | JM Creations Portfolio',
  'Instagram influencer campaign coordination and collaboration with Gingeephotoofficial.'
),
(
  '44444444-4444-4444-4444-000000000006',
  '33333333-3333-3333-3333-000000000006',
  'Herbal Life — Client Project',
  'herbal-life-project',
  'Herbal Life is included in JM Creations supplied client list. The specific project scope, deliverables, and service categories are awaiting confirmation.',
  'Herbal Life is an established client of JM Creations. Further case study details, project deliverables, and specific scopes are currently awaiting confirmation and will be published once officially approved.',
  'Awaiting confirmation',
  'Awaiting scope confirmation from client',
  '[]'::jsonb,
  'Pending Confirmation',
  false,
  true,
  true,
  'Herbal Life | JM Creations Client Portfolio',
  'Client record for Herbal Life in the JM Creations portfolio.'
),
(
  '44444444-4444-4444-4444-000000000007',
  '33333333-3333-3333-3333-000000000007',
  'O2Y — Client Project',
  'o2y-project',
  'O2Y client record. The precise service scope has not yet been supplied and remains editable in the management system.',
  'O2Y is included in JM Creations portfolio. Scope details, media, and verified deliverables will be added as confirmed by the company.',
  'Awaiting confirmation',
  'Awaiting scope confirmation',
  '[]'::jsonb,
  'Pending Confirmation',
  false,
  true,
  true,
  'O2Y | JM Creations Client Portfolio',
  'Client record for O2Y in the JM Creations portfolio.'
),
(
  '44444444-4444-4444-4444-000000000008',
  '33333333-3333-3333-3333-000000000008',
  'Grace Speech and Hearing Aids — Client Project',
  'grace-speech-and-hearing-aids-project',
  'Grace Speech and Hearing Aids client record. Project summary, services, and deliverables remain editable pending client confirmation.',
  'Grace Speech and Hearing Aids is part of JM Creations verified client relationships. Detailed project case study information is preserved for administrative update upon verification.',
  'Awaiting confirmation',
  'Awaiting scope confirmation',
  '[]'::jsonb,
  'Pending Confirmation',
  false,
  true,
  true,
  'Grace Speech and Hearing Aids | JM Creations Portfolio',
  'Client record for Grace Speech and Hearing Aids in the JM Creations portfolio.'
),
(
  '44444444-4444-4444-4444-000000000009',
  '33333333-3333-3333-3333-000000000009',
  'Waymax — Client Project',
  'waymax-project',
  'Waymax client record. Service categories, deliverables, and media remain editable pending client confirmation.',
  'Waymax is included in JM Creations supplied client portfolio. Full deliverables and case metrics will be updated through the administrative system once verified.',
  'Awaiting confirmation',
  'Awaiting scope confirmation',
  '[]'::jsonb,
  'Pending Confirmation',
  false,
  true,
  true,
  'Waymax | JM Creations Client Portfolio',
  'Client record for Waymax in the JM Creations portfolio.'
),
(
  '44444444-4444-4444-4444-000000000010',
  '33333333-3333-3333-3333-000000000010',
  'Shevroys — Client Project',
  'shevroys-project',
  'Shevroys client record. Service categories, deliverables, and media remain editable pending confirmation.',
  'Shevroys client record preserved under official supplied spelling. Detailed deliverables and project media will be published upon confirmation.',
  'Awaiting confirmation',
  'Awaiting scope confirmation',
  '[]'::jsonb,
  'Pending Confirmation',
  false,
  true,
  true,
  'Shevroys | JM Creations Client Portfolio',
  'Client record for Shevroys in the JM Creations portfolio.'
)
ON CONFLICT (slug) DO NOTHING;

-- 7. PROJECT - SERVICE RELATIONSHIPS
INSERT INTO public.project_services (project_id, service_id) VALUES
-- Strisha Catering: Lead generation + Digital Marketing
('44444444-4444-4444-4444-000000000001', '22222222-2222-2222-2222-000000000017'),
('44444444-4444-4444-4444-000000000001', '22222222-2222-2222-2222-000000000006'),
-- Ampiere: Google Ads + Product Photography and Videography + Digital Marketing
('44444444-4444-4444-4444-000000000002', '22222222-2222-2222-2222-000000000009'),
('44444444-4444-4444-4444-000000000002', '22222222-2222-2222-2222-000000000014'),
('44444444-4444-4444-4444-000000000002', '22222222-2222-2222-2222-000000000006'),
-- Kufo Foundations: Lead generation + Product Photography and Videography
('44444444-4444-4444-4444-000000000003', '22222222-2222-2222-2222-000000000017'),
('44444444-4444-4444-4444-000000000003', '22222222-2222-2222-2222-000000000014'),
-- Truevedha: Startup Consulting + Business Registration & Support
('44444444-4444-4444-4444-000000000004', '22222222-2222-2222-2222-000000000002'),
('44444444-4444-4444-4444-000000000004', '22222222-2222-2222-2222-000000000021'),
-- Gingeephotoofficial: Influencer Marketing
('44444444-4444-4444-4444-000000000005', '22222222-2222-2222-2222-000000000018')
ON CONFLICT DO NOTHING;

-- 8. INITIAL BLOG CATEGORIES & POST
INSERT INTO public.blog_categories (id, name, slug, description) VALUES
('55555555-5555-5555-5555-000000000001', 'Business Strategy', 'business-strategy', 'Insights on scaling enterprises, go-to-market strategies, and commercial execution.'),
('55555555-5555-5555-5555-000000000002', 'Digital Marketing', 'digital-marketing', 'Performance marketing, search optimization, and lead generation frameworks.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.blog_posts (
  id, title, slug, excerpt, content, category_id, author_name, is_published, published_at, meta_title, meta_description, read_time
) VALUES
(
  '66666666-6666-6666-6666-000000000001',
  'Building an End-to-End Digital Presence: Strategy Before Tools',
  'building-end-to-end-digital-presence',
  'Why modern businesses need cohesive branding, targeted lead acquisition, and technological stability working in unison.',
  'In the contemporary marketplace, fragmented marketing yields fragmented results. Businesses frequently invest in social media posts, advertising, or web development in isolation without a foundational strategy connecting their offerings to customer acquisition.

At JM Creations, part of Jina Groups of Company Pvt. Ltd., we advocate an integrated paradigm where business consulting informs branding, web architecture converts commercial traffic, and performance marketing accelerates customer reach. When every component operates in harmony, enterprise growth becomes a measurable, repeatable outcome.',
  '55555555-5555-5555-5555-000000000001',
  'JM Creations Editorial',
  true,
  NOW(),
  'Building an End-to-End Digital Presence | JM Creations',
  'Strategic insights on harmonizing branding, web technology, and lead generation for sustainable enterprise growth.',
  '4 min read'
)
ON CONFLICT (slug) DO NOTHING;

-- 9. CAREERS
INSERT INTO public.careers (
  id, title, slug, department, location, employment_type, description, requirements, responsibilities, deadline, is_published
) VALUES
(
  '77777777-7777-7777-7777-000000000001',
  'Business Development Executive',
  'business-development-executive',
  'Commercial Sales',
  'Tamil Nadu, India / Hybrid',
  'Full-time',
  'We are seeking a driven Business Development Executive to identify enterprise opportunities, connect with emerging businesses, and present JM Creations suite of digital and business solutions.',
  '["Proven track record in B2B service sales or digital agency consulting", "Strong verbal and written communication in English and Tamil", "Ability to comprehend client business models and propose relevant service scopes", "Self-motivated with structured follow-up discipline"]'::jsonb,
  '["Prospect and engage potential business clients across Tamil Nadu and South India", "Coordinate initial discovery consultations and requirements gathering", "Work with creative and tech leads to deliver structured project proposals", "Maintain client relationships through project delivery and expansion"]'::jsonb,
  CURRENT_DATE + INTERVAL '60 days',
  true
),
(
  '77777777-7777-7777-7777-000000000002',
  'Senior Digital Marketing Specialist',
  'senior-digital-marketing-specialist',
  'Digital Marketing',
  'Salem / Remote, Tamil Nadu',
  'Full-time',
  'Lead performance marketing campaigns across Meta Ads and Google Ads with a relentless focus on lead generation quality and client commercial growth.',
  '["2+ years of hands-on experience managing Meta Ads Manager and Google Ads accounts", "Demonstrated proficiency with Google Analytics 4, Pixel tracking, and conversion funnels", "Experience crafting ad copy and directing visual shoot requirements", "Analytical mindset capable of diagnosing campaign performance"]'::jsonb,
  '["Plan, deploy, and optimize paid campaigns for diverse client verticals", "Conduct audience research and A/B test ad creatives", "Generate clear, factual performance reports for client stakeholders", "Collaborate with creative teams to produce shoot shot-lists and promotional reels"]'::jsonb,
  CURRENT_DATE + INTERVAL '60 days',
  true
)
ON CONFLICT (slug) DO NOTHING;
