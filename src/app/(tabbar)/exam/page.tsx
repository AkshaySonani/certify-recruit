'use client';
import Image from 'next/image';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/service/Helper';
import { toast } from 'react-toastify';
import usePersistState from '@/hooks/usePersistState';
import { QUESTION_STATUS } from '@/constant/Enum';
import FinishExamDialog from '@/Components/exam/FinishExamDialog';
import ResultComp from '@/Components/exam/ResultComp';

const EXAM_DURATION = 1800;
const EXAM_STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
};

const EXAM_QUESTIONS: any = [
  {
    que_id: '1716528866226000',
    text: 'What is React?',
    questionType: 'mcq',
    status: QUESTION_STATUS[0],
    choices: {
      a: 'A JavaScript library for building user interfaces',
      b: 'A framework for building server-side applications',
      c: 'A CSS preprocessor',
      d: 'A package manager for JavaScript',
    },
  },
  {
    que_id: '1888181752857400',
    text: 'What is JSX?',
    questionType: 'mcq',
    status: QUESTION_STATUS[0],
    choices: {
      a: 'A syntax extension for JavaScript',
      b: 'A type of JSON',
      c: 'A CSS framework',
      d: 'A new version of JavaScript',
    },
  },
  {
    que_id: '2059834639480800',
    text: 'How do you create a React component?',
    questionType: 'mcq',
    status: QUESTION_STATUS[0],
    choices: {
      a: 'By defining a function or a class that returns a React element',
      b: 'By calling a special React API',
      c: 'By creating a new HTML element',
      d: 'By using a CSS class',
    },
  },
  {
    que_id: '2231487526104200',
    text: 'What is the difference between state and props in React?',
    questionType: 'mcq',
    status: QUESTION_STATUS[0],
    choices: {
      a: 'State is managed within the component, while props are passed from a parent component',
      b: 'Props are managed within the component, while state is passed from a parent component',
      c: 'Both state and props are managed within the component',
      d: 'Both state and props are passed from a parent component',
    },
  },
  {
    que_id: '2403140412727600',
    text: 'What is the useReducer hook used for in React?',
    questionType: 'mcq',
    status: QUESTION_STATUS[0],
    choices: {
      a: 'To manage complex state logic in a functional component',
      b: 'To handle side effects in a functional component',
      c: 'To create a context in a functional component',
      d: "To access the component's lifecycle methods",
    },
  },
];

