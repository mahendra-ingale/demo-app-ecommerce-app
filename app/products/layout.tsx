import Link from "next/link";
import { Breadcrumb } from "../../components/navigation/Breadcrumb";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:flex-row">
      <aside className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:max-w-xs">
        <h2 className="text-lg font-semibold text-slate-950">Browse by category</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          {['wearables', 'audio', 'cameras', 'computers'].map((category) => (
            <li key={category}>
              <Link href={`/products?category=${category}`} className="block rounded-2xl bg-slate-100 px-4 py-3 capitalize hover:bg-slate-200">
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex-1 space-y-6">
        <Breadcrumb />
        {children}
      </div>
    </section>
  );
}
