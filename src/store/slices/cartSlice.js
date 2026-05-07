import { createSlice } from "@reduxjs/toolkit";

export const STORAGE_KEY = "furniqo-cart-v1";

/** Persisted beside `STORAGE_KEY` while signed out per user until `popStashedCartForSignBackIn` consumes it */
export const SIGNOUT_STASH_KEY_PREFIX = "furniqo-cart-signout-";

export const FREE_SHIPPING_THRESHOLD = 100;

function lineIdFrom(slug, variantKey) {
  return `${slug}::${variantKey ?? "default"}`;
}

/** Shared validation for persisted / stashed line arrays */
function normalizeStoredLines(parsed) {
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(
    (x) =>
      x &&
      typeof x.lineId === "string" &&
      typeof x.slug === "string" &&
      typeof x.name === "string" &&
      typeof x.price === "number" &&
      typeof x.qty === "number" &&
      x.qty > 0
  );
}

function signOutStashKey(userId) {
  return `${SIGNOUT_STASH_KEY_PREFIX}${userId}`;
}

/** Save cart snapshot for restore after this user signs back in — overwrites prior stash for same user id */
export function stashCartBeforeSignOut(userId, items) {
  if (typeof window === "undefined" || !userId) return;
  try {
    localStorage.setItem(signOutStashKey(userId), JSON.stringify(items ?? []));
  } catch {
    /* quota */
  }
}

/**
 * Read and delete sign-out stash for this user — returns validated lines or null if none.
 * Safe across INITIAL_SESSION/SIGNED_IN double-fires because the second call sees no key.
 */
export function popStashedCartForSignBackIn(userId) {
  if (typeof window === "undefined" || !userId) return null;
  const key = signOutStashKey(userId);
  let items;
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return null;
    items = normalizeStoredLines(JSON.parse(raw));
  } catch {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    return null;
  }
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
  return items.length > 0 ? items : null;
}

export function loadStoredCart() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return normalizeStoredLines(parsed);
  } catch {
    return [];
  }
}

/** Baseline slice shape — exported for store bootstrap so cart never renders empty-then-clobbered from LS. */
export const cartBaselineState = {
  items: [],
  cartOpen: false,
  hydrated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartBaselineState,
  reducers: {
    hydrateCart(state, action) {
      state.items = action.payload;
      state.hydrated = true;
    },
    addItem(state, action) {
      const payload = action.payload;
      const variantKey = payload.variantLabel ?? "default";
      const lineId = lineIdFrom(payload.slug, variantKey);
      const qtyAdd = Math.max(1, Math.floor(payload.qty ?? 1));
      const idx = state.items.findIndex((l) => l.lineId === lineId);
      if (idx === -1) {
        state.items.push({
          lineId,
          slug: payload.slug,
          name: payload.name,
          image: payload.image,
          price: payload.price,
          compareAt: payload.compareAt,
          variantLabel: payload.variantLabel ?? null,
          qty: qtyAdd,
        });
      } else {
        state.items[idx].qty += qtyAdd;
      }
      state.cartOpen = true;
    },
    updateQty(state, action) {
      const { lineId, qty } = action.payload;
      const q = Math.floor(qty);
      if (q < 1) {
        state.items = state.items.filter((l) => l.lineId !== lineId);
        return;
      }
      const line = state.items.find((l) => l.lineId === lineId);
      if (line) line.qty = q;
    },
    removeLine(state, action) {
      state.items = state.items.filter((l) => l.lineId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    openCart(state) {
      state.cartOpen = true;
    },
    setCartOpen(state, action) {
      state.cartOpen = action.payload;
    },
  },
});

export const {
  hydrateCart,
  addItem,
  updateQty,
  removeLine,
  clearCart,
  openCart,
  setCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;
