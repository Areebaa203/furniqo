import { createClient } from "@/utils/supabase/server";
import AccountOrdersView from "@/components/account/AccountOrdersView";

export const metadata = {
  title: "Orders · My account · Furniqo",
};

export default async function AccountOrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountOrdersView serverUserId={user?.id ?? null} />;
}
