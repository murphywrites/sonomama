import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  CONTACT_SERVICES,
  getContactServiceLabel,
  type ContactServiceValue,
} from "@/lib/contactServices";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5000;

const SERVICE_VALUES = new Set<string>(
  CONTACT_SERVICES.map((service) => service.value)
);

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body as {
      name?: string;
      email?: string;
      service?: ContactServiceValue;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (service && !SERVICE_VALUES.has(service)) {
      return NextResponse.json(
        { error: "Invalid service selection" },
        { status: 400 }
      );
    }

    if (message.trim().length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: "Message is too long" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? fromEmail;

    if (!apiKey || !fromEmail || !toEmail) {
      console.error("Contact form missing RESEND_API_KEY, FROM_EMAIL, or CONTACT_TO_EMAIL");
      return NextResponse.json(
        { error: "Contact form is not configured yet" },
        { status: 503 }
      );
    }

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    const serviceLabel = service
      ? getContactServiceLabel(service)
      : "Not specified";

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: `The Murphy Method <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New contact from ${trimmedName} — ${serviceLabel}`,
      html: `
        <h2>New website contact</h2>
        <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Interested in:</strong> ${escapeHtml(serviceLabel)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(trimmedMessage)}</p>
      `,
    });

    if (result.error) {
      console.error("Resend contact error:", result.error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
