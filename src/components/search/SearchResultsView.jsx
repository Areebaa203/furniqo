"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import SearchProductCard from "@/components/search/SearchProductCard";
import { searchShopProducts } from "@/lib/catalog-search";

const GUTTERS = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

export default function SearchResultsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qFromUrl = (searchParams.get("q") ?? "").trim();

  const [input, setInput] = useState(qFromUrl);

  useEffect(() => {
    setInput(qFromUrl);
  }, [qFromUrl]);

  const hits = useMemo(() => searchShopProducts(qFromUrl), [qFromUrl]);
  const hasQuery = qFromUrl.length >= 1;

  const onSubmit = (e) => {
    e.preventDefault();
    const t = input.trim();
    router.push(t ? `/search?q=${encodeURIComponent(t)}` : "/search");
  };

  return (
    <main className="pb-16 pt-6 sm:pb-24 sm:pt-8 lg:pb-28">
      <div className={GUTTERS}>
        <nav className="mb-8 font-home-body text-xs text-neutral-600">
          <Link href="/" className="underline-offset-4 hover:text-[#1a3021] hover:underline">
            Home
          </Link>
          <span aria-hidden className="mx-2 text-neutral-400">
            /
          </span>
          <span className="text-[#1a3021]">Search</span>
        </nav>

        <form role="search" aria-label="Search products" className="mb-8 flex items-center gap-3 border-b border-neutral-200/90 pb-4" onSubmit={onSubmit}>
          <Icon icon="mingcute:search-line" className="size-5 shrink-0 text-neutral-500" aria-hidden />
          <input
            type="search"
            name="q"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent font-home-body text-base text-[#1a3021] outline-none placeholder:text-neutral-400 sm:text-lg"
          />
          {input.trim().length > 0 ? (
            <button
              type="button"
              onClick={() => setInput("")}
              className="shrink-0 font-home-body text-sm font-medium text-neutral-600 underline underline-offset-2 hover:text-[#1a3021]"
            >
              Clear
            </button>
          ) : null}
          <button
            type="submit"
            className="sr-only focus:not-sr-only focus:absolute focus:rounded-md focus:bg-neutral-100 focus:px-2 focus:py-1"
          >
            Search
          </button>
        </form>

        {!hasQuery ? (
          <div className="max-w-xl text-left">
            <h1 className="font-home-heading text-2xl text-[#1a3021] sm:text-3xl">Search</h1>
            <p className="mt-2 font-home-body text-sm text-neutral-600 sm:text-[15px]">
              Enter a search term above to browse products.
            </p>
            <p className="mt-8 font-home-body text-sm text-neutral-600">
              Or explore the{" "}
              <Link href="/products" className="font-medium text-[#1a3021] underline underline-offset-4">
                full catalog
              </Link>
              .
            </p>
          </div>
        ) : hits.length === 0 ? (
          <div className="max-w-xl text-left">
            <p className="font-home-heading text-xl leading-snug text-[#1a3021] sm:text-2xl">
              No results found for &apos;{qFromUrl}&apos;
            </p>
            <p className="mt-2 font-home-body text-sm text-neutral-600 sm:text-[15px]">
              Try a new search to find what you&apos;re looking for.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-6 font-home-body text-sm text-neutral-600">
              Showing <span className="tabular-nums text-[#1a3021]">{hits.length}</span>{" "}
              {hits.length === 1 ? "result" : "results"} for &apos;{qFromUrl}&apos;
            </p>
            <ul
              className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
            >
              {hits.map((p) => (
                <li key={p.slug}>
                  <SearchProductCard product={p} dense={false} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
