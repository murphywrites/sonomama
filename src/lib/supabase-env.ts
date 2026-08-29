function firstEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

export function getSupabaseUrl(): string {
  const url = firstEnv(
    // Canonical names (use these in .env.local)
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_URL",
    // Vercel Supabase integration (prefix: NEXT_PUBLIC_SUPABASE)
    "NEXT_PUBLIC_SUPABASE_SUPABASE_URL"
  );

  if (!url) {
    throw new Error(
      "Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL (or copy NEXT_PUBLIC_SUPABASE_SUPABASE_URL from the Vercel integration)"
    );
  }

  return url;
}

export function getSupabasePublishableKey(): string {
  const key = firstEnv(
    // Canonical names
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    // Vercel Supabase integration aliases
    "NEXT_PUBLIC_SUPABASE_SUPABASE_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_SUPABASE_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_NEXT_PUBLIC_SUPABASE_SUPABASE_PUBLISHABLE_KEY"
  );

  if (!key) {
    throw new Error(
      "Missing Supabase publishable key. Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or copy the anon/publishable key from the Vercel integration)"
    );
  }

  return key;
}

export function getSupabaseSecretKey(): string {
  const key = firstEnv(
    // Canonical names
    "SUPABASE_SECRET_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    // Vercel Supabase integration aliases (server-only; not in the public snippet)
    "SUPABASE_SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SUPABASE_SECRET_KEY"
  );

  if (!key) {
    throw new Error(
      "Missing Supabase secret key. Set SUPABASE_SECRET_KEY from Supabase Dashboard → Project Settings → API"
    );
  }

  return key;
}
