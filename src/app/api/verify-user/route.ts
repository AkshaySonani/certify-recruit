'use server';
import jwt from 'jsonwebtoken';
import User from '@/models/user';
import { connect } from '@/db/mongodb';
import { decode, encode } from 'next-auth/jwt';
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

// const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);
// const { userId } = decoded;

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
const secret: any = process.env.NEXTAUTH_SECRET;
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({
        status: 400,
        message: 'Invalid or missing token.',
      });
    }

    const queryToken: any = jwt.verify(
      token as string,
      process.env.JWT_SECRET!,
    );

    // Connect to the database
    await connect();

    // Update the user profile_count in the database
    const user = await User.findByIdAndUpdate(queryToken?.userId, {
      isVerified: true,
    });

    if (!user) {
      return NextResponse.json({ status: 400, message: 'User not found.' });
    }

    if (user?.isVerified) {
      return NextResponse.json({
        status: 409,
        message: 'User is already verified.',
      });
    } else {
      const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token';
      let currentToken = req.cookies.get(sessionCookie)?.value;

      let decodedToken = await decode({ token: currentToken, secret });
      console.log('Decoded token:', decodedToken);

      decodedToken = {
        ...decodedToken,
        isVerified: true,
      };

      const encodedToken = await encode({ token: decodedToken, secret });
      console.log('Encoded token:', encodedToken);

      var response = NextResponse.json({
        data: user,
        status: 200,
        message: 'User verified successfully',
      });

      response.cookies.set(sessionCookie, encodedToken, {
        httpOnly: true,
        secure: true,
        path: '/',
      });
    }

    return response;
  } catch (error) {
    console.log('Verification error:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal server error from backend.',
    });
  }
}
// export async function POST(req: NextRequest) {
//   try {
//     const { token } = await req.json();
//     console.log('🚀 ~ POST ~ token:', token);

//     const sessionCookie = process.env.NEXTAUTH_URL?.startsWith('https://')
//       ? '__Secure-next-auth.session-token'
//       : 'next-auth.session-token';

// if (!token) {
//   return NextResponse.json({
//     status: 400,
//     message: 'Invalid or missing token.',
//   });
// }

//     const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);
//     console.log('🚀 ~ POST ~ decoded:', decoded);

//     const { userId } = decoded;

//     await connect();

// const user = await User.findById(userId);

// if (!user) {
//   return NextResponse.json({ status: 400, message: 'User not found.' });
// }

// if (user.isVerified) {
//   return NextResponse.json({
//     status: 400,
//     message: 'User is already verified.',
//   });
// }

// user.isVerified = true;
// await user.save();

//     const response = NextResponse.json({
//       data: user,
//       status: 200,
//       message: 'User verified successfully.',
//     });

//     const currentToken = response.cookies.get(sessionCookie);
//     console.log('🚀 ~ POST ~ currentToken:', currentToken);

//     const encodedToken = await encode({
//       token: { ...currentToken, isVerified: true },
//       secret: process.env.JWT_SECRET!,
//     });

//     response.cookies.set(sessionCookie, encodedToken, {
//       httpOnly: true,
//       secure: true,
//       path: '/',
//     });

//     return NextResponse.json({
//       data: user,
//       status: 200,
//       message: 'User verified successfully.',
//     });

//     // console.log(`updated user----->`, user);

//     // const params = new URLSearchParams({ isVerified: 'true' }).toString();
//     // const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?${params}`;

//     // console.log(`redirectUrl ---->`, redirectUrl);
//     // const res = NextResponse.redirect(redirectUrl, { status: 301 });
//     // return res;
//   } catch (error) {
//     console.log('Verification error:', error);
//     return NextResponse.json({
//       status: 500,
//       message: 'Internal server error from backend.',
//     });
//   }
// }

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     console.log(`new URL(req.url)----->`, new URL(req.url));
//     const token = searchParams.get('token');
//     console.log(`token----->`, token);

//     if (!token) {
//       return NextResponse.json({
//         status: 400,
//         message: 'Invalid or missing token.',
//       });
//     }

//     const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);
//     console.log(`decoded----->`, decoded);
//     const { userId } = decoded;
//     console.log(`userId----->`, userId);

//     await connect();

//     const user = await User.findById(userId);
//     console.log(`user----->`, user);
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

//     console.log(`updated user----->`, user);

//     const params = new URLSearchParams({ isVerified: 'true' }).toString();
//     const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?${params}`;

//     console.log(`redirectUrl ---->`, redirectUrl);
//     const res = NextResponse.redirect(redirectUrl, { status: 301 });
//     return res;
//   } catch (error) {
//     console.log('Verification error:', error);
//     return NextResponse.json({
//       status: 500,
//       message: 'Internal server error from backend.',
//     });
//   }
// }
