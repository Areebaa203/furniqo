"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SITE_HEADER_GUTTERS } from "@/components/home/SiteHeader";
import { prepareCartForSignOut } from "@/lib/cart/prepareCartForSignOut";

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
    await prepareCartForSignOut();
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#FFFDF4]">
      <div className={`${SITE_HEADER_GUTTERS} pb-20 pt-10 sm:pb-24 sm:pt-12 md:pb-32`}>
        <h1
          className="font-home-heading text-[2.5rem] font-normal leading-[1.1] tracking-[-0.02em] sm:text-[3rem] md:text-[3.5rem]"
          style={{ color: GREEN }}
        >
          My account
        </h1>

        {/* Mobile + tablet: horizontal nav */}
        <nav
          className="no-scrollbar mt-10 flex gap-1 overflow-x-auto border-b border-[#d4d0c6] pb-4 lg:hidden"
          aria-label="Account sections"
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-md px-5 py-2.5 font-home-body text-[15px] font-medium transition-colors",
                  active ? "bg-[#e4dfd6] text-[#1a251f]" : "text-[#4a524a] hover:bg-[#e4dfd6]/50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 rounded-md px-5 py-2.5 font-home-body text-[15px] font-medium text-[#4a524a] transition-colors hover:bg-[#e4dfd6]/50"
          >
            Log out
          </button>
        </nav>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Desktop sidebar */}
          <aside className="hidden lg:col-span-3 lg:block xl:col-span-2">
            <nav className="flex flex-col gap-1.5" aria-label="Account navigation">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-md px-5 py-3 font-home-body text-[15px] font-medium transition-colors",
                      active
                        ? "bg-[#e4dfd6] text-[#1a251f]"
                        : "text-[#4a524a] hover:bg-[#e4dfd6]/50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md px-5 py-3 text-left font-home-body text-[15px] font-medium text-[#4a524a] transition-colors hover:bg-[#e4dfd6]/50"
              >
                Log out
              </button>
              {showStoreDashboardLink ? (
                <Link
                  href="/dashboard"
                  className="mt-8 rounded-md px-5 py-3 font-home-body text-[15px] font-semibold text-[#1a251f] underline-offset-4 hover:underline"
                >
                  Store dashboard
                </Link>
              ) : null}
            </nav>
          </aside>

          <main className="min-w-0 lg:col-span-9 xl:col-span-10">{children}</main>
        </div>
      </div>
    </div>
  );
}

