import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Env değerleri girilmeden de uygulama açılabilsin diye placeholder ile oluşturulur;
// sorgular hooks katmanında bu bayrakla korunur.
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = createClient<Database>(
  url ?? 'https://placeholder.supabase.co',
  anonKey ?? 'placeholder-anon-key',
)
