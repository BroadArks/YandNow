import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* ============================================================
   Supabase client (read-only, public anon key).
   The main website only ever READS published posts, so it uses
   the anon key guarded by row-level-security. All writes happen
   in the separate `yandnow-backend` admin panel.

   If the env vars are missing the client is `null` and the blog
   layer transparently falls back to the bundled seed content,
   so the site keeps building even before Supabase is wired up.
   ============================================================ */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: { persistSession: false },
    })
  : null;
