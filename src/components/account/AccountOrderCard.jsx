"use client";

import Image from "next/image";
import Link from "next/link";
import { format, addDays } from "date-fns";
import { Icon } from "@iconify/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const FOREST = "#26362e";
const BAR_BG = "#f2efea";
const LINE_BG = "#ece7de";

function flattenLines(lines) {
  const out = [];
  for (const line of lines) {
    const q = Math.max(1, Math.floor(line.qty ?? 1));
    for (let i = 0; i < q; i++) out.push(line);
  }
  return out;
}

function OrderImageGrid({ lines }) {
  const flat = flattenLines(lines);
  const overflow = Math.max(0, flat.length - 3);

  if (flat.length === 0) {
    return (
      <div className="flex min-h-[140px] items-center justify-center rounded-sm bg-[#ece7de] font-home-body text-sm text-neutral-500">
        No images
      </div>
    );
  }

  if (flat.length === 1) {
    const line = flat[0];
    return (
      <div className="relative aspect-[5/3] w-full overflow-hidden rounded-sm bg-[#ece7de]">
        <Image src={line.image} alt={line.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 400px" />
      </div>
    );
  }

  if (flat.length === 2) {
    return (
      <div className="grid min-h-[140px] grid-cols-2 gap-1 sm:min-h-[168px]">
        {flat.map((line, i) => (
          <div key={`${line.slug}-${i}`} className="relative min-h-[120px] overflow-hidden rounded-sm bg-[#ece7de]">
            <Image src={line.image} alt={line.name} fill className="object-cover" sizes="200px" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid min-h-[160px] grid-cols-2 grid-rows-2 gap-1 sm:min-h-[200px]">
      <div className="relative row-span-2 overflow-hidden rounded-sm bg-[#ece7de]">
        <Image src={flat[0].image} alt={flat[0].name} fill className="object-cover" sizes="(max-width:768px) 50vw, 240px" />
      </div>
      <div className="relative min-h-[76px] overflow-hidden rounded-sm bg-[#ece7de] sm:min-h-[96px]">
        <Image src={flat[1].image} alt={flat[1].name} fill className="object-cover" sizes="200px" />
      </div>
      <div className="relative flex min-h-[76px] items-center justify-center overflow-hidden rounded-sm bg-[#ece7de] sm:min-h-[96px]">
        {overflow > 0 ? (
          <span className="font-home-body text-[13px] font-semibold tabular-nums text-[#1a3021]">
            +{overflow} products
          </span>
        ) : (
          <Image src={flat[2].image} alt={flat[2].name} fill className="object-cover" sizes="200px" />
        )}
      </div>
    </div>
  );
}

function statusPresentation(order) {
  const updated = format(new Date(order.updatedAt), "MMM d");
  if (order.paymentStatus === "pending") {
    return {
      icon: "mingcute:check-circle-line",
      title: "Confirmed",
      detail: `Updated ${updated}`,
    };
  }
  if (order.fulfillmentStatus === "delivered") {
    return {
      icon: "mingcute:map-pin-line",
      title: "Delivered",
      detail: updated,
    };
  }
  const est = format(addDays(new Date(order.updatedAt), 7), "MMM d");
  return {
    icon: "mingcute:truck-line",
    title: "Out for delivery",
    detail: `Estimated delivery ${est}`,
  };
}

export default function AccountOrderCard({ order, onPaid, onCancelled, onBuyAgain }) {
  const meta = statusPresentation(order);
  const needsPay = order.paymentStatus === "pending";
  const showBuyAgain = !needsPay;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-[#e3ddd4] bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      <div
        className="flex items-start gap-2 border-b border-[#ebe6df] px-3 py-2.5 sm:px-4 sm:py-3"
        style={{ backgroundColor: BAR_BG }}
      >
        <Icon icon={meta.icon} className="mt-0.5 size-5 shrink-0 text-[#1a3021]" aria-hidden />
        <div className="min-w-0">
          <p className="font-home-body text-[13px] font-semibold leading-tight text-[#1a3021] sm:text-sm">
            {meta.title}
            {needsPay ? <span className="font-normal text-neutral-600"> · {meta.detail}</span> : null}
          </p>
          {!needsPay ? (
            <p className="font-home-body mt-0.5 text-xs text-neutral-600 sm:text-[13px]">{meta.detail}</p>
          ) : null}
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="overflow-hidden rounded-md border border-[#ebe6df] bg-white">
          <div className="p-1.5 sm:p-2" style={{ backgroundColor: LINE_BG }}>
            <OrderImageGrid lines={order.lines} />
          </div>
        </div>

        <div className="mt-4 space-y-1 font-home-body text-sm text-neutral-700">
          <p>
            <span className="tabular-nums">{order.itemsCount}</span> {order.itemsCount === 1 ? "item" : "items"}
          </p>
          <p className="text-neutral-600">Order #{order.orderNumber}</p>
          <p className="text-base font-semibold tabular-nums text-[#1a3021]">${order.total.toFixed(2)}</p>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {needsPay ? (
            <>
              <button
                type="button"
                onClick={() => onPaid(order.id)}
                className="font-home-sub inline-flex h-11 flex-1 items-center justify-center rounded-md text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-92 sm:min-w-[8rem]"
                style={{ backgroundColor: FOREST }}
              >
                Pay now
              </button>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="font-home-sub inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-[#d8d2c8] bg-[#faf8f5] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a3021] transition hover:bg-[#f2eee8] sm:min-w-[8rem]"
                  >
                    Manage
                    <Icon icon="mingcute:down-line" className="size-4" aria-hidden />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-52 p-2 font-home-body text-sm">
                  <button
                    type="button"
                    className="flex w-full rounded-md px-3 py-2 text-left hover:bg-neutral-100"
                    onClick={() => onCancelled(order.id)}
                  >
                    Cancel order
                  </button>
                  <Link href="/faq" className="flex w-full rounded-md px-3 py-2 text-neutral-700 hover:bg-neutral-100">
                    Help &amp; FAQ
                  </Link>
                </PopoverContent>
              </Popover>
            </>
          ) : null}

          {showBuyAgain ? (
            <button
              type="button"
              onClick={() => onBuyAgain(order.lines)}
              className="font-home-sub inline-flex h-11 w-full items-center justify-center rounded-md border border-[#d8d2c8] bg-[#faf8f5] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1a3021] transition hover:bg-[#f2eee8] sm:w-auto sm:min-w-[12rem]"
            >
              Buy again
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
