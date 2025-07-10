import { NextRequest, NextResponse } from "next/server";
import api from "./axios.server";

export async function getValidAccessToken(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  const userId = req.cookies.get("user_id")?.value;
//   const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  
  // Nếu chưa có access_token mà vẫn còn refresh_token → refresh
  if (!accessToken && refreshToken && userId) {
    // const response = await api.post(`${baseURL}/auth/refresh/${userId}`, {
    const response = await api.post(`http://localhost:3030/auth/refresh/${userId}`, {
      refreshToken: refreshToken,
    });

    if (response.status === 200) {
      const { access_token, refresh_token: newRefreshToken } = response.data;

      // Tạo response để set cookie mới
      const nextRes = NextResponse.next();
      nextRes.cookies.set({
        name: "access_token",
        value: access_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 15,
        path: "/",
      });
      nextRes.cookies.set({
        name: "refresh_token",
        value: newRefreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return { accessToken: access_token, response: nextRes };
    } else {
      console.log("refresh fail");
      return { accessToken: null, response: NextResponse.redirect(new URL("/login", req.url)) };
    }
  }

  return { accessToken, response: null };
}
