/**
 * Browser-only persistence for storefront orders (per logged-in Supabase user).
 */

const STORAGE_KEY = "furniqo-account-orders-v1";

function readAll() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("furniqo-account-orders-changed"));
  } catch {
    /* quota — silent fail */
  }
}

function genOrderNumber() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `${n}`;
}

/** @param {string} userId */
export function loadOrdersForUser(userId) {
  if (!userId) return [];
  const all = readAll();
  const list = all[userId];
  return Array.isArray(list) ? list : [];
}

/** @param {string} userId @param {unknown[]} orders */
export function saveOrdersForUser(userId, orders) {
  if (!userId) return;
  const all = readAll();
  all[userId] = orders;
  writeAll(all);
}

/**
 * @param {string} userId
 * @param {{
 *   lines: Array<{ slug: string; name: string; image: string; price: number; compareAt?: number; variantLabel?: string | null; qty: number }>;
 *   total: number;
 *   itemsCount: number;
 *   shippingCost?: number;
 *   discountAmount?: number;
 * }} payload
 */
export function appendOrderForUser(userId, payload) {
  const prev = loadOrdersForUser(userId);
  const order = {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `ord_${Date.now()}`,
    orderNumber: genOrderNumber(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    paymentStatus: "pending",
    fulfillmentStatus: "processing",
    lines: payload.lines,
    total: Number(payload.total.toFixed(2)),
    itemsCount: payload.itemsCount,
    shippingCost: payload.shippingCost ?? 0,
    discountAmount: payload.discountAmount ?? 0,
  };
  saveOrdersForUser(userId, [order, ...prev]);
  return order;
}

/** @param {string} userId @param {string} orderId @param {Record<string, unknown>} patch */
export function patchOrderForUser(userId, orderId, patch) {
  const list = loadOrdersForUser(userId);
  const next = list.map((o) =>
    o.id === orderId
      ? {
          ...o,
          ...patch,
          updatedAt: new Date().toISOString(),
        }
      : o
  );
  saveOrdersForUser(userId, next);
}

/** @param {string} userId @param {string} orderId */
export function removeOrderForUser(userId, orderId) {
  const list = loadOrdersForUser(userId).filter((o) => o.id !== orderId);
  saveOrdersForUser(userId, list);
}
