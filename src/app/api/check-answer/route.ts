'use server';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { Individual, Question } from '@/models';
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
    const { exam_id, answers } = await req.json();

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

    // Calculate the percentage of correct answers
    const totalQuestions = answers.length;
    const correctPercentage = (correctAnswersCount / totalQuestions) * 100;

    // Determine if the user passes
    const pass = correctPercentage >= 70;

    const updatedUser = await Individual.findOneAndUpdate(
      { 'certificates._id': exam_id, user_ref_id: session?.user?._id },
      {
        $set: {
          'certificates.$.result': correctAnswersCount,
          'certificates.$.end_time': new Date(Date.now()),
        },
      },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json({
        status: 404,
        message: 'Certificate not found or update failed',
      });
    }

    return NextResponse.json({
      status: 200,
      data: {
        correctAnswersCount,
        totalQuestions,
        correctPercentage,
        pass,
      },
      message: pass ? 'Congratulations' : 'Batter luck next time',
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
