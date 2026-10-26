import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { ArrowLeft, Clock, Calendar, User, ArrowRight, Share2 } from 'lucide-react';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/data';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: 'Article Not Found | JM Creations' };

  return {
    title: post.meta_title || `${post.title} | JM Creations Blog`,
    description: post.meta_description || post.excerpt,
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const otherPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <NextLink
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-gold-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </NextLink>

        {/* Post Metadata */}
        <div className="flex items-center gap-4 text-xs text-zinc-400 mb-4">
          <span className="text-gold-500 font-semibold">{post.author_name}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>{post.read_time}</span>
          </span>
          <span>•</span>
          <span>{new Date(post.published_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-8">
          {post.title}
        </h1>

        {/* Article Body */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#121214] border border-zinc-800 text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6">
          <div className="whitespace-pre-line leading-relaxed">{post.content}</div>
        </div>

        {/* Share & Consultation Footer */}
        <div className="mt-12 p-8 rounded-2xl bg-zinc-900 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">Need strategic execution for your company?</h3>
            <p className="text-xs text-zinc-400 mt-1">Talk to our consulting and digital team today.</p>
          </div>
          <NextLink
            href="/contact"
            className="px-6 py-3 rounded-xl bg-gold-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold-glow shrink-0"
          >
            Start Your Project
          </NextLink>
        </div>
      </div>
    </div>
  );
}
