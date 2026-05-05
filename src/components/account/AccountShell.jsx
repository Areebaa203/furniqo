"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { SITE_HEADER_GUTTERS } from "@/components/home/SiteHeader";

const GREEN = "#26362e";
const ACTIVE_PILL = "#e4dfd6";

const NAV_ITEMS = [
  { href: "/account/orders", label: "Orders" },
  { href: "/account/subscriptions", label: "Subscriptions" },
  { href: "/account/settings", label: "Profile settings" },
];

export default function AccountShell({ children, showStoreDashboardLink }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div className={`${SITE_HEADER_GUTTERS} pb-16 pt-8 sm:pb-20 sm:pt-10 md:pb-24`}>
      <h1
        className="font-home-heading text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] sm:text-[2.25rem] md:text-[2.5rem]"
        style={{ color: GREEN }}
      >
        My account
      </h1>

      {/* Mobile + tablet: horizontal tabs */}
      <nav
        className="mt-8 flex gap-2 overflow-x-auto pb-1 lg:hidden"
        aria-label="Account sections"
      >
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-full px-4 py-2.5 font-home-body text-sm font-medium transition-colors",
                active ? "text-[#1a251f]" : "text-[#4a524a] hover:bg-[#ebe6df]/80"
              )}
              style={
                active
                  ? {
                      backgroundColor: ACTIVE_PILL,
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
                    }
                  : undefined
              }
            >
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={handleLogout}
          className="shrink-0 rounded-full px-4 py-2.5 font-home-body text-sm font-medium text-[#6b6b6b] transition-colors hover:bg-[#ebe6df]/80"
        >
          Log out
        </button>
        {showStoreDashboardLink ? (
          <Link
            href="/dashboard"
            className="shrink-0 rounded-full px-4 py-2.5 font-home-body text-sm font-semibold text-[#1a251f] underline-offset-4 hover:underline"
          >
            Dashboard
          </Link>
        ) : null}
      </nav>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        {/* Desktop sidebar */}
        <aside className="hidden lg:col-span-3 lg:block xl:col-span-3">
          <nav className="flex flex-col gap-1" aria-label="Account navigation">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2.5 font-home-body text-sm font-medium transition-colors lg:w-full lg:max-w-[280px]",
                    active
                      ? "text-[#1a251f]"
                      : "text-[#4a524a] hover:bg-[#ebe6df]/80"
                  )}
                  style={
                    active
                      ? {
                          backgroundColor: ACTIVE_PILL,
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
                        }
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full px-4 py-2.5 text-left font-home-body text-sm font-medium text-[#6b6b6b] transition-colors hover:bg-[#ebe6df]/80 lg:w-full lg:max-w-[280px]"
            >
              Log out
            </button>
            {showStoreDashboardLink ? (
              <Link
                href="/dashboard"
                className="mt-6 rounded-full px-4 py-2.5 font-home-body text-sm font-semibold text-[#1a251f] underline-offset-4 hover:underline lg:w-full lg:max-w-[280px]"
              >
                Store dashboard
              </Link>
            ) : null}
          </nav>
        </aside>

        <main className="min-w-0 lg:col-span-9 xl:col-span-9">{children}</main>
      </div>
    </div>
  );
}
