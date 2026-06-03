import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { CartProvider } from "../context/CartContext";
import { CartLink } from "../components/navigation/CartLink";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "A learning-first Next.js e-commerce storefront with static product data.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "E-Commerce",
    description: "Modern App Router storefront learning project",
    images: ["/products/aurora.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-50 text-slate-900">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
              <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-xl font-semibold tracking-tight text-slate-950">E-Commerce</Link>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
                  <Link href="/" className="hover:text-slate-950">Home</Link>
                  <Link href="/products" className="hover:text-slate-950">Products</Link>
                  <Link href="/about" className="hover:text-slate-950">About</Link>
                  <CartLink />
                  <Link href="/login" className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-slate-700">Login</Link>
                </div>
              </nav>
            </header>
            {children}
            <footer className="mt-auto border-t border-slate-200 bg-white">
              <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
                <p>E-Commerce © 2026</p>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
