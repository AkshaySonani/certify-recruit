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

    const inviteUrl = `${process.env.NEXT_PUBLIC_BASE_URL}signup`;

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
