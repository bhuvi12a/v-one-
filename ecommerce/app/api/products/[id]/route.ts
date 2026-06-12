import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, price, image, category, inventory } = body;

    // Check product exists
    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existingProduct.name,
        description: description !== undefined ? description : existingProduct.description,
        price: price !== undefined ? price : existingProduct.price,
        image: image !== undefined ? image : existingProduct.image,
        category: category !== undefined ? category : existingProduct.category,
        inventory: inventory !== undefined ? inventory : existingProduct.inventory,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const existingProduct = await db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await db.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to delete product' }, { status: 500 });
  }
}
