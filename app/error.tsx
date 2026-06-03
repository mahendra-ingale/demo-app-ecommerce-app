"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center px-6 py-16">
      <section className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
        <p className="text-sm uppercase tracking-[0.35em] text-rose-500">Something went wrong</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">We could not load this page.</h1>
        <p className="mt-3 text-slate-600">{error.message}</p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
