import { NextResponse } from "next/server";
import { getProducts } from "../data";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") ?? "").trim().toLowerCase();

  if (query.length < 2) {
    return NextResponse.json({ products: [] });
  }

  const products = getProducts()
    .filter((product) => product.title.toLowerCase().includes(query))
    .map((product) => ({
      id: String(product.id),
      name: product.title,
      price: product.price,
      thumbnail: product.image,
    }));

  return NextResponse.json({ products });
}
