"use client";

import ProductSearch from "@/components/ProductSearch";
import CartIndicatorZustand from "@/components/CartIndicatorZustand";
import { useCartStore } from "@/stores/cart-store";

export default function CartDemo() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-slate-900">State Management Demo</h1>
        <CartIndicatorZustand />
      </div>

      <ProductSearch />

      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Cart Items</h2>
          <button
            type="button"
            onClick={clearCart}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
          >
            Clear cart
          </button>
        </div>

        {items.length === 0 && (
          <p className="text-sm text-slate-500">Your cart is empty. Add items from search results.</p>
        )}

        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.productId}
              className="flex flex-col gap-3 rounded-lg border border-slate-200 p-3 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">{item.name}</p>
                <p className="text-sm text-slate-600">${item.price.toFixed(2)} each</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="h-8 w-8 rounded border border-slate-300 text-slate-700"
                >
                  -
                </button>
                <span className="min-w-8 text-center text-sm font-medium text-slate-900">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="h-8 w-8 rounded border border-slate-300 text-slate-700"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="ml-2 rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
