"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/contexts/CartContext";
import SiteHeader from "@/components/home/SiteHeader";
import SiteFooter from "@/components/home/SiteFooter";
import StorefrontErrorView from "@/components/errors/StorefrontErrorView";

export default function RootError({ error: _error, reset }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center bg-neutral-50 px-6 py-16 font-sans">
        <h1 className="text-xl font-semibold text-neutral-900">Something went wrong</h1>
        <p className="mt-2 max-w-md text-center text-sm text-neutral-600">
          Please try again. If the problem continues, contact support.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#F9F7F2] font-home-body antialiased">
        <SiteHeader />
        <StorefrontErrorView reset={reset} />
        <SiteFooter />
      </div>
    </CartProvider>
  );
}
