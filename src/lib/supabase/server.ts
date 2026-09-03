import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

let client: ReturnType<typeof createClient<Database, "public">> | null = null;

export function getSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY. Configuralas en .env.local (ver .env.local.example).",
    );
  }

  if (!client) {
    client = createClient<Database, "public">(url, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }

  return client;
}
