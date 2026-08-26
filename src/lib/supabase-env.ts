function firstEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

export function getSupabaseUrl(): string {
  const url = firstEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_URL",
    // Vercel + Supabase integration can double the prefix.
    "NEXT_PUBLIC_SUPABASE_SUPABASE_URL"
  );

  if (!url) {
    throw new Error(
      "Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL to https://<project-ref>.supabase.co"
    );
  }

  return url;
}

export function getSupabasePublishableKey(): string {
  const key = firstEnv(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SUPABASE_SUPABASE_PUBLISHABLE_KEY"
  );

  if (!key) {
    throw new Error(
      "Missing Supabase publishable key. Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return key;
}

export function getSupabaseSecretKey(): string {
  const key = firstEnv("SUPABASE_SECRET_KEY", "SUPABASE_SERVICE_ROLE_KEY");

  if (!key) {
    throw new Error(
      "Missing Supabase secret key. Set SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return key;
}
