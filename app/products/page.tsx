import { ProductList } from "../../components/products/ProductList";

export const revalidate = 60;

export default async function ProductsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 text-slate-800">
      <ProductList />
    </main>
  );
}
