import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  username: string;
  role: string;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    console.log("Chưa có token, redirect về login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Nên verify để chắc chắn token hợp lệ
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    const userRole = decoded.role;
    const userId = decoded.userId;

    console.log("Token hợp lệ:", decoded);

    // Chặn user không được vào /tasks
    if (
      request.nextUrl.pathname.startsWith("/tasks") &&
      userRole !== "admin"
    ) {
      console.log("User không phải admin → redirect");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Chặn user vào profile người khác
    if (request.nextUrl.pathname.startsWith("/profile")) {
      const userIdInPath = request.nextUrl.pathname.split("/")[2];
      if (userIdInPath && userId !== userIdInPath) {
        console.log(
          `User id mismatch. Token: ${userId}, URL: ${userIdInPath}`
        );
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.log("Token không hợp lệ:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/tasks/:path*",
    "/profile/:path*",
  ],
};
