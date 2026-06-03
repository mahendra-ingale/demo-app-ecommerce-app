import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "../cart/AddToCartButton";
import { formatCurrency } from "../../lib/utils";
import type { Product } from "../../types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/products/${product.id}`} className="block space-y-4">
        <div className="relative h-40 overflow-hidden rounded-2xl bg-slate-100">
          <Image src={product.image} alt={product.title} fill className="object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-sky-600">{product.category}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{product.title}</h3>
          <p className="mt-2 text-sm text-slate-600">{product.description}</p>
        </div>
      </Link>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{product.rating} ★</p>
          <p className="text-xl font-semibold text-slate-950">{formatCurrency(product.price)}</p>
        </div>
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
