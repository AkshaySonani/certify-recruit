'use server';
import jwt from 'jsonwebtoken';
import { connect } from '@/db/mongodb';
import { transporter } from '@/config/nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { email } = await req.json();

    // Create JWT
    const inviteToken = jwt.sign(
      { email },
      process.env.JWT_SECRET!,
      { expiresIn: '2d' }, // Token valid for 2 days
    );

    const inviteUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/invite?token=${inviteToken}`;

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL,
      to: email,
      subject: 'You are invited',
      text: `You are invited to join. Please click the following link to accept the invitation: ${inviteUrl}`,
      html: `<p>You are invited to join. Please click the following link to accept the invitation:</p><a href="${inviteUrl}">${inviteUrl}</a>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Invitation link sent to the user.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error sending invitation email:', error); // Log the specific error
    return NextResponse.json(
      { message: 'Failed to send invitation email' },
      { status: 500 },
    );
  }
}
