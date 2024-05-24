// import mongoose from 'mongoose';
// import { createModal } from '@/service/Helper';

// const questionSchema = new mongoose.Schema({
//   exam_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Exam',
//     required: true,
//   },
//   questions: {
//     type: [
//       {
//         text: {
//           type: String,
//           required: true,
//         },
//         choices: [String],
//         correctAnswer: {
//           type: String,
//           select: false,
//         },
//       },
//     ],
//     required: true,
//   },
// });

// questionSchema.set('timestamps', true);
// export const Question = createModal('Question', questionSchema);
// export default Question;

import mongoose from 'mongoose';
import { createModal } from '@/service/Helper';

const questionSchema = new mongoose.Schema({
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  questions: {
    type: [
      {
        que_id: {
          type: mongoose.Schema.Types.ObjectId,
          default: mongoose.Types.ObjectId, // This generates an ObjectId automatically
        },
        question: {
          type: String,
          required: true,
        },
        questionType: {
          type: String,
          enum: ['mcq', 'true-false', 'short'],
          required: true,
        },
        choices: {
          type: Map,
          of: String,
          required: function () {
            return this.questionType === 'mcq';
          },
        },
        correctAnswer: {
          type: String,
          select: false,
          required: true,
        },
      },
    ],
    required: true,
  },
});

questionSchema.set('timestamps', true);
export const Question = createModal('Question', questionSchema);
export default Question;
