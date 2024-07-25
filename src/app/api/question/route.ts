'use server';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { shuffleData } from '@/service/Helper';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';
import { Category, Individual, Question, User } from '@/models';

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
    let { categoryIds, examToken } = await req.json();

    // Check if examToken is provided
    if (examToken) {
      const user = await User.findOne({ examToken });

      if (!user) {
        return NextResponse.json({
          message: 'Invalid or expired exam token.',
          status: 400,
        });
      }

      // Remove the token from the database
      user.examToken = undefined;
      await user.save();

      // Extract categoryIds from the token
      const decoded: any = jwt.verify(examToken, process.env.JWT_SECRET!);
      categoryIds = decoded.categoryIds;
    }

    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return NextResponse.json({
        status: 400,
        message: 'category must be a non-empty array',
      });
    }

    const categoryObjectIds = categoryIds.map(
      (id) => new mongoose.Types.ObjectId(id),
    );
    const categories = await Category.find({ _id: { $in: categoryObjectIds } });
    if (categories.length !== categoryIds.length) {
      return NextResponse.json({
        status: 400,
        message: 'One or more categories are invalid',
      });
    }

    const questions = await Question.find({
      category_id: { $in: categoryObjectIds },
    });

    let shuffledData = [];
    const questionsPerCategory =
      categoryIds.length === 1 ? 12 : categoryIds.length === 2 ? 6 : 4;

    shuffledData = categoryObjectIds.flatMap((categoryId) =>
      shuffleData(
        questions.filter((question) => question.category_id.equals(categoryId)),
      ).slice(0, questionsPerCategory),
    );

    // Check if there's already an active certificate for this user and skill
    const existingCertificate = await Individual.findOne({
      user_ref_id: session.user._id,
      'certificates.skill': { $in: categoryObjectIds },
      'certificates.end_time': { $exists: false },
    });

    if (!existingCertificate) {
      // Add new certificate entry
      const newCertificate = {
        join_time: new Date(Date.now()),
        skill: categoryObjectIds,
      };

      const updatedUser = await Individual.findOneAndUpdate(
        { user_ref_id: session.user._id },
        { $push: { certificates: newCertificate } },
        { upsert: true, new: true },
      );

      if (!updatedUser) {
        throw new Error('Failed to get questions.');
      }

      // Get the latest certificate entry ID
      const latestCertificate = updatedUser.certificates.slice(-1)[0];
      return NextResponse.json({
        status: 200,
        data: shuffledData,
        exam_id: latestCertificate._id,
        message: 'Questions fetched successfully',
      });
    } else {
      // Return the existing certificate ID
      const latestCertificate = existingCertificate.certificates.find(
        (cert: any) => !cert.end_time,
      );
      return NextResponse.json({
        status: 200,
        data: shuffledData,
        exam_id: latestCertificate._id,
        message: 'Questions fetched successfully',
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'An error occurred while getting questions.',
        error: error.message,
      },
      { status: 500 },
    );
  }
};

// --------------------------------------------------------------------------------------------------------

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
//     const { categoryIds } = await req.json();

//     if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
//       return NextResponse.json({
//         status: 400,
//         message: 'category must be a non-empty array',
//       });
//     }

//     const categoryObjectIds = categoryIds.map(
//       (id) => new mongoose.Types.ObjectId(id),
//     );
//     const categories = await Category.find({ _id: { $in: categoryObjectIds } });
//     if (categories.length !== categoryIds.length) {
//       return NextResponse.json({
//         status: 400,
//         message: 'One or more categories are invalid',
//       });
//     }

//     const questions = await Question.find({
//       category_id: { $in: categoryObjectIds },
//     });

//     let shuffledData = [];
//     const questionsPerCategory =
//       categoryIds.length === 1 ? 12 : categoryIds.length === 2 ? 6 : 4;

