"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
    >
      <span aria-hidden="true">🛒</span>
      <span>Cart</span>
      <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-slate-950 px-2 text-xs font-semibold text-white">
        {itemCount}
      </span>
    </Link>
  );
}
