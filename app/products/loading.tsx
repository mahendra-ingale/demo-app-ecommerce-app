export default function ProductsLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="h-40 rounded-2xl bg-slate-200" />
          <div className="mt-4 h-4 w-24 rounded bg-slate-200" />
          <div className="mt-3 h-6 w-3/4 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-full rounded bg-slate-100" />
          <div className="mt-4 h-10 rounded-full bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
