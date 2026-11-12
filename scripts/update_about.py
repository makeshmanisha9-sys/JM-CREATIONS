import os

file_path = r'C:\Users\manishasubathra\.gemini\antigravity\scratch\jm-creations\app\about\page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add Image import
if "import Image from 'next/image';" not in text:
    text = text.replace("import NextLink from 'next/link';", "import NextLink from 'next/link';\nimport Image from 'next/image';")

# 2. Add Visual Gallery Section after Section 2
target = """                <div>Headquarters: Tamil Nadu, India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, and Core Pillars */}"""

replacement = """                <div>Headquarters: Tamil Nadu, India</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Agency Showcase: Production, Consulting & Engineering */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Production Shoots */}
          <div className="group rounded-3xl bg-[#121212] border border-zinc-800/80 overflow-hidden hover:border-gold-500/50 transition-all duration-500 flex flex-col justify-between">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-950">
              <Image
                src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80"
                alt="Commercial Cinema Production"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 border border-zinc-700/80 backdrop-blur-md text-[10px] font-mono text-gold-400">
                DISCIPLINE 01
              </div>
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                Commercial Cinema &amp; Shoots
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                Professional studio lighting, high-refraction optical glass, and multi-format video capture tailored for high-converting brand campaigns.
              </p>
            </div>
          </div>

          {/* Card 2: Strategic Advisory */}
          <div className="group rounded-3xl bg-[#121212] border border-zinc-800/80 overflow-hidden hover:border-gold-500/50 transition-all duration-500 flex flex-col justify-between">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-950">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Strategic Business Consulting"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 border border-zinc-700/80 backdrop-blur-md text-[10px] font-mono text-gold-400">
                DISCIPLINE 02
              </div>
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                Strategic Enterprise Consulting
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                Grounded commercial advisory, business registration facilitation, and revenue funnel structuring for emerging startups and market leaders.
              </p>
            </div>
          </div>

          {/* Card 3: Web & Tech Engineering */}
          <div className="group rounded-3xl bg-[#121212] border border-zinc-800/80 overflow-hidden hover:border-gold-500/50 transition-all duration-500 flex flex-col justify-between">
            <div className="relative aspect-[16/11] w-full overflow-hidden bg-zinc-950">
              <Image
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                alt="Web and Digital Engineering"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 border border-zinc-700/80 backdrop-blur-md text-[10px] font-mono text-gold-400">
                DISCIPLINE 03
              </div>
            </div>
            <div className="p-6 sm:p-7">
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">
                High-Performance Web Engineering
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                Next-generation full-stack corporate portals, responsive UI architectures, and conversion-optimized sales workflows built for scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision, and Core Pillars */}"""

# Normalize line endings for replacement
norm_text = text.replace('\r\n', '\n')
norm_target = target.replace('\r\n', '\n')
norm_replacement = replacement.replace('\r\n', '\n')

if norm_target in norm_text:
    norm_text = norm_text.replace(norm_target, norm_replacement, 1)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(norm_text)
    print("Successfully added visual gallery showcase to app/about/page.tsx!")
else:
    print("Target not found in about page!")
