import Link from "next/link";
import { Icon } from "@iconify/react";

const GREEN = "#26362e";

export function AccountOrdersEmpty() {
  return (
    <section aria-labelledby="account-orders-heading">
      <h2
        id="account-orders-heading"
        className="font-home-body text-base font-semibold text-[#1a251f]"
      >
        Orders
      </h2>

      <div className="mx-auto mt-12 flex max-w-md flex-col items-center text-center sm:mt-14 md:mt-16">
        <div className="mb-8 flex items-center gap-3 text-[#1a251f]" aria-hidden>
          <div className="flex gap-1 opacity-[0.35]">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-10 w-px bg-current" />
            ))}
          </div>
          <Icon icon="mingcute:shopping-bag-3-line" className="size-[4.5rem] sm:size-[5rem]" />
        </div>

        <p className="font-home-heading text-[1.35rem] leading-snug tracking-tight text-[#1a251f] sm:text-[1.5rem]">
          You don&apos;t have any orders yet
        </p>
        <p className="font-home-body mt-3 max-w-sm text-sm leading-relaxed text-[#555555] sm:text-[15px]">
          Start your purchases and check this page later
        </p>

        <Link
          href="/shop-all"
          className="font-home-sub mt-10 inline-flex min-h-[3rem] w-full max-w-xs items-center justify-center rounded-lg px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-92 sm:w-auto sm:min-w-[14rem]"
          style={{ backgroundColor: GREEN }}
        >
          Start shopping
        </Link>
      </div>
    </section>
  );
}
