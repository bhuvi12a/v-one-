import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, address, city, postalCode, items, total } = body;

    if (!customerName || !customerEmail || !address || !city || !postalCode || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Missing required order details' }, { status: 400 });
    }

    // Execute order creation and stock decrement in a database transaction
    const order = await db.$transaction(async (tx) => {
      // 1. Double check and decrement stock for each product
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        if (product.inventory < item.quantity) {
          throw new Error(`Insufficient stock for product "${product.name}". Only ${product.inventory} items left.`);
        }

        // Decrement stock
        await tx.product.update({
          where: { id: item.productId },
          data: {
            inventory: {
              decrement: item.quantity,
            },
          },
        });
      }

      // 2. Create the order
      const newOrder = await tx.order.create({
        data: {
          customerName,
          customerEmail,
          customerPhone,
          address,
          city,
          postalCode,
          total,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      return newOrder;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to place order' }, { status: 500 });
  }
}
export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to fetch orders' }, { status: 500 });
  }
}
