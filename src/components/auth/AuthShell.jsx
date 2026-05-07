"use client";

import ReduxProvider from "@/store/ReduxProvider";
import SiteHeader from "@/components/home/SiteHeader";
import SiteFooter from "@/components/home/SiteFooter";

/** Storefront header + cart context for standalone auth pages (login / register). */
export default function AuthShell({ children }) {
  return (
    <ReduxProvider>
      <div className="flex min-h-screen flex-col bg-[#F9F7F0] font-home-body antialiased">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </div>
    </ReduxProvider>
  );
}
