import { NextRequest, NextResponse } from "next/server";
import api from '../../../lib/axios.server';


export async function POST(req: NextRequest) {
  // Lấy refresh_token từ cookie
  const refreshToken = req.cookies.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "No refresh token provided" },
      { status: 401 }
    );
  }

  try {
    const response = await api.post('/auth/refresh', {
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token: newRefreshToken } = response.data;

    const res = NextResponse.json(
      { message: "Token refreshed successfully" },
      { status: 200 }
    );

    res.cookies.set({
      name: "access_token",
      value: access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 15,
      path: "/",
    });

    // Optionally set new refresh_token
    res.cookies.set({
      name: "refresh_token",
      value: newRefreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Refresh token failed:", error);
    return NextResponse.json(
      { message: "Failed to refresh token" },
      { status: 401 }
    );
  }
}
