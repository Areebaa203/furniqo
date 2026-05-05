import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { canAccessDashboard } from "@/lib/auth/roles";
import AccountShell from "@/components/account/AccountShell";

export const metadata = {
  title: "My account · Furniqo",
  description: "Orders, subscriptions, and profile settings.",
};

export default async function AccountLayout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return (
    <AccountShell showStoreDashboardLink={canAccessDashboard(profile?.role)}>
      {children}
    </AccountShell>
  );
}
