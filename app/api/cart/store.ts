export interface CartItem {
  productId: string;
  quantity: number;
}

export const cartItems: CartItem[] = [];

export function addOrUpdateCartItem(productId: string, quantity: number): CartItem {
  const existingItem = cartItems.find((item) => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
    return existingItem;
  }

  const newItem: CartItem = { productId, quantity };
  cartItems.push(newItem);
  return newItem;
}

export function removeCartItem(productId: string): boolean {
  const index = cartItems.findIndex((item) => item.productId === productId);
  if (index === -1) {
    return false;
  }

  cartItems.splice(index, 1);
  return true;
}

export function getCartItem(productId: string): CartItem | undefined {
  return cartItems.find((item) => item.productId === productId);
}
