import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only client with elevated privileges.
// NEVER import this file in "use client" components.
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
