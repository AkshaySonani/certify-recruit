'use server';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { Individual } from '@/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const session: any = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  try {
    await connect();
    const { role, skills, data_uploaded, Experience } = await req.json();

    const matchStage = {
      $match: {
        role: role ? new RegExp(`^${role}$`, 'i') : { $exists: true },
        skills: {
          $elemMatch: {
            $in: skills.map((skill: any) => new mongoose.Types.ObjectId(skill)),
          },
        },
      },
    };

    const addFieldsStage = {
      $addFields: {
        totalExperience: {
          $reduce: {
            input: '$total_experiences',
            initialValue: { years: 0, months: 0 },
            in: {
              years: { $add: ['$$value.years', '$$this.years'] },
              months: { $add: ['$$value.months', '$$this.month'] },
            },
          },
        },
      },
    };

    const lookupStage = {
      $lookup: {
        from: 'users', // Replace 'users' with your actual collection name for full document details
        localField: 'user_ref_id',
        foreignField: '_id',
        as: 'userDetails',
      },
    };

    const projectStage = {
      $project: {
        _id: 1,
        __v: 1,
        role: 1,
        skills: 1,
        resume: 1,
        createdAt: 1,
        updatedAt: 1,
        user_ref_id: 1,
        company_name: 1,
        total_experiences: 1,
        totalExperience: {
          years: {
            $add: [
              '$totalExperience.years',
              { $floor: { $divide: ['$totalExperience.months', 12] } },
            ],
          },
          months: { $mod: ['$totalExperience.months', 12] },
        },
        userDetails: { $arrayElemAt: ['$userDetails', 0] },
      },
    };

    const pipeline = [matchStage, addFieldsStage, lookupStage, projectStage];

    const results = await Individual.aggregate(pipeline);

    return NextResponse.json({
      status: 200,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while searching cvs.',
        error: error || 'Internal server error',
      },
      { status: 500 },
    );
  }
};
