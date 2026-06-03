import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | E-Commerce",
  description: "Learn how the static e-commerce learning project is structured.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 text-slate-800">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-600">About page</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">About section.</h1>
      </section>
    </main>
  );
}
