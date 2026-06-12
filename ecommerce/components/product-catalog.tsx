'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Product } from '../types';
import { Search, SlidersHorizontal, ArrowUpDown, Tag, Star, ChevronDown, Check } from 'lucide-react';
import AddToCartButton from './add-to-cart-button';

interface ProductCatalogProps {
  initialProducts: Product[];
}

export default function ProductCatalog({ initialProducts }: ProductCatalogProps) {
  const searchParams = useSearchParams();
  
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [maxPrice, setMaxPrice] = useState(1000);

  // Sync category & search filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery('');
    }
  }, [searchParams]);

  // Extract categories
  const categories = useMemo(() => {
    const cats = new Set(initialProducts.map((p) => p.category));
    return ['All', ...Array.from(cats)];
  }, [initialProducts]);

  // Dynamic values helper (rating, original price, discount)
  const getFkMetadata = (product: Product) => {
    // Generate stable rating based on product name
    const nameSum = product.name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const rating = ((nameSum % 10) * 0.1 + 4.0).toFixed(1); // Between 4.0 and 4.9
    const reviewsCount = (nameSum * 3) % 2500 + 100;
    
    // Generate stable markup for original price
    const originalPrice = product.price * 1.35; // 35% original markup
    const discountPercent = 25; // 25% off stable discount
    
    return { rating, reviewsCount, originalPrice, discountPercent };
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [initialProducts, searchQuery, selectedCategory, sortBy, maxPrice]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('default');
    setMaxPrice(1000);
  };

  return (
    <div className="bg-[#08080a] min-h-screen py-6 text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="text-[10px] text-neutral-500 uppercase tracking-widest flex gap-2 mb-6 text-left items-center">
          <Link href="/" className="hover:text-[#c5a880] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-neutral-300 font-bold">Collections</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: FILTERS (Atelier Sidebar Style) */}
          <aside className="md:col-span-3 space-y-4 md:sticky md:top-20">
            <div className="bg-[#111115] rounded-lg border border-white/5 p-5 text-left space-y-6 shadow-xl">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs uppercase tracking-wider font-bold text-white">Filters</span>
                {(selectedCategory !== 'All' || searchQuery !== '' || maxPrice < 1000) && (
                  <button
                    onClick={resetFilters}
                    className="text-[9px] font-bold text-[#c5a880] uppercase tracking-wider hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Active Search Badge */}
              {searchQuery && (
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Query</span>
                  <div className="inline-flex items-center gap-1.5 bg-[#16161c] border border-white/5 rounded-full pl-3 pr-2 py-1 text-xs text-neutral-300">
                    <span>"{searchQuery}"</span>
                    <button onClick={() => setSearchQuery('')} className="p-0.5 rounded-full hover:bg-white/10 text-neutral-500 hover:text-white transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="space-y-3 border-b border-white/5 pb-5">
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Categories</span>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block text-xs text-left w-full py-1 transition-colors ${
                        selectedCategory === cat ? 'text-[#c5a880] font-bold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cat === 'All' ? 'All Products' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-3 border-b border-white/5 pb-5">
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Price Limit</span>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#c5a880] h-1 bg-white/5 rounded-lg cursor-pointer border-none"
                />
                <div className="flex justify-between items-center text-xs text-neutral-450 mt-1">
                  <span className="text-neutral-500">Min: $10</span>
                  <span className="font-bold text-[#c5a880]">Max: ${maxPrice}</span>
                </div>
              </div>

              {/* Sorting */}
              <div className="space-y-3">
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider block">Sort Collections</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full text-xs border border-white/5 px-3 py-2 rounded bg-[#16161c] text-white focus:outline-none focus:border-[#c5a880]"
                >
                  <option value="default">Default: Popularity</option>
                  <option value="price-low">Price -- Low to High</option>
                  <option value="price-high">Price -- High to Low</option>
                  <option value="name-asc">Product Name: A to Z</option>
                </select>
              </div>

            </div>
          </aside>

          {/* RIGHT COLUMN: PRODUCT GRID (Atelier Cards Style) */}
          <main className="md:col-span-9 space-y-4">
            
            {/* Catalog Info Strip */}
            <div className="border-b border-white/5 pb-4 mb-2 flex items-center justify-between text-left">
              <div>
                <h2 className="text-lg font-light font-serif-luxury uppercase tracking-wider text-white">Collections Catalog</h2>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mt-1">Showing {filteredProducts.length} items</span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              
              /* Empty Search State */
              <div className="py-20 text-center space-y-4 bg-[#111115] border border-white/5 rounded-lg">
                <h3 className="text-sm font-bold text-neutral-300">No results found</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Try checking your spelling, adjusting price ranges, or removing specific filter categories.
                </p>
                <button
                  onClick={resetFilters}
                  className="rounded-full bg-[#c5a880] text-black px-6 py-2.5 text-xs font-bold shadow-md hover:bg-white transition-colors uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              
              /* Luxury Cards Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => {
                  const meta = getFkMetadata(product);
                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col rounded-lg bg-[#111115] border border-white/5 hover:border-[#c5a880]/20 transition-all duration-300 p-4 text-left relative overflow-hidden"
                    >
                      {/* Product Image */}
                      <Link href={`/products/${product.id}`} className="aspect-[4/3] block overflow-hidden relative mb-4 bg-[#16161c] rounded-md border border-white/5 p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-grow flex flex-col justify-between space-y-3.5">
                        
                        {/* Title & Rating */}
                        <div className="space-y-1.5">
                          <Link href={`/products/${product.id}`} className="block">
                            <h3 className="text-xs font-semibold text-neutral-200 hover:text-[#c5a880] transition-colors line-clamp-1 leading-snug">
                              {product.name}
                            </h3>
                          </Link>
                          
                          {/* Ratings */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-[#c5a880] text-xs font-semibold">
                              <Star className="h-3 w-3 fill-[#c5a880] stroke-[#c5a880]" />
                              <span>{meta.rating}</span>
                            </div>
                            <span className="text-[10px] text-neutral-500 font-medium">({meta.reviewsCount} reviews)</span>
                          </div>
                        </div>

                        {/* Prices */}
                        <div className="space-y-3 pt-2.5 border-t border-white/5">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-bold text-white">${product.price.toFixed(2)}</span>
                            <span className="text-xs text-neutral-500 line-through font-medium">${meta.originalPrice.toFixed(2)}</span>
                            <span className="text-[10px] font-bold text-emerald-500">{meta.discountPercent}% OFF</span>
                          </div>
                          <span className="text-[9px] text-[#c5a880] font-bold uppercase tracking-widest block">Complimentary Shipping</span>
                        </div>

                        {/* Cart Trigger */}
                        <div className="pt-1">
                          <AddToCartButton product={product} className="w-full" />
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
}

// Simple close icon for search badge
function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
