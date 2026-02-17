import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // In a real app, use environment variables or a database
    // For now, hardcoded credentials as requested
    const ADMIN_USER = "Admin";
    const ADMIN_PASS = "Admin123";

    if (username === ADMIN_USER && password === ADMIN_PASS) {
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
