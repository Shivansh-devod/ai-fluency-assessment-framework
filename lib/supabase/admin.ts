import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service-role key.
 * Never import this file from a client component.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Copy .env.example to .env.local and fill in your Supabase project keys."
    );
  }

  if (
    url.includes("YOUR_PROJECT") ||
    serviceRoleKey.includes("your-service-role-key")
  ) {
    throw new Error(
      "Placeholder keys detected in .env.local. Please create a project at https://supabase.com, copy your project URL and service-role key into .env.local, and run db/migrations/000_health.sql in the Supabase SQL Editor."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
