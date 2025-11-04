'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const hasSupabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!hasSupabase) {
        // FALLBACK: Login con credenciales del .env
        const fallbackEmail = process.env.NEXT_PUBLIC_FALLBACK_EMAIL;
        const fallbackPassword = process.env.NEXT_PUBLIC_FALLBACK_PASSWORD;

        await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay

        if (email === fallbackEmail && password === fallbackPassword) {
          localStorage.setItem('fallback_session', 'true');
          router.push('/admin/projects');
        } else {
          throw new Error('Email o contraseña incorrectos');
        }
      } else {
        // Modo Supabase real
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.session) {
          router.push('/admin/projects');
          router.refresh();
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            Spiriwors CMS
          </h1>
          <p className="text-gray-400 text-center mb-2">Panel de Administración</p>

          {!hasSupabase && (
            <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-500 px-3 py-2 rounded text-xs text-center mb-6">
              <strong>⚠️ MODO FALLBACK</strong><br/>
              Supabase no configurado<br/>
              Email: {process.env.NEXT_PUBLIC_FALLBACK_EMAIL}<br/>
              Password: {process.env.NEXT_PUBLIC_FALLBACK_PASSWORD}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="camilo@spiriwors.com"
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ffaf26] hover:bg-[#ff9500] text-gray-900 font-semibold"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
