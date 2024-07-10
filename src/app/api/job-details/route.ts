'use server';
import Job from '@/models/job';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';
import { Individual } from '@/models';

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
    const { job_id } = await req.json();

    const jobDetails = await Job.aggregate([
      // Match the job document
      {
        $match: {
          _id: new mongoose.Types.ObjectId(job_id),
        },
      },
      // Lookup job applications
      {
        $lookup: {
          from: 'jobapplications',
          localField: '_id',
          foreignField: 'job_id',
          as: 'applicants',
        },
      },
      // Unwind applicants array
      {
        $unwind: {
          path: '$applicants',
          preserveNullAndEmptyArrays: true,
        },
      },
      // Lookup user information
      {
        $lookup: {
          from: 'users',
          localField: 'applicants.user_id',
          foreignField: '_id',
          as: 'user_info',
        },
      },
      // Add user information to the document
      {
        $addFields: {
          'applicants.user_info': {
            $arrayElemAt: ['$user_info', 0],
          },
        },
      },
      // Group by job ID to aggregate applicants
      {
        $group: {
          _id: '$_id',
          job: { $first: '$$ROOT' },
          applicants: { $push: '$applicants' },
        },
      },
      // Replace the root document with the merged job and applicants
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$job', { applicants: '$applicants' }],
          },
        },
      },
      // Lookup location and skills information
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
      // Add location and skills information to the document
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
      // Exclude unnecessary fields from the final result
      {
        $project: {
          city_info: 0,
          skill_info: 0,
          state_info: 0,
          country_info: 0,
          user_info: 0,
        },
      },
    ]);

    // Check if the user has applied
    const applied =
      jobDetails.length > 0 &&
      jobDetails[0]?.applicants.some(
        (applicant: any) =>
          new mongoose.Types.ObjectId(applicant.user_id).toString() ===
          new mongoose.Types.ObjectId(session?.user?._id).toString(),
      );

    return NextResponse.json({
      status: 200,
      data: { ...jobDetails[0], applied },
      message: 'Job retrieved successfully',
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
//   if (!session?.user?._id) {
//     return NextResponse.json({
//       message: 'Unauthorized',
//       status: 401,
//     });
//   }

//   try {
//     await connect();
//     const { job_id } = await req.json();

//     const userId = await Individual.findOne({
//       user_ref_id: session?.user?._id,
//     });

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
//         $unwind: {
//           path: '$applicants',
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $lookup: {
//           from: 'companies',
//           localField: 'applicants.user_id',
//           foreignField: '_id',
//           as: 'company_info',
//         },
//       },
//       {
//         $lookup: {
//           from: 'individuals',
//           localField: 'applicants.user_id',
//           foreignField: '_id',
//           as: 'individual_info',
//         },
//       },
//       {
//         $addFields: {
//           'applicants.user_info': {
//             $cond: {
//               if: { $gt: [{ $size: '$company_info' }, 0] },
//               then: { $arrayElemAt: ['$company_info', 0] },
//               else: { $arrayElemAt: ['$individual_info', 0] },
//             },
//           },
//         },
//       },
//       {
//         $group: {
//           _id: '$_id',
//           job: { $first: '$$ROOT' },
//           applicants: { $push: '$applicants' },
//         },
//       },
//       {
//         $replaceRoot: {
//           newRoot: {
//             $mergeObjects: ['$job', { applicants: '$applicants' }],
//           },
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
//           company_info: 0,
//           individual_info: 0,
//         },
//       },
//     ]);

//     // Check if the user has applied
//     const applied =
//       jobDetails.length > 0 &&
//       new mongoose.Types.ObjectId(
//         jobDetails[0]?.applicants[0]?.user_id,
//       ).toString() === new mongoose.Types.ObjectId(userId?._id).toString();

//     return NextResponse.json({
//       status: 200,
//       data: { ...jobDetails[0], applied },
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
