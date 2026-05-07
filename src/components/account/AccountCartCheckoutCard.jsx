"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { AccountOrderImageGrid } from "@/components/account/AccountOrderCard";

const FOREST = "#26362e";
const BAR_BG = "#f2efea";
const LINE_BG = "#ece7de";

/**
 * Shown on /account/orders when the cart has items but the user has not placed an order yet,
 * or alongside existing orders when the cart is non-empty.
 */
export default function AccountCartCheckoutCard({ items, totalQty, subtotal }) {
  if (!items?.length || totalQty < 1) return null;

  const orderLikeLines = items.map((l) => ({
    slug: l.slug,
    name: l.name,
    image: l.image,
    price: l.price,
    qty: l.qty,
    variantLabel: l.variantLabel,
  }));

  return (
    <article className="flex max-w-xl flex-col overflow-hidden rounded-lg border border-[#e3ddd4] bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      <div
        className="flex items-start gap-2 border-b border-[#ebe6df] px-3 py-2.5 sm:px-4 sm:py-3"
        style={{ backgroundColor: BAR_BG }}
      >
        <Icon icon="mingcute:shopping-cart-2-line" className="mt-0.5 size-5 shrink-0 text-[#1a3021]" aria-hidden />
        <div className="min-w-0">
          <p className="font-home-body text-[13px] font-semibold leading-tight text-[#1a3021] sm:text-sm">
            In your cart
            <span className="font-normal text-neutral-600"> · Not placed yet</span>
          </p>
          <p className="font-home-body mt-0.5 text-xs text-neutral-600 sm:text-[13px]">
            Confirm checkout to add this to your order history
          </p>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="overflow-hidden rounded-md border border-[#ebe6df] bg-white">
          <div className="p-1.5 sm:p-2" style={{ backgroundColor: LINE_BG }}>
            <AccountOrderImageGrid lines={orderLikeLines} />
          </div>
        </div>

        <div className="mt-4 space-y-1 font-home-body text-sm text-neutral-700">
          <p>
            <span className="tabular-nums">{totalQty}</span> {totalQty === 1 ? "item" : "items"}
          </p>
          <p className="text-neutral-600">Awaiting checkout</p>
          <p className="text-base font-semibold tabular-nums text-[#1a3021]">${subtotal.toFixed(2)}</p>
        </div>

        <Link
          href="/checkout"
          className="font-home-sub mt-5 flex h-11 w-full items-center justify-center rounded-md text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-92"
          style={{ backgroundColor: FOREST }}
        >
          Continue to checkout
        </Link>
      </div>
    </article>
  );
}
