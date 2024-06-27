'use server';
import { Pricing, User } from '@/models';
import { connect } from '@/db/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import mongoose from 'mongoose';

export async function POST(req: NextResponse) {
  const session: any = await getServerSession(authOptions);
  // if (!session?.user?._id) {
  //   return NextResponse.json({
  //     message: 'Unauthorized',
  //     status: 401,
  //   });
  // }

  const userId = '667da45b1fc2d2db5b2165ce'; // Replace this with session?.user?._id for real session
  const userDetails = await User.findById(userId);
  // const userDetails = await User.findById(session?.user?._id);

  try {
    // Parse the request body for plan details
    const { plan_id } = await req.json();

    // Update user subscription data
    await User.findByIdAndUpdate(
      userDetails._id, // Use the direct user ID here
      {
        $set: {
          'subscription.plan_id': plan_id,
          'subscription.updatedAt': new Date(Date.now()),
        },
        $setOnInsert: {
          'subscription.createdAt': new Date(Date.now()),
        },
      },
      { upsert: true, new: true }, // Ensure upsert is enabled and return the new document
    );

    return NextResponse.json({ message: 'Subscription updated successfully' });
  } catch (error: any) {
    console.error('Error updating subscription:', error);
    return NextResponse.json(
      {
        message: 'An error occurred while updating the subscription.',
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// export const POST = async (req: NextRequest) => {
//   try {
//     await connect();
//     const {
//       plan_type,
//       plan_name,
//       plan_pricing,
//       is_popular,
//       max_posts,
//       max_searches,
//       additional_features,
//     } = await req.json();
//     const price = await Pricing.create({
//       plan_type,
//       plan_name,
//       plan_pricing,
//       is_popular,
//       max_posts,
//       max_searches,
//       additional_features,
//     });
//     return NextResponse.json({
//       status: 200,
//       data: price,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: 'An error occurred while creating pricing.',
//         error: error,
//       },
//       { status: 500 },
//     );
//   }
// };
