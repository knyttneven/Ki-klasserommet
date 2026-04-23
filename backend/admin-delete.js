// ============================================================
//  ADMIN DELETE ENDPOINT
//  Deploy as a serverless function (Vercel, Netlify, or Node/Express).
//
//  Required environment variables (set in hosting dashboard, NOT in repo):
//    ADMIN_SECRET      — a long random string known only to admins
//    SUPABASE_URL      — your Supabase project URL
//    SUPABASE_SERVICE_ROLE_KEY — service_role key (never expose to frontend)
// ============================================================

import { createClient } from "@supabase/supabase-js";

const ALLOWED_TABLES = ["kompass_tips", "kurskart_cards"];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { secret, table, id } = req.body ?? {};

  // 1. Verify admin secret
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 2. Validate table allowlist
  if (!ALLOWED_TABLES.includes(table)) {
    return res.status(400).json({ error: "Invalid table" });
  }

  // 3. Validate id
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid id" });
  }

  // 4. Delete via service_role (bypasses RLS)
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ ok: true, table, id });
}