//     shuffledData = categoryObjectIds.flatMap((categoryId) =>
//       shuffleData(
//         questions.filter((question) => question.category_id.equals(categoryId)),
//       ).slice(0, questionsPerCategory),
//     );

//     // Check if there's already an active certificate for this user and skill
//     const existingCertificate = await Individual.findOne({
//       user_ref_id: session.user._id,
//       'certificates.skill': { $in: categoryObjectIds },
//       'certificates.end_time': { $exists: false },
//     });

//     if (!existingCertificate) {
//       // Add new certificate entry
//       const newCertificate = {
//         join_time: new Date(Date.now()),
//         skill: categoryObjectIds,
//       };

//       const updatedUser = await Individual.findOneAndUpdate(
//         { user_ref_id: session.user._id },
//         { $push: { certificates: newCertificate } },
//         { upsert: true, new: true },
//       );

//       if (!updatedUser) {
//         throw new Error('Failed to get questions.');
//       }

//       // Get the latest certificate entry ID
//       const latestCertificate = updatedUser.certificates.slice(-1)[0];
//       return NextResponse.json({
//         status: 200,
//         data: shuffledData,
//         exam_id: latestCertificate._id,
//         message: 'Questions fetched successfully',
//       });
//     } else {
//       // Return the existing certificate ID
//       const latestCertificate = existingCertificate.certificates.find(
//         (cert: any) => !cert.end_time,
//       );
//       return NextResponse.json({
//         status: 200,
//         data: shuffledData,
//         exam_id: latestCertificate._id,
//         message: 'Questions fetched successfully',
//       });
//     }
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         message: 'An error occurred while getting questions.',
//         error: error.message,
//       },
//       { status: 500 },
//     );
//   }
// };

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
//     const { categoryIds } = await req.json();

//     if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
//       return NextResponse.json({
//         status: 400,
//         message: 'category must be a non-empty array',
//       });
//     }

//     const categoryObjectIds = categoryIds.map(
//       (id) => new mongoose.Types.ObjectId(id),
//     );
//     const categories = await Category.find({ _id: { $in: categoryObjectIds } });
//     if (categories.length !== categoryIds.length) {
//       return NextResponse.json({
//         status: 400,
//         message: 'One or more categories are invalid',
//       });
//     }

//     const questions = await Question.find({
//       category_id: { $in: categoryObjectIds },
//     });

//     let shuffledData = [];
//     const questionsPerCategory =
//       categoryIds.length === 1 ? 12 : categoryIds.length === 2 ? 6 : 4;

//     shuffledData = categoryObjectIds.flatMap((categoryId) =>
//       shuffleData(
//         questions.filter((question) => question.category_id.equals(categoryId)),
//       ).slice(0, questionsPerCategory),
//     );

//     // Check if there's already an active certificate for this user and skill
//     const existingCertificate = await Individual.findOne({
//       user_ref_id: session.user._id,
//       'certificates.skill': { $in: categoryObjectIds },
//       'certificates.end_time': { $exists: false },
//     });

//     if (!existingCertificate) {
//       // Add new certificate entry
//       const newCertificate = {
//         join_time: new Date(Date.now()),
//         skill: categoryObjectIds,
//       };

//       const updatedUser = await Individual.findOneAndUpdate(
//         { user_ref_id: session.user._id },
//         { $push: { certificates: newCertificate } },
//         { upsert: true, new: true },
//       );

//       if (!updatedUser) {
//         throw new Error('Failed to get questions.');
//       }

//       // Get the latest certificate entry ID
//       const latestCertificate = updatedUser.certificates.slice(-1)[0];
//       return NextResponse.json({
//         status: 200,
//         data: shuffledData,
//         exam_id: latestCertificate._id,
//         message: 'Questions fetched successfully',
//       });
//     } else {
//       // Return the existing certificate ID
//       const latestCertificate = existingCertificate.certificates.find(
//         (cert: any) => !cert.end_time,
//       );
//       return NextResponse.json({
//         status: 200,
//         data: shuffledData,
//         exam_id: latestCertificate._id,
//         message: 'Questions fetched successfully',
//       });
//     }
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         message: 'An error occurred while getting questions.',
//         error: error.message,
//       },
//       { status: 500 },
//     );
//   }
// };

