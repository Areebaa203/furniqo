import Link from "next/link";
import { SITE_HEADER_GUTTERS } from "@/components/home/SiteHeader";
import NotFoundBestSellers from "@/components/errors/NotFoundBestSellers";

const FOREST = "#2D3E33";

export default function NotFoundView() {
  return (
    <>
      <div className={`${SITE_HEADER_GUTTERS} pb-6 pt-10 sm:pb-8 sm:pt-12 md:pt-14`} style={{ backgroundColor: "#F9F7F2" }}>
        <header className="max-w-xl">
          <h1
            className="font-home-heading text-[2rem] font-normal leading-[1.1] tracking-[-0.02em] sm:text-[2.35rem] md:text-[2.75rem]"
            style={{ color: FOREST }}
          >
            Page not found
          </h1>
          <p className="mt-4 font-home-body text-[15px] leading-relaxed text-neutral-800 sm:mt-5 sm:text-base">
            It looks like the page you&apos;re looking for doesn&apos;t exist. Check out our best sellers or get
            back to homepage.
          </p>
          <Link
            href="/"
            className="font-home-sub mt-8 inline-flex h-12 items-center justify-center bg-[#2D3E33] px-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90 sm:mt-10"
            style={{ borderRadius: "2px" }}
          >
            Back to homepage
          </Link>
        </header>
      </div>
      <NotFoundBestSellers />
    </>
  );
}
