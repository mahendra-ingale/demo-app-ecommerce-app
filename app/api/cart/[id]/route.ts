import { NextResponse } from "next/server";
import { removeCartItem } from "../../cart/store";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const removed = removeCartItem(params.id);
  if (!removed) {
    return NextResponse.json(
      { error: "Cart item not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Cart item removed." });
}
