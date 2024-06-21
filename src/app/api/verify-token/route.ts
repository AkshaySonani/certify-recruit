'use server';
import jwt from 'jsonwebtoken';
import { connect } from '@/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  await connect();
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({
      message: 'Token is required',
      status: 400,
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Token is valid, return success response
    return NextResponse.json({
      message: 'Token is valid',
      status: 200,
      data: decoded,
    });
  } catch (error) {
    // Token is invalid or expired
    return NextResponse.json({
      message: 'Invalid or expired token',
      status: 401,
    });
  }
}
