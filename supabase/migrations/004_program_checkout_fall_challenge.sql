-- Allow checkout intakes for the Fall Strong Mom Challenge (a one-time purchase).
ALTER TABLE program_checkout_intakes
  DROP CONSTRAINT IF EXISTS program_checkout_intakes_program_id_check;

ALTER TABLE program_checkout_intakes
  ADD CONSTRAINT program_checkout_intakes_program_id_check
  CHECK (program_id IN (
    'pregnancy-synced',
    'postpartum',
    'moms-any-phase',
    'pregnancy-prep',
    'one-on-one',
    'fall-challenge'
  ));

-- One-time purchases have a PaymentIntent instead of a Subscription.
ALTER TABLE program_checkout_intakes
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;
