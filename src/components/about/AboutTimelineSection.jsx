import { SITE_HEADER_GUTTERS } from "@/components/home/SiteHeader";

const TIMELINE = [
  {
    year: "2018",
    title: "The beginning",
    description:
      "Furniqo started in a small Portland workshop with one belief: furniture should be built to last, not just look good for a season.",
  },
  {
    year: "2019",
    title: "First collection launch",
    description:
      "We introduced our signature line of handcrafted sofas and tables—over 200 pieces found homes in the first year alone.",
  },
  {
    year: "2020",
    title: "Going nationwide",
    description:
      "Opened our online store and began shipping carefully packaged orders to doorsteps across the United States.",
  },
  {
    year: "2021",
    title: "Expanding the team",
    description:
      "Grew from five makers to twenty-five craftspeople and moved into a larger workshop to keep quality high as demand grew.",
  },
  {
    year: "2022",
    title: "Sustainability commitment",
    description:
      "Launched our eco-friendly materials program with responsibly sourced wood, safer finishes, and less waste in production.",
  },
  {
    year: "Today",
    title: "10,000 homes and counting",
    description:
      "We reached a milestone we're proud of—Furniqo now lives in thousands of homes, with many customers coming back for more.",
  },
];

export default function AboutTimelineSection() {
  return (
    <section className="bg-[#F5F2EB]" aria-labelledby="about-timeline-heading">
      <div className={`${SITE_HEADER_GUTTERS} py-14 sm:py-16 md:py-20 lg:py-24`}>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:gap-16 xl:gap-20">
          <div className="max-w-xl md:max-w-none">
            <p className="font-home-sub text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b6b6b] sm:text-[11px]">
              Where we came from
            </p>
            <h2
              id="about-timeline-heading"
              className="mt-4 font-home-heading text-[1.75rem] font-normal leading-[1.12] tracking-[-0.02em] text-[#1A1A1A] sm:text-[2rem] md:text-[2.125rem] lg:text-[2.35rem] lg:leading-[1.08]"
            >
              From a small workshop to thousands of homes
            </h2>
            <p className="mt-5 font-home-body text-sm leading-relaxed text-[#4A4A4A] sm:mt-6 sm:text-[15px] lg:text-base">
              Furniqo started with a simple belief: furniture should be built to last, not just look good for a season.
              Here&apos;s how we got here.
            </p>
          </div>

          <div className="min-w-0">
            <div className="relative">
              <div
                className="absolute left-[5px] top-2 bottom-2 w-px bg-[#c9c4bb]"
                aria-hidden
              />
              <ul className="relative space-y-10 sm:space-y-11 lg:space-y-12">
                {TIMELINE.map((item) => (
                  <li key={item.year} className="relative pl-8 sm:pl-9">
                    <span
                      className="absolute left-[5px] top-[0.45rem] size-2.5 -translate-x-1/2 rounded-full border-2 border-[#F5F2EB] bg-[#1A1A1A] sm:top-[0.5rem] sm:size-2.5"
                      aria-hidden
                    />
                    <p className="font-home-body text-sm font-semibold tabular-nums text-[#1A1A1A] sm:text-[15px]">
                      {item.year}
                    </p>
                    <p className="font-home-sub mt-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1A1A1A] sm:text-[11px] sm:tracking-[0.18em]">
                      {item.title}
                    </p>
                    <p className="mt-2 font-home-body text-sm leading-relaxed text-[#4A4A4A] sm:text-[15px]">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
