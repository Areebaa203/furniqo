"use client";

import { Icon } from "@iconify/react";
import { SITE_HEADER_GUTTERS } from "@/components/home/SiteHeader";

const FOREST = "#2D3E33";

export default function StorefrontErrorView({ reset }) {
  return (
    <main className="min-h-[50vh] pb-20 pt-10 sm:pt-14 md:pt-16" style={{ backgroundColor: "#F9F7F2" }}>
      <div className={SITE_HEADER_GUTTERS}>
        <header className="max-w-xl">
          <h1
            className="font-home-heading text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] sm:text-[2.35rem] md:text-[2.75rem]"
            style={{ color: FOREST }}
          >
            Something went wrong
          </h1>
          <p className="mt-4 font-home-body text-[15px] leading-relaxed text-neutral-800 sm:mt-5 sm:text-base">
            Oops! Something&apos;s off. We&apos;re working to fix it.
          </p>
          <button
            type="button"
            onClick={reset}
            className="font-home-sub mt-8 flex h-12 w-full max-w-xs items-center justify-center gap-2 bg-[#2D3E33] px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90 sm:mt-10 sm:w-auto sm:max-w-none sm:px-8"
            style={{ borderRadius: "2px" }}
          >
            Refresh page
            <Icon icon="mingcute:refresh-3-line" className="size-4 shrink-0" aria-hidden />
          </button>
        </header>
      </div>
    </main>
  );
}
