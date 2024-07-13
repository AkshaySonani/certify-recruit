// 'use server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/service/AuthOptions';
// import { NextRequest, NextResponse } from 'next/server';

// import { decode, encode } from 'next-auth/jwt';
// const secret: any = process.env.NEXTAUTH_SECRET;
// export const POST = async (req: NextRequest) => {
//   const session: any = await getServerSession(authOptions);
//   if (!session?.user?._id) {
//     return NextResponse.json({
//       message: 'Unauthorized',
//       status: 401,
//     });
//   }

//   try {
//     const { count } = await req.json();
//     console.log('count', count);

//     let token = req?.cookies?.get('next-auth.session-token')?.value;
//     let decodedToken: any = await decode({ token, secret });
//     decodedToken = {
//       ...decodedToken,
//       profile_count: decodedToken?.profile_count + count,
//     };
//     const encodeToken = await encode({ decodedToken, secret });
//     const response = NextResponse.next();
//     response.cookies.set('next-auth.session-token', encodeToken, {
//       httpOnly: true,
//       secure: true,
//       path: '/',
//     });
//     return response;
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: 'An error occurred while update job.',
//         error: error,
//       },
//       { status: 500 },
//     );
//   }
// };

'use server';
import { User } from '@/models';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { decode, encode } from 'next-auth/jwt';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

const secret: any = process.env.NEXTAUTH_SECRET;

export const POST = async (req: NextRequest) => {
  const session: any = await getServerSession(authOptions);

  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  try {
    const { count } = await req.json();

    const token =
      req.cookies.get('next-auth.session-token')?.value ||
      req.cookies.get('__Secure-next-auth.session-token')?.value;

    if (!token) {
      return NextResponse.json({
        message: 'Token not found',
        status: 401,
      });
    }

    let decodedToken = await decode({ token, secret });
    decodedToken = {
      ...decodedToken,
      profile_count: count,
      // profile_count: (decodedToken?.profile_count || 0) + count,
    };

    const encodedToken = await encode({ token: decodedToken, secret });

    // Connect to the database
    await connect();

    // Update the user profile_count in the database
    await User.findByIdAndUpdate(decodedToken?._id, { profile_count: count });

    const response = NextResponse.json({
      message: 'Profile count updated successfully',
      status: 200,
    });

    response.cookies.set('next-auth.session-token', encodedToken, {
      httpOnly: true,
      secure: true,
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'An error occurred while updating profile count.',
        error: error.message,
      },
      { status: 500 },
    );
  }
};
