import React from 'react';
import { Metadata } from 'next';
import NextLink from 'next/link';
import Image from 'next/image';
import { BookOpen, ArrowUpRight, Clock, User, Calendar, Sparkles } from 'lucide-react';
import { getBlogPosts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Insights & Perspectives | JM Creations Journal',
  description:
    'Strategic analysis, digital growth frameworks, and practical perspectives on enterprise scaling from the JM Creations editorial team.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts({ includeUnpublished: false });

  return (
    <div className="pt-28 sm:pt-36 pb-24 space-y-16 bg-[#080808] text-white min-h-screen">
      {/* Studio Header Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-10">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-zinc-300">DISPATCHES / EDITORIAL PERSPECTIVES</span>
          </div>
          <span className="hidden md:inline">ANALYSIS · ENGINEERING · BRANDING · STRATEGY</span>
          <span className="text-gold-500/80">[ PRACTICAL ESSAYS ]</span>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-gold-500/30 text-[11px] font-mono text-gold-400">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>Studio Perspectives</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.04]">
            STRATEGIC <span className="gold-text-gradient">INSIGHTS</span> &amp; ESSAYS.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base lg:text-lg leading-relaxed pt-2 max-w-3xl font-sans">
            Thought leadership on digital marketing, business formation, modern web engineering, and commercial customer acquisition from the team at JM Creations.
          </p>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const numIndex = String(index + 1).padStart(2, '0');
            return (
              <article
                key={post.id || post.slug}
                className="group p-6 sm:p-7 rounded-3xl bg-[#121212] border border-zinc-800/80 hover:border-gold-500/50 hover:bg-[#151515] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Article Cover Image */}
                  {post.cover_image && (
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-zinc-900 border border-zinc-800">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 select-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-4">
                    <span className="text-gold-500 font-semibold">[ {numIndex} ]</span>
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-gold-500" />
                      <span>{post.read_time || '5 min read'}</span>
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 mb-3 inline-block">
                    {post.category?.name || 'Perspective'}
                  </span>

                  <h2 className="font-display text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors leading-snug">
                    {post.title}
                  </h2>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">{post.author_name}</span>
                  <NextLink
                    href={`/blog/${post.slug}`}
                    className="text-white group-hover:text-gold-400 flex items-center gap-1.5 transition-colors font-medium"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gold-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </NextLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
