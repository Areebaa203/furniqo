import Image from "next/image";
import Link from "next/link";
import { SITE_HEADER_GUTTERS } from "@/components/home/SiteHeader";

const SECTION_IMAGE = "/about-img-4.jpg";

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
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14 xl:gap-16">
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[5/4] md:aspect-[3/4] md:max-h-[min(640px,70vh)] md:min-h-[400px]">
            <Image
              src={SECTION_IMAGE}
              alt="Warm bedroom with layered pillows, bedside lamp, and softly lit window"
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 50vw"
              style={{ objectPosition: "50% 45%" }}
            />
          </div>

          <div className="flex flex-col text-left">
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

            <dl className="mt-8 space-y-8 sm:mt-10 sm:space-y-9 lg:space-y-10">
              {STATS.map((stat) => (
                <div key={stat.value}>
                  <dt className="font-home-heading text-[1.75rem] font-normal tabular-nums tracking-[-0.02em] text-[#1B3022] sm:text-[2rem] md:text-[2.125rem] lg:text-[2.25rem]">
                    {stat.value}
                  </dt>
                  <dd className="mt-1.5 max-w-md font-home-body text-sm leading-relaxed text-[#4A4A4A] sm:mt-2 sm:text-[15px]">
                    {stat.description}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 sm:mt-12">
              <Link
                href="/shop-all"
                className="font-home-sub inline-flex h-12 min-w-[10.5rem] items-center justify-center rounded-md bg-[#1B3022] px-8 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#152a1c] sm:h-[3rem] sm:text-[11px]"
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
