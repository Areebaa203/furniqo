"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  FOOTER_INFO_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_SHOP_LINKS,
  FOOTER_SOCIAL,
} from "@/components/home/siteFooterData";

const BG = "#F7F4EB";
const ACCENT_GREEN = "#2D3A30";
const MEGA_FILL = "#C8CCB9";

function NewsletterBlock() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({
      title: "You're on the list",
      description: "Thanks for subscribing — check your inbox soon.",
    });
    setEmail("");
  };

  return (
    <div>
      <p className="font-home-body max-w-[20rem] text-sm leading-relaxed text-[#1A1A1A]">
        Join our newsletter and save 10% on your first order
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-stretch"
      >
        <label htmlFor="footer-email" className="sr-only">
          Email
        </label>
        <input
          id="footer-email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-h-11 w-full rounded-md border border-neutral-300/90 bg-white px-3.5 text-sm text-[#1A1A1A] outline-none ring-offset-[#F7F4EB] placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-400/40 sm:flex-1"
        />
        <button
          type="submit"
          className="font-home-body min-h-11 shrink-0 rounded-md px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90"
          style={{ backgroundColor: ACCENT_GREEN }}
        >
          SUBSCRIBE
        </button>
      </form>
      <p className="mt-3 max-w-xl font-home-body text-[11px] leading-relaxed text-neutral-600">
        By subscribing, you agree to our{" "}
        <Link href="/terms" className="text-[#1A1A1A] underline underline-offset-2 hover:opacity-80">
          Terms of service
        </Link>{" "}
        &amp;{" "}
        <Link href="/privacy" className="text-[#1A1A1A] underline underline-offset-2 hover:opacity-80">
          Privacy policy
        </Link>
        .
      </p>
    </div>
  );
}

function LinkList({ links }) {
  return (
    <ul className="font-home-body space-y-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#1A1A1A]">
      {links.map((item) => (
        <li key={item.label}>
          <Link href={item.href} className="transition hover:opacity-[0.65]">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-home-body text-sm font-bold text-[#1A1A1A]">{title}</h3>
      <div className="mt-5">
        <LinkList links={links} />
      </div>
    </div>
  );
}

function AccordionBlock({ title, defaultOpen = false, links }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-300/70">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-home-body text-sm font-bold text-[#1A1A1A]">{title}</span>
        <Icon
          icon={open ? "mdi:minus" : "mdi:plus"}
          className="size-5 shrink-0 text-neutral-600"
          aria-hidden
        />
      </button>
      {open ? (
        <div className="pb-4 pt-0">
          <LinkList links={links} />
        </div>
      ) : null}
    </div>
  );
}

function FooterMegaMark({ className }) {
  return (
    <div
      className={cn(
        "pointer-events-none flex w-full justify-center px-2 select-none",
        className,
      )}
      aria-hidden
    >
      <p
        className="font-furniqo-serif flex flex-nowrap items-end justify-center tracking-[-0.02em]"
        style={{ color: MEGA_FILL, fontSize: "clamp(3.25rem, 16vw, 10.5rem)", lineHeight: 0.85 }}
      >
        <span className="whitespace-nowrap">FURNIQO</span>
        <span
          className="ml-[0.06em] inline-flex shrink-0 items-center justify-center self-start rounded-full border-[0.04em] border-current"
          style={{ marginTop: "0.06em", color: MEGA_FILL, width: "0.5em", height: "0.5em" }}
          aria-hidden
        >
          <span className="font-home-heading font-normal" style={{ fontSize: "0.25em", lineHeight: 1 }}>R</span>
        </span>
      </p>
    </div>
  );
}

const year = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: BG }}>
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-14 lg:px-8 lg:pb-16 lg:pt-14">
        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-x-10 lg:gap-y-14 xl:gap-x-16">
          <div className="min-w-0 pr-4">
            <Link href="/" className="inline-flex items-center" aria-label="Furniqo home">
              <Image
                src="/furniqo-logo.svg"
                alt=""
                width={132}
                height={36}
                className="h-7 w-auto"
              />
            </Link>
            <div className="mt-8">
              <NewsletterBlock />
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              {FOOTER_SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A1A1A] transition hover:opacity-60"
                  aria-label={s.label}
                >
                  <Icon icon={s.icon} className="size-[1.35rem]" />
                </a>
              ))}
            </div>
          </div>
          <LinkColumn title="Shop" links={FOOTER_SHOP_LINKS} />
          <LinkColumn title="Info" links={FOOTER_INFO_LINKS} />
          <LinkColumn title="Legal" links={FOOTER_LEGAL_LINKS} />
        </div>

        {/* Mobile / tablet */}
        <div className="lg:hidden">
          <Link href="/" className="inline-flex" aria-label="Furniqo home">
            <Image
              src="/furniqo-logo.svg"
              alt=""
              width={132}
              height={36}
              className="h-7 w-auto"
            />
          </Link>
          <div className="mt-8">
            <NewsletterBlock />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            {FOOTER_SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A1A1A] transition hover:opacity-60"
                aria-label={s.label}
              >
                <Icon icon={s.icon} className="size-[1.35rem]" />
              </a>
            ))}
          </div>
          <div className="mt-10 md:grid md:grid-cols-3 md:gap-x-8">
            <div className="md:hidden">
              <AccordionBlock title="Shop" defaultOpen links={FOOTER_SHOP_LINKS} />
              <AccordionBlock title="Info" links={FOOTER_INFO_LINKS} />
              <AccordionBlock title="Legal" links={FOOTER_LEGAL_LINKS} />
            </div>
            <div className="hidden md:contents">
              <LinkColumn title="Shop" links={FOOTER_SHOP_LINKS} />
              <LinkColumn title="Info" links={FOOTER_INFO_LINKS} />
              <LinkColumn title="Legal" links={FOOTER_LEGAL_LINKS} />
            </div>
          </div>
        </div>

        <FooterMegaMark className="mt-14 sm:mt-20 lg:mt-24" />

        <div className="mt-12 border-t border-neutral-300/80 pt-7 sm:mt-14">
          <div className="flex flex-col-reverse items-center justify-between gap-8 sm:flex-row sm:gap-6">
            <p className="font-home-body text-xs text-[#1A1A1A]">© Furniqo {year}</p>
            <div
              className="flex flex-wrap items-center justify-center gap-3 [&_svg]:opacity-95 sm:justify-end"
              aria-label="Accepted payment methods"
            >
              <Icon icon="logos:visa" className="h-7 w-11 shrink-0" aria-hidden />
              <Icon icon="logos:mastercard" className="h-7 w-11 shrink-0" aria-hidden />
              <Icon icon="logos:amex" className="h-7 w-11 shrink-0" aria-hidden />
              <Icon icon="logos:discover" className="h-7 w-11 shrink-0" aria-hidden />
              <Icon icon="logos:apple-pay" className="h-7 w-[2.85rem] shrink-0" aria-hidden />
              <Icon icon="logos:paypal" className="h-7 w-11 shrink-0" aria-hidden />
              <span
                className="font-home-body flex h-7 min-w-[4.75rem] items-center justify-center rounded border border-neutral-900/35 px-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1A1A1A]"
                aria-hidden
              >
                Shop Pay
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
