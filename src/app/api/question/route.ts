'use server';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { Category, Question } from '@/models';
import { shuffleData } from '@/service/Helper';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';

// export const POST = async (req: NextRequest) => {
//   const session = await getServerSession(authOptions);
//   //   if (!session?.user?._id) {
//   //     return NextResponse.json({
//   //       message: 'Unauthorized',
//   //       status: 401,
//   //     });
//   //   }

//   try {
//     await connect();
//     const { question, ans, category_id, option } = await req.json();

//     let reqData: any = {};

//     question && (reqData.question = question);
//     ans && (reqData.ans = ans);
//     category_id && (reqData.category_id = category_id);
//     option && (reqData.option = option);

//     const questions = await Question.create(reqData);

//     return NextResponse.json({
//       status: 201,
//       data: questions,
//       message: 'Questions get successfully',
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: 'An error occurred while getting questions.',
//         error: error,
//       },
//       { status: 500 },
//     );
//   }
// };

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
    const { categoryIds } = await req.json();

    // Validate categoryIds
    if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
      return NextResponse.json({
        status: 400,
        message: 'category must be a non-empty array',
      });
    }

    // Convert categoryIds to ObjectIds
    const categoryObjectIds = categoryIds.map(
      (id) => new mongoose.Types.ObjectId(id),
    );

    // Check if all categoryIds are valid
    const categories = await Category.find({ _id: { $in: categoryObjectIds } });
    if (categories.length !== categoryIds.length) {
      return NextResponse.json({
        status: 400,
        message: 'One or more category are invalid',
      });
    }

    const questions = await Question.find({
      category_id: { $in: categoryObjectIds },
    });

    let shuffledData = [];

    if (categoryIds?.length === 1) {
      shuffledData = shuffleData(questions)?.slice(0, 12);
    } else if (categoryIds?.length === 2) {
      const questionsPerCategory = 6;
      shuffledData = categoryObjectIds?.flatMap((categoryId) =>
        shuffleData(
          questions?.filter((question) =>
            question?.category_id?.equals(categoryId),
          ),
        )?.slice(0, questionsPerCategory),
      );
    } else if (categoryIds?.length === 3) {
      const questionsPerCategory = 4;
      shuffledData = categoryObjectIds?.flatMap((categoryId) =>
        shuffleData(
          questions?.filter((question) =>
            question?.category_id?.equals(categoryId),
          ),
        )?.slice(0, questionsPerCategory),
      );
    }

    return NextResponse.json({
      status: 200,
      data: shuffledData,
      message: 'Questions get successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while getting questions.',
        error: error,
      },
      { status: 500 },
    );
  }
};
