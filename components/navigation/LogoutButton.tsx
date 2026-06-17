"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ redirectTo: "/" })}
      className="rounded-full bg-slate-950 px-4 py-2 text-white hover:bg-slate-700 transition"
    >
      Logout
    </button>
  );
}
