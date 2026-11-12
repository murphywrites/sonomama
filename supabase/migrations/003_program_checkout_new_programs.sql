-- Allow checkout intakes for Strong Mom Pregnancy Prep and Custom Programming.
ALTER TABLE program_checkout_intakes
  DROP CONSTRAINT IF EXISTS program_checkout_intakes_program_id_check;

ALTER TABLE program_checkout_intakes
  ADD CONSTRAINT program_checkout_intakes_program_id_check
  CHECK (program_id IN (
    'pregnancy-synced',
    'postpartum',
    'moms-any-phase',
    'pregnancy-prep',
    'one-on-one'
  ));
