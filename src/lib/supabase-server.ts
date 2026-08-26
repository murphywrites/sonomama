import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseSecretKey, getSupabaseUrl } from "@/lib/supabase-env";

// Server-only client (secret key). NEVER import in "use client" components.
export function createServerClient() {
  return createClient(getSupabaseUrl(), getSupabaseSecretKey());
}
