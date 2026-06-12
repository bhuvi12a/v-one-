'use client';

import React, { useState } from 'react';
import { useCart } from './cart-context';
import { Product } from '../types';
import { ShoppingCart, Check } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  showIcon?: boolean;
}

export default function AddToCartButton({ product, className = '', showIcon = true }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const isOutOfStock = product.inventory <= 0;

  return (
    <button
      onClick={handleAdd}
      disabled={isOutOfStock || added}
      className={`w-full inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 border select-none ${
        isOutOfStock
          ? 'bg-[#16161c]/50 text-neutral-600 border-white/5 cursor-not-allowed'
          : added
          ? 'bg-emerald-700 text-white border-emerald-700'
          : 'bg-[#c5a880] text-black border-[#c5a880] hover:bg-transparent hover:text-[#c5a880] hover:border-[#c5a880] shadow-sm shadow-[#c5a880]/10'
      } ${className}`}
    >
      {added ? (
        <>
          <Check className="h-3.5 w-3.5" />
          <span>Added to Bag</span>
        </>
      ) : isOutOfStock ? (
        <span>Sold Out</span>
      ) : (
        <>
          {showIcon && <ShoppingCart className="h-3.5 w-3.5 shrink-0" />}
          <span>Add to Bag</span>
        </>
      )}
    </button>
  );
}
