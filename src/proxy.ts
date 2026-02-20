import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // صفحات تسجيل الدخول
  const isAuthPage =
    pathname === "/Login" || pathname === "/Register";

  // الصفحات المحمية
  const isProtectedPage =
    pathname.startsWith("/cart") ||
    pathname.startsWith("/Products") ||
    pathname.startsWith("/wishlist");

  // ✅ لو المستخدم مسجل دخول وبيحاول يدخل Login أو Register
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ❌ لو مش مسجل وبيحاول يدخل صفحة محمية
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart/:path*",
    "/Products/:path*",
    "/wishlist/:path*",
    "/Login",
    "/Register",
  ],
};
