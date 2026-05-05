"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { ProductCard } from "@/components/home/PopularPicksSection";
import { PRODUCTS } from "@/components/home/popularPicksData";

const FOREST = "#2D3E33";
const PAGE_BG = "#F9F7F2";

export default function NotFoundBestSellers() {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const items = PRODUCTS.filter((p) => p.category === "living").slice(0, 4);
  const showCarousel = items.length > 0;

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max <= 0 ? 1 : el.scrollLeft / max);
  }, []);

  const scrollByDir = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-carousel-card]");
    const delta = card ? card.offsetWidth + 12 : 280;
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  };

  if (!showCarousel) return null;

  return (
    <section className="pb-14 pt-4 sm:pb-16 sm:pt-6" style={{ backgroundColor: PAGE_BG }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2
            className="font-home-heading text-[1.65rem] leading-[1.1] tracking-tight sm:text-2xl md:text-3xl"
            style={{ color: FOREST }}
          >
            Best sellers
          </h2>
          <Link
            href="/products"
            className="font-home-sub inline-flex shrink-0 items-center border border-[#d4cfc3] bg-[#f4f0ea] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2D3E33] transition hover:bg-[#ebe4d9]"
            style={{ borderRadius: "2px" }}
          >
            View all
          </Link>
        </div>

        {/* Mobile: horizontal snap carousel */}
        <div className="relative mt-8 md:hidden">
          <ul
            ref={scrollRef}
            onScroll={updateProgress}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [-webkit-overflow-scrolling:touch]"
            aria-label="Best sellers"
          >
            {items.map((product) => (
              <li
                key={product.id}
                data-carousel-card
                className="w-[min(78vw,280px)] shrink-0 snap-start"
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-[#e5e2dc]">
              <div
                className="h-full rounded-full bg-[#2D3E33] transition-[width] duration-150"
                style={{ width: `${Math.round(30 + progress * 70)}%` }}
              />
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                aria-label="Previous products"
                className="flex size-9 items-center justify-center border border-[#d4cfc3] bg-[#f4f0ea] text-[#2D3E33] transition hover:bg-[#ebe4d9]"
                style={{ borderRadius: "2px" }}
                onClick={() => scrollByDir(-1)}
              >
                <Icon icon="mingcute:arrow-left-line" className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next products"
                className="flex size-9 items-center justify-center border border-[#d4cfc3] bg-[#f4f0ea] text-[#2D3E33] transition hover:bg-[#ebe4d9]"
                style={{ borderRadius: "2px" }}
                onClick={() => scrollByDir(1)}
              >
                <Icon icon="mingcute:arrow-right-line" className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tablet/desktop: grid */}
        <ul className="mt-8 hidden list-none gap-x-4 gap-y-10 md:grid md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {items.map((product) => (
            <li key={product.id} className="min-w-0">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
