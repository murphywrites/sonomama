import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";
import { buildCheckoutConfirmationEmailHtml } from "@/lib/emails/checkoutConfirmationEmail";
import { createServerClient } from "@/lib/supabase-server";

export const runtime = "nodejs";

const PROGRAM_NAMES: Record<string, string> = {
  "pregnancy-synced": "Pregnancy",
  postpartum: "Postpartum",
  "moms-any-phase": "Moms in any phase of life",
};

interface IntakeRecord {
  id: string;
  checkout_session_id: string;
  program_id: string;
  name: string;
  email: string;
  intake_details: {
    dueDate?: string;
    deliveryDates?: string[];
    kidAges?: string[];
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function intakeDetailsHtml(intake: IntakeRecord): string {
  const details = intake.intake_details;
  const lines: string[] = [
    `<p style="margin:0 0 8px;"><strong>Name:</strong> ${escapeHtml(intake.name)}</p>`,
    `<p style="margin:0 0 8px;"><strong>Email:</strong> ${escapeHtml(intake.email)}</p>`,
  ];

  if (details.dueDate) {
    lines.push(
      `<p style="margin:0 0 8px;"><strong>Upcoming due date:</strong> ${escapeHtml(formatDate(details.dueDate))}</p>`
    );
  }
  if (details.deliveryDates?.length) {
    const dates = details.deliveryDates.map(formatDate).join(", ");
    lines.push(
      `<p style="margin:0 0 8px;"><strong>Delivery date(s):</strong> ${escapeHtml(dates)}</p>`
    );
  }
  if (details.kidAges?.length) {
    lines.push(
      `<p style="margin:0;"><strong>Kid(s) ages:</strong> ${escapeHtml(details.kidAges.join(", "))}</p>`
    );
  }

  return lines.join("\n");
}

function stripeId(
  value: string | { id: string } | null
): string | null {
  return typeof value === "string" ? value : value?.id ?? null;
}

async function handleSuccessfulCheckout(session: Stripe.Checkout.Session) {
  const intakeId = session.client_reference_id;
  if (!intakeId) {
    throw new Error(`Checkout Session ${session.id} has no intake reference`);
  }

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("program_checkout_intakes")
    .select(
      "id, checkout_session_id, program_id, name, email, intake_details"
    )
    .eq("id", intakeId)
    .single();

  if (error || !data) {
    throw new Error(`Intake ${intakeId} was not found`);
  }

  const intake = data as IntakeRecord;
  if (intake.checkout_session_id !== session.id) {
    throw new Error(`Checkout Session does not match intake ${intakeId}`);
  }

  const customerId = stripeId(session.customer);
  const subscriptionId = stripeId(session.subscription);
  const { error: updateError } = await supabase
    .from("program_checkout_intakes")
    .update({
      status: "paid",
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      amount_total: session.amount_total,
      currency: session.currency,
      paid_at: new Date().toISOString(),
    })
    .eq("id", intake.id);

  if (updateError) {
    throw new Error(`Failed to mark intake paid: ${updateError.message}`);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;
  const toEmail =
    process.env.PROGRAM_PURCHASE_TO_EMAIL ??
    process.env.CONTACT_TO_EMAIL ??
    fromEmail;

  if (!resendApiKey || !fromEmail || !toEmail) {
    throw new Error("Purchase email is missing Resend email configuration");
  }

  const amount =
    session.amount_total !== null && session.currency
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: session.currency.toUpperCase(),
        }).format(session.amount_total / 100)
      : "Not available";
  const programName = PROGRAM_NAMES[intake.program_id] ?? intake.program_id;
  const formDetailsHtml = intakeDetailsHtml(intake);
  const resend = new Resend(resendApiKey);

  const [adminResult, customerResult] = await Promise.all([
    resend.emails.send(
      {
        from: `The Murphy Method <${fromEmail}>`,
        to: toEmail,
        replyTo: intake.email,
        subject: `New paid ${programName} signup — ${intake.name}`,
        html: `
          <h2>New paid program signup</h2>
          <p><strong>Program:</strong> ${escapeHtml(programName)}</p>
          ${formDetailsHtml}
          <hr />
          <h3>Payment details</h3>
          <p><strong>Initial payment:</strong> ${escapeHtml(amount)}</p>
          <p><strong>Payment status:</strong> ${escapeHtml(session.payment_status)}</p>
          <p><strong>Checkout Session:</strong> ${escapeHtml(session.id)}</p>
          <p><strong>Subscription:</strong> ${escapeHtml(subscriptionId ?? "Not available")}</p>
          <p><strong>Customer:</strong> ${escapeHtml(customerId ?? "Not available")}</p>
        `,
      },
      { idempotencyKey: `program-checkout/${session.id}` }
    ),
    resend.emails.send(
      {
        from: `Erin Murphy, DPT <${fromEmail}>`,
        to: intake.email,
        replyTo: fromEmail,
        subject: `Welcome to The Murphy Method - ${programName} Program — you're in!`,
        html: buildCheckoutConfirmationEmailHtml({
          name: intake.name,
          programName,
          formDetailsHtml,
        }),
      },
      { idempotencyKey: `program-checkout-customer/${session.id}` }
    ),
  ]);

  if (adminResult.error) {
    throw new Error(
      `Resend purchase notification failed: ${adminResult.error.message}`
    );
  }

  if (customerResult.error) {
    throw new Error(
      `Resend customer confirmation failed: ${customerResult.error.message}`
    );
  }
}

export async function POST(request: NextRequest) {
  const stripeKey =
    process.env.STRIPE_RESTRICTED_KEY ?? process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!stripeKey || !webhookSecret || !signature) {
    console.error("Stripe webhook is missing key, secret, or signature");
    return NextResponse.json(
      { error: "Webhook is not configured" },
      { status: 400 }
    );
  }

  try {
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2026-06-24.dahlia",
    });
    const event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      if (session.payment_status === "paid") {
        await handleSuccessfulCheckout(session);
      }
    } else if (event.type === "checkout.session.async_payment_succeeded") {
      await handleSuccessfulCheckout(event.data.object);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}
