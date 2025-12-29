import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user has session, get their profile
  let profile = null;
  if (session) {
    const { data } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
    profile = data;
  }

  // If user has profile and tries to access login/signup, redirect to home
  if (profile && (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup'))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Protect admin and my-book routes
  if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/my-book')) {
    if (!session) {
      // If not logged in, redirect to login
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Check admin role for admin routes
    if (req.nextUrl.pathname.startsWith('/admin') && profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url)); // Unauthorized access
    }
  }

  return res;
}