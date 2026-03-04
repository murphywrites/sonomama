import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

const REQUIRED_CONFIRMATIONS = [
  "healthDisclosure",
  "noMedicalAdvice",
  "ownRisk",
  "ageConfirm",
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, confirmations, documentVersion } = body as {
      name?: string;
      email?: string;
      confirmations?: Record<string, boolean>;
      documentVersion?: string;
    };

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!confirmations || !REQUIRED_CONFIRMATIONS.every((k) => confirmations[k] === true)) {
      return NextResponse.json(
        { error: "All confirmations are required" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const now = new Date().toISOString();
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const userAgent = request.headers.get("user-agent") ?? null;

    // Upsert user — create if new, update if existing
    const { data: user, error: userError } = await supabase
      .from("users")
      .upsert(
        {
          email,
          name: name.trim(),
          user_type: "program",
          waiver_signed_at: now,
        },
        { onConflict: "email" }
      )
      .select("id")
      .single();

    if (userError || !user) {
      console.error("User upsert failed:", userError);
      return NextResponse.json(
        { error: "Failed to save record. Please try again." },
        { status: 500 }
      );
    }

    // Append waiver signature — never update this table
    const { error: waiverError } = await supabase
      .from("waiver_signatures")
      .insert({
        user_id: user.id,
        email,
        name: name.trim(),
        signed_at: now,
        ip_address: ipAddress,
        user_agent: userAgent,
        document_version: documentVersion ?? "v1.0",
        confirmations,
      });

    if (waiverError) {
      console.error("Waiver insert failed:", waiverError);
      // Don't fail the whole request — user record was saved
    }

    return NextResponse.json({ success: true, userId: user.id });
  } catch (err) {
    console.error("sign-waiver error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
