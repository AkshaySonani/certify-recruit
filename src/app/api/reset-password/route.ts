'use server';
// import bcrypt from 'bcryptjs';
// import { User } from '@/models';
// import { connect } from '@/db/mongodb';
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   try {
//     await connect();
//     const { token, email, newPassword } = await req.json();

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     // Check if token is valid and not expired
//     const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
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
//       { message: 'Password has been reset.' },
//       { status: 200 },
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'An error occurred while reset password.' },
//       { status: 500 },
//     );
//   }
// }

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/models';
import { connect } from '@/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { token, newPassword } = await req.json();

    // Decode JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const { token: resetToken, email } = decoded;

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

    if (!isTokenValid || user.resetPasswordExpires < Date.now()) {
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
    return NextResponse.json(
      { message: 'An error occurred while resetting password.' },
      { status: 500 },
    );
  }
}
