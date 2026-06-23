import { NextResponse } from "next/server";
import { addOrUpdateCartItem } from "./store";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { error: "Request body must be a JSON object." },
      { status: 400 }
    );
  }

  const { productId, quantity } = body as Record<string, unknown>;

  if (typeof productId !== "string" || productId.trim() === "") {
    return NextResponse.json(
      { error: "productId is required and must be a non-empty string." },
      { status: 400 }
    );
  }

  if (
    typeof quantity !== "number" ||
    !Number.isInteger(quantity) ||
    quantity <= 0
  ) {
    return NextResponse.json(
      { error: "quantity is required and must be an integer greater than 0." },
      { status: 400 }
    );
  }

  const item = addOrUpdateCartItem(productId, quantity);
  return NextResponse.json({ item }, { status: 201 });
}
