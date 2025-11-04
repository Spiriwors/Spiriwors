import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Si no hay Supabase, permitir acceso (modo fallback)
  const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if (!hasSupabase) {
    return res;
  }

  const supabase = createMiddlewareClient({ req, res });

  // Verificar sesión
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirigir /admin y /admin/dashboard a /admin/projects
  if (req.nextUrl.pathname === '/admin' || req.nextUrl.pathname === '/admin/dashboard') {
    return NextResponse.redirect(new URL('/admin/projects', req.url));
  }

  // Proteger rutas /admin/* excepto /admin/login
  if (req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.startsWith('/admin/login')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  // Si está en /admin/login y ya tiene sesión, redirigir a proyectos
  if (req.nextUrl.pathname === '/admin/login' && session) {
    return NextResponse.redirect(new URL('/admin/projects', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
