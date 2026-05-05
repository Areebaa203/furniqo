import { Suspense } from "react";
import AuthShell from "@/components/auth/AuthShell";
import AuthHeroSide from "@/components/auth/AuthHeroSide";
import LoginFormPanel from "@/components/auth/LoginFormPanel";

function FormFallback() {
  return (
    <div className="flex min-h-[50vh] w-full flex-1 items-center justify-center bg-[#F9F7F0] md:w-1/2">
      <div
        className="size-8 animate-spin rounded-full border-2 border-[#e8e4dc] border-t-[#1a3021]"
        aria-hidden
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthShell>
      <main className="flex min-h-0 flex-1 flex-col md:flex-row md:items-stretch">
        <AuthHeroSide priority />
        <Suspense fallback={<FormFallback />}>
          <LoginFormPanel />
        </Suspense>
      </main>
    </AuthShell>
  );
}
