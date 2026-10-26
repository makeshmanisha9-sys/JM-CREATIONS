'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@jmcreations.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      if (supabase) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (authError) {
          // If Supabase user does not exist or credentials fail, check fallback
          if (email.trim() === 'admin@jmcreations.com' && password.trim() === 'admin123') {
            document.cookie = 'jm_admin_session=active; path=/; max-age=86400';
            router.push('/admin/dashboard');
            return;
          }
          setError(authError.message);
          setLoading(false);
          return;
        }

        // Successfully authenticated via Supabase
        document.cookie = 'jm_admin_session=active; path=/; max-age=86400';
        router.push('/admin/dashboard');
      } else {
        // Fallback development mode when Supabase is not yet populated in .env
        if (password.trim().length >= 6) {
          document.cookie = 'jm_admin_session=active; path=/; max-age=86400';
          router.push('/admin/dashboard');
        } else {
          setError('Password must be at least 6 characters.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#121214] border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle Gold Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>

        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-gold-500/40 text-gold-500 flex items-center justify-center mx-auto shadow-gold-glow">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">JM Creations Admin Portal</h1>
          <p className="text-xs text-zinc-400">
            Secure authentication for authorized staff & management
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
              Staff Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jmcreations.com"
                className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-2">
              Secure Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-black font-bold uppercase tracking-wider text-xs shadow-gold-glow flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-4 border-t border-zinc-800/80 text-center">
            <span className="text-[11px] text-zinc-400">
              Demo credentials: <code className="text-gold-400">admin@jmcreations.com</code> / <code className="text-gold-400">admin123</code>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