const useInterval = (callback: any, delay: any) => {
  const savedCallback = useRef() as any;

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const Page = () => {
  const router = useRouter();
  const [secondsRemaining, setSecondsRemaining] = usePersistState(
    EXAM_DURATION,
    'RemainingTime',
  );
  const [examStatus, setExamStatus] = usePersistState(
    EXAM_STATUS?.STARTED,
    'Status',
  );
  const [CurrentQuestion, setCurrentQuestion] = usePersistState(
    0,
    'CurrentQuestion',
  );
  const [answerSheet, setAnswerSheet] = usePersistState([], 'answerSheet');
  const [finishExamModal, setFinishExamModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<any>('');
  const [questionSheet, setQuestinSheet] = useState(EXAM_QUESTIONS);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  const twoDigits = (num: any) => String(num).padStart(2, '0');
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        toast.error('Time is over');
        setExamStatus(EXAM_STATUS.STOPPED);
        setSelectedAnswer('');
        setAnswerSheet([]);
      }
    },
    examStatus === EXAM_STATUS.STARTED ? 1000 : null,
    // passing null stops the interval
  );

  const handleNext = () => {
    if (CurrentQuestion + 1 !== questionSheet?.length) {
      setCurrentQuestion(CurrentQuestion + 1);
      if (selectedAnswer == '') {
        console.log('Inside', selectedAnswer);
        setAnswerSheet([
          ...answerSheet,
          {
            que_id: questionSheet[CurrentQuestion]?.que_id,
            answer: '',
            status: { id: 2, status: 'Not Answered', color: 'bg-meta-brown-1' },
          },
        ]);
      } else {
        setAnswerSheet([...answerSheet, selectedAnswer]);
      }
      setSelectedAnswer('');
    } else {
      setFinishExamModal(true);
      setCurrentQuestion(CurrentQuestion);
    }
  };

  const compareArrays = (a: any, b: any) => {
    a.forEach((element: any) => {
      const found = b.find((item: any) => item.que_id === element.que_id);
      if (found) {
        element.status = found.status;
      }
    });
    return a;
  };

  const updatedQuestions =
    answerSheet?.length !== 0
      ? compareArrays(questionSheet, answerSheet)
      : questionSheet;

  return (
    <div className="m-auto w-10/12 max-w-7xl">
      <div className="flex justify-between ">
        {/* <Image src={'/MainLogo.svg'} alt="MainLogo" width={199} height={33} /> */}
        <div>
          <p className="text-sm font-medium text-meta-purple-1">
            {TEXT?.TIME_REMAINING}
          </p>
          <div className="flex">
            <div>
              <div className="mt-3 flex gap-2">
                <div className="flex h-12 w-8 items-center justify-center rounded-lg bg-meta-light-blue-2 text-xl">
                  {twoDigits(hoursToDisplay).split('')[0]}
                </div>
                <div className="flex h-12 w-8 items-center justify-center rounded-lg bg-meta-light-blue-2 text-xl">
                  {twoDigits(hoursToDisplay).split('')[1]}
                </div>
              </div>
              <div className="mt-1 text-sm font-medium text-meta-light-blue-3">
                {TEXT?.HOURS}
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <div className="flex h-12  w-8 items-center justify-center text-xl">
                :
              </div>
            </div>
            <div>
              <div className="mt-3 flex gap-2">
                <div className="flex h-12 w-8 items-center justify-center rounded-lg bg-meta-light-blue-2 text-xl">
                  {twoDigits(minutesToDisplay).split('')[0]}
                </div>
                <div className="flex h-12 w-8 items-center justify-center rounded-lg bg-meta-light-blue-2 text-xl">
                  {twoDigits(minutesToDisplay).split('')[1]}
                </div>
              </div>
              <div className="mt-1 text-sm font-medium text-meta-light-blue-3">
                {TEXT?.MINS}
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <div className="flex h-12  w-8 items-center justify-center text-xl">
                :
              </div>
            </div>
            <div>
              <div className="mt-3 flex gap-2">
                <div className="flex h-12 w-8 items-center justify-center rounded-lg bg-meta-light-blue-2 text-xl">
                  {twoDigits(secondsToDisplay).split('')[0]}
                </div>
                <div className="flex h-12 w-8 items-center justify-center rounded-lg bg-meta-light-blue-2 text-xl">
                  {twoDigits(secondsToDisplay).split('')[1]}
                </div>
              </div>
              <div className="mt-1 text-sm font-medium text-meta-light-blue-3">
                {TEXT?.SECS}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 flex w-full gap-3">
        <div className="w-2/4 rounded-2xl border border-meta-light-blue-2 bg-hiring-btn-gradient p-5">
          <div className="flex justify-center ">
            <p className="text-meta-purple text-lg font-semibold">
              {TEXT?.QUIZ_DETAIL}{' '}
            </p>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="w-2/3">
              <p className="text-sm font-medium text-meta-light-blue-2">
                {TEXT?.NAME}
              </p>
              <p className="text-sm font-medium text-meta-purple-1">
                Certify Recruit Certification exam
              </p>
            </div>
            <div className="w-2/3">
              <p className="text-sm font-medium text-meta-light-blue-2">
                {TEXT?.START_DATE_TIME}
              </p>
              <p className="text-sm font-medium text-meta-purple-1">
                2024-03-05 08:00:00
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="w-2/3">
              <p className="text-sm font-medium text-meta-light-blue-2">
                {TEXT?.MARKS_PER_QUESTION}
              </p>
              <p className="text-sm font-medium text-meta-purple-1">1</p>
            </div>
            <div className="w-2/3">
              <p className="text-sm font-medium text-meta-light-blue-2">
                {TEXT?.MAX_TAB_SWITCH_ALLOW}
              </p>
              <p className="text-sm font-medium text-meta-purple-1">3</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="w-2/3">
              <p className="text-sm font-medium text-meta-light-blue-2">
                {TEXT?.DURATION}
              </p>
              <p className="text-sm font-medium text-meta-purple-1">05 Min</p>
            </div>
            <div className="w-2/3">
              <p className="text-sm font-medium text-meta-light-blue-2">
                {TEXT?.NEGATIVE_MARKS_PER_QUESTION}
              </p>
              <p className="text-sm font-medium text-meta-purple-1">0</p>
            </div>
          </div>
        </div>
        <div className="w-2/4 rounded-2xl border border-meta-light-blue-2 p-5">
          <div className="flex justify-center ">
            <p className="text-lg font-semibold text-meta-purple-1">
              {TEXT?.QUESTION_PALETTE}{' '}
            </p>
          </div>
          <div className="mt-5 flex w-full flex-wrap gap-4">
            {QUESTION_STATUS.map((list) => {
              return (
                list?.id !== 1 && (
                  <div className="flex items-center gap-2" key={list?.id}>
                    <div className={`${list?.color} h-4 w-4 rounded-sm`}></div>
                    <p>{list?.status}</p>
                  </div>
                )
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            {updatedQuestions.map((list: any, i: any) => {
              return (
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-[4px]  text-center  ${list?.status?.color} text-white `}
                >
                  <p>{`${i > 10 ? '0' : ''} ${i + 1} `}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-9">
        <p className="text-base font-medium text-meta-purple-1">
          {`Question ${CurrentQuestion + 1} of ${updatedQuestions?.length}`}
        </p>
        <div className="mt-5">
          <p className="text-base font-bold text-meta-purple-1">
            {updatedQuestions[CurrentQuestion]?.text}
          </p>
          <div className="mt-2">
            {Object?.keys(
              updatedQuestions[CurrentQuestion]?.choices as any,
            )?.map((key: any) => {
              return (
                <div className="my-2 w-full rounded-lg border border-meta-light-blue-1 p-3">
                  <label
                    htmlFor={key}
                    className={`flex cursor-pointer select-none items-center justify-between `}
                  >
                    <div className="flex gap-2 pl-3">
                      <p className="capitalize">{key}.</p>
                      <p>{updatedQuestions[CurrentQuestion]?.choices?.[key]}</p>
                    </div>
                    <input
                      type="checkbox"
                      id={key}
                      value={key}
                      checked={selectedAnswer?.answer === key}
                      onChange={(e) =>
                        setSelectedAnswer({
                          que_id: updatedQuestions[CurrentQuestion]?.que_id,
                          answer: e?.target?.value,
                          status: QUESTION_STATUS[2],
                        })
                      }
                    />
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="my-10 border-t border-meta-light-blue-2"></div>
      <div className={`"w-full   flex  items-end justify-between`}>
        <div className="flex gap-3">
          {CurrentQuestion !== 0 && (
            <button
              type="button"
              onClick={() => {
                setCurrentQuestion(CurrentQuestion - 1);
              }}
              className="mb-8 h-12 min-w-full rounded-lg  bg-meta-light-blue-1 text-base font-medium text-meta-light-blue-3 sm:mb-8 sm:min-w-48"
            >
              {TEXT?.BACK}
            </button>
          )}
          <button
            type="button"
            // onClick={handlePrevious}
            className="mb-8 h-12 min-w-full rounded-lg  bg-meta-light-blue-1 px-3 text-base font-medium text-meta-light-blue-3 sm:mb-8 sm:min-w-48"
          >
            Answered & Marked for Review
          </button>
        </div>
        <button
          onClick={() => {
            handleNext();
          }}
          className={`mb-8 h-12  min-w-48 rounded-lg border border-meta-light-blue-2 bg-meta-blue-1 py-3 text-meta-light-blue-3 transition delay-150 duration-300 ease-in-out will-change-auto hover:bg-hiring-btn-gradient`}
        >
          <span
            className={`flex justify-center text-sm font-medium text-white`}
          >
            {CurrentQuestion + 1 !== questionSheet?.length
              ? TEXT?.NEXT
              : 'Finish'}
          </span>
        </button>
      </div>
      <FinishExamDialog
        isOpen={finishExamModal}
        setIsOpen={setFinishExamModal}
      />
    </div>
    // <ResultComp />
  );
};

export default Page;
