'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart-context';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Compass } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  const originalTotal = cartTotal * 1.35; // Mock original list total
  const totalSavings = originalTotal - cartTotal;
  const shippingCost = cartTotal >= 150 ? 0 : cartTotal > 0 ? 15 : 0;
  const grandTotal = cartTotal + shippingCost;

  return (
    <div className="bg-[#08080a] min-h-screen py-6 font-sans text-neutral-100 text-left">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        
        {cart.length === 0 ? (
          
          /* Empty Cart Panel */
          <div className="bg-[#111115] rounded-lg border border-white/5 p-16 text-center flex flex-col items-center justify-center shadow-xl">
            <div className="h-16 w-16 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 flex items-center justify-center text-[#c5a880] mb-6 animate-pulse">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <h3 className="text-base font-light font-serif-luxury uppercase tracking-widest text-white">Your Shopping Bag is Empty</h3>
            <p className="text-xs text-neutral-500 max-w-xs mt-2.5 leading-relaxed">
              Explore our tailored suits, weekend linen shirts, and premium activewear collections.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-[#c5a880] hover:bg-white text-black hover:text-black border border-[#c5a880] hover:border-white px-8 py-3 text-xs font-bold uppercase tracking-widest shadow-md transition-all duration-300"
            >
              Discover Collection
            </Link>
          </div>
        ) : (
          
          /* Luxury Cart Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Side: Cart items and Place Order bar */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Header */}
              <div className="bg-[#111115] rounded-lg border border-white/5 shadow-xl px-5 py-4 flex justify-between items-center">
                <h1 className="text-sm font-bold uppercase tracking-wider text-white">
                  Shopping Bag ({cartCount})
                </h1>
                <span className="text-xs text-neutral-400">Atelier Delivery: <span className="text-[#c5a880] font-bold">Standard Insured</span></span>
              </div>

              {/* Items List */}
              <div className="bg-[#111115] rounded-lg border border-white/5 shadow-xl divide-y divide-white/5">
                {cart.map(({ product, quantity }) => {
                  const itemOriginal = product.price * 1.35;
                  const itemDiscount = 25;
                  return (
                    <div key={product.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      
                      {/* Image and Details */}
                      <div className="flex gap-5 items-start flex-1">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-20 w-20 rounded-md object-contain border border-white/5 bg-[#16161c] p-1.5"
                        />
                        <div className="space-y-1.5">
                          <Link href={`/products/${product.id}`} className="text-xs font-semibold text-white hover:text-[#c5a880] transition-colors line-clamp-1 leading-snug">
                            {product.name}
                          </Link>
                          <span className="text-[9px] text-[#c5a880] font-bold uppercase tracking-widest block">{product.category}</span>
                          <span className="text-[10px] text-neutral-500 block">Fulfillment: V ONE Premium Atelier</span>
                          
                          {/* Prices */}
                          <div className="flex items-baseline gap-2.5 pt-1">
                            <span className="text-sm font-bold text-white">${(product.price * quantity).toFixed(2)}</span>
                            <span className="text-xs text-neutral-500 line-through">${(itemOriginal * quantity).toFixed(2)}</span>
                            <span className="text-[10px] font-bold text-emerald-500">{itemDiscount}% Off</span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls & Remove Action */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 w-full sm:w-auto self-stretch sm:self-auto border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                        
                        {/* Adjuster */}
                        <div className="flex items-center rounded-full border border-white/10 bg-[#16161c] p-1">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#111115] text-neutral-400 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-white">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            disabled={quantity >= product.inventory}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#111115] text-neutral-400 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Flat Actions */}
                        <div>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-[10px] font-bold text-neutral-500 hover:text-red-400 uppercase tracking-widest transition-colors flex items-center gap-1.5"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="bg-[#111115] rounded-lg border border-white/5 shadow-xl p-5 flex justify-end items-center">
                <Link
                  href="/checkout"
                  className="bg-[#c5a880] text-black border border-[#c5a880] hover:bg-transparent hover:text-[#c5a880] font-bold uppercase rounded-full text-xs py-3.5 px-10 shadow-lg tracking-widest transition-all duration-300"
                >
                  Proceed to Acquisition
                </Link>
              </div>

            </div>

            {/* Right Side: Price Details (Luxury Sidebar Summary) */}
            <div className="lg:col-span-4 bg-[#111115] rounded-lg border border-white/5 shadow-xl p-5 space-y-5">
              
              <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-3">
                Acquisition Summary
              </h3>
              
              <div className="space-y-4 text-xs text-neutral-400">
                
                <div className="flex justify-between">
                  <span>Price ({cartCount} items)</span>
                  <span className="text-white font-semibold">${originalTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Atelier Discount</span>
                  <span className="text-emerald-500 font-bold">- ${totalSavings.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Insured Delivery</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-500 font-bold">Complimentary</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between border-t border-dashed border-white/10 pt-4 text-sm font-light text-white font-serif-luxury tracking-wider">
                  <span className="uppercase">Total Valuation</span>
                  <span className="text-[#c5a880] font-bold text-base">${grandTotal.toFixed(2)}</span>
                </div>

              </div>

              {/* Savings disclaimer */}
              <div className="border-t border-dashed border-white/10 pt-4 text-xs font-medium text-emerald-500 text-center">
                Atelier Savings Applied: ${totalSavings.toFixed(2)}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
