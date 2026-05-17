"use client";

import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SITE_HEADER_GUTTERS } from "@/components/home/SiteHeader";

const GREEN = "#2D3E33";

export default function AboutNewsletterSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast({
      title: "You're on the list",
      description: "Thanks for subscribing — enjoy 10% off your first order.",
    });
    setEmail("");
  };

  return (
    <section
      className="bg-[#FAF9F6] py-12 sm:py-14 md:py-16 lg:py-20"
      aria-labelledby="about-newsletter-heading"
    >
      <div className={SITE_HEADER_GUTTERS}>
        <div className="w-full bg-[#F9F8F3] px-5 py-10 sm:px-8 sm:py-11 md:px-10 md:py-12 lg:px-12 lg:py-14">
          <h2
            id="about-newsletter-heading"
            className="mx-auto max-w-2xl text-center font-home-heading text-[1.35rem] font-normal leading-snug tracking-[-0.02em] sm:text-[1.5rem] md:text-[1.65rem] lg:text-[1.75rem]"
            style={{ color: GREEN }}
          >
            Subscribe to our news &amp; offers and save 10% on your first order
          </h2>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:mt-9 sm:max-w-2xl sm:flex-row sm:items-stretch sm:gap-3"
          >
            <label htmlFor="about-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="about-newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-home-body h-12 w-full rounded-md border border-[#d8d4cd] bg-white px-4 text-sm text-[#1a1a1a] outline-none placeholder:text-[#9c9890] focus-visible:border-[#2D3E33] focus-visible:ring-2 focus-visible:ring-[#2D3E33]/20 sm:h-[3.25rem] sm:flex-1 sm:px-5 sm:text-[15px]"
            />
            <button
              type="submit"
              className="font-home-sub h-12 shrink-0 rounded-md px-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-92 sm:h-[3.25rem] sm:px-10 sm:text-[11px]"
              style={{ backgroundColor: GREEN }}
            >
              Subscribe
            </button>
          </form>

          <p className="mx-auto mt-5 max-w-2xl text-center font-home-body text-xs leading-relaxed text-[#555555] sm:mt-6 sm:text-[13px]">
            Your email will only be used for Furniqo communications. Unsubscribe anytime. For more
            information, see our{" "}
            <Link
              href="#"
              className="underline decoration-[#555555] underline-offset-2 transition hover:text-[#2D3E33]"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
