"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../lib/utils";

export default function CartPage() {
  const { items, removeFromCart } = useCart();
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 text-slate-800">
      <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-600">Your cart</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">Review items before checkout</h1>
        </div>
        <Link href="/products" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
          Continue shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl bg-slate-950 p-10 text-white shadow-xl">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-3 text-slate-200">Add products from the catalog and they will appear here with quantities and totals.</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <section className="space-y-4">
            {items.map((item) => (
              <article key={item.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-950">{item.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{item.category}</p>
                    <p className="mt-2 text-sm text-slate-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="space-y-2 text-right">
                    <p className="text-lg font-semibold text-slate-950">{formatCurrency(item.price * item.quantity)}</p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl">
            <h2 className="text-xl font-semibold">Order summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="rounded-3xl bg-white p-4 text-slate-950">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Ready to checkout</p>
                <p className="mt-2 text-2xl font-semibold">{formatCurrency(subtotal)}</p>
              </div>
              <button className="w-full rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
                Proceed to checkout
              </button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
