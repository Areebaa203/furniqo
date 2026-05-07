"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createClient } from "@/utils/supabase/client";
import { hydrateCart, popStashedCartForSignBackIn } from "@/store/slices/cartSlice";

/**
 * Hydrates Redux from the sign-out stash when a session becomes available —
 * INITIAL_SESSION catches OAuth/full reload paths; SIGNED_IN catches SPA sign-in without reload.
 */
export default function CartAuthSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    const supabase = createClient();
    const restoreIfStashed = (session) => {
      const uid = session?.user?.id;
      if (!uid) return;
      const items = popStashedCartForSignBackIn(uid);
      if (!items?.length) return;
      dispatch(hydrateCart(items));
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user?.id) return;
      if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
        restoreIfStashed(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return null;
}
