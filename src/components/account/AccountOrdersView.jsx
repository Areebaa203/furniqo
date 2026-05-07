"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { resolveSupabaseUserId } from "@/utils/supabase/resolveUserId";
import { useCart } from "@/contexts/CartContext";
import AccountOrderCard from "@/components/account/AccountOrderCard";
import AccountCartCheckoutCard from "@/components/account/AccountCartCheckoutCard";
import { AccountOrdersEmpty } from "@/components/account/AccountOrdersEmpty";

async function fetchOrdersFromApi() {
  const res = await fetch("/api/account/orders", { cache: "no-store" });
  const json = await res.json();
  if (!json.success) return [];
  return Array.isArray(json.data) ? json.data : [];
}

export default function AccountOrdersView({ serverUserId = null }) {
  const router = useRouter();
  const { addItem, items: cartItems, subtotal: cartSubtotal, totalQty: cartQty } = useCart();
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async (uid) => {
    if (!uid) {
      setOrders([]);
      return;
    }
    try {
      const list = await fetchOrdersFromApi();
      setOrders(list);
    } catch {
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    const syncOrders = async () => {
      const resolved = await resolveSupabaseUserId(supabase);
      const uid = resolved ?? serverUserId ?? null;
      if (cancelled) return;
      setUserId(uid);
      await refresh(uid);
      setLoading(false);
    };

    void syncOrders();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void syncOrders();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [refresh, serverUserId]);

  const handlePaid = useCallback(
    async (orderId) => {
      if (!userId) return;
      try {
        const res = await fetch(`/api/account/orders/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ markPaid: true }),
        });
        const json = await res.json();
        if (json.success && json.data) {
          setOrders((prev) => prev.map((o) => (o.id === orderId ? json.data : o)));
        }
      } catch {
        /* ignore */
      }
    },
    [userId]
  );

  const handleCancelled = useCallback(
    async (orderId) => {
      if (!userId) return;
      try {
        await fetch(`/api/account/orders/${orderId}`, { method: "DELETE" });
        await refresh(userId);
      } catch {
        /* ignore */
      }
    },
    [userId, refresh]
  );

  const handleBuyAgain = useCallback(
    (lines) => {
      for (const line of lines) {
        addItem({
          slug: line.slug,
          name: line.name,
          image: line.image,
          price: line.price,
          compareAt: line.compareAt ?? line.price,
          variantLabel: line.variantLabel ?? null,
          qty: line.qty,
        });
      }
      router.push("/checkout");
    },
    [addItem, router]
  );

  if (loading) {
    return (
      <div className="font-home-body py-16 text-sm text-neutral-500" aria-busy="true">
        Loading orders…
      </div>
    );
  }

  if (!orders.length && cartQty < 1) {
    return <AccountOrdersEmpty />;
  }

  if (!orders.length && cartQty > 0) {
    return (
      <div>
        <h2 className="font-home-heading text-lg font-normal text-[#1a3021] sm:text-xl">Orders</h2>
        <p className="mt-2 max-w-xl font-home-body text-sm leading-relaxed text-neutral-600">
          Your bag has items — finish checkout to see them here as an order. Cart items are not orders until you confirm.
        </p>
        <div className="mt-8">
          <AccountCartCheckoutCard items={cartItems} totalQty={cartQty} subtotal={cartSubtotal} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-home-heading text-lg font-normal text-[#1a3021] sm:text-xl">Orders</h2>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-8">
        {orders.map((order) => (
          <AccountOrderCard
            key={order.id}
            order={order}
            onPaid={handlePaid}
            onCancelled={handleCancelled}
            onBuyAgain={handleBuyAgain}
          />
        ))}
      </div>

      {cartQty > 0 ? (
        <section className="mt-12 border-t border-[#ebe6df] pt-10" aria-labelledby="cart-pending-heading">
          <h2 id="cart-pending-heading" className="font-home-heading text-base font-normal text-[#1a251f]">
            In your cart
          </h2>
          <p className="mt-1 font-home-body text-sm text-neutral-600">
            These items are not in your order history until you complete checkout.
          </p>
          <div className="mt-6">
            <AccountCartCheckoutCard items={cartItems} totalQty={cartQty} subtotal={cartSubtotal} />
          </div>
        </section>
      ) : null}

      <nav className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-[#ebe6df] pt-8 font-home-body text-[11px] text-neutral-500">
        <Link href="/faq" className="underline underline-offset-2 hover:text-neutral-800">
          Return policy
        </Link>
        <Link href="/faq" className="underline underline-offset-2 hover:text-neutral-800">
          Shipping policy
        </Link>
        <Link href="/privacy" className="underline underline-offset-2 hover:text-neutral-800">
          Privacy policy
        </Link>
        <Link href="/terms" className="underline underline-offset-2 hover:text-neutral-800">
          Terms of service
        </Link>
      </nav>
    </div>
  );
}
