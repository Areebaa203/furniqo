import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { MEGA_MENU_COLUMNS, MEGA_MENU_PROMO } from "@/components/home/megaMenuData";

/** Full-width drop-down; parent controls visibility and hover zone */
export function DesktopMegaMenuPanel({ guttersClassName, onItemClick }) {
  const promo = MEGA_MENU_PROMO;

  return (
    <div className="border-t border-[#e8e9df] bg-[#F9F8F3] shadow-[0_16px_40px_-24px_rgba(12,26,20,0.25)]">
      <div className={`${guttersClassName} py-10 lg:py-12`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-8 lg:gap-8 xl:col-span-8">
            {MEGA_MENU_COLUMNS.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-10 sm:gap-12">
                {column.map((group) => (
                  <div key={group.id}>
                    <p className="font-home-sub text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a756c]">
                      {group.title}
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {group.links.map((item) => (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            onClick={onItemClick}
                            className="font-home-body text-[15px] text-[#333333] transition hover:text-[#1a3021]"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={group.showAllHref}
                          onClick={onItemClick}
                          className="font-home-body text-[15px] text-[#333333] underline decoration-[#333333] underline-offset-[3px] transition hover:text-[#1a3021]"
                        >
                          Show all
                        </Link>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 xl:col-span-4">
            <Link href={promo.href} className="group mx-auto block max-w-[280px] lg:mx-0 lg:max-w-none">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#e8e4dc] sm:aspect-[4/5]">
                <Image
                  src={promo.src}
                  alt={promo.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 280px, 320px"
                />
              </div>
              <p className="mt-4 inline-flex items-center gap-1 font-home-body text-sm font-medium text-[#1a3021] underline decoration-[#1a3021] underline-offset-4 transition group-hover:opacity-80">
                {promo.title}
                <Icon icon="mingcute:arrow-right-line" className="size-4 shrink-0" aria-hidden />
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
