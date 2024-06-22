// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";
// const isAuthPaths = (path: any) =>
//   ["/login", "/signup"].some((e) => path.includes(e));
// export default async function middleware(req: NextRequest) {
//   const token = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   const { pathname, origin } = req.nextUrl;
//   if (pathname.includes("api/auth") || token) {
//     if (pathname === "/login" || pathname === "/signup") {
//       return NextResponse.redirect(`${origin}/dashboard`);
//     } else {
//       return NextResponse.next();
//     }
//   }
//   if (!token && !isAuthPaths(pathname)) {
//     return NextResponse.redirect(`${origin}/login`);
//   }
// }
// export const config = { matcher: ["/", "/login", "/signup", "/dashboard"] };

import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req: any) {
    const token = req.nextauth.token;
    const { pathname, origin } = req.nextUrl;
    const isAuthPaths = (path: any) =>
      ['/login', '/signup'].some((e) => path.includes(e));
    if (pathname.includes('api/auth') || token) {
      if (pathname === '/login' || pathname === '/signup') {
        return NextResponse.redirect(`${origin}/dashboard`);
      } else {
        return NextResponse.next();
      }
    }
    if (!token && !isAuthPaths(pathname)) {
      return NextResponse.redirect(`${origin}/login`);
    }
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  },
);
export const config = {
  matcher: [
    '/job',
    '/exam',
    '/login',
    '/users',
    '/signup',
    '/pricing',
    '/dashboard',
    '/myProfile',
    '/earn_badge',
    '/search_CVs',
    '/job_posting',
    '/learnAndEarn',
    '/certification',
    '/badgeOfHonour',
  ],
};
