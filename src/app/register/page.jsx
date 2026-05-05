import AuthShell from "@/components/auth/AuthShell";
import AuthHeroSide from "@/components/auth/AuthHeroSide";
import RegisterFormPanel from "@/components/auth/RegisterFormPanel";

export default function RegisterPage() {
  return (
    <AuthShell>
      <main className="flex min-h-0 flex-1 flex-col md:flex-row md:items-stretch">
        <AuthHeroSide />
        <RegisterFormPanel />
      </main>
    </AuthShell>
  );
}
