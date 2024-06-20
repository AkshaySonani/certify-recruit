'use server';
import { Company, Job } from '@/models';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';

export const POST = async (req: NextResponse) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  try {
    await connect();
    const { userId, newStatus, name, email, role } = await req.json();

    if (!userId || !newStatus) {
      return NextResponse.json({
        status: 400,
        message: 'Missing required fields',
      });
    }

    // Build the update object
    const updateFields = {};
    if (newStatus) updateFields['users.$[user].stauts'] = newStatus;
    if (name) updateFields['users.$[user].name'] = name;
    if (email) updateFields['users.$[user].email'] = email;
    if (role) updateFields['users.$[user].role'] = role;

    // Find the company by user reference ID and update the user fields
    const company = await Company.findOneAndUpdate(
      { user_ref_id: session.user._id },
      { $set: updateFields },
      {
        arrayFilters: [{ 'user._id': new mongoose.Types.ObjectId(userId) }],
        new: true, // Return the updated document
      },
    );

    if (!company) {
      return NextResponse.json({
        status: 404,
        message: 'Company or user not found',
      });
    }

    return NextResponse.json({
      status: 200,
      data: company,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: 'An error occurred while updating the user.',
        error: error,
      },
      { status: 500 },
    );
  }
};
