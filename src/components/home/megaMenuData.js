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
        { label: "Beds", href: "/products?type=beds" },
        { label: "Mattresses", href: "/products?type=mattresses" },
        { label: "Duvets", href: "/products?type=duvets" },
        { label: "Pillows", href: "/products?type=pillows" },
      ],
      showAllHref: "/products?room=bedroom",
    },
    {
      id: "office",
      title: "Office",
      links: [
        { label: "Office chairs", href: "/products?type=office-chairs" },
        { label: "Gaming chairs", href: "/products?type=gaming-chairs" },
        { label: "Desks", href: "/products?type=desks" },
        { label: "Accessories", href: "/products?type=accessories" },
      ],
      showAllHref: "/products?room=office",
    },
  ],
  [
    {
      id: "bathroom",
      title: "Bathroom",
      links: [
        { label: "Towels", href: "/products?type=towels" },
        { label: "Textiles", href: "/products?type=textiles" },
        { label: "Accessories", href: "/products?type=accessories" },
        { label: "Laundry essentials", href: "/products?type=laundry" },
      ],
      showAllHref: "/products?room=bathroom",
    },
    {
      id: "storage",
      title: "Storage",
      links: [
        { label: "Wardrobe", href: "/products?type=wardrobes" },
        { label: "Storage furniture", href: "/products?type=storage-furniture" },
        { label: "Small storage", href: "/products?type=small-storage" },
        { label: "Furniture care", href: "/products?type=furniture-care" },
      ],
      showAllHref: "/products?room=storage",
    },
  ],
  [
    {
      id: "living",
      title: "Living room",
      links: [
        { label: "Sofas", href: "/products?type=sofas" },
        { label: "Chairs", href: "/products?type=chairs" },
        { label: "Tables", href: "/products?type=tables" },
        { label: "TV units", href: "/products?type=tv-units" },
      ],
      showAllHref: "/products?room=living",
    },
    {
      id: "garden",
      title: "Garden",
      links: [
        { label: "Garden furniture", href: "/products?type=garden-furniture" },
        { label: "Sun loungers", href: "/products?type=sun-loungers" },
        { label: "Accessories", href: "/products?type=accessories" },
        { label: "Outdoor lighting", href: "/products?type=outdoor-lighting" },
      ],
      showAllHref: "/products?room=garden",
    },
  ],
];

/** Flat list for mobile accordion (same ids as above) */
export const MEGA_MENU_MOBILE_GROUPS = MEGA_MENU_COLUMNS.flatMap((col) => col);
