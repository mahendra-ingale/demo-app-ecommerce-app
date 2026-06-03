export default function Loading() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-5xl items-center justify-center px-6 py-16 text-slate-700">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-600">Loading</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950">Preparing the storefront...</h2>
      </div>
    </main>
  );
}
