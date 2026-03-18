import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/db";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const isValid = await loginAdmin(username, password);

    if (isValid) {
      // Create a response
      const response = NextResponse.json({ success: true }, { status: 200 });

      // Set a secure HTTP-only cookie
      response.cookies.set("admin_token", "authenticated_secret_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
