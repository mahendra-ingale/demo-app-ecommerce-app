import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center px-6 py-16">
      <section className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-600">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">That page is unavailable.</h1>
        <p className="mt-3 text-slate-600">The product or route you requested does not exist in the current catalog.</p>
        <Link href="/products" className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">Return to products</Link>
      </section>
    </main>
  );
}
