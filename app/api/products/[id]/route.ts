import { NextResponse } from "next/server";
import { getProductById, updateProductById } from "../data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = getProductById(params.id);
  if (!product) {
    return NextResponse.json(
      { error: "Product not found." },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = getProductById(params.id);
  if (!product) {
    return NextResponse.json(
      { error: "Product not found." },
      { status: 404 }
    );
  }

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

  const updates = body as Record<string, unknown>;
  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "image",
    "rating",
    "stock",
  ];

  const fieldsToUpdate: Record<string, unknown> = {};
  for (const key of Object.keys(updates)) {
    if (!allowedFields.includes(key)) {
      return NextResponse.json(
        { error: `Invalid update field: ${key}.` },
        { status: 400 }
      );
    }

    fieldsToUpdate[key] = updates[key];
  }

  if (Object.keys(fieldsToUpdate).length === 0) {
    return NextResponse.json(
      { error: "At least one updatable field must be provided." },
      { status: 400 }
    );
  }

  const normalizedUpdates: any = {};

  if (fieldsToUpdate.title && typeof fieldsToUpdate.title === "string") {
    normalizedUpdates.title = fieldsToUpdate.title;
  }
  if (
    fieldsToUpdate.description &&
    typeof fieldsToUpdate.description === "string"
  ) {
    normalizedUpdates.description = fieldsToUpdate.description;
  }
  if (fieldsToUpdate.category && typeof fieldsToUpdate.category === "string") {
    normalizedUpdates.category = fieldsToUpdate.category;
  }
  if (fieldsToUpdate.image && typeof fieldsToUpdate.image === "string") {
    normalizedUpdates.image = fieldsToUpdate.image;
  }
  if (
    fieldsToUpdate.price !== undefined &&
    typeof fieldsToUpdate.price === "number" &&
    fieldsToUpdate.price >= 0
  ) {
    normalizedUpdates.price = fieldsToUpdate.price;
  }
  if (
    fieldsToUpdate.rating !== undefined &&
    typeof fieldsToUpdate.rating === "number" &&
    fieldsToUpdate.rating >= 0
  ) {
    normalizedUpdates.rating = fieldsToUpdate.rating;
  }
  if (
    fieldsToUpdate.stock !== undefined &&
    typeof fieldsToUpdate.stock === "number" &&
    Number.isInteger(fieldsToUpdate.stock) &&
    fieldsToUpdate.stock >= 0
  ) {
    normalizedUpdates.stock = fieldsToUpdate.stock;
  }

  const updatedProduct = updateProductById(params.id, normalizedUpdates);
  if (!updatedProduct) {
    return NextResponse.json(
      { error: "Unable to update product." },
      { status: 500 }
    );
  }

  return NextResponse.json({ product: updatedProduct });
}
