"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCartStore, type CartItem } from "@/stores/cart-store";

interface AddToCartPayload extends Omit<CartItem, "quantity"> {
  quantity?: number;
}

export function useOptimisticCart() {
  const addItem = useCartStore((state) => state.addItem);
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async (payload: AddToCartPayload) => {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: payload.productId,
          quantity: payload.quantity ?? 1,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed server reconciliation");
      }

      return res.json();
    },
    onMutate: async (payload) => {
      const previousItems = useCartStore.getState().items;
      addItem(payload);
      return { previousItems };
    },
    onError: (_error, _payload, context) => {
      if (context?.previousItems) {
        useCartStore.setState({ items: context.previousItems });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return {
    addToCart: addMutation.mutate,
    isAdding: addMutation.isPending,
  };
}
