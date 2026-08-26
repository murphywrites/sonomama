import { createClient } from "@supabase/supabase-js";
import {
  getSupabasePublishableKey,
  getSupabaseUrl,
} from "@/lib/supabase-env";

// Browser-safe client (publishable key)
export const supabase = createClient(
  getSupabaseUrl(),
  getSupabasePublishableKey()
);
