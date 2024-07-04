'use server';
import jwt from 'jsonwebtoken';
import User from '@/models/user';
import { connect } from '@/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';

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

    // Create a new token with the updated isVerified status
    const newToken = jwt.sign(
      { userId: user._id, isVerified: true },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }, // Adjust the token expiration as needed
    );

    const params = new URLSearchParams({
      isVerified: 'true',
      token: newToken, // Send the new token back to the client
    }).toString();

    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/signup/signUpSuccess?${params}`;
    console.log('Redirecting to:', redirectUrl);

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal server error.',
    });
  }
}
