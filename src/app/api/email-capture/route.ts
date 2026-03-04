import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServerClient } from "@/lib/supabase-server";
import { RESOURCE_MAP } from "@/lib/resourceMap";
import { buildDeliveryEmailHtml } from "@/lib/emails/deliveryEmail";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function addToKit(name: string, email: string, resourceId: string) {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) return;

  const tag = `resource:${resourceId}`;

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

  // Apply resource tag
  await fetch("https://api.kit.com/v4/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify({ name: tag, subscriber_id: subscriberId }),
  });

  // Enroll in sequence if configured
  const sequenceId = process.env.KIT_SEQUENCE_ID;
  if (sequenceId) {
    await fetch(`https://api.kit.com/v4/sequences/${sequenceId}/subscribers`, {
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
    const { name, email, resourceId } = body as {
      name?: string;
      email?: string;
      resourceId?: string;
    };

    if (!name?.trim() || !email?.trim() || !resourceId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const resource = RESOURCE_MAP[resourceId];
    if (!resource) {
      return NextResponse.json({ error: "Unknown resource" }, { status: 400 });
    }

    const supabase = createServerClient();

    const [supabaseResult, , resendResult] = await Promise.allSettled([
      // 1. Log lead to Supabase
      supabase.from("email_leads").upsert(
        { email, name: name.trim(), resource_id: resourceId, source: "modal" },
        { onConflict: "email,resource_id" }
      ),

      // 2. Add to Kit (non-blocking — failure should not block delivery)
      addToKit(name.trim(), email, resourceId),

      // 3. Send delivery email via Resend
      new Resend(process.env.RESEND_API_KEY).emails.send({
        from: `Erin Murphy, DPT <${process.env.FROM_EMAIL ?? "hello@example.com"}>`,
        to: email,
        subject: `Your free guide: ${resource.title}`,
        html: buildDeliveryEmailHtml({ name: name.trim(), resource }),
      }),
    ]);

    if (supabaseResult.status === "rejected") {
      console.error("Supabase upsert failed:", supabaseResult.reason);
    }

    if (resendResult.status === "rejected") {
      console.error("Resend failed:", resendResult.reason);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("email-capture error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
