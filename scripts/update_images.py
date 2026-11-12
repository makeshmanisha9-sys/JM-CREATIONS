import re

seed_file = r'C:\Users\manishasubathra\.gemini\antigravity\scratch\jm-creations\lib\seed-data.ts'
with open(seed_file, 'r', encoding='utf-8') as f:
    content = f.read()

covers = {
    'strisha-catering-lead-generation': 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    'ampiere-educational-institute-google-ads': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    'kufo-foundations-lead-generation': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80',
    'truevedha-startup-support': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    'gingeephotoofficial-influencer-collaboration': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    'herbal-life-project': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    'o2y-project': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    'grace-speech-and-hearing-aids-project': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    'waymax-project': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    'shevroys-project': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
}

for slug, url in covers.items():
    if f"cover_image: '{url}'" in content:
        continue
    target = f"slug: '{slug}',"
    replacement = f"slug: '{slug}',\n    cover_image: '{url}',"
    if target in content:
        content = content.replace(target, replacement, 1)
        print(f"Added cover to {slug}")

# Also update INITIAL_BLOG_POSTS with cover_image
blog_covers = {
    'building-end-to-end-digital-presence': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
}
for slug, url in blog_covers.items():
    target = f"slug: '{slug}',"
    replacement = f"slug: '{slug}',\n    cover_image: '{url}',"
    if target in content and f"cover_image: '{url}'" not in content:
        content = content.replace(target, replacement, 1)
        print(f"Added cover to blog {slug}")

# Add the 2 new articles if not already present
if 'commercial-photography-cinema-shoots' not in content:
    extra_posts = """  {
    id: 'post-2',
    title: 'Commercial Photography & Cinema Shoots That Convert Attention Into Trust',
    slug: 'commercial-photography-cinema-shoots',
    excerpt: 'How professional lighting, composition, and high-fidelity video production differentiate authentic enterprises from generic competitors.',
    cover_image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80',
    content: `In an era flooded with AI-generated visuals and stock templates, authentic visual proof is the ultimate differentiator for businesses. Customers want to see real facilities, real culinary plating, verified teams, and authentic product craftsmanship.\\n\\nAt JM Creations, our commercial photography and creative production shoots are planned with conversion in mind. We do not simply point cameras; we craft lighting atmospheres, direct subject movements, and produce media engineered specifically for website hero banners, social performance ads, and corporate profiles.\\n\\n### 1. The Psychology of Visual Trust\\nWhen visitors land on your website, visual perception happens in under 50 milliseconds. Crisp optical glass imagery and cinematic lighting immediately communicate institutional prestige and reliability.\\n\\n### 2. Production Tailored for Performance Ad Formats\\nModern advertising demands versatile aspect ratios—from 16:9 cinematic widescreen for corporate presentations to 9:16 vertical reels for Meta and Instagram stories. Multi-format production ensures maximum return on your shoot investment.\\n\\n### Conclusion\\nElevating your brand visual imagery is not a luxury expense; it is a foundational asset that multiplies the conversion rate of every visitor and advertising dollar spent.`,
    author_name: 'Creative Production Team',
    is_published: true,
    published_at: '2024-10-22T10:00:00Z',
    meta_title: 'Commercial Photography & Cinema Shoots | JM Creations',
    meta_description: 'Discover how professional commercial photography and high-fidelity video production drive measurable brand authority.',
    read_time: '5 min read',
  },
  {
    id: 'post-3',
    title: 'From Legal Registration to Market Scale: The Startup Foundation Blueprint',
    slug: 'startup-foundation-blueprint',
    excerpt: 'Key milestones every founder must execute—from formal entity structure to brand architecture and initial customer acquisition.',
    cover_image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    content: `Launching a successful enterprise requires navigating both legal formalities and commercial market dynamics. Many promising startups falter early not from lack of ambition, but from disconnected foundational execution.\\n\\nAs part of Jina Groups of Company Pvt. Ltd., JM Creations provides founders with a cohesive roadmap: combining formal business registration advisory with immediate brand identity development, website engineering, and structured lead generation funnels.\\n\\n### 1. Entity Structuring and Documentation\\nEstablishing the correct commercial vehicle—whether Private Limited Company, LLP, or Partnership—protects founder equity and prepares the business for institutional contracts and banking relationships.\\n\\n### 2. Brand Architecture That Commands Respect\\nEmerging ventures cannot afford to look amateurish. A cohesive vector logo suite, unified typography, and sharp brand guidelines instill instant confidence in early enterprise customers.\\n\\n### 3. Rapid Customer Acquisition Funnels\\nA business only becomes sustainable when customer acquisition is predictable. By establishing high-intent Google Search campaigns and structured CRM lead capture from day one, founders validate their commercial offerings with real revenue.`,
    author_name: 'Business Solutions Desk',
    is_published: true,
    published_at: '2024-10-29T10:00:00Z',
    meta_title: 'The Startup Foundation Blueprint | JM Creations',
    meta_description: 'Strategic guide for founders navigating legal registration, branding architecture, and customer lead acquisition.',
    read_time: '6 min read',
  },
];"""
    content = content.replace("export const INITIAL_BLOG_POSTS: BlogPost[] = [", "export const INITIAL_BLOG_POSTS: BlogPost[] = [\n" + extra_posts.replace("];", ","), 1)
    print("Added 2 new blog posts with images!")

with open(seed_file, 'w', encoding='utf-8') as f:
    f.write(content)
print("Finished updating seed-data.ts!")
