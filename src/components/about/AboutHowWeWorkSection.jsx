"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { SITE_HEADER_GUTTERS } from "@/components/home/SiteHeader";

const WORKSHOP_IMAGE = "/about-img-3.jpg";

const ACCORDION_ITEMS = [
  {
    id: "materials",
    title: "Material selection",
    body:
      "We source solid hardwood from sustainably managed forests and partner with mills that meet our durability standards. Every batch is inspected before it touches the workshop floor.",
  },
  {
    id: "assembly",
    title: "Hand-assembly process",
    body:
      "Our craftspeople join, sand, and finish each piece by hand—precise joinery, quality hardware, and no rushed assembly lines.",
  },
  {
    id: "inspection",
    title: "Quality inspection",
    body:
      "Multiple checkpoints from raw materials to final packaging ensure consistency, safety, and finish before anything leaves our doors.",
  },
  {
    id: "lasting",
    title: "Built to last decades",
    body:
      "We design frames and finishes for real daily use so your investment keeps looking and feeling right, year after year.",
  },
];

export default function AboutHowWeWorkSection() {
  const baseId = useId();
  const [openId, setOpenId] = useState(ACCORDION_ITEMS[0].id);

  return (
    <section className="bg-[#FDFBF7]" aria-labelledby="about-how-heading">
      <div className={`${SITE_HEADER_GUTTERS} py-14 sm:py-16 md:py-20 lg:py-24`}>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8 lg:gap-14 xl:gap-16">
          <div className="order-1 flex min-w-0 flex-col py-4 md:max-w-[480px]">
            <p className="font-home-sub text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b6b6b] sm:text-[11px]">
              How we work
            </p>
            <h2
              id="about-how-heading"
              className="mt-4 font-home-heading text-[1.75rem] font-normal leading-[1.12] tracking-[-0.02em] text-[#1A1A1A] sm:text-[2rem] md:text-[2.125rem] lg:text-[2.35rem] lg:leading-[1.08]"
            >
              Quality you can see and feel
            </h2>
            <p className="mt-4 font-home-body text-[13px] leading-relaxed text-[#4A4A4A] sm:mt-5 sm:text-[14px]">
              Every Furniqo piece goes through careful hands and rigorous standards before it reaches your home.
              Here&apos;s what makes our furniture different.
            </p>

            <div className="mt-8 border-t border-[#e3e0d8] sm:mt-10" role="list">
              {ACCORDION_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                const panelId = `${baseId}-${item.id}-panel`;
                const headerId = `${baseId}-${item.id}-header`;
                return (
                  <div key={item.id} className="border-b border-[#e3e0d8]" role="listitem">
                    <h3 className="font-home-body text-base font-semibold text-[#1A1A1A]">
                      <button
                        id={headerId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenId(isOpen ? "" : item.id)}
                        className="flex w-full items-center gap-3 py-4 text-left transition hover:opacity-90 sm:gap-3.5 sm:py-5"
                      >
                        <span className="shrink-0 text-[#1A1A1A]" aria-hidden>
                          <Icon icon="mingcute:check-line" className="size-4 sm:size-[1.1rem]" />
                        </span>
                        <span className="min-w-0 flex-1 font-home-body text-[13px] font-bold leading-snug text-[#1A1A1A] sm:text-[14px]">
                          {item.title}
                        </span>
                        <span className="shrink-0 text-[#6b6b6b]" aria-hidden>
                          <Icon
                            icon={isOpen ? "mingcute:minimize-line" : "mingcute:add-line"}
                            className="size-4 sm:size-[1.1rem]"
                          />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      hidden={!isOpen}
                      className={isOpen ? "pb-5 pl-[1.75rem] sm:pl-[2rem]" : "hidden"}
                    >
                      <p className="font-home-body text-[12px] leading-relaxed text-[#4A4A4A] sm:text-[13px]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 sm:mt-10">
              <Link
                href="/shop-all"
                className="font-home-sub inline-flex h-11 min-w-[9.5rem] items-center justify-center rounded-[4px] border border-[#d8d2c7] bg-transparent px-6 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] transition hover:bg-[#f2eee6] sm:h-12 sm:text-[10px]"
              >
                Shop now
              </Link>
            </div>
          </div>

          <div className="order-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ece8df] sm:aspect-[3/4] md:aspect-[4/5] lg:min-h-[min(520px,62vh)]">
              <Image
                src={WORKSHOP_IMAGE}
                alt="Team members reviewing rolls of fabric and materials in a bright workshop"
                fill
                className="object-cover"
                sizes="(max-width: 767px) 100vw, 50vw"
                style={{ objectPosition: "50% 45%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
