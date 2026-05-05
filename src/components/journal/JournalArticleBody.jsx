import Image from "next/image";

function PauseVideoDecor() {
  return (
    <svg width="11" height="14" viewBox="0 0 11 14" fill="currentColor" className="text-[#1a3021]" aria-hidden>
      <rect x="0" y="0" width="3" height="14" rx="0.5" />
      <rect x="8" y="0" width="3" height="14" rx="0.5" />
    </svg>
  );
}

/**
 * @param {{ blocks: Array<{ type: string; [key: string]: unknown }> }} props
 */
export default function JournalArticleBody({ blocks }) {
  return (
    <div className="space-y-10 sm:space-y-12 lg:space-y-14">
      {blocks.map((block, i) => {
        if (block.type === "section") {
          return (
            <section key={i}>
              <h2 className="font-home-body text-xl font-semibold leading-snug tracking-tight text-[#1a3021] sm:text-2xl">
                {block.title}
              </h2>
              {block.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="font-home-body mt-4 text-[15px] leading-[1.7] text-neutral-700 sm:text-base sm:leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </section>
          );
        }
        if (block.type === "media") {
          return (
            <figure key={i} className="my-2 overflow-hidden rounded-sm sm:rounded-md">
              <div className="relative aspect-[16/10] w-full bg-neutral-200 sm:aspect-[16/9]">
                <Image
                  src={block.src}
                  alt={block.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                {block.showVideoChrome ? (
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4">
                    <button
                      type="button"
                      className="flex size-9 items-center justify-center rounded-md bg-white text-[#1a3021] shadow-md ring-1 ring-black/5 transition hover:bg-neutral-50"
                      aria-label="Pause video"
                    >
                      <PauseVideoDecor />
                    </button>
                  </div>
                ) : null}
              </div>
            </figure>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={i}
              className="my-8 border-l border-[#d4d4c8] py-1 pl-5 font-home-heading text-[1.35rem] leading-snug text-[#2a2a2a] sm:my-12 sm:pl-8 sm:text-[1.65rem] md:text-[1.85rem]"
            >
              {block.text}
            </blockquote>
          );
        }
        return null;
      })}
    </div>
  );
}
