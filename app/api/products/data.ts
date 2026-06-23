import type { Product } from "../../../types/product";

export const products: Product[] = [
  {
    id: 1,
    title: "Classic Leather Wallet",
    slug: "classic-leather-wallet",
    description: "Smooth leather wallet with multiple card slots and a bill compartment.",
    price: 45,
    category: "accessories",
    image: "/products/wallet.jpg",
    rating: 4.5,
    stock: 12,
  },
  {
    id: 2,
    title: "Wireless Headphones",
    slug: "wireless-headphones",
    description: "Noise-cancelling headphones with long battery life and clear sound.",
    price: 99,
    category: "electronics",
    image: "/products/headphones.jpg",
    rating: 4.7,
    stock: 26,
  },
  {
    id: 3,
    title: "Organic Cotton T-Shirt",
    slug: "organic-cotton-t-shirt",
    description: "Comfortable tee made from soft organic cotton in a relaxed fit.",
    price: 28,
    category: "apparel",
    image: "/products/tshirt.jpg",
    rating: 4.3,
    stock: 34,
  },
];

export function getProducts(limit?: number): Product[] {
  if (limit === undefined) {
    return products;
  }

  return products.slice(0, Math.max(0, limit));
}

export function getProductById(id: string | number): Product | undefined {
  const numericId = typeof id === "string" ? Number(id) : id;
  if (Number.isNaN(numericId)) {
    return undefined;
  }

  return products.find((item) => item.id === numericId);
}

export function updateProductById(
  id: string,
  updates: Partial<Omit<Product, "id" | "slug">>
): Product | undefined {
  const product = getProductById(id);
  if (!product) {
    return undefined;
  }

  Object.assign(product, updates);

  if (updates.title) {
    product.slug = updates.title.toLowerCase().replace(/\s+/g, "-");
  }

  return product;
}
