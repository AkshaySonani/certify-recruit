'use server';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connect } from '@/db/mongodb';
import Helpers from '@/service/api-helpers';
import { NextRequest, NextResponse } from 'next/server';

const handler = async (req: NextRequest) => {
  const helpers = new Helpers();
  try {
    await connect();
    const { email, password } = await req.json();
    // Find user by email
    const user = await User.findOne({ email: email }).select('+password');
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check password
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 402 },
      );
    }

    const response = NextResponse.json({
      status: 201,
      data: {
        _id: user._id,
        role: user.role,
        email: user.email,
        phone: user.phone,
        status: user.status,
        profile_picture: user.profile_picture,
      },
      message: 'User successfully logged in',
      access_token: await helpers.generateToken(user._id),
    });

    response.cookies.set('token', await helpers.generateToken(user._id));
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while the user was login.',
        error: error,
      },
      { status: 500 },
    );
  }
};

export { handler as POST };
