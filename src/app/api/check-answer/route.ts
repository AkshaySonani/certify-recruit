'use server';
import mongoose from 'mongoose';
import { connect } from '@/db/mongodb';
import { getServerSession } from 'next-auth';
import { Individual, Question } from '@/models';
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
    const { exam_id, answers } = await req.json();

    if (!Array.isArray(answers)) {
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
    answers.forEach((userAnswer) => {
      const question = questions.find((q) => q._id.equals(userAnswer.que_id));
      if (question && question.ans === userAnswer.ans) {
        correctAnswersCount++;
      }
    });

    const totalQuestions = answers.length;
    const correctPercentage = (correctAnswersCount / totalQuestions) * 100;
    const pass = correctPercentage >= 70;

    if (pass) {
      const updatedUser = await Individual.findOneAndUpdate(
        {
          'certificates._id': exam_id,
          user_ref_id: session.user._id,
        },
        {
          $set: {
            'certificates.$.result': correctAnswersCount,
            'certificates.$.end_time': new Date(Date.now()),
          },
        },
        { new: true },
      );

      if (!updatedUser) {
        console.error(
          'Certificate not found or update failed for passing case',
        );
        return NextResponse.json({
          status: 404,
          message: 'Certificate not found or update failed',
        });
      }

      await Individual.updateOne(
        { user_ref_id: session.user._id },
        {
          $pull: {
            certificates: {
              _id: { $ne: exam_id },
              $or: [{ result: 0 }, { end_time: { $exists: false } }],
            },
          },
        },
      );
    } else {
      const updatedUser = await Individual.findOneAndUpdate(
        {
          'certificates._id': exam_id,
          user_ref_id: session.user._id,
        },
        {
          $set: {
            'certificates.$.result': correctAnswersCount,
            'certificates.$.end_time': new Date(Date.now()),
          },
        },
        { new: true },
      );

      if (!updatedUser) {
        console.error(
          'Certificate not found or update failed for failing case',
        );
        return NextResponse.json({
          status: 404,
          message: 'Certificate not found or update failed',
        });
      }

      await Individual.updateOne(
        { user_ref_id: session.user._id },
        {
          $pull: { certificates: { _id: exam_id } },
        },
      );

      await Individual.updateOne(
        { user_ref_id: session.user._id },
        {
          $pull: {
            certificates: {
              _id: { $ne: exam_id },
              $or: [{ result: 0 }, { end_time: { $exists: false } }],
            },
          },
        },
      );
    }

    // if (pass) {
    //   const updatedUser = await Individual.findOneAndUpdate(
    //     {
    //       'certificates._id': exam_id,
    //       user_ref_id: session.user._id,
    //     },
    //     {
    //       $set: {
    //         'certificates.$.result': correctAnswersCount,
    //         'certificates.$.end_time': new Date(Date.now()),
    //       },
    //     },
    //     { new: true },
    //   );

    //   if (!updatedUser) {
    //     return NextResponse.json({
    //       status: 404,
    //       message: 'Certificate not found or update failed',
    //     });
    //   }

    //   console.log('updatedUser', updatedUser);

    //   // Remove certificates with result: 0 or without end_time, excluding the specific exam_id
    //   await Individual.updateOne(
    //     { user_ref_id: session.user._id },
    //     {
    //       $pull: {
    //         certificates: {
    //           _id: { $ne: exam_id },
    //           $or: [{ result: 0 }, { end_time: { $exists: false } }],
    //         },
    //       },
    //     },
    //   );
    // } else {
    //   await Individual.findOneAndUpdate(
    //     {
    //       'certificates._id': exam_id,
    //       user_ref_id: session.user._id,
    //     },
    //     { $pull: { certificates: { _id: exam_id } } },
    //     { new: true },
    //   );
    // }

    return NextResponse.json({
      status: 200,
      data: {
        correctAnswersCount,
        totalQuestions,
        correctPercentage,
        pass,
      },
      message: pass ? 'Congratulations' : 'Better luck next time',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'An error occurred while checking answers.',
        error: error.message,
      },
      { status: 500 },
    );
  }
};

