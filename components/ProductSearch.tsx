"use client";

import { useState } from "react";
import { useProductSearch } from "@/hooks/use-product-search";
import AddToCartButtonZustand from "@/components/AddToCartButtonZustand";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const { data, isFetching, isError, error } = useProductSearch(query);

  return (
    <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="space-y-2">
        <label htmlFor="product-search" className="text-sm font-medium text-slate-700">
          Search products (minimum 2 characters)
        </label>
        <input
          id="product-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try: wireless, cotton, wallet"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-slate-300 placeholder:text-slate-400 focus:ring"
        />
      </div>

      {query.trim().length > 0 && query.trim().length < 2 && (
        <p className="text-sm text-slate-500">Type at least 2 characters to search.</p>
      )}

      {isFetching && <p className="text-sm text-slate-500">Searching...</p>}

      {isError && (
        <p className="text-sm text-red-600">{error instanceof Error ? error.message : "Search failed."}</p>
      )}

      <ul className="space-y-3">
        {(data?.products ?? []).map((product) => (
          <li
            key={product.id}
            className="flex flex-col gap-3 rounded-lg border border-slate-200 p-3 md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-1">
              <p className="font-medium text-slate-900">{product.name}</p>
              <p className="text-sm text-slate-600">${product.price.toFixed(2)}</p>
            </div>
            <AddToCartButtonZustand product={product} />
          </li>
        ))}
      </ul>

      {!isFetching && query.trim().length >= 2 && (data?.products.length ?? 0) === 0 && (
        <p className="text-sm text-slate-500">No products match your query.</p>
      )}
    </section>
  );
}
