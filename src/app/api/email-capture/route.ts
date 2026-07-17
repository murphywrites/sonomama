import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function addToKit(name: string, email: string, resourceId: string) {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    throw new Error("KIT_API_KEY is not configured");
  }

  const tag = `resource:${resourceId}`;

  const subscriberRes = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify({ email_address: email, first_name: name }),
  });

  console.log("subscriberRes", subscriberRes);

  if (!subscriberRes.ok) {
    throw new Error(`Kit subscriber create failed: ${subscriberRes.status}`);
  }

  const subscriber = await subscriberRes.json();
  const subscriberId = subscriber?.subscriber?.id;
  if (!subscriberId) {
    throw new Error("Kit did not return a subscriber id");
  }

  await fetch("https://api.kit.com/v4/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify({ name: tag, subscriber_id: subscriberId }),
  });

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

    const trimmedName = name.trim();
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL;

    if (!apiKey || !fromEmail) {
      console.error("email-capture missing RESEND_API_KEY or FROM_EMAIL");
      return NextResponse.json(
        { error: "Email delivery is not configured yet" },
        { status: 503 }
      );
    }

    await addToKit(trimmedName, email, resourceId);

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: `Erin Murphy, DPT <${fromEmail}>`,
      to: email,
      subject: "Thanks for downloading — test email",
      html: `
        <p>Hi ${trimmedName},</p>
        <p>This is a test email confirming your free resource request for <strong>${resourceId}</strong>.</p>
        <p>— Erin Murphy, DPT</p>
      `,
    });

    if (result.error) {
      console.error("Resend failed:", result.error);
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
