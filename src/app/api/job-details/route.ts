'use server';
import Job from '@/models/job';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?._id) {
    return NextResponse.json({
      message: 'Unauthorized',
      status: 401,
    });
  }

  try {
    await connect();
    const { job_id } = await req.json();

    const jobDetails = await Job.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(job_id),
        },
      },
      {
        $lookup: {
          from: 'jobapplications',
          localField: '_id',
          foreignField: 'job_id',
          as: 'applicants',
        },
      },
      {
        $unwind: {
          path: '$applicants',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'companies',
          localField: 'applicants.user_id',
          foreignField: '_id',
          as: 'company_info',
        },
      },
      {
        $lookup: {
          from: 'individuals',
          localField: 'applicants.user_id',
          foreignField: '_id',
          as: 'individual_info',
        },
      },
      {
        $addFields: {
          'applicants.user_info': {
            $cond: {
              if: { $gt: [{ $size: '$company_info' }, 0] },
              then: { $arrayElemAt: ['$company_info', 0] },
              else: { $arrayElemAt: ['$individual_info', 0] },
            },
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          job: { $first: '$$ROOT' },
          applicants: { $push: '$applicants' },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$job', { applicants: '$applicants' }],
          },
        },
      },
      {
        $lookup: {
          from: 'states',
          localField: 'state',
          foreignField: '_id',
          as: 'state_info',
        },
      },
      {
        $lookup: {
          from: 'countries',
          localField: 'country',
          foreignField: '_id',
          as: 'country_info',
        },
      },
      {
        $lookup: {
          from: 'cities',
          localField: 'city',
          foreignField: '_id',
          as: 'city_info',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'skills',
          foreignField: '_id',
          as: 'skill_info',
        },
      },
      {
        $addFields: {
          city: {
            _id: { $arrayElemAt: ['$city_info._id', 0] },
            name: { $arrayElemAt: ['$city_info.name', 0] },
          },
          state: {
            _id: { $arrayElemAt: ['$state_info._id', 0] },
            name: { $arrayElemAt: ['$state_info.name', 0] },
          },
          country: {
            _id: { $arrayElemAt: ['$country_info._id', 0] },
            name: { $arrayElemAt: ['$country_info.name', 0] },
          },
          skills: {
            _id: { $arrayElemAt: ['$skill_info._id', 0] },
            category: { $arrayElemAt: ['$skill_info.category', 0] },
            subcategory: { $arrayElemAt: ['$skill_info.subcategory', 0] },
          },
        },
      },
      {
        $project: {
          city_info: 0,
          skill_info: 0,
          state_info: 0,
          country_info: 0,
          company_info: 0,
          individual_info: 0,
        },
      },
    ]);

    return NextResponse.json({
      status: 200,
      data: jobDetails,
      message: 'Job get successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while getting job details.',
        error: error,
      },
      { status: 500 },
    );
  }
};

// export const POST = async (req: NextRequest) => {
//   const session = await getServerSession(authOptions);
//   // if (!session?.user?._id) {
//   //   return NextResponse.json({
//   //     message: 'Unauthorized',
//   //     status: 401,
//   //   });
//   // }

//   try {
//     await connect();
//     const { job_id } = await req.json();

//     const jobDetails = await Job.aggregate([
//       {
//         $match: {
//           _id: new mongoose.Types.ObjectId(job_id),
//         },
//       },
//       {
//         $lookup: {
//           from: 'jobapplications',
//           localField: '_id',
//           foreignField: 'job_id',
//           as: 'applicants',
//         },
//       },
//       {
//         $lookup: {
//           from: 'states',
//           localField: 'state',
//           foreignField: '_id',
//           as: 'state_info',
//         },
//       },
//       {
//         $lookup: {
//           from: 'countries',
//           localField: 'country',
//           foreignField: '_id',
//           as: 'country_info',
//         },
//       },
//       {
//         $lookup: {
//           from: 'cities',
//           localField: 'city',
//           foreignField: '_id',
//           as: 'city_info',
//         },
//       },
//       {
//         $lookup: {
//           from: 'categories',
//           localField: 'skills',
//           foreignField: '_id',
//           as: 'skill_info',
//         },
//       },
//       {
//         $addFields: {
//           city: {
//             _id: { $arrayElemAt: ['$city_info._id', 0] },
//             name: { $arrayElemAt: ['$city_info.name', 0] },
//           },
//           state: {
//             _id: { $arrayElemAt: ['$state_info._id', 0] },
//             name: { $arrayElemAt: ['$state_info.name', 0] },
//           },
//           country: {
//             _id: { $arrayElemAt: ['$country_info._id', 0] },
//             name: { $arrayElemAt: ['$country_info.name', 0] },
//           },
//           skills: {
//             _id: { $arrayElemAt: ['$skill_info._id', 0] },
//             category: { $arrayElemAt: ['$skill_info.category', 0] },
//             subcategory: { $arrayElemAt: ['$skill_info.subcategory', 0] },
//           },
//         },
//       },
//       {
//         $project: {
//           city_info: 0,
//           skill_info: 0,
//           state_info: 0,
//           country_info: 0,
//         },
//       },
//     ]);

//     return NextResponse.json({
//       status: 200,
//       data: jobDetails,
//       message: 'Job get successfully',
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: 'An error occurred while getting job details.',
//         error: error,
//       },
//       { status: 500 },
//     );
//   }
// };
