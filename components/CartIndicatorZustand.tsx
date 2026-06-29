"use client";

import { useHydration } from "@/hooks/use-hydration";
import { useCartCount, useCartTotal } from "@/stores/cart-store";

export default function CartIndicatorZustand() {
  const hydrated = useHydration();
  const count = useCartCount();
  const total = useCartTotal();

  if (!hydrated) {
    return (
      <p className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500">
        Cart syncing...
      </p>
    );
  }

  return (
    <p className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
      Cart: <span className="font-semibold">{count}</span> items ($
      <span className="font-semibold">{total.toFixed(2)}</span>)
    </p>
  );
}