// export const POST = async (req: NextRequest) => {
//   const session: any = await getServerSession(authOptions);
//   // if (!session?.user?._id) {
//   //   return NextResponse.json({
//   //     message: 'Unauthorized',
//   //     status: 401,
//   //   });
//   // }

//   try {
//     await connect();
//     const { exam_id, answers } = await req.json();

//     if (!Array.isArray(answers) || answers.length === 0) {
//       return NextResponse.json({
//         status: 400,
//         message: 'Answers must be a non-empty array',
//       });
//     }

//     const questionIds = answers.map(
//       (answer) => new mongoose.Types.ObjectId(answer.que_id),
//     );
//     const questions = await Question.find({ _id: { $in: questionIds } }).select(
//       '+ans',
//     );

//     let correctAnswersCount = 0;
//     answers.forEach((userAnswer) => {
//       const question = questions.find((q) => q._id.equals(userAnswer.que_id));
//       if (question && question.ans === userAnswer.ans) {
//         correctAnswersCount++;
//       }
//     });

//     const totalQuestions = answers.length;
//     const correctPercentage = (correctAnswersCount / totalQuestions) * 100;
//     const pass = correctPercentage >= 70;

//     if (pass) {
//       const updatedUser = await Individual.findOneAndUpdate(
//         {
//           'certificates._id': exam_id,
//           user_ref_id: '666c6927c3c9d4399627aa31',
//         },
//         // { 'certificates._id': exam_id, user_ref_id: session.user._id },
//         {
//           $set: {
//             'certificates.$.result': correctAnswersCount,
//             'certificates.$.end_time': new Date(Date.now()),
//           },
//         },
//         { new: true },
//       );

//       if (!updatedUser) {
//         return NextResponse.json({
//           status: 404,
//           message: 'Certificate not found or update failed',
//         });
//       }
//     } else {
//       await Individual.findOneAndUpdate(
//         {
//           'certificates._id': exam_id,
//           user_ref_id: '666c6927c3c9d4399627aa31',
//         },
//         // { 'certificates._id': exam_id, user_ref_id: session.user._id },
//         { $pull: { certificates: { _id: exam_id } } },
//         { new: true },
//       );
//     }

//     return NextResponse.json({
//       status: 200,
//       data: {
//         correctAnswersCount,
//         totalQuestions,
//         correctPercentage,
//         pass,
//       },
//       message: pass ? 'Congratulations' : 'Better luck next time',
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         message: 'An error occurred while checking answers.',
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
//     const { exam_id, answers } = await req.json();

//     // Validate answers
//     if (!Array.isArray(answers) || answers.length === 0) {
//       return NextResponse.json({
//         status: 400,
//         message: 'Answers must be a non-empty array',
//       });
//     }

//     const questionIds = answers.map(
//       (answer) => new mongoose.Types.ObjectId(answer.que_id),
//     );
//     const questions = await Question.find({ _id: { $in: questionIds } }).select(
//       '+ans',
//     );

//     let correctAnswersCount = 0;

//     // Compare user's answers with the correct answers
//     answers?.forEach((userAnswer) => {
//       const question = questions?.find((q: any) =>
//         q?._id?.equals(userAnswer.que_id),
//       );
//       if (question && question?.ans === userAnswer?.ans) {
//         correctAnswersCount++;
//       }
//     });

//     // Calculate the percentage of correct answers
//     const totalQuestions = answers.length;
//     const correctPercentage = (correctAnswersCount / totalQuestions) * 100;

//     // Determine if the user passes
//     const pass = correctPercentage >= 70;

//     if (pass) {
//       const updatedUser = await Individual.findOneAndUpdate(
//         { 'certificates._id': exam_id, user_ref_id: session?.user?._id },
//         {
//           $set: {
//             'certificates.$.result': correctAnswersCount,
//             'certificates.$.end_time': new Date(Date.now()),
//           },
//         },
//         { new: true },
//       );

//       if (!updatedUser) {
//         return NextResponse.json({
//           status: 404,
//           message: 'Certificate not found or update failed',
//         });
//       }
//     }

//     return NextResponse.json({
//       status: 200,
//       data: {
//         correctAnswersCount,
//         totalQuestions,
//         correctPercentage,
//         pass,
//       },
//       message: pass ? 'Congratulations' : 'Batter luck next time',
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
