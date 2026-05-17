"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { DEAL_PROMO } from "@/components/home/dealsOfTheWeekData";
import { useCart } from "@/contexts/CartContext";

const GREEN = "#1A3021";
const RED = "#B22222";
const SECTION_BG = "#FCF9F2";
const CARD_BG = "#f4f1ea";

function formatPrice(n) {
  return Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function DealProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <article className="flex h-full flex-col text-center">
      <Link href={`/products/${product.id}`} className="group flex min-w-0 flex-1 flex-col">
        <div
          className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#ebe8e0]"
          style={{ borderRadius: "2px" }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition group-hover:opacity-95"
            sizes="(max-width: 768px) 45vw, 22vw"
          />
          <span
            className="font-home-sub absolute right-2 top-2 px-1.5 py-px text-[9px] font-semibold tabular-nums text-white sm:right-2.5 sm:px-2 sm:py-0.5 sm:text-[10px]"
            style={{ backgroundColor: RED }}
          >
            -{product.discount}%
          </span>
        </div>

        <h3 className="font-home-heading mt-2.5 text-[0.95rem] leading-snug sm:mt-3 sm:text-lg" style={{ color: GREEN }}>
          {product.name}
        </h3>

        <div className="mt-1 flex flex-wrap items-center justify-center gap-0.5 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon key={i} icon="mingcute:star-fill" className="size-3 sm:size-3.5" aria-hidden />
          ))}
          <span className="ml-0.5 font-home-body text-[10px] font-normal text-neutral-500 sm:text-xs">
            ({product.reviews} reviews)
          </span>
        </div>

        <p className="mt-1.5 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-0.5">
          <span className="text-base font-semibold text-neutral-900">${formatPrice(product.price)}</span>
          <span className="font-home-body text-sm tabular-nums line-through" style={{ color: RED }}>
            ${formatPrice(product.compareAt)}
          </span>
        </p>
      </Link>

      <button
        type="button"
        className="font-home-sub mt-3 w-full border border-[#d4cfc3] bg-[#f4f0ea] py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#2D3E33] transition hover:bg-[#2A3E34] hover:text-white sm:mt-3.5 sm:py-2.5 sm:text-[10px]"
        style={{ borderRadius: "2px" }}
        onClick={() =>
          addItem({
            slug: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            compareAt: product.compareAt,
            qty: 1,
          })
        }
      >
        Add to cart
      </button>
    </article>
  );
}

function DealsPromoBanner() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[6px] border border-[#e4dfd4] shadow-sm" style={{ minHeight: "280px" }}>
      <Image
        src={DEAL_PROMO.image}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={false}
      />
      <div
        className="absolute left-2 top-2 max-w-[calc(100%-1rem)] p-2.5 shadow-md sm:left-3 sm:top-3 sm:max-w-[min(100%,24rem)] sm:p-3.5"
        style={{ backgroundColor: RED }}
      >
        <p className="font-home-sub text-[8px] font-semibold uppercase leading-relaxed tracking-[0.1em] text-white sm:text-[10px] sm:tracking-[0.12em]">
          {DEAL_PROMO.datesLine}
        </p>
        <p className="font-home-body mt-2 text-[0.8125rem] font-medium leading-snug text-white sm:mt-3 sm:text-base md:text-lg">
          {DEAL_PROMO.headline}{" "}
          <span className="font-normal opacity-95">{DEAL_PROMO.subheadline}</span>
        </p>
      </div>
    </div>
  );
}

export default function DealsOfTheWeekSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDeals() {
      try {
        const res = await fetch(`/api/storefront/products?pageSize=6`);
        const json = await res.json();
        if (json.success) {
          const mapped = json.data.products.map((p, i) => ({
            id: p.id,
            name: p.name,
            image: p.image_url,
            price: p.price,
            compareAt: +(p.price * 1.5).toFixed(2),
            discount: 50,
            reviews: 123,
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch deals:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDeals();
  }, []);

  const [topLeft, topRight, ...rest] = products;

  return (
    <section className="py-7 sm:py-12 md:py-16 lg:py-20" style={{ backgroundColor: SECTION_BG }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h2
            className="font-home-heading text-[1.75rem] leading-tight tracking-tight sm:text-3xl md:text-[2.25rem]"
            style={{ color: GREEN }}
          >
            Deals of the week
          </h2>
          <p className="mt-2 max-w-2xl font-home-body text-sm leading-relaxed text-neutral-900 sm:text-base">
            Limited-time offers on customer favorites. New deals every Monday.
          </p>
        </div>

        {loading ? (
          <div className="mt-16 flex flex-col items-center justify-center">
            <Icon icon="line-md:loading-twotone-loop" className="size-10 text-[#1A3021]" />
            <p className="mt-4 text-xs font-medium uppercase tracking-widest text-neutral-500">Loading deals…</p>
          </div>
        ) : products.length < 2 ? null : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 md:mt-10 md:grid-cols-4 md:gap-5 lg:gap-6">
            <div className="min-w-0">
              <DealProductCard product={topLeft} />
            </div>
            <div className="min-w-0">
              <DealProductCard product={topRight} />
            </div>
            <div className="col-span-2 min-h-0 md:col-span-2 md:min-h-full">
              <DealsPromoBanner />
            </div>
            {rest.map((product) => (
              <div key={product.id} className="min-w-0">
                <DealProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
