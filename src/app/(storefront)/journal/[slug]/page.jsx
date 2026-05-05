import Link from "next/link";
import { notFound } from "next/navigation";
import JournalArticleBody from "@/components/journal/JournalArticleBody";
import JournalArticleHero from "@/components/journal/JournalArticleHero";
import { getFullJournalArticle } from "@/components/journal/journalArticleContent";
import { JOURNAL_HERO_SLIDES } from "@/components/journal/journalHeroData";
import { JOURNAL_LISTING_POSTS } from "@/components/journal/journalListingData";
import RelatedProductsCarousel from "@/components/products/RelatedProductsCarousel";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const hero = JOURNAL_HERO_SLIDES.map((s) => ({ slug: s.id }));
  const list = JOURNAL_LISTING_POSTS.map((p) => ({ slug: p.slug }));
  return [...hero, ...list];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hero = JOURNAL_HERO_SLIDES.find((s) => s.id === slug);
  const post = JOURNAL_LISTING_POSTS.find((p) => p.slug === slug);
  const title = hero?.title ?? post?.title;
  const description = hero?.description ?? post?.excerpt;
  return {
    title: title ? `${title} · Furniqo` : "Journal",
    description,
  };
}

export default async function JournalArticlePage({ params }) {
  const { slug } = await params;
  const hero = JOURNAL_HERO_SLIDES.find((s) => s.id === slug);
  const post = JOURNAL_LISTING_POSTS.find((p) => p.slug === slug);
  if (!hero && !post) notFound();

  const heroArticleMeta =
    hero &&
    (Boolean(hero.author) || Boolean(hero.dateLabel) || hero.readMinutes != null);

  const fullArticle = getFullJournalArticle(slug);

  return (
    <main>
      {hero ? <JournalArticleHero slide={hero} /> : null}
      <div
        className={cn(
          "mx-auto px-5 py-12 sm:px-6 sm:py-16 lg:py-20",
          fullArticle ? "max-w-3xl" : "max-w-2xl"
        )}
      >
        {!(fullArticle && hero) ? (
          <Link
            href="/journal"
            className="font-home-body text-sm font-medium text-[#1a3021] underline underline-offset-2 hover:text-[#24352d]"
          >
            ← Back to Journal
          </Link>
        ) : null}
        {hero && heroArticleMeta && !(fullArticle?.hideHeroIntro) ? (
          <p className="font-home-body mt-8 text-base leading-relaxed text-neutral-700">{hero.description}</p>
        ) : null}
        {!hero ? (
          <>
            <p className="font-home-sub mt-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6b7368]">
              {post.categoryLabel}
            </p>
            <h1 className="font-home-heading mt-3 text-3xl leading-tight text-[#1a3021] sm:text-4xl">{post.title}</h1>
            <p className="font-home-body mt-4 text-sm text-neutral-500">{post.readMinutes} min read</p>
            <p className="font-home-body mt-6 text-base leading-relaxed text-neutral-700">{post.excerpt}</p>
          </>
        ) : null}
        {fullArticle ? (
          <div className="mt-12 sm:mt-14">
            <JournalArticleBody blocks={fullArticle.blocks} />
          </div>
        ) : null}
        {!fullArticle ? (
          <p className="font-home-body mt-10 text-sm text-neutral-500">Full article coming soon.</p>
        ) : null}
      </div>
      {fullArticle && hero ? (
        <>
          <RelatedProductsCarousel
            showTopShare
            showViewAll
            heading="Related products"
            priceStyle="editorial"
            viewAllHref="/products"
            sectionClassName="border-t border-[#e8e4dc] bg-[#faf9f6]"
          />
        </>
      ) : null}
    </main>
  );
}
