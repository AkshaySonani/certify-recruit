// import { NextResponse } from 'next/server';
// import { withAuth } from 'next-auth/middleware';

// export default withAuth(
//   function middleware(req: any) {
//     const token = req.nextauth.token;
//     const { pathname, origin } = req.nextUrl;
//     const isAuthPaths = (path: any) =>
//       ['/login', '/signup'].some((e) => path.includes(e));
//     if (pathname.includes('api/auth') || token) {
//       if (pathname === '/login' || pathname === '/signup') {
//         return NextResponse.redirect(`${origin}/dashboard`);
//       } else {
//         return NextResponse.next();
//       }
//     }
//     if (!token && !isAuthPaths(pathname)) {
//       return NextResponse.redirect(`${origin}/login`);
//     }
//   },
//   {
//     callbacks: {
//       authorized() {
//         return true;
//       },
//     },
//   },
// );
// export const config = {
//   matcher: [
//     '/job',
//     '/exam',
//     '/login',
//     '/users',
//     '/signup',
//     '/pricing',
//     '/dashboard',
//     '/myProfile',
//     '/earn_badge',
//     '/search_CVs',
//     '/job_posting',
//     '/learnAndEarn',
//     '/certification',
//     '/badgeOfHonour',
//   ],
// };

import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req: any) {
    const token = req.nextauth.token;
    const { pathname, origin } = req.nextUrl;
    const isAuthPaths = [
      '/aboutUs',
      '/contactUs',
      '/expert_talk',
      '/features',
      '/privacy_policy',
      '/refund_policy',
      '/terms_of_use',
      '/',
    ];

    if (!isAuthPaths.includes(pathname)) {
      console.log('hello');
      const url = new URL('/comingSoon', origin);
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
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
    '/quiz',

    // Add other paths here if necessary
  ],
};
