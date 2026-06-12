import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import ProductDetailsClient from '@/components/product-details-client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  let product = null;
  try {
    product = await db.product.findUnique({
      where: { id },
    });
  } catch (e) {
    console.error('Failed to load product details:', e);
  }

  if (!product) {
    notFound();
  }

  const serializedProduct = {
    ...product,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  return <ProductDetailsClient product={serializedProduct as any} />;
}
