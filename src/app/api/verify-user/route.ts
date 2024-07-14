'use server';
import jwt from 'jsonwebtoken';
import User from '@/models/user';
import { connect } from '@/db/mongodb';
import { encode } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
//       ? '__Secure-next-auth.session-token'
//       : 'next-auth.session-token';

//     const token = searchParams.get('token');

//     if (!token) {
//       return NextResponse.json({
//         status: 400,
//         message: 'Invalid or missing token.',
//       });
//     }

//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//     const { userId } = decoded;

//     await connect();

//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ status: 400, message: 'User not found.' });
//     }

//     if (user.isVerified) {
//       return NextResponse.json({
//         status: 400,
//         message: 'User is already verified.',
//       });
//     }

//     user.isVerified = true;
//     await user.save();

//     const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}dashboard`;

//     const newToken = await encode({
//       token: { ...decoded, isVerified: true },
//       secret: process.env.JWT_SECRET!,
//     });

//     const res = NextResponse.redirect(redirectUrl, { status: 301 });
//     res.cookies.set(sessionCookie, newToken, {
//       httpOnly: true,
//       secure: process.env.NEXTAUTH_URL?.startsWith('https://'),
//       path: '/',
//     });
//     console.log('token updated', newToken);

//     return res;
//   } catch (error) {
//     console.error('Verification error:', error);
//     return NextResponse.json({
//       status: 500,
//       message: 'Internal server error.',
//     });
//   }
// }

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
//       ? '__Secure-next-auth.session-token'
//       : 'next-auth.session-token';

//     const token = searchParams.get('token');

//     if (!token) {
//       return NextResponse.json({
//         status: 400,
//         message: 'Invalid or missing token.',
//       });
//     }

//     const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);
//     const { userId } = decoded;

//     await connect();

//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ status: 400, message: 'User not found.' });
//     }

//     if (user.isVerified) {
//       return NextResponse.json({
//         status: 400,
//         message: 'User is already verified.',
//       });
//     }

//     user.isVerified = true;
//     await user.save();

//     const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}dashboard`;

//     const encodedToken = await encode({
//       token: { ...decoded, isVerified: true },
//       secret: process.env.JWT_SECRET!,
//     });

//     const res = NextResponse.redirect(redirectUrl, { status: 301 });
//     res.cookies.set(sessionCookie, encodedToken);
//     console.log('token updated', encodedToken);

//     return res;
//   } catch (error) {
//     console.error('Verification error:', error);
//     return NextResponse.json({
//       status: 500,
//       message: 'Internal server error.',
//     });
//   }
// }

// ---------------------> old code <-----------------------------

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({
        status: 400,
        message: 'Invalid or missing token.',
      });
    }

    const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);
    const { userId } = decoded;

    await connect();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ status: 400, message: 'User not found.' });
    }

    if (user.isVerified) {
      return NextResponse.json({
        status: 400,
        message: 'User is already verified.',
      });
    }

    user.isVerified = true;
    await user.save();

    const params = new URLSearchParams({ isVerified: 'true' }).toString();
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?${params}`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal server error.',
    });
  }
}
