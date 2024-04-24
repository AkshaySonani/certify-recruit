import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
const isAuthPaths = (path: any) =>
  ["/login", "/signUp"].some((e) => path.includes(e));
export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname, origin } = req.nextUrl;
  if (pathname.includes("api/auth") || token) {
    if (pathname === "/login" || pathname === "/signUp") {
      return NextResponse.redirect(`${origin}/dashboard`);
    } else {
      return NextResponse.next();
    }
  }
  if (!token && !isAuthPaths(pathname)) {
    return NextResponse.redirect(`${origin}/login`);
  }
}
export const config = { matcher: ["/", "/login", "/signUp", "/dashboard"] };
