'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/cart-context';
import { CreditCard, Truck, User, ArrowLeft, ArrowRight, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart();

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);
  const [submitError, setSubmitError] = useState('');

  const originalTotal = cartTotal * 1.35;
  const totalSavings = originalTotal - cartTotal;
  const shippingCost = cartTotal >= 150 ? 0 : 15;
  const grandTotal = cartTotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    
    // Card Validation
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Invalid card number';
    }
    if (!formData.cardExpiry.trim()) {
      newErrors.cardExpiry = 'Expiry is required';
    } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = 'Use MM/YY format';
    }
    if (!formData.cardCvc.trim()) {
      newErrors.cardCvc = 'CVC is required';
    } else if (formData.cardCvc.length < 3) {
      newErrors.cardCvc = 'Invalid CVC';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          items: cart.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
          total: grandTotal,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit order');
      }

      setOrderSuccess(data);
      clearCart();
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      
      /* Success Screen */
      <div className="bg-[#08080a] min-h-screen py-12 font-sans text-neutral-100 text-left">
        <div className="mx-auto max-w-lg bg-[#111115] border border-white/5 rounded-lg p-8 text-center shadow-2xl">
          <div className="relative inline-block mb-6">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#c5a880]/15 border border-[#c5a880]/20 text-[#c5a880]">
              <CheckCircle className="h-8 w-8 animate-pulse" />
            </div>
          </div>

          <div className="space-y-4 mb-8 text-center">
            <h1 className="text-xl font-light font-serif-luxury uppercase tracking-widest text-white">Acquisition Complete</h1>
            <p className="text-xs text-neutral-400">
              Thank you for choosing <span className="font-bold text-white">V ONE Atelier</span>. Your curated wardrobe update has been reserved and is processing.
            </p>
            
            <div className="bg-[#16161c] rounded-md border border-white/5 p-5 text-xs space-y-3 max-w-md mx-auto text-left">
              <div className="flex justify-between border-b border-white/5 pb-2.5">
                <span className="text-neutral-500 uppercase tracking-widest text-[9px] font-bold">Acquisition ID</span>
                <span className="font-mono text-neutral-200 text-xs font-bold">{orderSuccess.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 uppercase tracking-widest text-[9px] font-bold">Client</span>
                <span className="font-semibold text-white">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 uppercase tracking-widest text-[9px] font-bold">Destination</span>
                <span className="font-semibold text-neutral-200 max-w-[220px] truncate">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-2.5 font-bold text-white">
                <span className="uppercase tracking-wider text-[9px] font-bold text-neutral-400">Amount Paid</span>
                <span className="text-[#c5a880] font-bold text-sm">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#c5a880] hover:bg-white text-black hover:text-black border border-[#c5a880] hover:border-white px-8 py-3 text-xs font-bold uppercase tracking-widest shadow-md transition-all duration-300"
          >
            <span>Return to Catalog</span>
            <Sparkles className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-[#08080a] min-h-screen py-16 font-sans text-center text-neutral-100">
        <h2 className="text-base font-light font-serif-luxury uppercase tracking-wider mb-2">No Items For Acquisition</h2>
        <p className="text-xs text-neutral-500 mb-6">Your shopping bag is currently empty.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#c5a880] text-black px-6 py-2.5 text-xs font-bold uppercase tracking-widest shadow-md hover:bg-white transition-all duration-300"
        >
          Browse Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#08080a] min-h-screen py-6 font-sans text-neutral-100 text-left">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        
        {/* Breadcrumb back */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#c5a880] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Bag</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Checkout Forms (Left Column) */}
          <div className="lg:col-span-8 space-y-4">
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              
              {/* Step 1: Customer Info */}
              <div className="bg-[#111115] rounded-lg border border-white/5 shadow-xl p-5 sm:p-6 space-y-5">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2 border-b border-white/5 pb-3.5">
                  <User className="h-4 w-4 text-[#c5a880]" />
                  1. Client Details
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full atelier-input"
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && <span className="text-[10px] text-red-405 font-bold block">{errors.name}</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full atelier-input"
                      placeholder="e.g. john@example.com"
                    />
                    {errors.email && <span className="text-[10px] text-red-405 font-bold block">{errors.email}</span>}
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Phone Number (Optional)</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full atelier-input"
                    placeholder="e.g. +1 (555) 000-0000"
                  />
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="bg-[#111115] rounded-lg border border-white/5 shadow-xl p-5 sm:p-6 space-y-5">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2 border-b border-white/5 pb-3.5">
                  <Truck className="h-4 w-4 text-[#c5a880]" />
                  2. Destination Address
                </h2>
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full atelier-input"
                    placeholder="e.g. 123 Main St"
                  />
                  {errors.address && <span className="text-[10px] text-red-405 font-bold block">{errors.address}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full atelier-input"
                      placeholder="e.g. Portland"
                    />
                    {errors.city && <span className="text-[10px] text-red-405 font-bold block">{errors.city}</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Postal / ZIP Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full atelier-input"
                      placeholder="e.g. 97201"
                    />
                    {errors.postalCode && <span className="text-[10px] text-red-405 font-bold block">{errors.postalCode}</span>}
                  </div>
                </div>
              </div>

              {/* Step 3: Payment */}
              <div className="bg-[#111115] rounded-lg border border-white/5 shadow-xl p-5 sm:p-6 space-y-5">
                <h2 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2 border-b border-white/5 pb-3.5">
                  <CreditCard className="h-4 w-4 text-[#c5a880]" />
                  3. Secure Payment Details
                </h2>
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                      setFormData((p) => ({ ...p, cardNumber: val.slice(0, 19) }));
                    }}
                    className="w-full atelier-input"
                    placeholder="e.g. 4111 2222 3333 4444"
                  />
                  {errors.cardNumber && <span className="text-[10px] text-red-405 font-bold block">{errors.cardNumber}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Expiry Date</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\//g, '');
                        if (val.length > 2) {
                          val = val.slice(0, 2) + '/' + val.slice(2, 4);
                        }
                        setFormData((p) => ({ ...p, cardExpiry: val.slice(0, 5) }));
                      }}
                      className="w-full atelier-input"
                      placeholder="e.g. MM/YY"
                    />
                    {errors.cardExpiry && <span className="text-[10px] text-red-405 font-bold block">{errors.cardExpiry}</span>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">CVC / Security Code</label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={(e) => setFormData((p) => ({ ...p, cardCvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      className="w-full atelier-input"
                      placeholder="e.g. 123"
                    />
                    {errors.cardCvc && <span className="text-[10px] text-red-405 font-bold block">{errors.cardCvc}</span>}
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/10 bg-red-950/20 p-4 text-xs text-red-400">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Place Order Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#c5a880] text-black border border-[#c5a880] hover:bg-transparent hover:text-[#c5a880] font-bold uppercase rounded-full text-xs py-4 shadow-lg tracking-widest transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin inline-block" />
                ) : (
                  <span>Acquire Wardrobe Update - ${grandTotal.toFixed(2)}</span>
                )}
              </button>

            </form>
          </div>

          {/* Right Column: Price Details */}
          <div className="lg:col-span-4 bg-[#111115] rounded-lg border border-white/5 shadow-xl p-5 space-y-6">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-3">
              Acquisition Summary
            </h3>
            
            <div className="space-y-4 text-xs text-neutral-405">
              <div className="flex justify-between">
                <span>Value ({cartCount} items)</span>
                <span className="text-white font-semibold">${originalTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Atelier Discount</span>
                <span className="text-emerald-500 font-bold">- ${totalSavings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured Delivery</span>
                <span>
                  {shippingCost === 0 ? <span className="text-emerald-500 font-bold">Complimentary</span> : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-dashed border-white/10 pt-4 text-sm font-light text-white font-serif-luxury tracking-wider">
                <span className="uppercase">Total Payable</span>
                <span className="text-[#c5a880] font-bold text-base">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-dashed border-white/10 pt-4 text-xs font-medium text-emerald-500 text-center">
              Acquisition Savings Applied: ${totalSavings.toFixed(2)}
            </div>

            {/* List of items summary */}
            <div className="border-t border-white/5 pt-4">
              <h4 className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-3">Acquired Items</h4>
              <div className="divide-y divide-white/5 max-h-[200px] overflow-y-auto pr-1">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between py-2.5 text-xs">
                    <span className="text-neutral-300 truncate max-w-[170px]">{product.name} (x{quantity})</span>
                    <span className="font-semibold text-white">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
