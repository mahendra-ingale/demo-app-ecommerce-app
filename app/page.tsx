import Link from "next/link";

export const revalidate = 60;

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 text-slate-800">
      <section className="rounded-[32px] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-xl md:p-10">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Next.js e-commerce project</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/products" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100">Browse products</Link>
        </div>
      </section>
    </main>
  );
}
