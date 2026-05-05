"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

/** Cream-page share row: dark icons, matches editorial article footer */
export default function JournalArticleShareFooter({ className = "", centered = false }) {
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(typeof window !== "undefined" ? window.location.href : "");
  }, []);

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
    <footer className={cn(centered && "flex flex-col items-center text-center", className)}>
      <p className="font-home-sub text-[10px] font-semibold uppercase tracking-[0.28em] text-[#3d4a42] sm:text-[11px]">
        Share this post
      </p>
      <div
        className={cn(
          "mt-3 flex flex-wrap items-center gap-3 sm:gap-4",
          centered && "justify-center"
        )}
      >
        <button
          type="button"
          onClick={onCopyLink}
          className="rounded-full p-2 text-[#1a3021] transition hover:bg-black/[0.04]"
          aria-label={copied ? "Link copied" : "Copy link to this article"}
        >
          <Icon icon="mingcute:link-2-line" className="size-5 sm:size-[1.375rem]" aria-hidden />
        </button>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full p-2 text-[#1a3021] transition hover:bg-black/[0.04]"
          aria-label="Instagram (opens in a new tab)"
        >
          <Icon icon="mdi:instagram" className="size-5 sm:size-[1.375rem]" aria-hidden />
        </a>
        <a
          href={
            shareTarget
              ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareTarget)}`
              : "https://www.facebook.com/"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full p-2 text-[#1a3021] transition hover:bg-black/[0.04]"
          aria-label="Share on Facebook (opens in a new tab)"
        >
          <Icon icon="mingcute:facebook-line" className="size-5 sm:size-[1.375rem]" aria-hidden />
        </a>
      </div>
      {copied ? (
        <p
          className={cn("font-home-body mt-2 text-xs text-neutral-600", centered && "text-center")}
          role="status"
        >
          Link copied
        </p>
      ) : null}
    </footer>
  );
}
