import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  // Check if requesting admin pages
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('sb-access-token')?.value;

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Direct REST API verification with Supabase GoTrue endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        },
      });

      if (!response.ok) {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      // Token is invalid or expired
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Config to run proxy only on admin paths
export const config = {
  matcher: '/admin/:path*',
};
