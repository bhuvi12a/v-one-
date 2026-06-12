'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Search, Menu, X, Star, ShieldAlert } from 'lucide-react';
import { useCart } from './cart-context';
import { useAuth } from './auth-context';

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#08080a]/80 backdrop-blur-md border-b border-white/5 text-white shadow-lg">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Left Side: Logo & Search */}
          <div className="flex flex-1 items-center gap-8">
            
            {/* V ONE Atelier Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0 select-none text-left">
              <div className="h-9 w-9 rounded-full border border-[#c5a880]/30 flex items-center justify-center bg-gradient-to-br from-[#1c1c24] to-[#0a0a0c] group-hover:border-[#c5a880]/60 transition-colors">
                <span className="font-serif text-xs font-semibold text-[#c5a880] tracking-wider">V</span>
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-sm font-light tracking-[0.25em] text-white font-serif-luxury uppercase">
                  V ONE
                </span>
                <span className="text-[8px] tracking-[0.4em] font-semibold text-[#c5a880] uppercase mt-1">
                  Atelier
                </span>
              </div>
            </Link>

            {/* Search Input Bar (Luxury Style) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
              <input
                type="text"
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#111115] border border-white/10 text-white placeholder-neutral-500 text-xs px-4 py-2 pr-10 rounded-full focus:outline-none focus:border-[#c5a880]/80 transition-all font-sans"
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-3.5 text-neutral-400 hover:text-[#c5a880] transition-colors">
                <Search className="h-3.5 w-3.5" />
              </button>
            </form>

          </div>

          {/* Right Side: Links & Profile */}
          <div className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase font-medium">
            
            {/* Collections Link */}
            <Link
              href="/products"
              className="text-neutral-300 hover:text-[#c5a880] hover-underline-gold transition-colors whitespace-nowrap font-bold"
            >
              Collections
            </Link>

            {/* Admin Dashboard */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors whitespace-nowrap font-bold"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-[#c5a880]" />
              <span>Admin</span>
            </Link>

            {/* Cart Link */}
            <Link
              href="/cart"
              className="flex items-center gap-2 hover:text-[#c5a880] transition-colors font-bold text-neutral-200"
            >
              <div className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a880] text-[9px] font-black text-black shadow-md border border-[#08080a]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>

            {/* Minimalist Login/Logout Button */}
            {user ? (
              <button
                onClick={() => signOut()}
                className="border border-white/10 hover:border-rose-500/50 text-neutral-300 hover:text-rose-400 px-6 py-1.5 rounded-full transition-all font-bold tracking-widest uppercase cursor-pointer"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="border border-[#c5a880]/30 hover:border-[#c5a880] text-[#c5a880] hover:bg-[#c5a880]/5 px-6 py-1.5 rounded-full transition-all font-bold tracking-widest uppercase text-center"
              >
                Login
              </Link>
            )}

          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <Link href="/cart" className="relative p-1 text-white">
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a880] text-[9px] font-black text-black">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-white hover:text-[#c5a880] transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu & Search */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#08080a]/95 backdrop-blur-lg border-t border-white/5 px-4 py-6 space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111115] border border-white/10 text-white text-xs px-3.5 py-2.5 pr-10 rounded-full focus:outline-none focus:border-[#c5a880]"
            />
            <button type="submit" className="absolute right-0 top-0 h-full px-3.5 text-[#c5a880]">
              <Search className="h-4 w-4" />
            </button>
          </form>
          <div className="space-y-4 text-xs tracking-wider uppercase font-semibold text-neutral-300">
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-[#c5a880] transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 py-2 text-neutral-400 hover:text-white"
            >
              <ShieldAlert className="h-4 w-4 text-[#c5a880]" />
              <span>Admin Dashboard</span>
            </Link>
            {user ? (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full border border-white/10 text-neutral-400 hover:text-rose-400 font-bold text-xs py-2.5 rounded-full mt-4 tracking-widest uppercase cursor-pointer"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block border border-[#c5a880]/30 text-[#c5a880] hover:bg-[#c5a880]/10 font-bold text-xs py-2.5 rounded-full mt-4 tracking-widest uppercase text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
