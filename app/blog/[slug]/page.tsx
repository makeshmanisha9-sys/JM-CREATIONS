import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import NextLink from 'next/link';
import { ArrowLeft, Clock, Calendar, User, ArrowUpRight, ChevronRight, BookOpen } from 'lucide-react';
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
    title: post.meta_title || `${post.title} | JM Creations Journal`,
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
    <div className="pt-28 sm:pt-36 pb-24 space-y-16 bg-[#080808] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-widest text-zinc-500 uppercase border-b border-zinc-900 pb-4 mb-8">
          <NextLink
            href="/blog"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Journal Archive</span>
          </NextLink>

          <span className="hidden sm:inline">STUDIO PERSPECTIVE · JM CREATIONS</span>
          <span className="text-gold-500/80">[ ESSAY ]</span>
        </div>

        {/* Post Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 mb-6">
          <span className="text-gold-500 font-semibold">{post.author_name}</span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gold-500" />
            <span>{post.read_time || '5 min read'}</span>
          </span>
          <span>•</span>
          <span>
            {new Date(post.published_at || Date.now()).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-10">
          {post.title}
        </h1>

        {/* Article Body */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#121212] border border-zinc-800/80 text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6 font-sans">
          <div className="whitespace-pre-line leading-relaxed">{post.content}</div>
        </div>

        {/* Studio Consultation Footer */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-gold-500 mb-1">
              EXECUTION ADVISORY
            </div>
            <h3 className="font-display text-xl font-bold text-white">
              Need strategic execution for your company?
            </h3>
            <p className="text-xs text-zinc-400 mt-1 font-sans">
              Talk to our consulting and digital team today.
            </p>
          </div>
          <NextLink
            href="/contact"
            className="px-6 py-3.5 rounded-full bg-gold-500 text-black text-xs font-display font-bold uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold-glow shrink-0 flex items-center gap-2"
          >
            <span>Start Your Project</span>
            <ChevronRight className="w-4 h-4" />
          </NextLink>
        </div>

        {/* Other Posts */}
        {otherPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-zinc-900">
            <h3 className="font-display text-xl font-bold text-white mb-6">Further Reading</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherPosts.map((p) => (
                <NextLink
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="p-6 rounded-2xl bg-[#121212] border border-zinc-800 hover:border-gold-500/40 transition-colors block"
                >
                  <div className="text-xs font-mono text-gold-500 mb-2">{p.author_name}</div>
                  <h4 className="font-display text-base font-bold text-white mb-2">{p.title}</h4>
                  <p className="text-xs text-zinc-400 line-clamp-2">{p.excerpt}</p>
                </NextLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
