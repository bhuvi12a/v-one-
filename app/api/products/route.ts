import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const products = await db.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(products);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, image, category, inventory } = body;

    if (!name || typeof price !== 'number' || !category || typeof inventory !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProduct = await db.product.create({
      data: {
        name,
        description: description || '',
        price,
        image: image || 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=600&q=80',
        category,
        inventory,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to create product' }, { status: 500 });
  }
}
