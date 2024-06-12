'use server';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/service/AuthOptions';
import { NextRequest, NextResponse } from 'next/server';
import { Individual, LearnAndEarn, Question } from '@/models';

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
    const { answers } = await req.json();

    // Validate answers
    if (!Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({
        status: 400,
        message: 'Answers must be a non-empty array',
      });
    }

    const questionIds = answers.map(
      (answer) => new mongoose.Types.ObjectId(answer.que_id),
    );
    const questions = await Question.find({ _id: { $in: questionIds } }).select(
      '+ans',
    );

    let correctAnswersCount = 0;

    // Compare user's answers with the correct answers
    answers?.forEach((userAnswer) => {
      const question = questions?.find((q: any) =>
        q?._id?.equals(userAnswer.que_id),
      );
      if (question && question?.ans === userAnswer?.ans) {
        correctAnswersCount++;
      }
    });

    const userData = await Individual.findOneAndUpdate(
      { user_ref_id: session?.user?._id },
      {
        'learn_and_earn.result': correctAnswersCount,
        'learn_and_earn.end_time': new Date(Date.now()),
      },
      {
        upsert: true,
        new: true,
      },
    );

    const learnAndEarnObj = {
      user_ref_id: userData?._id,
      result: userData?.learn_and_earn?.result,
      end_time: userData?.learn_and_earn?.end_time,
      join_time: userData?.learn_and_earn?.join_time,
      register: userData?.learn_and_earn?.register,
    };

    await LearnAndEarn.create(learnAndEarnObj);

    return NextResponse.json({
      status: 200,
      data: {
        correctAnswersCount,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while checking questions.',
        error: error,
      },
      { status: 500 },
    );
  }
};
