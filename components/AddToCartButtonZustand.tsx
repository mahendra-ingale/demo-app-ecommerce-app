"use client";

import { useOptimisticCart } from "@/hooks/use-optimistic-cart";

interface AddToCartButtonZustandProps {
  product: {
    id: string;
    name: string;
    price: number;
    thumbnail: string;
  };
}

export default function AddToCartButtonZustand({
  product,
}: AddToCartButtonZustandProps) {
  const { addToCart, isAdding } = useOptimisticCart();

  return (
    <button
      type="button"
      onClick={() =>
        addToCart({
          productId: product.id,
          name: product.name,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        })
      }
      disabled={isAdding}
      className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {isAdding ? "Adding..." : "Add to cart"}
    </button>
  );
}
