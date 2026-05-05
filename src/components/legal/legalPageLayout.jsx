/** Shared legal pages — cream background, serif titles, sans body (all breakpoints) */
export const LEGAL_PAGE_BG = "#FDFCF8";
export const LEGAL_HEADING_GREEN = "#1B3022";
export const LEGAL_BODY_TEXT = "#2d2d2d";

export const LEGAL_STORE_NAME = "Furniqo";
export const LEGAL_SUPPORT_EMAIL = "support@example.com";
export const LEGAL_SUPPORT_PHONE_DISPLAY = "+1 222-333-4444";
export const LEGAL_SUPPORT_TEL = "tel:+12223334444";

export function LegalSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2
        className="font-home-heading text-[1.375rem] font-normal leading-[1.2] tracking-[-0.02em] sm:text-[1.5rem] sm:font-semibold md:text-[1.65rem]"
        style={{ color: LEGAL_HEADING_GREEN }}
      >
        {title}
      </h2>
      <div
        className="mt-5 space-y-4 text-[15px] leading-[1.65] sm:mt-6 sm:space-y-4 sm:text-base sm:leading-relaxed"
        style={{ color: LEGAL_BODY_TEXT }}
      >
        {children}
      </div>
    </section>
  );
}

export function LegalBulletList({ items }) {
  return (
    <ul className="list-disc space-y-3 pl-5 [list-style-position:outside] marker:text-[#4a5c52] sm:space-y-2.5">
      {items.map((text) => (
        <li key={text} className="pl-0.5">
          {text}
        </li>
      ))}
    </ul>
  );
}

export function LegalPageShell({ title, lastUpdated, intro, children }) {
  return (
    <main
      className="font-home-body pb-20 pt-6 sm:pb-20 sm:pt-10 md:pb-24 md:pt-12"
      style={{ backgroundColor: LEGAL_PAGE_BG }}
    >
      <article className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
        <header className="border-b border-[#e5e2dc]/90 pb-8 sm:pb-10">
          <h1
            className="font-home-heading text-[1.875rem] font-normal capitalize leading-[1.12] tracking-[-0.02em] sm:text-[2.35rem] md:text-[2.65rem]"
            style={{ color: LEGAL_HEADING_GREEN }}
          >
            {title}
          </h1>
          <p className="mt-4 font-home-body text-[13px] font-bold leading-normal text-neutral-800 sm:mt-5 sm:text-[15px]">
            Last updated: {lastUpdated}
          </p>
          {intro ? (
            <div className="mt-5 font-home-body text-[15px] leading-[1.65] sm:mt-6 sm:text-base sm:leading-relaxed" style={{ color: LEGAL_BODY_TEXT }}>
              {intro}
            </div>
          ) : null}
        </header>

        <div className="space-y-14 pt-10 sm:space-y-14 sm:pt-12 md:space-y-16">{children}</div>
      </article>
    </main>
  );
}
