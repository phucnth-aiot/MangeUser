import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isProfileRoute = req.nextUrl.pathname.startsWith("/profile");

  if (isAdminRoute) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (isProfileRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile"],
};
