import { auth } from "./lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_TOKEN = "demo-token";

function unauthorized() {
  return new NextResponse(JSON.stringify({ error: "Unauthorized." }), {
    status: 401,
    headers: { "content-type": "application/json" },
  });
}

export default auth((req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/orders")) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return unauthorized();
    }

    const token = authHeader.slice("Bearer ".length).trim();
    if (token !== AUTH_TOKEN) {
      return unauthorized();
    }
  }

  if (pathname.startsWith("/cart") && !req.auth?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/api/orders/:path*", "/cart/:path*"],
};
