"use client";

import * as React from "react";
import { Provider } from "react-redux";
import CartAuthSync from "@/components/cart/CartAuthSync";
import { getStore } from "./store";
import { hydrateCart, loadStoredCart, STORAGE_KEY } from "./slices/cartSlice";

export default function ReduxProvider({ children }) {
  const [store] = React.useState(() => getStore());

  React.useEffect(() => {
    return store.subscribe(() => {
      const state = store.getState();
      if (!state.cart.hydrated || typeof window === "undefined") return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart.items));
      } catch {
        /* ignore quota */
      }
    });
  }, [store]);

  React.useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return;
      store.dispatch(hydrateCart(loadStoredCart()));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [store]);

  return (
    <Provider store={store}>
      <CartAuthSync />
      {children}
    </Provider>
  );
}