// export const POST = async (req: NextRequest) => {
//   await connect();
//   const { token } = await req.json();

//   let userId;
//   let categoryIds;

//   if (token) {
//     try {
//       // Verify the token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//       const { email, categoryIds: tokenCategoryIds } = decoded as any;

//       // Find the user by email
//       const user = await User.findOne({ email });
//       if (!user || user.examToken !== token || user.examExpires < Date.now()) {
//         return NextResponse.json({
//           message: 'Invalid or expired token',
//           status: 401,
//         });
//       }

//       userId = user._id;
//       categoryIds = tokenCategoryIds;
//     } catch (error) {
//       return NextResponse.json({
//         message: 'Invalid or expired token',
//         status: 401,
//       });
//     }
//   } else {
//     const session: any = await getServerSession(authOptions);
//     if (!session?.user?._id) {
//       return NextResponse.json({
//         message: 'Unauthorized',
//         status: 401,
//       });
//     }
//     userId = session.user._id;
//     const { categoryIds: requestCategoryIds } = await req.json();
//     categoryIds = requestCategoryIds;
//   }

//   try {
//     if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
//       return NextResponse.json({
//         status: 400,
//         message: 'Category must be a non-empty array',
//       });
//     }

//     const categoryObjectIds = categoryIds.map(
//       (id) => new mongoose.Types.ObjectId(id),
//     );
//     const categories = await Category.find({ _id: { $in: categoryObjectIds } });
//     if (categories.length !== categoryIds.length) {
//       return NextResponse.json({
//         status: 400,
//         message: 'One or more categories are invalid',
//       });
//     }

//     const questions = await Question.find({
//       category_id: { $in: categoryObjectIds },
//     });

//     let shuffledData = [];
//     const questionsPerCategory =
//       categoryIds.length === 1 ? 12 : categoryIds.length === 2 ? 6 : 4;

//     shuffledData = categoryObjectIds.flatMap((categoryId) =>
//       shuffleData(
//         questions.filter((question) => question.category_id.equals(categoryId)),
//       ).slice(0, questionsPerCategory),
//     );

//     // Check if there's already an active certificate for this user and skill
//     const existingCertificate = await Individual.findOne({
//       user_ref_id: userId,
//       'certificates.skill': { $in: categoryObjectIds },
//       'certificates.end_time': { $exists: false },
//     });

//     if (!existingCertificate) {
//       // Add new certificate entry
//       const newCertificate = {
//         join_time: new Date(Date.now()),
//         skill: categoryObjectIds,
//       };

//       const updatedUser = await Individual.findOneAndUpdate(
//         { user_ref_id: userId },
//         { $push: { certificates: newCertificate } },
//         { upsert: true, new: true },
//       );

//       if (!updatedUser) {
//         throw new Error('Failed to get questions.');
//       }

//       // Get the latest certificate entry ID
//       const latestCertificate = updatedUser.certificates.slice(-1)[0];
//       return NextResponse.json({
//         status: 200,
//         data: shuffledData,
//         exam_id: latestCertificate._id,
//         message: 'Questions fetched successfully',
//       });
//     } else {
//       // Return the existing certificate ID
//       const latestCertificate = existingCertificate.certificates.find(
//         (cert: any) => !cert.end_time,
//       );
//       return NextResponse.json({
//         status: 200,
//         data: shuffledData,
//         exam_id: latestCertificate._id,
//         message: 'Questions fetched successfully',
//       });
//     }
//   } catch (error: any) {
//     console.log('backend error:-', error);

//     return NextResponse.json(
//       {
//         message: 'An error occurred while getting questions.',
//         error: error.message,
//       },
//       { status: 500 },
//     );
//   }
// };

