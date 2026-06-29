"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

interface SearchProduct {
  id: string;
  name: string;
  price: number;
  thumbnail: string;
}

interface SearchResponse {
  products: SearchProduct[];
}

export function useProductSearch(query: string) {
  const debouncedQuery = useDebounce(query, 300);

  return useQuery<SearchResponse>({
    queryKey: ["products", "search", debouncedQuery],
    queryFn: async () => {
      const res = await fetch(
        `/api/products/search?q=${encodeURIComponent(debouncedQuery)}`
      );

      if (!res.ok) {
        throw new Error("Search execution error encountered");
      }

      return res.json();
    },
    enabled: debouncedQuery.length >= 2,
    placeholderData: (previousData) => previousData,
  });
}
