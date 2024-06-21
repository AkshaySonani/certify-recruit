'use server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/models';
import { connect } from '@/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { token, newPassword } = await req.json();

    if (typeof token !== 'string' || typeof newPassword !== 'string') {
      return NextResponse.json(
        { message: 'Invalid input types' },
        { status: 400 },
      );
    }

    // Decode JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const { token: resetToken, email } = decoded;

    if (typeof resetToken !== 'string' || typeof email !== 'string') {
      return NextResponse.json(
        { message: 'Invalid token structure' },
        { status: 400 },
      );
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if token is valid and not expired
    const isTokenValid = await bcrypt.compare(
      resetToken,
      user.resetPasswordToken,
    );

    if (
      !user.resetPasswordToken ||
      user.resetPasswordToken === null ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires === null ||
      !isTokenValid ||
      user.resetPasswordExpires < Date.now()
    ) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 },
      );
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear reset token and expiration
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json(
      { message: 'Password has been reset.', status: 200 },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error resetting password:', error); // Log the specific error
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json({ message: 'Token expired' }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'An error occurred while resetting password.' },
      { status: 500 },
    );
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     await connect();
//     const { token, newPassword } = await req.json();

//     // Decode JWT
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//     const { token: resetToken, email } = decoded;

//     console.log('decoded', decoded);

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     // Check if token is valid and not expired
//     const isTokenValid = await bcrypt.compare(
//       resetToken,
//       user.resetPasswordToken,
//     );

//     if (!isTokenValid || user.resetPasswordExpires < Date.now()) {
//       return NextResponse.json(
//         { message: 'Invalid or expired token' },
//         { status: 400 },
//       );
//     }

//     // Hash the new password
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);

//     // Clear reset token and expiration
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     return NextResponse.json(
//       { message: 'Password has been reset.', status: 200 },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error('Error resetting password:', error); // Log the specific error
//     return NextResponse.json(
//       { message: 'An error occurred while resetting password.' },
//       { status: 500 },
//     );
//   }
// }
