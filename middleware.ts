import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("authjs.session-token") !== undefined;
  const url = request.nextUrl.clone();

  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (url.pathname === "/profile") {
    return NextResponse.redirect(new URL("/profile/edit-profile", request.url));
  }

  if (
    isAuthenticated &&
    (url.pathname.startsWith("/auth/login") ||
      url.pathname.startsWith("/auth/signup") ||
      url.pathname.startsWith("/auth/forgot-password") ||
      url.pathname.startsWith("/auth/reset-password"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    !isAuthenticated &&
    (url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/analytics") ||
      url.pathname.startsWith("/create-event") ||
      url.pathname.startsWith("/dashboard/availability") ||
      url.pathname.startsWith("/dashboard/profile/edit-profile") ||
      url.pathname.startsWith("/dashboard/profile/change-password"))
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/dashboard",
    "/profile/edit-profile",
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/analytics",
    "/create-event",
    "/dashboard/availability",
    "/dashboard/profile/edit-profile",
    "/dashboard/profile/change-password",
  ],
};