// export const POST = async (req: NextRequest) => {
//   await connect();
//   const { categoryIds, token } = await req.json();

//   let userId;

//   if (token) {
//     try {
//       // Verify the token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//       const email = (decoded as any).email;
//       console.log('🚀 ~ POST ~ email:', email);

//       // Find the user by email
//       const user = await User.findOne({ email });
//       if (!user || user.examToken !== token || user.examExpires < Date.now()) {
//         return NextResponse.json({
//           message: 'Invalid or expired token',
//           status: 401,
//         });
//       }

//       userId = user._id;
//     } catch (error) {
//       return NextResponse.json({
//         message: 'Invalid or expired token',
//         status: 401,
//       });
//     }
//   } else {
//     const session: any = await getServerSession(authOptions);
//     if (!session?.user?._id) {
//       return NextResponse.json({
//         message: 'Unauthorized',
//         status: 401,
//       });
//     }
//     userId = session.user._id;
//   }

//   try {
//     if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
//       return NextResponse.json({
//         status: 400,
//         message: 'Category must be a non-empty array',
//       });
//     }

//     const categoryObjectIds = categoryIds.map(
//       (id) => new mongoose.Types.ObjectId(id),
//     );
//     const categories = await Category.find({ _id: { $in: categoryObjectIds } });
//     if (categories.length !== categoryIds.length) {
//       return NextResponse.json({
//         status: 400,
//         message: 'One or more categories are invalid',
//       });
//     }

//     const questions = await Question.find({
//       category_id: { $in: categoryObjectIds },
//     });

//     let shuffledData = [];
//     const questionsPerCategory =
//       categoryIds.length === 1 ? 12 : categoryIds.length === 2 ? 6 : 4;

//     shuffledData = categoryObjectIds.flatMap((categoryId) =>
//       shuffleData(
//         questions.filter((question) => question.category_id.equals(categoryId)),
//       ).slice(0, questionsPerCategory),
//     );

//     // Check if there's already an active certificate for this user and skill
//     const existingCertificate = await Individual.findOne({
//       user_ref_id: userId,
//       'certificates.skill': { $in: categoryObjectIds },
//       'certificates.end_time': { $exists: false },
//     });

//     if (!existingCertificate) {
//       // Add new certificate entry
//       const newCertificate = {
//         join_time: new Date(Date.now()),
//         skill: categoryObjectIds,
//       };

//       const updatedUser = await Individual.findOneAndUpdate(
//         { user_ref_id: userId },
//         { $push: { certificates: newCertificate } },
//         { upsert: true, new: true },
//       );

//       if (!updatedUser) {
//         throw new Error('Failed to get questions.');
//       }

//       // Get the latest certificate entry ID
//       const latestCertificate = updatedUser.certificates.slice(-1)[0];
//       return NextResponse.json({
//         status: 200,
//         data: shuffledData,
//         exam_id: latestCertificate._id,
//         message: 'Questions fetched successfully',
//       });
//     } else {
//       // Return the existing certificate ID
//       const latestCertificate = existingCertificate.certificates.find(
//         (cert: any) => !cert.end_time,
//       );
//       return NextResponse.json({
//         status: 200,
//         data: shuffledData,
//         exam_id: latestCertificate._id,
//         message: 'Questions fetched successfully',
//       });
//     }
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         message: 'An error occurred while getting questions.',
//         error: error.message,
//       },
//       { status: 500 },
//     );
//   }
// };

// ---------------------- FOR CREATE NEW QUESTIONS ----------------------
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
//     let { question, ans, category_id, option } = await req.json();

//     const results = await Question.create({
//       question,
//       ans,
//       category_id,
//       option,
//     });

//     return NextResponse.json({
//       status: 200,
//       data: results,
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         message: 'An error occurred while creating questions.',
//         error: error.message,
//       },
//       { status: 500 },
//     );
//   }
// };
