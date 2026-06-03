import type { Product } from "../types/product";

const DUMMYJSON_BASE_URL = "http://dummyjson.com";

// Transform DummyJSON product to our Product type
function transformDummyJsonProduct(data: any): Product {
  return {
    id: data.id,
    title: data.title,
    slug: data.title.toLowerCase().replace(/\s+/g, "-"),
    description: data.description,
    price: Math.round(data.price),
    category: data.category,
    image: data.thumbnail || data.image || "/products/default.svg",
    rating: data.rating,
    stock: data.stock,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${DUMMYJSON_BASE_URL}/products?limit=30`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    return data.products.map(transformDummyJsonProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${DUMMYJSON_BASE_URL}/products/${id}`, {
      next: { revalidate: 60 },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return transformDummyJsonProduct(data);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
