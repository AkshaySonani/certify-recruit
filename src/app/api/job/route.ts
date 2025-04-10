'use server';
import Job from '@/models/job';
import mongoose from 'mongoose';
import { User } from '@/models';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';
import { calculateExpirationDate } from '@/service/Helper';

// export const POST = async (req: NextRequest) => {
//   const session: any = await getServerSession(authOptions);
//   if (!session?.user?._id) {
//     return NextResponse.json({
//       message: 'Unauthorized',
//       status: 401,
//     });
//   }

//   try {
//     await connect();
//     const {
//       area,
//       city,
//       title,
//       state,
//       status,
//       skills,
//       job_id,
//       pincode,
//       vacancy,
//       country,
//       workplace,
//       job_types,
//       company_id,
//       salary_pay,
//       description,
//       hourly_rate,
//       salary_upto,
//       company_name,
//       interviewTime,
//       street_address,
//       salary_started,
//       working_schedule,
//       is_hiring_manager,
//       salary_negotiable,
//     } = await req.json();

//     let reqData: any = {};

//     area && (reqData.area = area);
//     city && (reqData.city = city);
//     title && (reqData.title = title);
//     state && (reqData.state = state);
//     job_id && (reqData.job_id = job_id);
//     status && (reqData.status = status);
//     skills && (reqData.skills = skills);
//     pincode && (reqData.pincode = pincode);
//     vacancy && (reqData.vacancy = vacancy);
//     country && (reqData.country = country);
//     workplace && (reqData.workplace = workplace);
//     job_types && (reqData.job_types = job_types);
//     company_id && (reqData.company_id = company_id);
//     salary_pay && (reqData.salary_pay = salary_pay);
//     description && (reqData.description = description);
//     hourly_rate && (reqData.hourly_rate = hourly_rate);
//     salary_upto && (reqData.salary_upto = salary_upto);
//     company_name && (reqData.company_name = company_name);
//     interviewTime && (reqData.interviewTime = interviewTime);
//     street_address && (reqData.street_address = street_address);
//     salary_started && (reqData.salary_started = salary_started);
//     working_schedule && (reqData.working_schedule = working_schedule);
//     is_hiring_manager && (reqData.is_hiring_manager = is_hiring_manager);
//     salary_negotiable && (reqData.salary_negotiable = salary_negotiable);

//     let job;

//     if (job_id) {
//       job = await Job.findOneAndUpdate({ _id: job_id }, reqData, {
//         upsert: true,
//         new: true,
//       });
//     } else {
//       job = await Job.create(reqData);
//     }

//     return NextResponse.json({
//       status: 201,
//       data: job,
//       message: 'Job created successfully',
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: 'An error occurred while creating job.',
//         error: error,
//       },
//       { status: 500 },
//     );
//   }
// };

