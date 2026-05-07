import { createClient } from "@/utils/supabase/client";
import { getStore } from "@/store/store";
import { clearCart, stashCartBeforeSignOut } from "@/store/slices/cartSlice";

/** Run before terminating the Supabase session: snapshot cart for this account, then empty the live cart */
export async function prepareCartForSignOut() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const store = getStore();
  const { items } = store.getState().cart;
  if (user?.id) {
    stashCartBeforeSignOut(user.id, items);
  }
  store.dispatch(clearCart());
}
