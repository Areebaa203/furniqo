import AuthShell from "@/components/auth/AuthShell";
import AuthHeroSide from "@/components/auth/AuthHeroSide";
import ForgotPasswordFormPanel from "@/components/auth/ForgotPasswordFormPanel";

export default function ForgotPasswordPage() {
  return (
    <AuthShell>
      <main className="flex min-h-0 flex-1 flex-col md:flex-row md:items-stretch">
        <AuthHeroSide />
        <ForgotPasswordFormPanel />
      </main>
    </AuthShell>
  );
}
