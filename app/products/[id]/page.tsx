import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "../../../components/cart/AddToCartButton";
import { getProductById } from "../../../data/products";
import { formatCurrency } from "../../../lib/utils";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product is unavailable.",
    };
  }

  return {
    title: `${product.title} | E-Commerce`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 text-slate-800 lg:flex-row">
      <div className="relative h-[320px] w-full overflow-hidden rounded-3xl bg-slate-100 lg:h-[420px] lg:max-w-xl">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='20' viewBox='0 0 32 20'><rect width='32' height='20' fill='%23e2e8f0'/></svg>"
        />
      </div>
      <article className="flex-1 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-600">{product.category}</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950">{product.title}</h1>
        <p className="mt-4 text-slate-600">{product.description}</p>
        <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
          <span>⭐ {product.rating}</span>
          <span>Stock: {product.stock}</span>
        </div>
        <p className="mt-6 text-3xl font-semibold text-slate-950">{formatCurrency(product.price)}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <AddToCartButton product={product} />
          <Link href="/products" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Back to catalog</Link>
        </div>
      </article>
    </main>
  );
}
