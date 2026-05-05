import { ALL_SHOP_PRODUCTS, ROOM_OPTIONS, PRODUCT_TYPE_OPTIONS } from "@/components/shop-all/shopAllData";

const ROOM_BY_ID = Object.fromEntries(ROOM_OPTIONS.map((r) => [r.id, r.label.toLowerCase()]));
const TYPE_BY_ID = Object.fromEntries(PRODUCT_TYPE_OPTIONS.map((t) => [t.id, t.label.toLowerCase()]));

/**
 * @param {string} rawQuery
 */
export function searchShopProducts(rawQuery) {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];

  return ALL_SHOP_PRODUCTS.filter((p) => {
    if (p.name.toLowerCase().includes(q)) return true;
    if (p.slug.toLowerCase().includes(q)) return true;
    const room = ROOM_BY_ID[p.room] ?? "";
    if (room.includes(q)) return true;
    const ptype = TYPE_BY_ID[p.productType] ?? "";
    if (ptype.includes(q)) return true;
    if (String(p.productType ?? "").toLowerCase().includes(q)) return true;
    return false;
  });
}

export const SEARCH_PREVIEW_LIMIT = 8;
