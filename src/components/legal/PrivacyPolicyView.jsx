import {
  LEGAL_HEADING_GREEN,
  LEGAL_STORE_NAME,
  LEGAL_SUPPORT_EMAIL,
  LEGAL_SUPPORT_PHONE_DISPLAY,
  LEGAL_SUPPORT_TEL,
  LegalBulletList,
  LegalPageShell,
  LegalSection,
} from "@/components/legal/legalPageLayout";

export default function PrivacyPolicyView() {
  return (
    <LegalPageShell
      title="Privacy policy"
      lastUpdated="January 1, 2026"
      intro={
        <p>
          Your trust matters to us. This policy explains what information we collect when you shop or browse{" "}
          {LEGAL_STORE_NAME}, how we use it to serve you, and the choices you have. We aim to be transparent and
          careful with your data at every step.
        </p>
      }
    >
      <LegalSection id="information-we-collect" title="Information we collect">
        <p>We collect information in the following situations:</p>
        <LegalBulletList
          items={[
            "When you browse our site (for example, pages viewed, device type, and general location from IP address).",
            "When you sign up for our newsletter, create an account, or submit a contact or support form.",
            "When you place an order or request a quote, including payment and shipping details processed by our providers.",
          ]}
        />
        <p>Types of information may include:</p>
        <LegalBulletList
          items={[
            "Name and contact details (email address, phone number).",
            "Shipping and billing addresses.",
            "Order history, cart activity, and communications with customer care.",
            "Account credentials when you register (stored securely; passwords are never stored in plain text).",
          ]}
        />
      </LegalSection>

      <LegalSection id="how-we-use" title="How we use your information">
        <p>We use personal information to:</p>
        <LegalBulletList
          items={[
            "Process, fulfill, and deliver your orders — including payment validation and shipping notifications.",
            "Operate and improve our website, products, and customer support.",
            "Send transactional messages (order confirmations, delivery updates) and, where permitted, marketing you can opt out of.",
            "Detect fraud, abuse, and technical issues; comply with law and enforce our terms.",
            "Analyze aggregated usage trends to improve navigation and product discovery.",
          ]}
        />
      </LegalSection>

      <LegalSection id="cookies" title="Cookies and tracking technologies">
        <p>
          We use cookies and similar technologies to remember your preferences, keep you signed in where
          applicable, measure site performance, and understand how visitors use {LEGAL_STORE_NAME}. You can
          control cookies through your browser settings; disabling some cookies may limit certain features.
        </p>
      </LegalSection>

      <LegalSection id="sharing" title="Sharing your information">
        <p>We share information only as needed to run our business:</p>
        <LegalBulletList
          items={[
            "Payment processors and fraud-prevention partners to authorize and complete transactions.",
            "Shipping carriers to deliver your orders.",
            "Cloud hosting, email, and analytics providers under strict confidentiality and data-processing terms.",
            "Authorities when required by law or to protect the rights, safety, and security of our customers and business.",
          ]}
        />
        <p>We do not sell your personal information for money.</p>
      </LegalSection>

      <LegalSection id="retention" title="Data retention">
        <p>
          We keep information only as long as necessary for the purposes above — for example, order and tax
          records for the period required by law, and marketing preferences until you unsubscribe or delete your
          account. When data is no longer needed, we delete or anonymize it where feasible.
        </p>
      </LegalSection>

      <LegalSection id="rights" title="Your rights">
        <p>Depending on where you live, you may have the right to:</p>
        <LegalBulletList
          items={[
            "Access or receive a copy of the personal data we hold about you.",
            "Correct inaccurate information or ask us to delete certain data, subject to legal exceptions.",
            "Object to or restrict certain processing, including direct marketing.",
            "Withdraw consent where processing is based on consent.",
            "Lodge a complaint with a data protection authority in your region.",
          ]}
        />
        <p>
          To exercise these rights, contact us using the details in{" "}
          <a
            href="#contact-us"
            className="font-medium underline underline-offset-[3px] decoration-[#1B3022]/35 hover:decoration-[#1B3022]"
            style={{ color: LEGAL_HEADING_GREEN }}
          >
            Contact us
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection id="security" title="Data security">
        <p>
          We use administrative, technical, and organizational measures — including encryption in transit where
          appropriate, access controls, and vendor reviews — to protect your information. No method of
          transmission over the internet is completely secure; we encourage strong passwords and careful sharing
          of account access.
        </p>
      </LegalSection>

      <LegalSection id="international" title="International transfers">
        <p>
          If you access our services from outside the country where we operate, your information may be processed
          in countries that have different data protection laws. Where required, we use appropriate safeguards
          (such as standard contractual clauses) to protect your data.
        </p>
      </LegalSection>

      <LegalSection id="updates" title="Updates to this policy">
        <p>
          We may update this policy from time to time. The &quot;Last updated&quot; date at the top will change when
          we post revisions. For material changes, we may provide additional notice (for example, by email or a
          banner on our site). Continued use after changes means you accept the updated policy.
        </p>
      </LegalSection>

      <LegalSection id="contact-us" title="Contact us">
        <p className="!mt-0 font-medium text-neutral-900">{LEGAL_STORE_NAME} Customer Care</p>
        <p>
          <span className="text-neutral-600">Email: </span>
          <a
            href={`mailto:${LEGAL_SUPPORT_EMAIL}`}
            className="font-medium underline underline-offset-2 hover:opacity-80"
            style={{ color: LEGAL_HEADING_GREEN }}
          >
            {LEGAL_SUPPORT_EMAIL}
          </a>
        </p>
        <p>
          <span className="text-neutral-600">Phone: </span>
          <a
            href={LEGAL_SUPPORT_TEL}
            className="font-medium underline underline-offset-2 hover:opacity-80"
            style={{ color: LEGAL_HEADING_GREEN }}
          >
            {LEGAL_SUPPORT_PHONE_DISPLAY}
          </a>
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
