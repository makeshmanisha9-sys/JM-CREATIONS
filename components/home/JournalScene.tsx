'use client';

import React from 'react';
import NextLink from 'next/link';
import { ArrowUpRight, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';
import { BlogPost } from '@/lib/types';

interface JournalSceneProps {
  posts: BlogPost[];
}

export default function JournalScene({ posts }: JournalSceneProps) {
  const publishedPosts = posts.filter((p) => p.is_published).slice(0, 3);

  if (publishedPosts.length === 0) return null;

  return (
    <section
      id="journal-scene"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] text-white border-t border-zinc-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-12">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            <span className="text-zinc-300">STUDIO JOURNAL / DISPATCHES</span>
          </div>
          <span className="hidden md:inline">INSIGHTS ON BRANDING, ARCHITECTURE & GROWTH</span>
          <NextLink
            href="/blog"
            className="text-gold-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>All Articles</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </NextLink>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              THINKING BEHIND <span className="gold-text-gradient">THE WORK</span>.
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-zinc-400 text-sm leading-relaxed">
              Perspectives on business setup, visual positioning, modern web engineering, and commercial customer acquisition.
            </p>
          </div>
        </div>

        {/* Magazine Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedPosts.map((post, idx) => (
            <NextLink
              key={post.id || post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col justify-between p-8 rounded-3xl bg-[#141414] border border-zinc-800/80 hover:border-gold-500/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-6">
                  <span className="text-gold-500">[ 0{idx + 1} ]</span>
                  <div className="flex items-center gap-3">
                    {post.read_time && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.read_time}</span>
                      </span>
                    )}
                  </div>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 mb-4 inline-block">
                  {post.category?.name || 'Perspective'}
                </span>

                <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-400 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 group-hover:text-white transition-colors">Read Article</span>
                <ArrowUpRight className="w-4 h-4 text-gold-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </NextLink>
          ))}
        </div>
      </div>
    </section>
  );
}
