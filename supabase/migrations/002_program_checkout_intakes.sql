-- Intake details collected before Stripe Checkout.
-- This table is intentionally private: all access is through server route handlers.
CREATE TABLE program_checkout_intakes (
  id                    UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  checkout_session_id   TEXT UNIQUE,
  program_id            TEXT NOT NULL
                          CHECK (program_id IN (
                            'pregnancy-synced',
                            'postpartum',
                            'moms-any-phase'
                          )),
  name                  TEXT NOT NULL,
  email                 TEXT NOT NULL,
  intake_details        JSONB NOT NULL,
  status                TEXT NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending', 'paid')),
  stripe_customer_id    TEXT,
  stripe_subscription_id TEXT,
  amount_total          INTEGER,
  currency              TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at               TIMESTAMPTZ
);

CREATE INDEX idx_program_checkout_intakes_email
  ON program_checkout_intakes(email);
CREATE INDEX idx_program_checkout_intakes_status
  ON program_checkout_intakes(status);

ALTER TABLE program_checkout_intakes ENABLE ROW LEVEL SECURITY;
