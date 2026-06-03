import { getProducts } from "../../data/products";
import { ProductCard } from "./ProductCard";

export async function ProductList() {
  const products = await getProducts();

  return (
    <section className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
