'use server';
// import { User } from '@/models';
// import { connect } from '@/db/mongodb';
// import { transporter } from '@/config/nodemailer';
// import { NextRequest, NextResponse } from 'next/server';
// import { generateToken, hashToken } from '@/service/Helper';

// export async function POST(req: NextRequest) {
//   try {
//     await connect();
//     const { email } = await req.json();

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     // Generate and hash token
//     const token = generateToken();
//     const hashedToken = await hashToken(token);

//     // Save hashed token and expiration date to user
//     user.resetPasswordToken = hashedToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}resetpassword?token=${token}&email=${email}`;

//     const mailOptions = {
//       from: process.env.NEXT_PUBLIC_EMAIL,
//       to: email,
//       subject: 'Password Reset Request',
//       text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
//       html: `<p>You requested a password reset. Please click the following link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json(
//       { message: 'Password reset link send on your email.' },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error('Error sending email:', error); // Log the specific error
//     return NextResponse.json(
//       { message: 'Failed to Send Email' },
//       { status: 500 },
//     );
//   }
// }

import jwt from 'jsonwebtoken';
import { User } from '@/models';
import { connect } from '@/db/mongodb';
import { transporter } from '@/config/nodemailer';
import { NextRequest, NextResponse } from 'next/server';
import { generateToken, hashToken } from '@/service/Helper';

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { email } = await req.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Generate and hash token
    const token = generateToken();
    const hashedToken = await hashToken(token);

    // Save hashed token and expiration date to user
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Create JWT
    const resetToken = jwt.sign({ token, email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/resetpassword?token=${resetToken}`;

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
      html: `<p>You requested a password reset. Please click the following link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Password reset link sent to your email.', status: 200 },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending email:', error); // Log the specific error
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 },
    );
  }
}
