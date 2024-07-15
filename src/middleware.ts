import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { encode, decode } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';

const emailVerificationRequiredPaths = [
  // '/job',
  '/BGV',
  // '/exam',
  '/quiz',
  '/users',
  '/earn_badge',
  '/search_CVs',
  // '/job_posting',
  '/learnAndEarn',
  // '/certification',
  '/badgeOfHonour',
];
const profileCompletionRequiredPaths = [
  '/job',
  '/BGV',
  '/exam',
  '/quiz',
  '/users',
  '/pricing',
  '/earn_badge',
  '/search_CVs',
  '/job_posting',
  '/learnAndEarn',
  '/certification',
  '/badgeOfHonour',
  '/job/:path*',
];

export default withAuth(
  async function middleware(req: any) {
    const { pathname, origin, searchParams } = req.nextUrl;

    const secret: any = process.env.NEXTAUTH_SECRET;
    let token = req.nextauth.token;
    const queryToken = searchParams.get('token');

    const testToken: any = jwt.decode(queryToken as string);

    if (queryToken && testToken?.isVerified) {
      token = { ...token, isVerified: true };
      req.nextauth.token = token;
      const newToken = await encode({ token, secret });
      const response = NextResponse.next();

      // const response = NextResponse.redirect(new URL('/dashboard', origin));
      const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token';
      response.cookies.set(sessionCookie, newToken, {
        httpOnly: true,
        secure: true,
        path: '/',
      });
      return response;
    }

    const isAuthPath = (path: string) => ['/login', '/signup'].includes(path);
    if (!token) {
      // If not authenticated, redirect to login
      if (!isAuthPath(pathname)) {
        return NextResponse.redirect(`${origin}/login`);
      }
    } else {
      // User is authenticated
      if (!token.isVerified) {
        // If authenticated but not verified, redirect to signUpSuccess
        if (pathname !== '/signup/signUpSuccess') {
          const url = new URL('/signup/signUpSuccess', origin);
          return NextResponse.redirect(url);
        }
      } else {
        // If authenticated and verified
        if (pathname === '/login' || pathname === '/signup') {
          // If trying to access login or signup, redirect to dashboard
          return NextResponse.redirect(`${origin}/dashboard`);
        } else if (
          emailVerificationRequiredPaths.includes(pathname) &&
          token.profile_count !== 0
        ) {
          // If trying to access paths requiring verification, allow access
          const url = new URL('/comingSoon', origin);
          return NextResponse.redirect(url);
        } else if (
          profileCompletionRequiredPaths.includes(pathname) &&
          token.profile_count === 0
        ) {
          // If trying to access paths requiring verification, allow access
          return NextResponse.redirect(`${origin}/dashboard`);
        }
      }
    }

    // Allow access if none of the conditions are met (authenticated and verified)
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized() {
        return true; // Assuming this callback allows all requests by default
      },
    },
  },
);

export const config = {
  matcher: [
    '/job',
    '/BGV',
    '/exam',
    '/quiz',
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
    '/signup/signUpSuccess:path',
    '/job/:path*',
    '/job_posting/:path*',
  ],
};

// import { NextResponse } from 'next/server';
// import { withAuth } from 'next-auth/middleware';
// import { encode } from 'next-auth/jwt';
// import jwt from 'jsonwebtoken';

// const emailVerificationRequiredPaths = [
//   '/BGV',
//   '/quiz',
//   '/users',
//   '/earn_badge',
//   '/search_CVs',
//   '/learnAndEarn',
//   '/badgeOfHonour',
// ];
// const profileCompletionRequiredPaths = [
//   '/job',
//   '/BGV',
//   '/exam',
//   '/quiz',
//   '/users',
//   '/pricing',
//   '/earn_badge',
//   '/search_CVs',
//   '/job_posting',
//   '/learnAndEarn',
//   '/certification',
//   '/badgeOfHonour',
//   '/job/:path*',
// ];

// export default withAuth(
//   async function middleware(req: any) {
//     const { pathname, origin, searchParams } = req.nextUrl;

//     const secret: any = process.env.NEXTAUTH_SECRET;
//     let token = req.nextauth.token;
//     const isVerified = searchParams.get('isVerified') === 'true';
//     console.log('🚀 ~ middleware ~ isVerified:', isVerified);

//     const token1: any = searchParams.get('token');
//     console.log('isVerified----->', token1);

//     const jwtSecret: any = process.env.JWT_SECRET; // Ensure this is the correct secret

//     // Decode the token
//     const decoded: any = jwt.decode(token1);
//     console.log('Decoded without verification:', decoded);

//     if (isVerified || decoded?.isVerified) {
//       if (token && !token.isVerified) {
//         token.isVerified = true;
//         req.nextauth.token = token;
//         const newToken = await encode({ token, secret });

//         const response = NextResponse.redirect(new URL('/dashboard', origin));
//         const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
//           ? '__Secure-next-auth.session-token'
//           : 'next-auth.session-token';
//         response.cookies.set(sessionCookie, newToken, {
//           httpOnly: true,
//           secure: true,
//           path: '/',
//         });
//         return response;
//       }
//     }

//     const isAuthPath = (path: string) => ['/login', '/signup'].includes(path);
//     if (!token) {
//       if (!isAuthPath(pathname)) {
//         return NextResponse.redirect(`${origin}/login`);
//       }
//     } else {
//       if (!token.isVerified) {
//         if (pathname !== '/signup/signUpSuccess') {
//           const url = new URL('/signup/signUpSuccess', origin);
//           return NextResponse.redirect(url);
//         }
//       } else {
//         if (pathname === '/login' || pathname === '/signup') {
//           return NextResponse.redirect(`${origin}/dashboard`);
//         } else if (
//           emailVerificationRequiredPaths.includes(pathname) &&
//           token.profile_count !== 0
//         ) {
//           const url = new URL('/comingSoon', origin);
//           return NextResponse.redirect(url);
//         } else if (
//           profileCompletionRequiredPaths.includes(pathname) &&
//           token.profile_count === 0
//         ) {
//           return NextResponse.redirect(`${origin}/dashboard`);
//         }
//       }
//     }

//     return NextResponse.next();
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
//     '/BGV',
//     '/exam',
//     '/quiz',
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
//     '/signup/signUpSuccess:path',
//     '/job/:path*',
//     '/job_posting/:path*',
//   ],
// };
