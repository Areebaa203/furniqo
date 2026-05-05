import Image from "next/image";
import Link from "next/link";
import { SITE_HEADER_GUTTERS } from "@/components/home/SiteHeader";

const GREEN = "#2D3E33";

const DINING_IMG = "/about-img-3.jpg";

export default function AboutRecommendationsSection() {
  return (
    <section className="bg-[#F9F7F2] pb-14 pt-10 sm:pb-16 sm:pt-12 md:pb-20 md:pt-14 lg:pb-24" aria-labelledby="about-recs-heading">
      <div className={`${SITE_HEADER_GUTTERS}`}>
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14 xl:gap-16">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#e8e4dc] sm:aspect-[5/4] md:aspect-[4/5] md:max-h-[min(560px,70vh)]">
            <Image
              src={DINING_IMG}
              alt="Modern dining area with a sage green table, wooden chairs, and natural light"
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 50vw"
              style={{ objectPosition: "50% 50%" }}
            />
          </div>

          <div className="flex flex-col text-left">
            <p className="font-home-sub text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a756c] sm:text-[11px]">
              Need help deciding?
            </p>
            <h2
              id="about-recs-heading"
              className="mt-3 font-home-heading text-[1.65rem] font-normal leading-[1.12] tracking-[-0.02em] sm:text-[1.85rem] md:text-[2rem] lg:text-[2.15rem] lg:leading-[1.08]"
              style={{ color: GREEN }}
            >
              Get personalized furniture recommendations
            </h2>
            <p className="mt-4 max-w-lg font-home-body text-sm leading-relaxed text-[#555555] sm:mt-5 sm:text-[15px] lg:text-base">
              Not sure what will work in your space? Our team can help you choose pieces that fit your
              room size, style, and budget. Reach out anytime.
            </p>

            <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
              <Link
                href="#"
                className="font-home-sub inline-flex h-12 min-h-[3rem] flex-1 items-center justify-center rounded-md px-6 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-92 sm:min-w-[11rem] sm:flex-initial sm:px-8 sm:text-[11px]"
                style={{ backgroundColor: GREEN }}
              >
                Contact us
              </Link>
              <Link
                href="/shop-all"
                className="font-home-sub inline-flex h-12 min-h-[3rem] flex-1 items-center justify-center rounded-md border border-[#b0aaa0] bg-[#FAF9F6] px-6 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3d3d3d] transition hover:bg-[#f0ebe3] sm:min-w-[11rem] sm:flex-initial sm:px-8 sm:text-[11px]"
              >
                Browse catalog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
