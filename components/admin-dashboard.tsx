'use client';

import React, { useState } from 'react';
import { Product, Order } from '../types';
import { BarChart3, Plus, Edit2, Trash2, Package, ShoppingCart, DollarSign, AlertTriangle, ShieldCheck, X, Check, ArrowRight } from 'lucide-react';

interface AdminDashboardProps {
  initialProducts: Product[];
  initialOrders: Order[];
}

export default function AdminDashboard({ initialProducts, initialOrders }: AdminDashboardProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  
  // Product Form State (Add / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    inventory: '',
  });

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const lowStockCount = products.filter((p) => p.inventory < 5).length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open form for adding new product
  const handleAddClick = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      inventory: '10',
    });
    setFormError('');
    setFormSuccess('');
    setIsFormOpen(true);
  };

  // Open form for editing existing product
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      inventory: product.inventory.toString(),
    });
    setFormError('');
    setFormSuccess('');
    setIsFormOpen(true);
  };

  // Submit product (Create / Update)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    
    // Validations
    if (!formData.name || !formData.price || !formData.category || !formData.inventory) {
      setFormError('Please fill out all required fields');
      return;
    }

    const priceNum = parseFloat(formData.price);
    const invNum = parseInt(formData.inventory);

    if (isNaN(priceNum) || priceNum <= 0) {
      setFormError('Price must be a positive number');
      return;
    }
    if (isNaN(invNum) || invNum < 0) {
      setFormError('Inventory cannot be negative');
      return;
    }

    setIsSubmitting(true);

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: priceNum,
          image: formData.image || 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=600&q=80',
          category: formData.category,
          inventory: invNum,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save product');
      }

      if (editingProduct) {
        setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? data : p)));
        setFormSuccess('Product updated successfully!');
      } else {
        setProducts((prev) => [data, ...prev]);
        setFormSuccess('Product created successfully!');
      }

      setTimeout(() => {
        setIsFormOpen(false);
        setEditingProduct(null);
      }, 1000);

    } catch (err: any) {
      setFormError(err.message || 'An error occurred while saving the product');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete product');
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete product');
    }
  };

  return (
    <div className="bg-[#08080a] min-h-screen py-6 font-sans text-neutral-100 text-left">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        
        {/* Title row */}
        <div className="bg-[#111115] rounded-lg border border-white/5 shadow-xl p-5 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-base font-bold uppercase tracking-wider text-white">Atelier Dashboard</h1>
            <p className="text-xs text-neutral-500 mt-0.5">Real-time inventory levels, orders summary, and sales analytics.</p>
          </div>
          
          {/* Tabs */}
          <div className="flex rounded-full border border-white/5 bg-[#16161c] p-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`rounded-full px-5 py-2 transition-all cursor-pointer ${
                activeTab === 'overview' ? 'bg-[#c5a880] text-black shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`rounded-full px-5 py-2 transition-all cursor-pointer ${
                activeTab === 'products' ? 'bg-[#c5a880] text-black shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`rounded-full px-5 py-2 transition-all cursor-pointer ${
                activeTab === 'orders' ? 'bg-[#c5a880] text-black shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Orders ({orders.length})
            </button>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            
            {/* Cards row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Revenue */}
              <div className="bg-[#111115] rounded-lg border border-white/5 p-5 flex items-center gap-4 shadow-xl relative overflow-hidden">
                <div className="h-10 w-10 rounded-full bg-emerald-950/20 text-emerald-400 flex items-center justify-center border border-emerald-900/20 shrink-0">
                  <DollarSign className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block">Total Revenue</span>
                  <span className="text-xl font-light text-white mt-1 block">${totalRevenue.toFixed(2)}</span>
                </div>
              </div>

              {/* Sales */}
              <div className="bg-[#111115] rounded-lg border border-white/5 p-5 flex items-center gap-4 shadow-xl relative overflow-hidden">
                <div className="h-10 w-10 rounded-full bg-[#c5a880]/10 text-[#c5a880] flex items-center justify-center border border-[#c5a880]/20 shrink-0">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block">Total Orders</span>
                  <span className="text-xl font-light text-white mt-1 block">{totalOrders}</span>
                </div>
              </div>

              {/* Avg Order */}
              <div className="bg-[#111115] rounded-lg border border-white/5 p-5 flex items-center gap-4 shadow-xl relative overflow-hidden">
                <div className="h-10 w-10 rounded-full bg-indigo-950/20 text-indigo-400 flex items-center justify-center border border-indigo-900/20 shrink-0">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block">Avg Ticket</span>
                  <span className="text-xl font-light text-white mt-1 block">${avgOrderValue.toFixed(2)}</span>
                </div>
              </div>

              {/* Low Stock */}
              <div className="bg-[#111115] rounded-lg border border-white/5 p-5 flex items-center gap-4 shadow-xl relative overflow-hidden">
                <div className="h-10 w-10 rounded-full bg-amber-950/20 text-amber-400 flex items-center justify-center border border-amber-900/20 shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block">Low Stock Items</span>
                  <span className="text-xl font-light text-white mt-1 block">{lowStockCount}</span>
                </div>
              </div>

            </div>

            {/* Chart Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              
              {/* Sales Chart */}
              <div className="lg:col-span-8 bg-[#111115] rounded-lg border border-white/5 p-5 shadow-xl">
                <h3 className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Monthly Sales Growth</h3>
                
                <div className="h-[200px] w-full flex items-end justify-between border-b border-l border-white/5 pb-2 pl-2 relative">
                  <svg className="absolute inset-0 h-full w-full pointer-events-none px-2 pb-2" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M 0 90 Q 20 80 40 50 T 80 20 T 100 10 L 100 100 L 0 100 Z" fill="rgba(197, 168, 128, 0.05)" />
                    <path d="M 0 90 Q 20 80 40 50 T 80 20 T 100 10" fill="none" stroke="#c5a880" strokeWidth="1.5" />
                  </svg>
                  
                  <div className="absolute left-4 top-2 text-[9px] text-neutral-600 font-bold">$1000</div>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] text-neutral-600 font-bold">$500</div>
                  <div className="absolute left-4 bottom-4 text-[9px] text-neutral-600 font-bold">$0</div>
                </div>

                <div className="flex justify-between items-center text-[9px] text-neutral-550 font-bold px-4 pt-2.5 uppercase tracking-widest">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>

              {/* Transactions list */}
              <div className="lg:col-span-4 bg-[#111115] rounded-lg border border-white/5 p-5 shadow-xl space-y-4">
                <h3 className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest border-b border-white/5 pb-2">Recent Transactions</h3>
                <div className="space-y-3.5">
                  {orders.length === 0 ? (
                    <p className="text-xs text-neutral-500 py-6 text-center">No orders recorded.</p>
                  ) : (
                    orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex justify-between items-center text-xs border-b border-white/5 pb-3">
                        <div className="text-left space-y-1">
                          <span className="font-semibold text-white block leading-none">{order.customerName}</span>
                          <span className="text-[9px] text-neutral-500 block">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className="font-bold text-[#c5a880]">${order.total.toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* PRODUCTS MANAGEMENT TAB */}
        {activeTab === 'products' && (
          <div className="bg-[#111115] rounded-lg border border-white/5 shadow-xl p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-white/5 pb-3.5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-white">Inventory Items ({products.length})</h2>
              <button
                onClick={handleAddClick}
                className="bg-[#c5a880] hover:bg-white text-black font-bold px-5 py-2 text-xs rounded-full shadow-md uppercase tracking-wider transition-colors cursor-pointer"
              >
                Add Product
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-white/5 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-[#16161c] text-neutral-400 uppercase tracking-wider text-[10px] font-bold">
                    <th className="p-3.5">Product Info</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5 text-right">Valuation</th>
                    <th className="p-3.5 text-center">Stock</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-[#16161c]/50 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-9 w-9 rounded-md object-contain border border-white/5 bg-white p-0.5"
                        />
                        <div className="text-left space-y-0.5">
                          <span className="font-bold text-white block line-clamp-1">{product.name}</span>
                          <span className="text-[9px] text-neutral-500 font-mono block">{product.id}</span>
                        </div>
                      </td>
                      <td className="p-3.5 text-neutral-400 font-medium">{product.category}</td>
                      <td className="p-3.5 text-right font-bold text-neutral-200">${product.price.toFixed(2)}</td>
                      <td className="p-3.5 text-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold border ${
                          product.inventory <= 0
                            ? 'bg-red-950/20 text-red-400 border-red-900/30'
                            : product.inventory < 5
                            ? 'bg-amber-950/20 text-amber-400 border-amber-900/30'
                            : 'bg-emerald-950/20 text-emerald-400 border-emerald-900/30'
                        }`}>
                          {product.inventory}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="h-7 w-7 rounded-full border border-white/10 text-neutral-400 hover:text-[#c5a880] hover:border-[#c5a880] hover:bg-white/5 flex items-center justify-center transition-all cursor-pointer"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="h-7 w-7 rounded-full border border-transparent text-neutral-500 hover:text-red-400 hover:bg-red-950/20 flex items-center justify-center transition-all cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="bg-[#111115] rounded-lg border border-white/5 shadow-xl p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-white border-b border-white/5 pb-3.5">Customer Purchases ({orders.length})</h2>
            
            <div className="overflow-x-auto border border-white/5 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-[#16161c] text-neutral-400 uppercase tracking-wider text-[10px] font-bold">
                    <th className="p-3.5">Client</th>
                    <th className="p-3.5">Acquisition Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Total</th>
                    <th className="p-3.5 text-center">Items Purchased</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-neutral-500">
                        No orders recorded yet.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#16161c]/50 transition-colors">
                        <td className="p-3.5">
                          <div className="text-left space-y-1">
                            <span className="font-bold text-white block">{order.customerName}</span>
                            <span className="text-[10px] text-neutral-550 block">{order.customerEmail}</span>
                          </div>
                        </td>
                        <td className="p-3.5 text-neutral-400 font-medium">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center rounded-full bg-blue-950/20 text-blue-400 border border-blue-900/30 px-2.5 py-0.5 text-[9px] font-bold">
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right font-extrabold text-[#c5a880]">${order.total.toFixed(2)}</td>
                        <td className="p-3.5 text-center text-neutral-400 font-bold">{order.items?.length || 0}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

      {/* FORM MODAL PANEL */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg h-full border-l border-white/5 bg-[#111115] p-6 overflow-y-auto space-y-6 shadow-2xl relative flex flex-col justify-between text-neutral-300">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3.5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                  <Package className="h-4.5 w-4.5 text-[#c5a880]" />
                  <span>{editingProduct ? 'Edit Catalog Product' : 'Add Catalog Product'}</span>
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-white/10 text-neutral-500 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full atelier-input animate-none"
                    placeholder="e.g. Premium Linen Summer Shirt"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full atelier-input resize-none"
                    placeholder="Describe craftsmanship, fit, materials..."
                  />
                </div>

                {/* Price and Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Valuation Price ($) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full atelier-input"
                      placeholder="e.g. 129.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Inventory Stock *</label>
                    <input
                      type="number"
                      name="inventory"
                      value={formData.inventory}
                      onChange={handleInputChange}
                      className="w-full atelier-input"
                      placeholder="e.g. 15"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full atelier-input"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-neutral-450 uppercase tracking-widest block">Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full atelier-input"
                    placeholder="e.g. Casual Wear, Formal Wear..."
                  />
                </div>

                {/* Messages */}
                {formError && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-500/10 bg-red-950/20 p-3 text-xs text-red-400">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}
                {formSuccess && (
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-500/10 bg-emerald-950/20 p-3 text-xs text-emerald-400">
                    <Check className="h-4 w-4 shrink-0" />
                    <span>{formSuccess}</span>
                  </div>
                )}

              </form>
            </div>

            <div className="border-t border-white/5 pt-4 mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsFormOpen(false)}
                className="rounded-full border border-white/10 px-5 py-2 text-xs font-bold text-neutral-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                disabled={isSubmitting}
                className="rounded-full bg-[#c5a880] hover:bg-white text-black font-bold px-6 py-2 text-xs transition-all shadow-md uppercase tracking-wider cursor-pointer"
              >
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
