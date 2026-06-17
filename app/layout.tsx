import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "../context/CartContext";
import { Providers } from "./providers";
import NavHeader from "../components/navigation/NavHeader";
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
        <Providers>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <NavHeader />
              {children}
              <footer className="mt-auto border-t border-slate-200 bg-white">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
                  <p>E-Commerce © 2026</p>
                </div>
              </footer>
            </div>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
