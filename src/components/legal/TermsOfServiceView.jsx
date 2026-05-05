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

export default function TermsOfServiceView() {
  return (
    <LegalPageShell
      title="Terms of service"
      lastUpdated="January 1, 2026"
      intro={
        <p>
          Welcome to {LEGAL_STORE_NAME}. These Terms of Service (&quot;Terms&quot;) govern your access to and use of
          our website, mobile experiences, and related services. By browsing, registering, or placing an order, you
          agree to these Terms. If you do not agree, please do not use our services.
        </p>
      }
    >
      <LegalSection id="general-information" title="General information">
        <p>
          {LEGAL_STORE_NAME} operates this site to showcase and sell our products. We may update features,
          inventory, and policies from time to time. All references to &quot;we,&quot; &quot;us,&quot; and &quot;our&quot;
          mean {LEGAL_STORE_NAME} and its affiliates involved in running the storefront. You are responsible for
          ensuring that your use of the site complies with applicable law.
        </p>
      </LegalSection>

      <LegalSection id="eligibility" title="Eligibility">
        <p>
          You must be at least the age of majority in your place of residence to make a purchase or create an
          account. If you use the site on behalf of a business, you represent that you have authority to bind that
          organization to these Terms.
        </p>
      </LegalSection>

      <LegalSection id="products-and-services" title="Products and services">
        <p>
          We strive to display products, colors, dimensions, and availability accurately. Descriptions and images are
          for guidance only and may vary slightly from the items you receive. We reserve the right to limit quantities,
          refuse orders, or discontinue products without notice. Pricing and promotions are subject to change until you
          complete checkout.
        </p>
      </LegalSection>

      <LegalSection id="orders-and-payments" title="Orders and payments">
        <p>
          When you submit an order, you offer to buy the items in your cart at the prices shown, plus applicable taxes
          and shipping. We will confirm acceptance by email or by shipping your order. You agree to provide accurate
          billing and shipping information. Payment is processed by our payment partners; we do not store full payment
          card details on our servers. Failed payments, fraud checks, or inventory issues may result in cancellation or
          delay.
        </p>
      </LegalSection>

      <LegalSection id="intellectual-property" title="Intellectual property">
        <p>
          All content on this site — including text, graphics, logos, photographs, videos, software, and layouts — is
          owned by {LEGAL_STORE_NAME} or our licensors and is protected by copyright, trademark, and other intellectual
          property laws. You may not copy, scrape, modify, distribute, or create derivative works without our prior
          written consent, except for personal, non-commercial viewing or as allowed by limited browser caching.
        </p>
      </LegalSection>

      <LegalSection id="user-conduct" title="User conduct">
        <p>When using our site, you agree not to:</p>
        <LegalBulletList
          items={[
            "Violate any law, regulation, or third-party rights.",
            "Upload or transmit malware, spam, or other harmful or disruptive code or content.",
            "Attempt to gain unauthorized access to our systems, accounts, or data.",
            "Use automated means (bots, scrapers) to access the site without permission.",
            "Interfere with the operation of the site or other users’ enjoyment of it.",
            "Impersonate any person or entity or misrepresent your affiliation.",
          ]}
        />
        <p>We may suspend or terminate access if we reasonably believe these rules have been broken.</p>
      </LegalSection>

      <LegalSection id="third-party-links" title="Third-party links">
        <p>
          Our site may link to third-party websites or services. Those sites are not controlled by us; their content and
          privacy practices are governed by their own terms. We are not responsible for any loss or damage arising from
          your use of external links.
        </p>
      </LegalSection>

      <LegalSection id="disclaimers" title="Disclaimers and limitation of liability">
        <p>
          The site and all content are provided &quot;as is&quot; and &quot;as available.&quot; To the fullest extent
          permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and
          non-infringement. We do not warrant uninterrupted or error-free service.
        </p>
        <p>
          To the maximum extent permitted by applicable law, {LEGAL_STORE_NAME} and its directors, employees, and
          contractors will not be liable for indirect, incidental, special, consequential, or punitive damages, or loss
          of profits, data, or goodwill, arising from your use of the site or products. Our aggregate liability for any
          claim relating to these Terms or the site is limited to the greater of (a) the amount you paid us for the
          transaction giving rise to the claim, or (b) one hundred U.S. dollars, except where such limitations are
          prohibited by law.
        </p>
      </LegalSection>

      <LegalSection id="indemnification" title="Indemnification">
        <p>
          You agree to indemnify and hold harmless {LEGAL_STORE_NAME} and its affiliates from claims, damages, losses,
          and expenses (including reasonable legal fees) arising from your violation of these Terms, misuse of the site,
          or infringement of others’ rights.
        </p>
      </LegalSection>

      <LegalSection id="governing-law" title="Governing law">
        <p>
          These Terms are governed by the laws of the jurisdiction in which {LEGAL_STORE_NAME} operates, without regard
          to conflict-of-law principles. You agree to submit to the exclusive jurisdiction of the courts in that
          jurisdiction for disputes arising from these Terms, subject to any mandatory consumer protections where you live.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="Changes to these terms">
        <p>
          We may revise these Terms periodically. The &quot;Last updated&quot; date will reflect the latest version.
          Continued use after changes constitutes acceptance. For significant changes, we may provide additional notice
          where appropriate.
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
