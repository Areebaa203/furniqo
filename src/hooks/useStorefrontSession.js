"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

/**
 * Lightweight session probe for the storefront header (account vs login links).
 */
export function useStorefrontSession() {
  const [state, setState] = useState({ user: null, loading: true });

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setState({ user, loading: false });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ user: session?.user ?? null, loading: false });
    });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}
