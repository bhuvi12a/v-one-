'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '../types';
import { useCart } from './cart-context';
import { ShoppingCart, Check, Plus, Minus, Star, Compass, Award, ShieldCheck, Tag } from 'lucide-react';

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const nameSum = product.name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const rating = ((nameSum % 10) * 0.1 + 4.0).toFixed(1);
  const reviewsCount = (nameSum * 3) % 2500 + 100;
  const originalPrice = product.price * 1.35;
  const discountPercent = 25;

  const incrementQty = () => {
    setQty((prev) => Math.min(prev + 1, product.inventory));
  };

  const decrementQty = () => {
    setQty((prev) => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    router.push('/checkout');
  };

  const isOutOfStock = product.inventory <= 0;

  // Specifications list
  const getSpecs = () => {
    switch (product.category) {
      case 'Formal Wear':
        return [
          { name: 'Style Code', value: 'MS-FORMAL-WOOL-01' },
          { name: 'Fabric', value: '100% Merino Wool or Premium Cotton' },
          { name: 'Occasion', value: 'Formal / Wedding' },
          { name: 'Fit', value: 'Slim Fit / Custom Tailored' },
          { name: 'Pattern', value: 'Solid / Textured' },
        ];
      case 'Casual Wear':
        return [
          { name: 'Style Code', value: 'MS-CASUAL-PIMA-03' },
          { name: 'Fabric', value: '100% Pima Cotton or Flax Linen' },
          { name: 'Occasion', value: 'Casual / Outing' },
          { name: 'Sleeve Length', value: 'Short Sleeve / Full Sleeve' },
          { name: 'Fit', value: 'Regular Fit / Relaxed' },
        ];
      case 'Ethnic Wear':
        return [
          { name: 'Style Code', value: 'MS-ETHNIC-SILK-07' },
          { name: 'Fabric', value: 'Brocade Silk / Chikankari Cotton' },
          { name: 'Occasion', value: 'Festive / Wedding Ceremony' },
          { name: 'Includes', value: 'Kurta/Sherwani & Churidar Pants' },
          { name: 'Collar', value: 'Mandarin Collar' },
        ];
      default: // Activewear
        return [
          { name: 'Style Code', value: 'MS-ACTIVE-TERRY-02' },
          { name: 'Fabric', value: 'French Terry Cotton / Polyester Blend' },
          { name: 'Occasion', value: 'Active / Sports Daily Wear' },
          { name: 'Fit', value: 'Regular Comfort Fit' },
          { name: 'Pockets', value: 'Kangaroo Front Pockets' },
        ];
    }
  };

  return (
    <div className="bg-[#08080a] min-h-screen py-6 text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="text-[10px] text-neutral-500 uppercase tracking-widest flex gap-2 mb-6 items-center text-left">
          <Link href="/" className="hover:text-[#c5a880] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#c5a880] transition-colors">Products</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-[#c5a880] transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-neutral-400 font-bold">{product.name}</span>
        </div>

        {/* Main Product Layout Container */}
        <div className="bg-[#111115] rounded-lg border border-white/5 p-6 sm:p-8 shadow-2xl text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            
            {/* LEFT SIDE: PRODUCT PHOTO & BIG DUAL BUTTONS */}
            <div className="md:col-span-5 flex flex-col items-center">
              
              {/* Photo Box */}
              <div className="w-full aspect-square border border-white/5 bg-[#16161c] rounded-md p-4 flex items-center justify-center mb-6 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain filter brightness-95"
                />
              </div>

              {/* Quantity selectors */}
              {!isOutOfStock && (
                <div className="flex items-center gap-4 mb-6 bg-[#16161c] border border-white/5 rounded-full px-4 py-1.5">
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Qty</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={decrementQty}
                      disabled={qty <= 1}
                      className="flex h-6 w-6 items-center justify-center border border-white/10 bg-[#111115] text-neutral-400 rounded-full hover:bg-white/10 hover:text-white disabled:opacity-20 transition-all"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-white">{qty}</span>
                    <button
                      onClick={incrementQty}
                      disabled={qty >= product.inventory}
                      className="flex h-6 w-6 items-center justify-center border border-white/10 bg-[#111115] text-neutral-400 rounded-full hover:bg-white/10 hover:text-white disabled:opacity-20 transition-all"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Premium Action Buttons: ADD TO BAG & BUY NOW */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || added}
                  className={`flex-1 py-3.5 px-6 text-xs font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-1.5 shadow-md transition-all duration-300 border select-none ${
                    isOutOfStock
                      ? 'bg-neutral-800 text-neutral-500 border-transparent cursor-not-allowed'
                      : added
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-[#c5a880] text-black border-[#c5a880] hover:bg-transparent hover:text-[#c5a880] hover:border-[#c5a880]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : isOutOfStock ? (
                    <span>Sold Out</span>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                {!isOutOfStock && (
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3.5 px-6 text-xs font-bold tracking-widest uppercase rounded-full bg-transparent text-white hover:bg-white hover:text-black border border-white transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm select-none"
                  >
                    <span>Acquire Now</span>
                  </button>
                )}
              </div>

            </div>

            {/* RIGHT SIDE: PRODUCT DESCRIPTION & METADATA */}
            <div className="md:col-span-7 space-y-6 lg:space-y-8">
              
              {/* Category, Title & Rating */}
              <div className="space-y-3">
                <span className="text-[10px] text-[#c5a880] font-bold uppercase tracking-widest block">{product.category}</span>
                <h1 className="text-xl md:text-3xl font-light font-serif-luxury text-white leading-tight">{product.name}</h1>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#c5a880] text-sm font-semibold">
                    <Star className="h-3.5 w-3.5 fill-[#c5a880] stroke-[#c5a880]" />
                    <span>{rating}</span>
                  </div>
                  <span className="text-neutral-500 text-xs font-medium">/</span>
                  <span className="text-xs text-neutral-400 font-semibold">
                    {reviewsCount} Client Reviews
                  </span>
                </div>
              </div>

              {/* Price block */}
              <div className="space-y-2 bg-[#16161c] border border-white/5 p-4 rounded-lg">
                <span className="text-[9px] text-[#c5a880] font-bold uppercase tracking-widest block">Atelier Valuation</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl md:text-3xl font-light text-white">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-neutral-500 line-through font-medium">${originalPrice.toFixed(2)}</span>
                  <span className="text-xs font-bold text-emerald-500">25% Off</span>
                </div>
                <div className="flex items-center gap-2 text-xs pt-1">
                  <span className={`h-2 w-2 rounded-full ${isOutOfStock ? 'bg-red-500' : product.inventory < 5 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${isOutOfStock ? 'text-red-400' : product.inventory < 5 ? 'text-amber-400' : 'text-neutral-400'}`}>
                    {isOutOfStock ? 'Currently Unavailable' : product.inventory < 5 ? `Only ${product.inventory} items remaining` : 'Available in stock'}
                  </span>
                </div>
              </div>

              {/* Atelier Acquisition Benefits */}
              <div className="space-y-3 border-t border-white/5 pt-5">
                <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Atelier Client Services</h3>
                <ul className="space-y-3 text-xs">
                  <li className="flex items-start gap-3">
                    <Compass className="h-4 w-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <p className="text-neutral-300">
                      <span className="font-bold text-white">Private Tailoring:</span> Complimentary length adjustment and styling consultation on all orders.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award className="h-4 w-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <p className="text-neutral-300">
                      <span className="font-bold text-white">Signature Packaging:</span> Delivered in our heritage canvas suit covers or linen-wrapped gift boxes.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="h-4 w-4 text-[#c5a880] shrink-0 mt-0.5" />
                    <p className="text-neutral-300">
                      <span className="font-bold text-white">Complimentary Delivery:</span> Insured shipping worldwide on orders above $150.
                    </p>
                  </li>
                </ul>
              </div>

              {/* Specifications Description Table */}
              <div className="border border-white/5 rounded-lg bg-[#16161c] overflow-hidden mt-6 shadow-lg">
                <div className="bg-[#1c1c24] px-4 py-3 border-b border-white/5">
                  <h3 className="text-[10px] font-bold text-white uppercase tracking-widest text-left">Product Specifications</h3>
                </div>
                <div className="p-4">
                  <dl className="divide-y divide-white/5">
                    {getSpecs().map((spec) => (
                      <div key={spec.name} className="py-3 flex flex-col sm:flex-row text-xs gap-1.5 sm:gap-6">
                        <dt className="text-neutral-500 w-full sm:w-[150px] uppercase tracking-wider text-[10px] font-semibold">{spec.name}</dt>
                        <dd className="font-semibold text-neutral-200 flex-grow">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