export const GET = async (req: NextResponse) => {
  const session: any = await getServerSession(authOptions);
  // if (!session?.user?._id) {
  //   return NextResponse.json({ status: 401, message: 'Unauthorized' });
  // }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status') || 'ACTIVE';

  try {
    await connect();
    let results;
    if (session?.user?.role === 'employee') {
      if (status === 'hired') {
        const aggregateHiredCandidates = [
          {
            $match: {
              company_id: new mongoose.Types.ObjectId(session?.user?._id),
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
            $unwind: '$applicants',
          },
          {
            $lookup: {
              from: 'individuals',
              localField: 'applicants.user_id',
              foreignField: 'user_ref_id',
              as: 'user_info',
            },
          },
          {
            $unwind: '$user_info',
          },
          {
            $group: {
              _id: '$_id',
              jobDetails: { $first: '$$ROOT' },
              hiredCandidates: { $push: '$user_info' },
            },
          },
          {
            $project: {
              'jobDetails.applicants': 0,
              'jobDetails.user_info': 0,
            },
          },
        ];
        results = await Job.aggregate(aggregateHiredCandidates);
      } else {
        results = await Job.aggregate([
          {
            $match: {
              company_id: new mongoose.Types.ObjectId(session?.user?._id),
            },
          },
          {
            $match: {
              status: status,
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
            },
          },
          {
            $project: {
              city_info: 0,
              state_info: 0,
              country_info: 0,
            },
          },
        ]);
      }

      return NextResponse.json({
        status: 200,
        data: results,
      });
    } else {
      results = await Job.aggregate([
        {
          $match: {
            status: 'ACTIVE',
          },
        },
        {
          $lookup: {
            from: 'jobapplications',
            let: { jobId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$$jobId', '$job_id'] },
                      {
                        $eq: [
                          '$user_id',
                          new mongoose.Types.ObjectId(session?.user?._id),
                        ],
                      },
                    ],
                  },
                },
              },
            ],
            as: 'applicants',
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
            applied: {
              $cond: {
                if: { $gt: [{ $size: '$applicants' }, 0] },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $project: {
            city_info: 0,
            state_info: 0,
            country_info: 0,
            applicants: 0,
          },
        },
      ]);
      // results = await Job.aggregate([
      //   {
      //     $match: {
      //      status: 'ACTIVE',
      //    }
      //  },
      //   {
      //     $lookup: {
      //       from: 'jobapplications',
      //       localField: '_id',
      //       foreignField: 'job_id',
      //       as: 'applicants',
      //       pipeline: [
      //         {
      //           $match: {
      //             user_id: new mongoose.Types.ObjectId(session?.user?._id),
      //           },
      //         },
      //       ],
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: 'states',
      //       localField: 'state',
      //       foreignField: '_id',
      //       as: 'state_info',
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: 'countries',
      //       localField: 'country',
      //       foreignField: '_id',
      //       as: 'country_info',
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: 'cities',
      //       localField: 'city',
      //       foreignField: '_id',
      //       as: 'city_info',
      //     },
      //   },
      //   {
      //     $addFields: {
      //       city: {
      //         _id: { $arrayElemAt: ['$city_info._id', 0] },
      //         name: { $arrayElemAt: ['$city_info.name', 0] },
      //       },
      //       state: {
      //         _id: { $arrayElemAt: ['$state_info._id', 0] },
      //         name: { $arrayElemAt: ['$state_info.name', 0] },
      //       },
      //       country: {
      //         _id: { $arrayElemAt: ['$country_info._id', 0] },
      //         name: { $arrayElemAt: ['$country_info.name', 0] },
      //       },
      //     },
      //   },
      //   {
      //     $project: {
      //       city_info: 0,
      //       state_info: 0,
      //       country_info: 0,
      //     },
      //   },
      // ]);
      return NextResponse.json({
        status: 200,
        data: results,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while fetching jobs.',
        error: error,
      },
      { status: 500 },
    );
  }
};

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

    const userId = session?.user?._id;
    const userDetails = await User.findById(userId).populate(
      'subscription.plan_id',
    );

    if (!userDetails) {
      return NextResponse.json({
        message: 'User not found',
        status: 404,
      });
    }

    const subscription = userDetails.subscription;
    if (!subscription || !subscription.plan_id) {
      return NextResponse.json({
        message:
          'No active subscription plan found. Please subscribe to a plan to continue posting jobs.',
        status: 403,
      });
    }

    const {
      plan_name,
      plan_type,
      max_posts,
      // createdAt: planCreatedAt,
    } = subscription.plan_id;
    const planExpirationDate = calculateExpirationDate(
      subscription?.createdAt,
      plan_type,
    );

    if (new Date() > planExpirationDate) {
      return NextResponse.json({
        message:
          'No active subscription plan found. Please subscribe to a plan to continue posting jobs.',
        status: 403,
      });
    }

    const currentJobPosts = await Job.countDocuments({ company_id: userId });

    if (currentJobPosts >= max_posts) {
      return NextResponse.json({
        message: `Your current plan (${plan_name}) allows a maximum of ${max_posts} job posts.`,
        status: 403,
      });
    }

    const {
      area,
      city,
      title,
      state,
      status,
      skills,
      job_id,
      pincode,
      vacancy,
      country,
      workplace,
      job_types,
      company_id,
      salary_pay,
      description,
      hourly_rate,
      salary_upto,
      company_name,
      interviewTime,
      street_address,
      salary_started,
      working_schedule,
      is_hiring_manager,
      salary_negotiable,
    } = await req.json();

    let reqData: any = {};

    area && (reqData.area = area);
    city && (reqData.city = city);
    title && (reqData.title = title);
    state && (reqData.state = state);
    job_id && (reqData.job_id = job_id);
    status && (reqData.status = status);
    skills && (reqData.skills = skills);
    pincode && (reqData.pincode = pincode);
    vacancy && (reqData.vacancy = vacancy);
    country && (reqData.country = country);
    workplace && (reqData.workplace = workplace);
    job_types && (reqData.job_types = job_types);
    company_id && (reqData.company_id = company_id);
    salary_pay && (reqData.salary_pay = salary_pay);
    description && (reqData.description = description);
    hourly_rate && (reqData.hourly_rate = hourly_rate);
    salary_upto && (reqData.salary_upto = salary_upto);
    company_name && (reqData.company_name = company_name);
    interviewTime && (reqData.interviewTime = interviewTime);
    street_address && (reqData.street_address = street_address);
    salary_started && (reqData.salary_started = salary_started);
    working_schedule && (reqData.working_schedule = working_schedule);
    is_hiring_manager && (reqData.is_hiring_manager = is_hiring_manager);
    salary_negotiable && (reqData.salary_negotiable = salary_negotiable);

    let job;

    if (job_id) {
      job = await Job.findOneAndUpdate({ _id: job_id }, reqData, {
        upsert: true,
        new: true,
      });
    } else {
      job = await Job.create(reqData);
    }

    return NextResponse.json({
      status: 201,
      data: job,
      message: 'Job created successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while creating job.',
        error: error,
      },
      { status: 500 },
    );
  }
};
