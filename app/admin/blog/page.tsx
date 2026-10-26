import React from 'react';
import { getBlogPosts } from '@/lib/data';
import { BookOpen, Plus, Edit2, Eye, EyeOff } from 'lucide-react';
import NextLink from 'next/link';

export default async function AdminBlogPage() {
  const posts = await getBlogPosts({ includeUnpublished: true });

  return (
    <div className="space-y-6">
      <div className="border-b border-zinc-800 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Blog & Insights Management ({posts.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Author articles, manage publication schedules, and optimize SEO fields
          </p>
        </div>
      </div>

      <div className="bg-[#121214] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Article Title</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4">Reading Time</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-zinc-900/40">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-white text-sm">{post.title}</div>
                  <div className="text-[11px] text-zinc-500 font-mono">/{post.slug}</div>
                </td>
                <td className="py-3.5 px-4 text-zinc-300">{post.author_name}</td>
                <td className="py-3.5 px-4 text-zinc-400">{post.read_time}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      post.is_published
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {post.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right text-zinc-400">
                  {new Date(post.published_at || Date.now()).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
