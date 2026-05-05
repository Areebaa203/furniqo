"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useCart } from "@/contexts/CartContext";
import {
  loadOrdersForUser,
  patchOrderForUser,
  removeOrderForUser,
} from "@/lib/account/localOrders";
import AccountOrderCard from "@/components/account/AccountOrderCard";
import { AccountOrdersEmpty } from "@/components/account/AccountOrdersEmpty";

async function resolveSupabaseUserId(supabase) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session?.user?.id) return session.user.id;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
}

export default function AccountOrdersView({ serverUserId = null }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback((uid) => {
    if (!uid) {
      setOrders([]);
      return;
    }
    setOrders(loadOrdersForUser(uid));
  }, []);

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    const syncOrders = async () => {
      let uid = await resolveSupabaseUserId(supabase);
      if (!uid && serverUserId) uid = serverUserId;
      if (cancelled) return;
      setUserId(uid);
      refresh(uid);
      setLoading(false);
    };

    syncOrders();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      syncOrders();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [refresh, serverUserId]);

  useEffect(() => {
    const reloadFromStorage = () => {
      void (async () => {
        const supabase = createClient();
        let uid = await resolveSupabaseUserId(supabase);
        if (!uid && serverUserId) uid = serverUserId;
        setUserId(uid);
        refresh(uid);
      })();
    };

    const onStorage = (e) => {
      if (e.key === "furniqo-account-orders-v1") reloadFromStorage();
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("furniqo-account-orders-changed", reloadFromStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("furniqo-account-orders-changed", reloadFromStorage);
    };
  }, [refresh, serverUserId]);

  const handlePaid = useCallback(
    (orderId) => {
      if (!userId) return;
      patchOrderForUser(userId, orderId, {
        paymentStatus: "paid",
        fulfillmentStatus: Math.random() > 0.5 ? "delivered" : "shipped",
      });
      refresh(userId);
    },
    [userId, refresh]
  );

  const handleCancelled = useCallback(
    (orderId) => {
      if (!userId) return;
      removeOrderForUser(userId, orderId);
      refresh(userId);
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

  if (!orders.length) {
    return <AccountOrdersEmpty />;
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
