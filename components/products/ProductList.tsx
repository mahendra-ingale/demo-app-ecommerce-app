import { getProducts } from "../../data/products";
import { ProductCard } from "./ProductCard";
import ProductGallery from "../ProductGallery";

export async function ProductList() {
  const products = await getProducts();

  return (
    <ProductGallery>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductGallery>
  );
}
