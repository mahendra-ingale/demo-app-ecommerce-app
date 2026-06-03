"use client";

import { useCart } from "../../context/CartContext";
import type { Product } from "../../types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
    >
      Add to cart
    </button>
  );
}
