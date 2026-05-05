"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { SITE_HEADER_GUTTERS } from "@/components/home/SiteHeader";

/** Full-bleed article hero: background image, title, optional author/date/read + share row. */
export default function JournalArticleHero({ slide }) {
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(typeof window !== "undefined" ? window.location.href : "");
  }, []);

  const hasArticleMeta =
    Boolean(slide.author) || Boolean(slide.dateLabel) || slide.readMinutes != null;

  const onCopyLink = useCallback(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (!url || !navigator.clipboard?.writeText) return;
    void navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  const shareTarget = pageUrl || "";

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-neutral-900"
      aria-label="Article header"
    >
      <div className="relative min-h-[min(72dvh,560px)] w-full sm:min-h-[min(78dvh,620px)] lg:min-h-[min(88dvh,760px)]">
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          className="object-cover"
          style={{ objectPosition: slide.position }}
          priority
          sizes="100vw"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25 sm:from-black/72 sm:via-black/35 sm:to-black/15 lg:bg-gradient-to-r lg:from-black/68 lg:via-black/38 lg:to-black/10"
          aria-hidden
        />

        <div
          className={`${SITE_HEADER_GUTTERS} relative z-10 mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-end pb-14 pt-16 sm:justify-center sm:pb-28 sm:pt-20 md:pb-32 lg:pb-36 lg:pt-24`}
        >
          <div className="w-full max-w-xl text-left sm:max-w-2xl lg:mx-0 lg:max-w-[min(100%,34rem)] xl:max-w-3xl">
            <p className="font-home-sub text-[10px] font-semibold uppercase tracking-[0.28em] text-white sm:text-[11px]">
              {slide.eyebrow}
            </p>

            <h1 className="font-home-heading mt-3 text-[1.65rem] leading-[1.12] tracking-tight text-white sm:mt-4 sm:text-[2rem] md:text-[2.35rem] lg:text-[2.85rem] xl:text-[3.15rem]">
              {slide.title}
            </h1>

            {hasArticleMeta ? (
              <>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-home-body text-[13px] text-white/95 sm:mt-6 sm:gap-x-6 sm:text-sm">
                  {slide.author ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Icon icon="mingcute:user-3-line" className="size-4 shrink-0 opacity-95" aria-hidden />
                      {slide.author}
                    </span>
                  ) : null}
                  {slide.dateLabel ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Icon icon="mingcute:calendar-line" className="size-4 shrink-0 opacity-95" aria-hidden />
                      {slide.dateLabel}
                    </span>
                  ) : null}
                  {slide.readMinutes != null ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Icon icon="mingcute:time-line" className="size-4 shrink-0 opacity-95" aria-hidden />
                      {slide.readMinutes} min read
                    </span>
                  ) : null}
                </div>

                {!slide.hideHeroShare ? (
                  <div className="mt-8 sm:mt-10">
                    <p className="font-home-sub text-[10px] font-semibold uppercase tracking-[0.28em] text-white sm:text-[11px]">
                      Share this post
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={onCopyLink}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition hover:border-white/55 hover:bg-white/15"
                        aria-label={copied ? "Link copied" : "Copy link to this article"}
                      >
                        <Icon icon="mingcute:link-2-line" className="size-5" aria-hidden />
                      </button>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex size-10 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition hover:border-white/55 hover:bg-white/15"
                        aria-label="Instagram (opens in a new tab)"
                      >
                        <Icon icon="mdi:instagram" className="size-5" aria-hidden />
                      </a>
                      <a
                        href={
                          shareTarget
                            ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareTarget)}`
                            : "https://www.facebook.com/"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex size-10 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white backdrop-blur-sm transition hover:border-white/55 hover:bg-white/15"
                        aria-label="Share on Facebook (opens in a new tab)"
                      >
                        <Icon icon="mingcute:facebook-line" className="size-5" aria-hidden />
                      </a>
                    </div>
                    {copied ? (
                      <p className="font-home-body mt-2 text-xs text-white/85" role="status">
                        Link copied
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </>
            ) : (
              slide.description && (
                <p className="font-home-body mt-4 max-w-[22rem] text-sm leading-relaxed text-white sm:mt-5 sm:max-w-none sm:text-[15px] md:text-base">
                  {slide.description}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
