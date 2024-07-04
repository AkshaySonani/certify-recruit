import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

const emailVerificationRequiredPaths = [
  '/job',
  '/exam',
  '/quiz',
  // '/dashboard',
  '/myProfile',
  '/earn_badge',
  '/search_CVs',
  '/job_posting',
  '/learnAndEarn',
  '/certification',
  '/badgeOfHonour',
];

export default withAuth(
  function middleware(req: any) {
    const token = req.nextauth.token;
    const { pathname, origin } = req.nextUrl;

    // Function to check if path is an authentication path
    const isAuthPath = (path: string) =>
      ['/login', '/signup', '/signup/signUpSuccess'].includes(path);
    console.log('token', token);

    // Check if user is authenticated
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
        } else if (emailVerificationRequiredPaths.includes(pathname)) {
          // If trying to access any other path not in emailVerificationRequiredPaths, redirect to /comingSoon
          const url = new URL('/comingSoon', origin);
          return NextResponse.redirect(url);
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
  ],
};
