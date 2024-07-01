'use server';
import { ContactUs } from '@/models';
import { connect } from '@/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    await connect();
    const { firstName, lastName, email, message } = await req.json();
    await ContactUs.create({
      firstName,
      lastName,
      email,
      message,
    });
    return NextResponse.json({
      status: 200,
      message: 'Message sent successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while sending message.',
        error: error,
      },
      { status: 500 },
    );
  }
};
