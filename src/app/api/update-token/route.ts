'use server';
import { connect } from '@/db/mongodb';
import { JobApplication } from '@/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

import { decode, encode } from 'next-auth/jwt';
const secret = process.env.NEXTAUTH_SECRET;
export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  try {
    const { count } = await req.json();
    let token = req?.cookies?.get('next-auth.session-token')?.value;
    let decodedToken = await decode({ token, secret });
    decodedToken = {
      ...decodedToken,
      profile_count: decodedToken?.profile_count + count,
    };
    const encodeToken = await encode({ decodedToken, secret });
    const response = NextResponse.next();
    response.cookies.set('next-auth.session-token', encodeToken, {
      httpOnly: true,
      secure: true,
      path: '/',
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while update job.',
        error: error,
      },
      { status: 500 },
    );
  }
};
