import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function addToKitNewsletter(name: string, email: string) {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) return;

  const formId = process.env.KIT_FORM_ID;

  // Create/update subscriber
  const subscriberRes = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify({ email_address: email, first_name: name }),
  });

  if (!subscriberRes.ok) return;
  const subscriber = await subscriberRes.json();
  const subscriberId = subscriber?.subscriber?.id;
  if (!subscriberId) return;

  // Apply newsletter tag
  await fetch("https://api.kit.com/v4/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify({ name: "newsletter", subscriber_id: subscriberId }),
  });

  // Add to form/list if configured
  if (formId) {
    await fetch(`https://api.kit.com/v4/forms/${formId}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
      body: JSON.stringify({ subscriber_id: subscriberId }),
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body as { name?: string; email?: string };

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    await Promise.allSettled([
      supabase.from("email_leads").upsert(
        { email, name: name.trim(), resource_id: null, source: "signup_bar" },
        { onConflict: "email,resource_id" }
      ),
      addToKitNewsletter(name.trim(), email),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("newsletter-signup error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
