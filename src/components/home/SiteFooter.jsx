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

const BG = "#FDFBF7";
const BTN_GREEN = "#2F3E33";



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
      <p className="font-home-body text-sm leading-relaxed text-neutral-800">
        Join our newsletter and save 10% on your first order.
      </p>
      <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-stretch">
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
          className="min-h-11 w-full border border-neutral-200/90 bg-white px-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-400 sm:flex-1"
        />
        <button
          type="submit"
          className="font-home-sub min-h-11 shrink-0 px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90"
          style={{ backgroundColor: BTN_GREEN }}
        >
          SUBSCRIBE
        </button>
      </form>
      <p className="mt-3 max-w-md font-home-body text-[11px] leading-relaxed text-neutral-500">
        By subscribing you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-2 hover:text-neutral-800">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-neutral-800">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

function LinkList({ links }) {
  return (
    <ul className="font-home-body space-y-3 text-xs font-medium uppercase tracking-[0.1em] text-neutral-700">
      {links.map((item) => (
        <li key={item.label}>
          <Link href={item.href} className="transition hover:text-neutral-900">
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
      <h3 className="font-home-sub text-sm font-bold uppercase tracking-[0.08em] text-neutral-900">{title}</h3>
      <div className="mt-4">
        <LinkList links={links} />
      </div>
    </div>
  );
}

function AccordionBlock({ title, defaultOpen = false, links }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-300/60">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-home-sub text-sm font-semibold uppercase tracking-[0.1em] text-neutral-900">
          {title}
        </span>
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

const year = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: BG }}>
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-12 lg:px-8 lg:pb-14 lg:pt-16">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-12 md:gap-10 lg:gap-14">
          <div className="max-w-xl md:col-span-5 lg:col-span-4">
            <Link href="/" className="inline-block" aria-label="Furniqo Home">
              <Image 
                src="/furniqo-logo.svg" 
                alt="Furniqo Logo" 
                width={140} 
                height={40} 
                className="h-8 w-auto sm:h-9" 
              />
            </Link>
            <div className="mt-5 flex items-center gap-5">
              {FOOTER_SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2D3E33] transition hover:opacity-70"
                  aria-label={s.label}
                >
                  <Icon icon={s.icon} className="size-[1.35rem]" />
                </a>
              ))}
            </div>
            <div className="mt-8">
              <NewsletterBlock />
            </div>
          </div>

          {/* Mobile accordions */}
          <div className="mt-10 md:col-span-12 md:hidden">
            <AccordionBlock title="Shop" defaultOpen={true} links={FOOTER_SHOP_LINKS} />
            <AccordionBlock title="Info" links={FOOTER_INFO_LINKS} />
            <AccordionBlock title="Legal" links={FOOTER_LEGAL_LINKS} />
          </div>

          {/* Desktop link columns */}
          <div className="hidden md:col-span-7 md:grid md:grid-cols-3 md:gap-6 lg:col-span-8 lg:gap-10">
            <LinkColumn title="Shop" links={FOOTER_SHOP_LINKS} />
            <LinkColumn title="Info" links={FOOTER_INFO_LINKS} />
            <LinkColumn title="Legal" links={FOOTER_LEGAL_LINKS} />
          </div>
        </div>

        <div className="pointer-events-none relative mt-12 flex justify-center select-none sm:mt-16 md:mt-20" aria-hidden>
          <div className="relative h-[4rem] w-full max-w-[500px] opacity-[0.12] sm:h-[6rem] md:h-[8rem] lg:h-[10rem]">
            <Image
              src="/furniqo-logo.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-300/70 pt-6 sm:mt-12">
          <div className="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row">
            <p className="font-home-body text-xs text-neutral-600">
              © Furniqo {year}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 opacity-[0.92] sm:justify-end">
              <Icon icon="logos:visa" className="h-6 w-10" aria-hidden />
              <Icon icon="logos:mastercard" className="h-6 w-10" aria-hidden />
              <Icon icon="logos:amex" className="h-6 w-10" aria-hidden />
              <Icon icon="logos:discover" className="h-6 w-10" aria-hidden />
              <Icon icon="logos:apple-pay" className="h-6 w-12" aria-hidden />
              <Icon icon="logos:paypal" className="h-6 w-10" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
