import React from 'react';
import { db } from '@/lib/db';
import ProductCatalog from '@/components/product-catalog';
import { Product } from '@/types';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  let products: Product[] = [];
  try {
    products = await db.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (e) {
    console.error('Failed to load products from database:', e);
  }

  // Convert Date objects to strings for serialization if necessary
  const serializedProducts = products.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  // We can safely cast because serialized products match Product interface client-side
  return <ProductCatalog initialProducts={serializedProducts as any} />;
}
