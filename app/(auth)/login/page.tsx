"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center px-6 py-16">
      <section className="w-full rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-600">Demo login</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Welcome back</h1>
        <p className="mt-3 text-slate-600">This route group keeps authentication UI separate from the public storefront URLs.</p>
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Continue to products
        </button>
      </section>
    </main>
  );
}
