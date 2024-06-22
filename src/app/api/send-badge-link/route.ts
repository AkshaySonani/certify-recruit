'use server';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { transporter } from '@/config/nodemailer';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session: any = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  try {
    await connect();
    const { email } = await req.json();

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL,
      to: email,
      subject: 'Send Email From Badge',
      text: 'Hello world',
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Link sent to the user.' },
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
