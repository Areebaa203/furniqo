import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { cartBaselineState, loadStoredCart } from "./slices/cartSlice";

export function makeStore(preloadedState) {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });
}

let clientStore;

/**
 * One Redux store in the browser so cart state survives layout switches
 * (storefront vs auth shell vs error/not-found boundaries).
 *
 * Cart is loaded from localStorage synchronously on first client creation so
 * add-to-cart before effects cannot be wiped by a later hydrateCart([]).
 */
export function getStore() {
  if (typeof window === "undefined") {
    return makeStore();
  }
  if (!clientStore) {
    clientStore = makeStore({
      cart: {
        ...cartBaselineState,
        items: loadStoredCart(),
        hydrated: true,
      },
    });
  }
  return clientStore;
}
