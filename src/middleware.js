import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Protect /admin routes
  if (path.startsWith("/admin")) {
    // Exclude /admin/login from protection
    if (path === "/admin/login") {
      return NextResponse.next();
    }

    // Check for cookie
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      // Redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
