import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATH = ['/', '/login', '/register', './register-confirm']
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if ( PUBLIC_PATH.includes(pathname)) {
    return NextResponse.next();
  } 
  const token = req.cookies.get("access_token");

  if (!token && req.nextUrl.pathname.startsWith("/users")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/users/:path*"],
};
