import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result: any = {
    databaseUrlDefined: !!process.env.DATABASE_URL,
    databaseUrlPreview: process.env.DATABASE_URL
      ? process.env.DATABASE_URL.replace(/:([^@]+)@/, ':****@') // mask password
      : null,
    supabaseUrlDefined: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKeyDefined: !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  };

  try {
    // Attempt database query
    const productCount = await db.product.count();
    result.status = 'Success';
    result.productCount = productCount;
  } catch (error: any) {
    result.status = 'Failed';
    result.errorMessage = error.message || 'Unknown error';
    result.errorStack = error.stack;
  }

  return NextResponse.json(result);
}
