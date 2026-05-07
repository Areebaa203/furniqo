"use client";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem as addItemAction,
  clearCart as clearCartAction,
  FREE_SHIPPING_THRESHOLD,
  openCart as openCartAction,
  removeLine as removeLineAction,
  setCartOpen as setCartOpenAction,
  updateQty as updateQtyAction,
} from "@/store/slices/cartSlice";

export { FREE_SHIPPING_THRESHOLD };

export function useCart() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const cartOpen = useSelector((s) => s.cart.cartOpen);

  const addItem = React.useCallback((payload) => dispatch(addItemAction(payload)), [dispatch]);

  const updateQty = React.useCallback(
    (lineId, qty) => dispatch(updateQtyAction({ lineId, qty })),
    [dispatch]
  );

  const removeLine = React.useCallback((lineId) => dispatch(removeLineAction(lineId)), [dispatch]);

  const clearCart = React.useCallback(() => dispatch(clearCartAction()), [dispatch]);

  const openCart = React.useCallback(() => dispatch(openCartAction()), [dispatch]);

  const setCartOpenFn = React.useCallback((v) => dispatch(setCartOpenAction(v)), [dispatch]);

  const totalQty = React.useMemo(() => items.reduce((s, l) => s + l.qty, 0), [items]);

  const subtotal = React.useMemo(() => items.reduce((s, l) => s + l.price * l.qty, 0), [items]);

  return React.useMemo(
    () => ({
      items,
      addItem,
      updateQty,
      removeLine,
      clearCart,
      totalQty,
      subtotal,
      openCart,
      setCartOpen: setCartOpenFn,
      cartOpen,
    }),
    [
      items,
      addItem,
      updateQty,
      removeLine,
      clearCart,
      totalQty,
      subtotal,
      openCart,
      setCartOpenFn,
      cartOpen,
    ]
  );
}
