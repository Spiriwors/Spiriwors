// lib/supabase/server.ts
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export function createClient() {
  const cookieStore = cookies()

  // este helper ya usa las vars públicas (NEXT_PUBLIC_SUPABASE_URL / ANON)
  // y toma las cookies del request
  return createServerComponentClient({
    cookies: () => cookieStore,
  })
}
