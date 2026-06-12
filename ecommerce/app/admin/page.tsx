import React from 'react';
import { db } from '@/lib/db';
import AdminDashboard from '@/components/admin-dashboard';
import { Product, Order } from '@/types';

export const revalidate = 0; // Disable cache to reflect real-time dashboard updates

export default async function AdminPage() {
  let products: Product[] = [];
  let orders: Order[] = [];

  try {
    // Fetch products
    products = await db.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Fetch orders with items and product relations
    orders = await db.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    console.error('Failed to load admin dashboard data:', e);
  }

  // Serialize dates for client components
  const serializedProducts = products.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  const serializedOrders = orders.map((o) => ({
    ...o,
    createdAt: o.createdAt.toISOString(),
    updatedAt: o.updatedAt.toISOString(),
    items: o.items.map((item) => ({
      ...item,
      product: {
        ...item.product,
        createdAt: item.product.createdAt.toISOString(),
        updatedAt: item.product.updatedAt.toISOString(),
      },
    })),
  }));

  return (
    <AdminDashboard
      initialProducts={serializedProducts as any}
      initialOrders={serializedOrders as any}
    />
  );
}
