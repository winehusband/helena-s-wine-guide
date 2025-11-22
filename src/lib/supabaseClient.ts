import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export let supabase: SupabaseClient | null = null;
export let supabaseInitError: Error | null = null;

if (hasSupabaseConfig) {
  try {
    // Validate URL early and avoid cookie/TLD issues by disabling session persistence
    const url = new URL(supabaseUrl!);
    const host = url.hostname;
    const isDevHost = host === 'localhost' || host.match(/^\d+\.\d+\.\d+\.\d+$/);
    if (!isDevHost && !host.includes('.')) {
      console.warn('[Supabase] Suspicious host (no TLD):', host);
    }

    supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  } catch (e: any) {
    supabaseInitError = e instanceof Error ? e : new Error(String(e));
    // Do not throw during module load—log and degrade gracefully
    // eslint-disable-next-line no-console
    console.error('[Supabase] Failed to initialize client:', supabaseInitError.message);
    supabase = null;
  }
}
