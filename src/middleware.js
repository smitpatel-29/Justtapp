import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Protect /admin and sensitive /api routes
  if (path.startsWith("/admin") || path.startsWith("/api/admins")) {
    // Exclude /admin/login from protection
    if (path === "/admin/login") {
      return NextResponse.next();
    }

    // Check for cookie
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      if (path.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      
      // Redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admins/:path*"],
};
