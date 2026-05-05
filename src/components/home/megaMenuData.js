/** Desktop mega menu + mobile shop drawer — category columns and promo */

export const MEGA_MENU_PROMO = {
  src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85",
  alt: "Tufted sofa in a bright outdoor setting with spring blossoms",
  title: "Mid-season sale — up to 30%",
  href: "/products",
};

export const MEGA_MENU_COLUMNS = [
  [
    {
      id: "bedroom",
      title: "Bedroom",
      links: [
        { label: "Beds", href: "/products" },
        { label: "Mattresses", href: "/products" },
        { label: "Duvets", href: "/products" },
        { label: "Pillows", href: "/products" },
      ],
      showAllHref: "/products",
    },
    {
      id: "office",
      title: "Office",
      links: [
        { label: "Office chairs", href: "/products" },
        { label: "Gaming chairs", href: "/products" },
        { label: "Desks", href: "/products" },
        { label: "Accessories", href: "/products" },
      ],
      showAllHref: "/products",
    },
  ],
  [
    {
      id: "bathroom",
      title: "Bathroom",
      links: [
        { label: "Towels", href: "/products" },
        { label: "Textiles", href: "/products" },
        { label: "Accessories", href: "/products" },
        { label: "Laundry essentials", href: "/products" },
      ],
      showAllHref: "/products",
    },
    {
      id: "storage",
      title: "Storage",
      links: [
        { label: "Wardrobe", href: "/products" },
        { label: "Storage furniture", href: "/products" },
        { label: "Small storage", href: "/products" },
        { label: "Furniture care", href: "/products" },
      ],
      showAllHref: "/products",
    },
  ],
  [
    {
      id: "living",
      title: "Living room",
      links: [
        { label: "Sofas", href: "/products" },
        { label: "Chairs", href: "/products" },
        { label: "Tables", href: "/products" },
        { label: "TV units", href: "/products" },
      ],
      showAllHref: "/products",
    },
    {
      id: "garden",
      title: "Garden",
      links: [
        { label: "Garden furniture", href: "/products" },
        { label: "Sun loungers", href: "/products" },
        { label: "Accessories", href: "/products" },
        { label: "Outdoor lighting", href: "/products" },
      ],
      showAllHref: "/products",
    },
  ],
];

/** Flat list for mobile accordion (same ids as above) */
export const MEGA_MENU_MOBILE_GROUPS = MEGA_MENU_COLUMNS.flatMap((col) => col);
