import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only client (secret key). NEVER import in "use client" components.
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}
