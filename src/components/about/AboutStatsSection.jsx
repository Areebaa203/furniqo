import Image from "next/image";
import Link from "next/link";
import { SITE_HEADER_GUTTERS } from "@/components/home/SiteHeader";

const SECTION_IMAGE = "/about-img-2.jpg";

const STATS = [
  {
    value: "10+ years",
    description: "Average lifespan of Furniqo furniture in customer homes",
  },
  {
    value: "97%",
    description: "Of customers say quality exceeded their expectations",
  },
  {
    value: "94%",
    description: "Return to buy additional pieces for their space",
  },
];

export default function AboutStatsSection() {
  return (
    <section
      className="bg-[#FDFBF7]"
      aria-labelledby="about-stats-heading"
    >
      <div className={`${SITE_HEADER_GUTTERS} py-12 sm:py-14 md:py-16 lg:py-20`}>
        {/* Changed items-center to items-stretch so the image can fill the height */}
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-10 lg:gap-14 xl:gap-16">
          {/* Made image container full height */}
          <div className="relative w-full min-h-[400px] overflow-hidden md:h-full">
            <Image
              src={SECTION_IMAGE}
              alt="Motion blur of people jumping on bed"
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 50vw"
              style={{ objectPosition: "50% 50%" }}
            />
          </div>

          <div className="flex flex-col justify-center text-left py-4 md:py-8 lg:py-10">
            <h2
              id="about-stats-heading"
              className="font-home-heading text-[1.75rem] font-normal leading-[1.12] tracking-[-0.02em] text-[#1B3022] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] lg:leading-[1.1]"
            >
              Numbers that speak for themselves
            </h2>

            <p className="mt-4 max-w-lg font-home-body text-sm leading-relaxed text-[#4A4A4A] sm:mt-5 sm:text-[15px] lg:text-base">
              We measure our success by how long our furniture lasts in your home, not just how many
              pieces we sell.
            </p>

            <dl className="mt-10 space-y-8 sm:mt-12 sm:space-y-9 lg:space-y-10">
              {STATS.map((stat) => (
                <div key={stat.value}>
                  <dt className="font-home-heading text-[2rem] font-normal tabular-nums tracking-[-0.02em] text-[#1B3022] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.75rem]">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 max-w-sm font-home-body text-[13px] leading-relaxed text-[#4A4A4A] sm:mt-1.5 sm:text-[14px]">
                    {stat.description}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 sm:mt-12">
              <Link
                href="/shop-all"
                className="font-home-sub inline-flex h-11 min-w-[10.5rem] items-center justify-center rounded-[4px] bg-[#1a3021] px-8 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90 sm:h-12 sm:text-[11px]"
              >
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
