import { NextResponse } from "next/server";
import { getProducts } from "./data";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limitParam = url.searchParams.get("limit");

  if (limitParam !== null && limitParam.trim() === "") {
    return NextResponse.json(
      { error: "Limit must be a positive integer." },
      { status: 400 }
    );
  }

  const limit = limitParam ? Number(limitParam) : undefined;
  if (limitParam !== null && (Number.isNaN(limit) || limit <= 0)) {
    return NextResponse.json(
      { error: "Limit must be a positive integer." },
      { status: 400 }
    );
  }

  const products = getProducts(limit);
  return NextResponse.json({ products });
}
