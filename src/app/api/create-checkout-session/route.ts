import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerClient } from "@/lib/supabase-server";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const PROGRAMS = {
  "pregnancy-synced": {
    name: "Pregnancy",
    priceEnv: "STRIPE_PRICE_PREGNANCY",
  },
  postpartum: {
    name: "Postpartum",
    priceEnv: "STRIPE_PRICE_POSTPARTUM",
  },
  "moms-any-phase": {
    name: "Moms in any phase of life",
    priceEnv: "STRIPE_PRICE_MOMS_ANY_PHASE",
  },
} as const;

type ProgramId = keyof typeof PROGRAMS;

interface CheckoutBody {
  programId?: string;
  name?: string;
  email?: string;
  dueDate?: string;
  deliveryDates?: string[];
  kidAges?: string[];
}

function isProgramId(value: string | undefined): value is ProgramId {
  return Boolean(value && value in PROGRAMS);
}

function isValidDate(value: string): boolean {
  if (!DATE_REGEX.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function validateDetails(body: CheckoutBody): string | null {
  if (!body.name?.trim() || body.name.trim().length > 120) {
    return "A valid name is required";
  }
  if (!body.email?.trim() || !EMAIL_REGEX.test(body.email.trim())) {
    return "A valid email address is required";
  }
  if (!isProgramId(body.programId)) {
    return "A valid program is required";
  }

  if (body.programId === "pregnancy-synced") {
    if (!body.dueDate || !isValidDate(body.dueDate)) {
      return "A valid upcoming due date is required";
    }
    const today = new Date().toISOString().slice(0, 10);
    if (body.dueDate < today) {
      return "The due date must be today or later";
    }
  }

  if (body.programId === "postpartum") {
    const today = new Date().toISOString().slice(0, 10);
    if (
      !Array.isArray(body.deliveryDates) ||
      body.deliveryDates.length === 0 ||
      body.deliveryDates.length > 10 ||
      body.deliveryDates.some(
        (date) => !isValidDate(date) || date > today
      )
    ) {
      return "At least one valid delivery date is required";
    }
  }

  if (body.programId === "moms-any-phase") {
    if (
      !Array.isArray(body.kidAges) ||
      body.kidAges.length === 0 ||
      body.kidAges.length > 20 ||
      body.kidAges.some((age) => !age.trim() || age.trim().length > 40)
    ) {
      return "At least one child age is required";
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  let intakeId: string | undefined;

  try {
    const body = (await request.json()) as CheckoutBody;
    const validationError = validateDetails(body);

    if (validationError || !isProgramId(body.programId)) {
      return NextResponse.json(
        { error: validationError ?? "Invalid program" },
        { status: 400 }
      );
    }

    const stripeKey =
      process.env.STRIPE_RESTRICTED_KEY ?? process.env.STRIPE_SECRET_KEY;
    const priceId = process.env[PROGRAMS[body.programId].priceEnv];

    if (!stripeKey || !priceId) {
      console.error("Stripe checkout is missing a Stripe key or program Price ID");
      return NextResponse.json(
        { error: "Checkout is not configured yet" },
        { status: 503 }
      );
    }

    const name = body.name!.trim();
    const email = body.email!.trim().toLowerCase();
    const intakeDetails =
      body.programId === "pregnancy-synced"
        ? { dueDate: body.dueDate }
        : body.programId === "postpartum"
          ? { deliveryDates: body.deliveryDates }
          : { kidAges: body.kidAges!.map((age) => age.trim()) };

    const supabase = createServerClient();
    const { data: intake, error: intakeError } = await supabase
      .from("program_checkout_intakes")
      .insert({
        program_id: body.programId,
        name,
        email,
        intake_details: intakeDetails,
      })
      .select("id")
      .single();

    if (intakeError || !intake) {
      console.error("Failed to save program intake:", intakeError);
      return NextResponse.json(
        { error: "Unable to start checkout. Please try again." },
        { status: 500 }
      );
    }

    intakeId = intake.id;

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2026-06-24.dahlia",
    });
    const origin = new URL(request.url).origin;
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      mode: "subscription",
      customer_email: email,
      client_reference_id: intake.id,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        program_id: body.programId,
        intake_id: intake.id,
      },
      subscription_data: {
        metadata: {
          program_id: body.programId,
          intake_id: intake.id,
        },
      },
      return_url: `${origin}/programs?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session.client_secret) {
      throw new Error("Stripe did not return an embedded Checkout client secret");
    }

    const { error: updateError } = await supabase
      .from("program_checkout_intakes")
      .update({ checkout_session_id: session.id })
      .eq("id", intake.id);

    if (updateError) {
      await stripe.checkout.sessions.expire(session.id);
      throw new Error(`Failed to link intake to Checkout: ${updateError.message}`);
    }

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("create-checkout-session error:", error);

    if (intakeId) {
      const supabase = createServerClient();
      await supabase
        .from("program_checkout_intakes")
        .delete()
        .eq("id", intakeId);
    }

    return NextResponse.json(
      { error: "Unable to start checkout. Please try again." },
      { status: 500 }
    );
  }
}
