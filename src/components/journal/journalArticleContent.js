/** @typedef {{ type: "section"; title: string; paragraphs: string[] }} ArticleSectionBlock */
/** @typedef {{ type: "media"; src: string; alt: string; showVideoChrome?: boolean }} ArticleMediaBlock */
/** @typedef {{ type: "quote"; text: string }} ArticleQuoteBlock */

/** @typedef {{ hideHeroIntro?: boolean; blocks: (ArticleSectionBlock | ArticleMediaBlock | ArticleQuoteBlock)[] }} JournalFullArticle */

/** @type {Record<string, JournalFullArticle>} */
export const JOURNAL_FULL_ARTICLES = {
  "choosing-sofa-sectional": {
    hideHeroIntro: true,
    blocks: [
      {
        type: "section",
        title: "Consider your room size and layout",
        paragraphs: [
          "Before you fall in love with a silhouette, grab a tape measure. Sectionals typically need a larger footprint—think roughly 10×12 feet for a comfortable L-shape with walk-around space—while a standard sofa often fits neatly into 8×10 feet with room for side tables.",
          "Don't forget the path in: doorways, hallways, and stairwell turns can rule out a sectional even when the living room math works on paper. Map the longest piece on your floor plan (or with painter’s tape) so you’re not surprised on delivery day.",
        ],
      },
      {
        type: "media",
        src: "/article-1.jpg",
        alt: "Living room vignette with sculptural side tables, a textured accent chair, and neutral sofa",
        showVideoChrome: true,
      },
      {
        type: "section",
        title: "How do you actually use your living room?",
        paragraphs: [
          "Your layout should match real life, not just photos. If movie nights and blanket forts are weekly events, a sectional’s continuous seating can feel effortlessly communal. If you host often and want a slightly more formal first impression—or you like rearranging for parties—a sofa keeps the room flexible.",
          "Both can work; the question is whether you want one generous “hangout zone” or a versatile anchor you can style around with chairs and ottomans.",
        ],
      },
      {
        type: "section",
        title: "Think about traffic flow",
        paragraphs: [
          "Furniture should guide movement, not block it. With a sectional, pay special attention to the chaise or return: you’ll want clear routes to windows, the kitchen, and the TV without squeezing past sharp corners.",
          "Sofas tend to be easier to center on a rug and flank with traffic on either side. If your room doubles as a thoroughfare, sketch primary paths first, then layer in seating.",
        ],
      },
      {
        type: "quote",
        text: "A sectional is like a hug for your whole family. A sofa is like a handshake—polished and versatile.",
      },
      {
        type: "section",
        title: "The flexibility factor",
        paragraphs: [
          "Sofas are simpler to relocate, repurpose in another room, or pair with a new loveseat later. Sectionals—especially one-piece configurations—are more of a commitment, though modular designs can offer some leeway.",
          "If you rent, move frequently, or love to refresh your layout seasonally, weight the sofa’s adaptability. If you’re settling in and know your floor plan, a sectional can feel tailor-made.",
        ],
      },
      {
        type: "section",
        title: "Making the final call",
        paragraphs: [
          "There’s no universal winner—only the right piece for your square footage and how you live day to day. Start with measurements and walkways, be honest about hosting and lounging habits, then choose what feels comfortable and uncluttered.",
          "When those priorities line up, you’ll know whether you’re team sectional or team sofa—and your living room will feel intentional either way.",
        ],
      },
    ],
  },
};

export function getFullJournalArticle(slug) {
  return JOURNAL_FULL_ARTICLES[slug] ?? null;
}
