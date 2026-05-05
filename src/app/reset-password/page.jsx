import AuthShell from "@/components/auth/AuthShell";
import AuthHeroSide from "@/components/auth/AuthHeroSide";
import ResetPasswordFormPanel from "@/components/auth/ResetPasswordFormPanel";

export default function ResetPasswordPage() {
  return (
    <AuthShell>
      <main className="flex min-h-0 flex-1 flex-col md:flex-row md:items-stretch">
        <AuthHeroSide />
        <ResetPasswordFormPanel />
      </main>
    </AuthShell>
  );
}
