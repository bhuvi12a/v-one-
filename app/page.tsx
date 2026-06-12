import Link from 'next/link';
import { db } from '@/lib/db';
import { Sparkles, Shirt, Heart, Scissors, Flame, Star, ChevronRight } from 'lucide-react';
import AddToCartButton from '@/components/add-to-cart-button';
import { Product } from '@/types';

const categories = [
  { name: 'Formal Wear', icon: Shirt, color: 'text-[#c5a880] bg-[#c5a880]/5' },
  { name: 'Casual Wear', icon: Scissors, color: 'text-[#c5a880] bg-[#c5a880]/5' },
  { name: 'Ethnic Wear', icon: Heart, color: 'text-[#c5a880] bg-[#c5a880]/5' },
  { name: 'Activewear', icon: Flame, color: 'text-[#c5a880] bg-[#c5a880]/5' },
];

export const dynamic = 'force-dynamic';

export default async function Home() {
  let products: Product[] = [];
  try {
    products = await db.product.findMany({
      take: 4,
    });
  } catch (e) {
    console.error('Error loading products for home page:', e);
  }

  // Dynamic values helper (rating, original price, discount)
  const getFkMetadata = (product: Product) => {
    const nameSum = product.name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const rating = ((nameSum % 10) * 0.1 + 4.0).toFixed(1);
    const originalPrice = product.price * 1.35;
    const discountPercent = 25;
    return { rating, originalPrice, discountPercent };
  };

  return (
    <div className="bg-[#08080a] min-h-screen py-6 space-y-10 font-sans text-neutral-100">
      
      {/* 1. Category Strip */}
      <div className="mx-auto max-w-6xl border-b border-white/5 pb-6 px-4 flex justify-around items-center overflow-x-auto gap-4 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name}`}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <div className={`h-12 w-12 rounded-full flex items-center justify-center ${cat.color} group-hover:border-[#c5a880]/60 border border-white/5 transition-all duration-300 shadow-md`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* 2. Hero Billboard Banner */}
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <Link href="/products" className="block group">
          <div 
            className="relative text-white rounded-lg p-8 sm:p-14 flex items-center justify-between shadow-2xl overflow-hidden border border-white/15 transition-all duration-500 hover:border-[#c5a880]/30 min-h-[300px] sm:min-h-[360px]"
            style={{ 
              backgroundImage: "linear-gradient(to right, rgba(8, 8, 10, 0.95) 45%, rgba(8, 8, 10, 0.4) 70%, rgba(8, 8, 10, 0.1) 100%), url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80')",
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          >
            <div className="space-y-6 text-left relative z-10 max-w-lg">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 text-[#c5a880] px-3.5 py-1 text-[9px] font-extrabold uppercase tracking-widest">
                The Atelier Release
              </span>
              <h1 className="text-3xl sm:text-5xl font-light font-serif-luxury tracking-wide leading-tight text-white">
                THE ART OF <br />
                <span className="text-[#c5a880] italic font-normal">TAILORING</span>
              </h1>
              <p className="text-xs text-neutral-400 max-w-sm font-sans leading-relaxed">
                Step into high-performance luxury. Explore premium tailored merino wool suits, breathable flax linen shirts, and hand-embroidered heritage sherwanis.
              </p>
              <div className="pt-2">
                <span
                  className="inline-flex items-center gap-2 bg-[#c5a880] text-black hover:bg-transparent hover:text-[#c5a880] border border-[#c5a880] px-8 py-3 rounded-full text-xs font-bold shadow-lg transition-all duration-300 uppercase tracking-widest"
                >
                  Explore Collections
                  <ChevronRight className="h-3.5 w-3.5 stroke-[2.5]" />
                </span>
              </div>
            </div>

            {/* Glowing Tag overlay on the right */}
            <div className="hidden md:flex flex-col items-end gap-1 absolute right-8 bottom-8 z-10 bg-[#08080a]/80 backdrop-blur-md border border-white/5 p-4 rounded">
              <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">Exclusively Tailored</span>
              <span className="text-[11px] font-semibold text-[#c5a880] uppercase tracking-wider">V ONE COLLECTION</span>
            </div>
          </div>
        </Link>
      </div>

      {/* 3. Deals of the Day Panel */}
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 text-left">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-light font-serif-luxury text-white tracking-wider uppercase">Atelier Highlights</h2>
            <div className="flex items-center gap-1.5 bg-[#c5a880]/10 text-[#c5a880] rounded-full px-3 py-0.5 border border-[#c5a880]/20 text-[9px] font-bold uppercase tracking-widest">
              <span>Seasonal Selection</span>
            </div>
          </div>
          <Link
            href="/products"
            className="rounded-full border border-white/10 hover:border-[#c5a880] text-white hover:text-[#c5a880] bg-transparent px-5 py-2 text-[10px] font-bold transition-all uppercase tracking-wider"
          >
            View Catalog
          </Link>
        </div>

        {/* Products Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => {
            const meta = getFkMetadata(product);
            return (
              <div
                key={product.id}
                className="group flex flex-col rounded-lg border border-white/5 p-4 hover:border-[#c5a880]/20 transition-all duration-300 bg-[#111115] text-left relative overflow-hidden"
              >
                
                {/* Image */}
                <Link href={`/products/${product.id}`} className="aspect-[4/3] block overflow-hidden relative mb-4 bg-[#16161c] rounded-md border border-white/5 p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                </Link>

                {/* Details */}
                <div className="flex-grow flex flex-col justify-between space-y-3">
                  
                  {/* Title & Rating */}
                  <div className="space-y-1.5">
                    <Link href={`/products/${product.id}`} className="block">
                      <h3 className="text-xs font-semibold text-neutral-200 hover:text-[#c5a880] transition-colors line-clamp-1 leading-snug">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[#c5a880] text-xs font-semibold">
                        <Star className="h-3 w-3 fill-[#c5a880] stroke-[#c5a880]" />
                        <span>{meta.rating}</span>
                      </div>
                      <span className="text-[10px] text-neutral-500 font-medium">({Math.floor(product.price * 3) % 200 + 40})</span>
                    </div>
                  </div>

                  {/* Prices & Quick Add */}
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold text-white">${product.price.toFixed(2)}</span>
                      <span className="text-xs text-neutral-500 line-through">${meta.originalPrice.toFixed(2)}</span>
                      <span className="text-[10px] font-bold text-emerald-500">{meta.discountPercent}% OFF</span>
                    </div>
                    <AddToCartButton product={product} className="w-full" />
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
