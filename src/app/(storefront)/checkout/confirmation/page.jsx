import { Suspense } from "react";
import CheckoutConfirmationView from "@/components/checkout/CheckoutConfirmationView";

export const metadata = {
  title: "Order confirmed · Furniqo",
  description: "Thank you for your order.",
};

function ConfirmationFallback() {
  return (
    <div className="min-h-[40vh] bg-[#F9F7F2] px-4 py-16 font-home-body text-sm text-neutral-500">
      Loading order…
    </div>
  );
}

export default function CheckoutConfirmationPage() {
  return (
    <Suspense fallback={<ConfirmationFallback />}>
      <CheckoutConfirmationView />
    </Suspense>
  );
}
