import Image from "next/image";

const HERO_SRC = "/background-img.jpg";

/**
 * Mobile: full-width strip above the form · Tablet/desktop (md+): left half of a split row.
 */
export default function AuthHeroSide({ priority = false }) {
  return (
    <div
      className={[
        "relative w-full shrink-0 overflow-hidden",
        "min-h-[min(40vh,340px)] sm:min-h-[min(42vh,380px)]",
        "md:min-h-[calc(100dvh-6.75rem)] md:w-1/2 md:max-w-[50%] md:flex-1 md:self-stretch",
      ].join(" ")}
    >
      <Image
        src={HERO_SRC}
        alt="Modern living room with refined seating and warm light"
        fill
        className="object-cover object-[center_72%]"
        priority={priority}
        sizes="(max-width: 767px) 100vw, 50vw"
      />
    </div>
  );
}
