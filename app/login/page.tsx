'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/auth-context';
import { Shield, Key, Mail, UserPlus, LogIn, Loader } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin';

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // If user is already logged in, redirect them
  useEffect(() => {
    if (!authLoading && user) {
      router.push(redirectUrl);
    }
  }, [user, authLoading, router, redirectUrl]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data.user && data.session) {
          setMessage('Account created successfully! Redirecting...');
          router.push(redirectUrl);
        } else {
          setMessage('Verification email sent! Please check your inbox.');
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        router.push(redirectUrl);
      }
    } catch (err: any) {
      setError(err.message || 'An authentication error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#08080a] flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-[#c5a880]" />
      </div>
    );
  }

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-16 bg-[#08080a]">
      <div className="w-full max-w-md bg-[#111115] border border-white/5 rounded-xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow overlay */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex h-12 w-12 rounded-full items-center justify-center bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] mb-2">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-light font-serif-luxury text-white tracking-wider uppercase">
            {isSignUp ? 'Create Atelier Account' : 'Atelier Access'}
          </h1>
          <p className="text-xs text-neutral-400 font-sans max-w-xs mx-auto">
            {isSignUp 
              ? 'Join V ONE Atelier to manage your tailored orders and collections.' 
              : 'Sign in to access your dashboard and manage personalized services.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-sans text-left">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-3.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-sans text-left">
            {message}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#16161c] border border-white/5 focus:border-[#c5a880]/50 rounded-md py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#16161c] border border-white/5 focus:border-[#c5a880]/50 rounded-md py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#c5a880] text-black hover:bg-transparent hover:text-[#c5a880] border border-[#c5a880] py-3 rounded-md text-xs font-bold shadow-lg transition-all duration-300 uppercase tracking-widest disabled:opacity-50 disabled:pointer-events-none mt-2"
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : isSignUp ? (
              <>
                <UserPlus className="h-4 w-4" />
                Sign Up
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setMessage(null);
            }}
            className="text-xs text-[#c5a880] hover:underline transition-colors font-medium bg-transparent border-none cursor-pointer"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
