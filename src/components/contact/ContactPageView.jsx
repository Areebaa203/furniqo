"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { SITE_HEADER_GUTTERS } from "@/components/home/SiteHeader";
import { FAQ_CONTACT } from "@/components/faq/faqData";
import { cn } from "@/lib/utils";

const PAGE_BG = "#F9F8F3";
const HEADING = "#1B3022";
const BTN_BG = "#f3efe6";
const BTN_BORDER = "#d8d3c8";
const DIVIDER = "#e5e2dc";

function ContactRow({ kicker, children, action }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 py-7 sm:py-8",
        "lg:flex-row lg:items-center lg:justify-between lg:gap-10"
      )}
    >
      <div className="min-w-0 flex-1 space-y-2">{children}</div>
      <div className="shrink-0 lg:pt-0">{action}</div>
    </div>
  );
}

function OutlineButton({ href, label, icon }) {
  return (
    <Link
      href={href}
      className={cn(
        "font-home-sub inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border px-6 text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:bg-[#ebe4d9] sm:h-12 lg:w-auto lg:min-w-[11rem]",
        "text-neutral-900"
      )}
      style={{ backgroundColor: BTN_BG, borderColor: BTN_BORDER }}
    >
      {label}
      <Icon icon={icon} className="size-4 shrink-0 text-neutral-800" aria-hidden />
    </Link>
  );
}

export default function ContactPageView() {
  return (
    <main
      className="font-home-body pb-16 pt-8 sm:pb-20 sm:pt-10 md:pb-24 md:pt-12"
      style={{ backgroundColor: PAGE_BG }}
    >
      <div className={SITE_HEADER_GUTTERS}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start md:gap-12 lg:gap-16">
          <header className="md:col-span-5 lg:col-span-4">
            <h1
              className="font-home-heading text-[2rem] font-normal capitalize leading-[1.1] tracking-[-0.02em] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.65rem]"
              style={{ color: HEADING }}
            >
              Contact us
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-800 sm:mt-5 sm:text-base">
              Have a question? We&apos;re here to make things easier.
            </p>
          </header>

          <div className="md:col-span-7 lg:col-span-8">
            <p
              className="font-home-body text-base font-semibold leading-snug sm:text-[1.05rem]"
              style={{ color: HEADING }}
            >
              Have a question about a product, order or anything else?
            </p>

            <div
              className="mt-8 border-t sm:mt-10"
              style={{ borderColor: DIVIDER }}
            >
              <ContactRow
                action={
                  <OutlineButton
                    href={FAQ_CONTACT.phoneHref}
                    label="Call us"
                    icon="mingcute:phone-line"
                  />
                }
              >
                <span className="font-home-sub block text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Call
                </span>
                <p className="font-home-heading text-[1.35rem] leading-tight sm:text-[1.5rem] md:text-[1.65rem]" style={{ color: HEADING }}>
                  {FAQ_CONTACT.phone}
                </p>
                <p className="font-home-body text-sm text-neutral-600">{FAQ_CONTACT.phoneHours}</p>
              </ContactRow>

              <div className="border-t" style={{ borderColor: DIVIDER }} />

              <ContactRow
                action={
                  <OutlineButton
                    href={FAQ_CONTACT.emailHref}
                    label="Email us"
                    icon="mingcute:mail-line"
                  />
                }
              >
                <span className="font-home-sub block text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Email
                </span>
                <p
                  className="break-words font-home-heading text-[1.2rem] leading-tight sm:text-[1.35rem] md:text-[1.5rem]"
                  style={{ color: HEADING }}
                >
                  {FAQ_CONTACT.email}
                </p>
                <p className="font-home-body text-sm text-neutral-600">{FAQ_CONTACT.emailHours}</p>
              </ContactRow>

              <div className="border-t" style={{ borderColor: DIVIDER }} />

              <ContactRow
                action={
                  <OutlineButton href="/faq" label="Explore FAQs" icon="mingcute:question-line" />
                }
              >
                <span className="font-home-sub block text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  FAQ
                </span>
                <p className="font-home-heading text-[1.25rem] leading-tight sm:text-[1.4rem] md:text-[1.5rem]" style={{ color: HEADING }}>
                  Explore our FAQs for quick solutions
                </p>
              </ContactRow>

              <div className="border-t" style={{ borderColor: DIVIDER }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
