"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import SearchProductCard from "@/components/search/SearchProductCard";
import { searchShopProducts, SEARCH_PREVIEW_LIMIT } from "@/lib/catalog-search";

const PANEL_GUTTERS = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

const DEBOUNCE_MS = 280;

export default function SiteSearchPanel({ open, onClose }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => setDebouncedQuery(query.trim()), DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [query]);

  const hits = useMemo(() => {
    if (debouncedQuery.length < 1) return [];
    return searchShopProducts(debouncedQuery);
  }, [debouncedQuery]);

  const preview = useMemo(() => hits.slice(0, SEARCH_PREVIEW_LIMIT), [hits]);
  const showResultsBlock = debouncedQuery.length >= 1;
  const hasHits = hits.length > 0;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="border-b border-[#e0dcd3] bg-white shadow-sm"
      role="search"
      aria-label="Site search"
    >
      <div className={cn(PANEL_GUTTERS, "py-3 sm:py-4")}>
        <div className="flex items-center gap-3 border-b border-neutral-200/90 pb-3">
          <Icon icon="mingcute:search-line" className="size-5 shrink-0 text-neutral-500" aria-hidden />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent font-home-body text-base text-[#1a3021] outline-none placeholder:text-neutral-400 sm:text-lg"
            aria-label="Search products"
          />
          {query.trim().length > 0 ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="shrink-0 font-home-body text-sm font-medium text-neutral-600 underline underline-offset-2 hover:text-[#1a3021]"
            >
              Clear
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="flex size-9 shrink-0 items-center justify-center rounded-md text-neutral-600 transition hover:bg-neutral-100 hover:text-[#1a3021]"
            aria-label="Close search"
          >
            <Icon icon="mingcute:close-line" className="size-5" />
          </button>
        </div>

        {showResultsBlock ? (
          <div className="pt-6">
            {!hasHits ? (
              <div className="max-w-xl text-left">
                <p className="font-home-heading text-xl leading-snug text-[#1a3021] sm:text-2xl">
                  No results found for &apos;{debouncedQuery}&apos;
                </p>
                <p className="mt-2 font-home-body text-sm text-neutral-600 sm:text-[15px]">
                  Try a new search to find what you&apos;re looking for.
                </p>
              </div>
            ) : (
              <>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
                  {preview.map((p) => (
                    <li key={p.slug}>
                      <SearchProductCard product={p} dense />
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex justify-center pb-2">
                  <Link
                    href={`/search?q=${encodeURIComponent(debouncedQuery)}`}
                    onClick={onClose}
                    className="font-home-sub inline-flex h-12 min-w-[12rem] items-center justify-center rounded-sm bg-[#24352d] px-10 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#1e2c26] sm:min-w-[14rem]"
                  >
                    See all results
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
