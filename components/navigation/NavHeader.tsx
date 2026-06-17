import Link from "next/link";
import { auth } from "@/lib/auth";
import { CartLink } from "./CartLink";
import { LogoutButton } from "./LogoutButton";

export default async function NavHeader() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-slate-950">
          E-Commerce
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-950">
            Home
          </Link>
          <Link href="/products" className="hover:text-slate-950">
            Products
          </Link>
          <Link href="/about" className="hover:text-slate-950">
            About
          </Link>
          <CartLink />

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-slate-700 font-medium">{user.name || user.email}</span>
              <LogoutButton />
            </div>
          ) : (
            <Link href="/login" className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-slate-700">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
