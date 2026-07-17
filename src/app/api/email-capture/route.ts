import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { Resend } from "resend";
import { buildDeliveryEmailHtml } from "@/lib/emails/deliveryEmail";
import { RESOURCE_MAP } from "@/lib/resourceMap";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function addToKit(name: string, email: string, resourceId: string) {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) {
    console.error("KIT_API_KEY is not configured");
    return;
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

    const resource = RESOURCE_MAP[resourceId];
    if (!resource) {
      return NextResponse.json(
        { error: "Unknown resource" },
        { status: 400 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const baseUrl = siteUrl.replace(/\/$/, "");
    const programsUrl = `${baseUrl}/programs`;
    const hasFile = Boolean(resource.filePath && resource.fileUrl);
    const downloadUrl = hasFile
      ? resource.fileUrl.startsWith("http")
        ? resource.fileUrl
        : `${baseUrl}${resource.fileUrl}`
      : undefined;

    let attachment:
      | { filename: string; content: Buffer; contentType: string }
      | undefined;

    if (resource.filePath) {
      try {
        const pdfBuffer = await readFile(
          path.join(process.cwd(), resource.filePath)
        );
        attachment = {
          filename: resource.attachmentFilename,
          content: pdfBuffer,
          contentType: "application/pdf",
        };
      } catch (err) {
        console.error("Failed to read resource PDF:", resource.filePath, err);
        return NextResponse.json(
          { error: "Resource file is unavailable. Please try again later." },
          { status: 500 }
        );
      }
    }

    const resend = new Resend(apiKey);
    const [kitResult, emailResult] = await Promise.allSettled([
      addToKit(trimmedName, email, resourceId),
      resend.emails.send({
        from: `Erin Murphy, DPT <${fromEmail}>`,
        to: email,
        subject: `Your free guide: ${resource.title}`,
        html: buildDeliveryEmailHtml({
          name: trimmedName,
          resource: {
            title: resource.title,
            fileUrl: downloadUrl,
          },
          programsUrl,
          intros: resource.email.intros,
          bullets: resource.email.bullets,
          videoUrl: resource.email.videoUrl,
          attachedNote: attachment ? resource.email.attachedNote : undefined,
          showDownloadButton: Boolean(downloadUrl),
        }),
        ...(attachment ? { attachments: [attachment] } : {}),
      }),
    ]);

    if (kitResult.status === "rejected") {
      console.error("Kit sync failed:", kitResult.reason);
    }

    if (emailResult.status === "rejected") {
      console.error("Resend failed:", emailResult.reason);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    if (emailResult.value.error) {
      console.error("Resend failed:", emailResult.value.error);
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
