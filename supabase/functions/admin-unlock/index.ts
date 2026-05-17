import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};



function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const expected = Deno.env.get("ADMIN_PASSPHRASE");
    if (!expected) {
      return new Response(JSON.stringify({ error: "Server not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { passphrase } = await req.json().catch(() => ({}));
    if (typeof passphrase !== "string" || !passphrase) {
      return new Response(JSON.stringify({ error: "Passphrase required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!safeEqual(passphrase, expected)) {
      await new Promise((r) => setTimeout(r, 1000));
      return new Response(JSON.stringify({ error: "Invalid passphrase" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Look up the first admin from user_roles rather than hardcoding a UUID
    const { data: roleRow, error: roleErr } = await admin
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (roleErr || !roleRow?.user_id) {
      return new Response(JSON.stringify({ error: "No admin configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: userRes, error: userErr } = await admin.auth.admin.getUserById(roleRow.user_id);
    if (userErr || !userRes?.user?.email) {
      return new Response(JSON.stringify({ error: "Admin user not found" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
      type: "magiclink",
      email: userRes.user.email,
    });
    if (linkErr || !linkData?.properties?.hashed_token) {
      return new Response(JSON.stringify({ error: linkErr?.message ?? "Could not generate session" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({
      token_hash: linkData.properties.hashed_token,
      email: userRes.user.email,
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message ?? "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
