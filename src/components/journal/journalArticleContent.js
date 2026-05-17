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
  "small-living-room": {
    blocks: [
      {
        type: "section",
        title: "Use mirrors to expand the space",
        paragraphs: [
          "Mirrors are one of the fastest ways to make any room feel larger. Position a large mirror opposite your main window to bounce natural light across the room, creating an immediate sense of depth. Even a cluster of smaller mirrors can have the same effect while adding visual interest.",
          "A full-length leaning mirror in a corner works especially well in tight living rooms—it reads as a design choice rather than a space hack.",
        ],
      },
      {
        type: "media",
        src: "/sofa-beds-img.jpg",
        alt: "Compact living room with a light sofa, mirrors, and minimal furniture",
      },
      {
        type: "section",
        title: "Choose furniture with slim profiles",
        paragraphs: [
          "Bulky, overstuffed furniture is the enemy of a small room. Look for sofas and chairs with exposed legs—the sightline underneath the piece makes the floor feel continuous, and the room feels airier as a result.",
          "A loveseat or a two-seat sofa is often better than squeezing in a full-size three-seater. Pare back to what you actually need and let the room breathe.",
        ],
      },
      {
        type: "quote",
        text: "The best small living rooms feel intentional, not cramped. Every piece earns its place.",
      },
      {
        type: "section",
        title: "Go vertical with storage and shelving",
        paragraphs: [
          "When floor space is limited, look up. Tall bookshelves draw the eye upward and create the illusion of higher ceilings. Wall-mounted shelving keeps surfaces clear and clutter off the floor—one of the most effective ways to make a small space feel larger.",
          "Floating media units or a wall-mounted TV also free up the floor completely, which makes a meaningful visual difference.",
        ],
      },
      {
        type: "section",
        title: "Keep the colour palette light and cohesive",
        paragraphs: [
          "A room where walls, larger furniture pieces, and soft furnishings share a similar tonal range feels calm and open. Light neutrals—warm whites, soft creams, pale greiges—reflect light and avoid the visual interruption that contrasting colours create.",
          "If you want personality, add it through texture and natural materials rather than bold colour blocks. A woven throw, a terracotta pot, or a natural-fibre rug adds warmth without shrinking the room.",
        ],
      },
      {
        type: "section",
        title: "Smart furniture placement makes everything easier",
        paragraphs: [
          "Resist the urge to push all furniture against the walls—it actually makes a room feel smaller. Floating seating a few inches from the wall and anchoring it on a rug creates a defined zone that reads as deliberate.",
          "Leave clear walking paths of at least 18 inches between key pieces, and avoid blocking natural light sources with tall furniture.",
        ],
      },
    ],
  },
  "choose-sofa": {
    blocks: [
      {
        type: "section",
        title: "Start with measurements—not style",
        paragraphs: [
          "Before you browse a single swatch, measure your room and note three numbers: the maximum sofa length that leaves clear walkways (aim for at least 30–36 inches of circulation space), the ideal depth, and the doorway or hallway width the sofa must pass through on delivery day.",
          "A sofa that looks perfect online but can't make it past the front door is one of the most common—and most avoidable—furniture mistakes.",
        ],
      },
      {
        type: "media",
        src: "/arm-chair-img.jpg",
        alt: "Elegantly styled living room with a neutral linen sofa and accent armchair",
      },
      {
        type: "section",
        title: "Understand seat depth and comfort",
        paragraphs: [
          "Seat depth determines how you sit. Shallow seats (around 20–22 inches) encourage upright posture—good for conversation and formal living rooms. Deeper seats (24 inches and over) invite lounging and are ideal for family rooms or anyone who likes to curl up.",
          "If multiple people with different body types use the sofa regularly, look for a depth in the middle range (22–23 inches) or a model with adjustable back cushions.",
        ],
      },
      {
        type: "quote",
        text: "The sofa is the most-used piece in your home. It deserves more than five minutes of thought.",
      },
      {
        type: "section",
        title: "Choose the right fabric for your life",
        paragraphs: [
          "Performance fabrics (tightly woven synthetics, treated linens, velvets with a stain-resistant finish) hold up to pets, children, and everyday life far better than delicate weaves. If easy cleaning matters, look for a fabric rated for at least 30,000 double rubs—the industry standard test for durability.",
          "Natural linens and cottons are beautiful but require more care. Leather is excellent for durability and gets better with age, but can feel cold in winter and warm in summer depending on your climate.",
        ],
      },
      {
        type: "section",
        title: "Cushion fill: what's inside matters",
        paragraphs: [
          "Foam-only cushions hold their shape well and are easy to maintain but can feel firm over time. Down-wrapped foam gives that plush, sink-in feel while still offering support—it's the most popular combination for a reason.",
          "Pure down is the softest option but requires regular plumping and is not ideal for anyone with allergies. Check what's inside before you commit, as re-filling is a costly afterthought.",
        ],
      },
      {
        type: "section",
        title: "Frame and leg construction",
        paragraphs: [
          "A solid hardwood or engineered wood frame will outlast a particleboard or metal frame in most domestic settings. Kiln-dried wood is preferable—it's less likely to warp or crack as the seasons change.",
          "Exposed legs add visual lightness and are easier to vacuum under. Skirted bases look more classic and hide the underside from view, but can trap dust and make cleaning harder.",
        ],
      },
    ],
  },
  "wood-tones": {
    blocks: [
      {
        type: "section",
        title: "Why mixing wood tones works",
        paragraphs: [
          "The idea that all wood in a room must match is outdated. In reality, rooms where every piece is the same species and stain can feel flat and monotonous—like a showroom rather than a home. Mixing tones adds depth, character, and the layered quality that makes a room feel curated over time.",
          "The key is to mix intentionally, not randomly. With a few simple principles, different wood tones become complementary rather than clashing.",
        ],
      },
      {
        type: "media",
        src: "/dining-table-img.jpg",
        alt: "Dining room with mixed wood tones — oak table, walnut chairs, and pale ash shelving",
      },
      {
        type: "section",
        title: "Stick to one dominant tone",
        paragraphs: [
          "Even in a mixed-tone room, one wood should lead. This is usually the largest piece—a dining table, a bed frame, or a media unit. Every other wood you bring in should either be noticeably lighter or noticeably darker; avoid tones that are too similar, as they read as an accidental mismatch rather than a deliberate choice.",
          "A room anchored by a warm walnut dining table can comfortably include lighter oak chairs and a pale ash sideboard because the contrast is clear and intentional.",
        ],
      },
      {
        type: "quote",
        text: "Mix woods the way you'd mix metals in jewellery—one dominant, one accent, and always with intention.",
      },
      {
        type: "section",
        title: "Warm tones vs cool tones",
        paragraphs: [
          "Wood tones generally fall into warm (amber, honey, red-brown) or cool (grey, ash, pale beige) families. Mixing within the same family is always safe. Mixing across families—a warm walnut with a cool grey-washed oak, for example—can work beautifully, but requires a unifying element elsewhere in the room (a rug, upholstery, or wall colour) to tie them together.",
          "If in doubt, lean warm. Warmer wood tones are more forgiving to mix and tend to feel more welcoming.",
        ],
      },
      {
        type: "section",
        title: "Use other materials as buffers",
        paragraphs: [
          "When two very different woods sit side by side, a buffer material helps the transition read as deliberate. A marble top, a woven seat, an upholstered panel, or even a simple tray can sit between two pieces and visually connect them.",
          "This is why a walnut coffee table and a blonde oak media unit can coexist happily when there's a neutral rug and a linen sofa between them—the eye reads the whole composition, not just the individual pieces.",
        ],
      },
      {
        type: "section",
        title: "The grain and finish matter too",
        paragraphs: [
          "Beyond colour, consider grain pattern and finish. A heavily grained wood next to a very smooth, clear-coated one can feel jarring. Pieces that share a similar finish level—both matte, or both slightly oiled—will sit more harmoniously even if their tones differ.",
          "Natural oiled finishes are especially versatile: they tend to mellow and warm over time, making mismatched pieces gradually feel more related.",
        ],
      },
    ],
  },
  "bedroom-calm": {
    blocks: [
      {
        type: "section",
        title: "Start by clearing the surfaces",
        paragraphs: [
          "The fastest route to a calmer bedroom is also the simplest: clear every flat surface except for what you genuinely use each night. Bedside tables piled with books, water glasses, charging cables, and skincare become visual noise that your brain processes even as you're trying to wind down.",
          "Keep one or two intentional items on each surface—a lamp, a small plant, a single book—and find a home for everything else. A small drawer unit or a wicker basket under the bed does the job without cluttering the room.",
        ],
      },
      {
        type: "media",
        src: "/bedroom-img.jpg",
        alt: "Calm, minimal bedroom with soft linen bedding, warm lighting, and natural textures",
      },
      {
        type: "section",
        title: "Rethink your lighting",
        paragraphs: [
          "Overhead lighting is almost never the answer in a bedroom. A single central pendant or a recessed downlight creates harsh, even illumination that signals wakefulness rather than rest. Switch to layered light: a warm bedside lamp, a low floor lamp in a corner if space allows, and consider a dimmer switch if your overhead light is the main source.",
          "Bulb temperature matters. Look for bulbs rated 2700K or below—they emit a warm amber light that supports the body's natural wind-down process, rather than the cooler, bluer light that keeps you alert.",
        ],
      },
      {
        type: "quote",
        text: "A bedroom that feels calm to go to sleep in is a bedroom worth investing in.",
      },
      {
        type: "section",
        title: "Layer your bedding",
        paragraphs: [
          "A made bed is the single biggest visual anchor in a bedroom—it sets the tone for the whole room. But layering matters beyond aesthetics. A base sheet, a lightweight blanket, and a duvet or quilt gives you flexibility across seasons and creates the kind of textured, inviting bed that genuinely makes you look forward to sleep.",
          "Natural materials—linen, cotton percale, or a cotton-wool blend—breathe better and soften beautifully over time. They also photograph better, which is relevant if you ever have guests and quietly care about it.",
        ],
      },
      {
        type: "section",
        title: "Introduce soft textures and natural materials",
        paragraphs: [
          "Texture is what makes a neutral room feel warm rather than cold. A woven cushion, a linen throw draped over the end of the bed, a jute rug underfoot, a wooden or ceramic lamp base—each material adds a layer of tactile interest that reads as calm rather than busy.",
          "Avoid too many synthetic materials or overly shiny surfaces in a bedroom. Matte, natural textures absorb light softly and create a quieter visual environment.",
        ],
      },
      {
        type: "section",
        title: "One small change that makes an outsized difference",
        paragraphs: [
          "If you only do one thing this weekend, replace your current bedside lamp with a warmer, lower-wattage one. It costs very little and immediately changes the atmosphere of the room when you turn it on in the evening.",
          "Pair that with a five-minute surface clear and you've done most of the work. Calm bedrooms don't require a full renovation—they require intention.",
        ],
      },
    ],
  },
};

export function getFullJournalArticle(slug) {
  return JOURNAL_FULL_ARTICLES[slug] ?? null;
}
