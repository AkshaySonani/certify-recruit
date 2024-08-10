'use server';
import jwt from 'jsonwebtoken';
import { User } from '@/models';
import { connect } from '@/db/mongodb';
import { transporter } from '@/config/nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { email, categoryIds } = await req.json();

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Create JWT
    const examToken = jwt.sign({ email, categoryIds }, process.env.JWT_SECRET!);

    // Save exam token to user
    user.examToken = examToken;
    await user.save();

    const examUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/exam?token=${examToken}`;

    const mailOptions = {
      to: email,
      subject: 'Your Exam Link',
      from: process.env.NEXT_PUBLIC_EMAIL,
      text: `Please click the following link to take your exam: ${examUrl}`,
      html: `<p>Please click the following link to take your exam:</p><a href="${examUrl}">${examUrl}</a>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Exam link sent to the user.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending exam link email:', error); // Log the specific error
    return NextResponse.json(
      { message: 'Failed to send exam link email' },
      { status: 500 },
    );
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     await connect();
//     const { email, categoryIds } = await req.json();

//     // Find user by email or create a new user document
//     let user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     // Create JWT
//     const examToken = jwt.sign(
//       { email, categoryIds },
//       process.env.JWT_SECRET!,
//       { expiresIn: '2h' }, // Token valid for 2 hours
//     );

//     // Save exam token and expiration date to user
//     user.examToken = examToken;
//     user.examExpires = Date.now() + 2 * 3600000; // 2 hours
//     await user.save();

//     const examUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/exam?token=${examToken}`;

//     const mailOptions = {
//       from: process.env.NEXT_PUBLIC_EMAIL,
//       to: email,
//       subject: 'Your Exam Link',
//       text: `Please click the following link to take your exam: ${examUrl}`,
//       html: `<p>Please click the following link to take your exam:</p><a href="${examUrl}">${examUrl}</a>`,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json(
//       { message: 'Exam link sent to the user.' },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error('Error sending exam link email:', error); // Log the specific error
//     return NextResponse.json(
//       { message: 'Failed to send exam link email' },
//       { status: 500 },
//     );
//   }
// }
