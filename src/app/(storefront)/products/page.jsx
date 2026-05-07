import { Suspense } from "react";
import ShopAllView from "@/components/shop-all/ShopAllView";

export default function ShopAllPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopAllView />
    </Suspense>
  );
}
