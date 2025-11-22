'use client';

import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    if (!hasSupabase) {
      localStorage.removeItem('fallback_session');
    } else {
      await supabase.auth.signOut();
    }
    router.push('/admin/login');
    router.refresh();
  };

  // No mostrar navbar en login
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Admin Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <Link href="/admin/projects">
                <h1 className="text-xl font-bold text-white hover:text-[#ffaf26] transition-colors cursor-pointer">
                  Spiriwors CMS
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" target="_blank" className="text-gray-300 hover:text-white text-sm">
                Ver Sitio
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-transparent border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 hover:text-white"
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
