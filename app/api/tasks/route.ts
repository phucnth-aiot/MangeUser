import { NextRequest, NextResponse } from "next/server";
import api from "../../lib/axios.server";
import { AxiosError } from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status") || "";
  const title = searchParams.get("title") || "";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  const accessToken = req.cookies.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const response = await api.get("/tasks", {
      params: { status, title, page, limit },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(
      { message: "Fetched tasks successfully", data: response.data },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "Error from BE:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unknown error:", String(error));
    }

    return NextResponse.json(
      { message: "Failed to fetch tasks" },
      { status: 400 }
    );
  }
}
