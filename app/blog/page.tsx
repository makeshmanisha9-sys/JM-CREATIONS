import React from 'react';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { BookOpen, ArrowRight, Clock, User, Calendar } from 'lucide-react';
import { getBlogPosts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Insights & Perspectives | JM Creations',
  description:
    'Strategic analysis, digital growth frameworks, and practical perspectives on enterprise scaling from the JM Creations editorial team.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts({ includeUnpublished: false });

  return (
    <div className="py-12 sm:py-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-gold-500/30 text-xs text-gold-400 font-medium mb-4">
          <BookOpen className="w-3.5 h-3.5 text-gold-500" />
          <span>Editorial & Case Insights</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Strategic Insights & Perspectives
        </h1>
        <p className="mt-4 text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto">
          Articles on digital marketing, business development, web technology, and commercial growth.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-[#121214] border border-zinc-800 rounded-2xl p-7 flex flex-col justify-between hover:border-gold-500/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold-500" />
                    <span>{post.read_time}</span>
                  </span>
                  <span>{new Date(post.published_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                  {post.title}
                </h2>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">{post.author_name}</span>
                <NextLink
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1.5"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </NextLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
