import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  if (token) {
    if (pathname.startsWith("/auth") || pathname.startsWith("/")) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  if (!token) {
    if (pathname.startsWith("/home") || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }
}

export const config = {
  matcher: ["/home/:path*", "/admin/:path*", "/auth/:path*"],
};
