import Link from "next/link";
import { Icon } from "@iconify/react";

const GREEN = "#26362e";

export function AccountSubscriptionsEmpty() {
  return (
    <section aria-labelledby="account-subscriptions-heading">
      <h2
        id="account-subscriptions-heading"
        className="font-home-body text-base font-semibold text-[#1a251f]"
      >
        Subscriptions
      </h2>

      <div className="mx-auto mt-12 flex max-w-md flex-col items-center text-center sm:mt-14 md:mt-16">
        <div className="mb-8 text-[#1a251f]" aria-hidden>
          <Icon
            icon="mingcute:calendar-schedule-line"
            className="mx-auto size-[4rem] opacity-90 sm:size-[4.5rem]"
          />
        </div>

        <p className="font-home-heading text-[1.35rem] leading-snug tracking-tight text-[#1a251f] sm:text-[1.5rem]">
          No active subscriptions
        </p>
        <p className="font-home-body mt-3 max-w-sm text-sm leading-relaxed text-[#555555] sm:text-[15px]">
          Subscribe &amp; save on eligible items from your cart at checkout when available.
        </p>

        <Link
          href="/products"
          className="font-home-sub mt-10 inline-flex min-h-[3rem] w-full max-w-xs items-center justify-center rounded-lg px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-92 sm:w-auto sm:min-w-[14rem]"
          style={{ backgroundColor: GREEN }}
        >
          Browse products
        </Link>
      </div>
    </section>
  );
}
