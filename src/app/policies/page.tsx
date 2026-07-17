import type { Metadata } from "next";
import Link from "next/link";
import SectionFade from "@/components/SectionFade";

export const metadata: Metadata = {
  title: "Policies | The Murphy Method",
  description:
    "Refund and payment policies for The Murphy Method digital products and programs.",
};

const CONTACT_EMAIL = "erin@themurphymethod.co";

export default function PoliciesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h1 className="font-cormorant text-hero-mobile md:text-5xl font-semibold text-olive mb-4">
            Policies
          </h1>
          <p className="font-inter text-lg text-olive/80">
            Refund and payment policies for The Murphy Method.
          </p>
        </div>
        <SectionFade to="white" />
      </section>

      <section className="relative overflow-hidden bg-white section-padding pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <article className="font-inter text-olive/85 leading-relaxed space-y-10">
            <p>
              Thank you for choosing The Murphy Method. We strive to provide
              high-quality digital products to our customers. Please read the
              following refund policy carefully before making a purchase.
            </p>

            <PolicySection title="All Sales Final">
              <p>
                Due to the digital nature of our products, all sales are final.
                Once a purchase is made and the product is delivered or
                accessed, we do not offer refunds, exchanges, or returns.
              </p>
            </PolicySection>

            <PolicySection title="Digital Product Nature">
              <p>
                Our products are digital goods, including but not limited to
                software, downloadable files, digital subscriptions, and online
                courses. These products are delivered electronically, often
                instantaneously upon purchase, and are not eligible for return.
              </p>
            </PolicySection>

            <PolicySection title="Quality Assurance">
              <p>
                We take great care to ensure the quality and accuracy of our
                digital products. Before making a purchase, we encourage
                customers to review product descriptions, specifications, and
                any available demos or previews to ensure that the product meets
                their expectations.
              </p>
            </PolicySection>

            <PolicySection title="Customer Support">
              <p>
                While refunds are not available, we are committed to providing
                excellent customer support to address any issues or concerns you
                may encounter with our products. If you experience difficulties
                or have questions about a product, please don&apos;t hesitate to
                contact our support team at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-terracotta hover:text-terracotta-dark underline underline-offset-2"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </PolicySection>

            <PolicySection title="Exceptions">
              <p>
                In rare cases where a product is defective or fails to perform as
                described due to reasons within our control, we may, at our
                discretion, offer a replacement or alternative solution. Such
                cases will be handled on a case-by-case basis and will not
                constitute a general policy change regarding refunds.
              </p>
            </PolicySection>

            <PolicySection title="Changes to Refund Policy">
              <p>
                We reserve the right to modify or update this refund policy at
                any time without prior notice. Any changes will be effective
                immediately upon posting on our website. It is the responsibility
                of customers to review the refund policy periodically for
                updates.
              </p>
            </PolicySection>

            <PolicySection title="Legal Compliance">
              <p>
                This refund policy is governed by and construed in accordance
                with applicable law. By making a purchase from The Murphy Method,
                you agree to abide by the terms and conditions outlined in this
                policy.
              </p>
            </PolicySection>

            <div className="border-t border-blush/40 pt-10">
              <h2 className="font-cormorant text-2xl md:text-3xl font-semibold text-olive mb-6">
                Payment Policy for Stripe and PayPal
              </h2>
              <p className="mb-8">
                This Payment Policy outlines the terms and conditions regarding
                payment processing through Stripe and PayPal on this website. By
                making a purchase or using our services, you agree to abide by
                this policy.
              </p>
            </div>

            <PolicySection title="Payment Methods">
              <div className="space-y-4">
                <p>
                  <strong className="text-olive">Stripe:</strong> We offer
                  payment processing through Stripe, a secure and trusted online
                  payment gateway. Stripe accepts major credit and debit cards,
                  including Visa, MasterCard, American Express, and Discover.
                  When you choose to pay via Stripe, you agree to abide by
                  Stripe&apos;s terms of service and privacy policy.
                </p>
                {/* <p>
                  <strong className="text-olive">PayPal:</strong> We also offer
                  payment processing through PayPal, a secure and widely used
                  online payment platform. With PayPal, you can pay using your
                  PayPal balance, bank account, or credit/debit card linked to
                  your PayPal account. By selecting PayPal as your payment
                  method, you agree to adhere to PayPal&apos;s terms of service
                  and privacy policy.
                </p> */}
              </div>
            </PolicySection>

            <PolicySection title="Payment Process">
              <div className="space-y-4">
                <p>
                  <strong className="text-olive">Checkout:</strong> When you
                  proceed to checkout on this website, you will be presented with
                  the option to choose between Stripe and PayPal as your payment
                  method. Select your preferred payment gateway and follow the
                  prompts to complete the payment process.
                </p>
                <p>
                  <strong className="text-olive">Authorization:</strong> By
                  providing your payment details, you authorize us to charge the
                  total amount due for your purchase, including any applicable
                  taxes and fees, to your selected payment method.
                </p>
                <p>
                  <strong className="text-olive">Confirmation:</strong> Once your
                  payment is successfully processed, you will receive a
                  confirmation email or notification confirming your order and
                  payment details. Please retain this confirmation for your
                  records.
                </p>
              </div>
            </PolicySection>

            <PolicySection title="Payment Security">
              <div className="space-y-4">
                <p>
                  <strong className="text-olive">Encryption:</strong> We utilize
                  industry-standard encryption protocols to ensure the security
                  of your payment information during transmission. Your payment
                  details are encrypted and securely transmitted to our payment
                  processors for authorization.
                </p>
                <p>
                  <strong className="text-olive">Data Protection:</strong> We do
                  not store or retain your complete payment information on our
                  servers. Your payment details are securely processed by our
                  payment gateways, Stripe and PayPal, adhering to their
                  respective security measures.
                </p>
              </div>
            </PolicySection>

            <PolicySection title="Refunds and Cancellations">
              <div className="space-y-4">
                <p>
                  <strong className="text-olive">Refund Policy:</strong> Refunds
                  for digital products purchased through The Murphy Method are
                  subject to our Refund Policy above. Please refer to that
                  section for detailed information regarding eligibility,
                  procedures, and timelines for refunds.
                </p>
                <p>
                  <strong className="text-olive">Cancellation:</strong> Once a
                  payment is processed for a digital product, cancellations may
                  not be possible as our products are often delivered instantly
                  or shortly after purchase. Please review your order carefully
                  before completing the payment to ensure accuracy.
                </p>
              </div>
            </PolicySection>

            <PolicySection title="Contact Information">
              <p>
                If you have any questions or concerns regarding our Payment
                Policy for Stripe and PayPal, please contact us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-terracotta hover:text-terracotta-dark underline underline-offset-2"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                for assistance. You can also reach out through our{" "}
                <Link
                  href="/programs"
                  className="text-terracotta hover:text-terracotta-dark underline underline-offset-2"
                >
                  contact form
                </Link>
                .
              </p>
            </PolicySection>

            <PolicySection title="Changes to This Policy">
              <p>
                We reserve the right to update or modify this Payment Policy at
                any time without prior notice. Any changes to the Payment Policy
                will be reflected on this page. We encourage you to review this
                Policy periodically for any updates or amendments.
              </p>
            </PolicySection>

            <div className="border-t border-blush/40 pt-8 space-y-4 text-sm text-olive/70">
              <p>Last updated: 07/16/2026</p>
              <p>
                By making a purchase from The Murphy Method, you acknowledge that
                you have read, understood, and agree to our refund policy as
                stated above.
              </p>
              <p>
                If you have any questions or concerns regarding this refund
                policy, please contact us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-terracotta hover:text-terracotta-dark underline underline-offset-2"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                before making a purchase.
              </p>
              <p className="font-medium text-olive pt-2">The Murphy Method</p>
            </div>
          </article>
        </div>
        <SectionFade to="olive" />
      </section>
    </>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-cormorant text-xl md:text-2xl font-semibold text-olive mb-3">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
