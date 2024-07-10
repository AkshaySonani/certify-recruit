'use client';
import moment from 'moment';
import Image from 'next/image';
import { toast } from 'react-toastify';
import API from '@/service/ApiService';
import { useRouter } from 'next/navigation';
import { ROUTE, TEXT } from '@/service/Helper';
import usePersistState from '@/hooks/usePersistState';
import ResultComp from '@/Components/exam/ResultComp';
import { API_CONSTANT } from '@/constant/ApiConstant';
import React, { useEffect, useRef, useState } from 'react';
import FinishExamDialog from '@/Components/exam/FinishExamDialog';
import { EXAM_STATUS, QUESTION_STATUS, RENDER_OPTION } from '@/constant/Enum';
import jwt from 'jsonwebtoken';

const Page = (data: any) => {
  const router = useRouter();
  const intervalRef = useRef<any>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 60);
  const [startTime, setStartTime] = usePersistState(
    Date.now(),
    'Exam:startTime',
  );
  const [endTime, setEndTime] = usePersistState(30 * 60, 'Exam:endTime');
  const [examStatus, setExamStatus] = usePersistState(
    EXAM_STATUS?.STARTED,
    'Exam:Status',
  );
  const [CurrentQuestion, setCurrentQuestion] = usePersistState(
    0,
    'Exam:CurrentQuestion',
  );
  const [categories, setCategories] = usePersistState([], 'Exam:category');
  const [answerSheet, setAnswerSheet] = usePersistState([], 'Exam:answerSheet');
  const [finishExamModal, setFinishExamModal] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<any>('');
  const [examId, setExamId] = usePersistState('', 'Exam:examId');
  const [results, setResults] = useState(undefined);
  const [questionSheet, setQuestionSheet] = usePersistState(
    [],
    'Exam:questionSheet',
  );
  const secondsToDisplay = Math.floor(secondsRemaining % 60);
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = Math.floor(secondsRemaining / 60);
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;
  const twoDigits = (num: any) => String(num).padStart(2, '0');

  const queryToken = data?.searchParams.token;
  const decoded: any = jwt.decode(queryToken);
  console.log(decoded);

  useEffect(() => {
    if (queryToken) {
      setCategories(decoded?.categoryIds);
    }
  }, [queryToken]);

  useEffect(() => {
    if (startTime) {
      setExamStatus(EXAM_STATUS?.STARTED);
      const elapsedTime = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      const newTime = endTime
        ? parseInt(endTime) - elapsedTime
        : 30 * 60 - elapsedTime;
      setSecondsRemaining(newTime > 0 ? newTime : 0);
    }
    if (questionSheet?.length === 0) {
      clearStorage();
    }

    // Start interval to update timer
    intervalRef.current = setInterval(() => {
      setSecondsRemaining((prevTime: any) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          toast.error('Time is over');
          handleFinishExam();
          clearInterval(intervalRef.current);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (questionSheet?.length === 0) {
      getQuestionSheet();
    }
  }, []);

  useEffect(() => {
    if (categories?.length === 0 && results === undefined && !queryToken) {
      router.replace(ROUTE?.CERTIFICATION);
    }
  }, []);

  const compareArrays = (a: any, b: any) => {
    a.forEach((element: any) => {
      const found = b.find((item: any) => item?._id === element?._id);
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

  const getQuestionSheet = () => {
    const obj = {
      categoryIds: categories?.map((el: any) => el?._id),
    };
    API.post(API_CONSTANT?.QUESTION, obj)
      .then((res: any) => {
        if (res?.data?.status === 200) {
          setExamId(res?.data?.exam_id);
          let questionArr = res?.data?.data?.map((list: any) => {
            return {
              ...list,
              status: QUESTION_STATUS[0],
            };
          });
          setQuestionSheet(questionArr);
          setExamStatus(EXAM_STATUS?.STARTED);
          const newStartTime = Date.now();
          setStartTime(newStartTime);
          setEndTime(30 * 60);
        }
      })
      .catch((error) => {
        toast.error(error || 'Something want wrong');
      });
  };

  const clearStorage = () => {
    localStorage.removeItem('Exam:startTime');
    localStorage.removeItem('Exam:endTime');
    setSelectedAnswer('');
    setExamStatus(EXAM_STATUS.STOPPED);
    setQuestionSheet([]);
    // setCategories([]);
    setCurrentQuestion(0);
    setAnswerSheet([]);
    setExamId('');
  };

  const handleAnswer = (e: any, key: any) => {
    if (e?.target?.checked === true) {
      if (answerSheet[CurrentQuestion]) {
        answerSheet[CurrentQuestion].ans =
          updatedQuestions[CurrentQuestion]?.option?.[key];
      }
      setSelectedAnswer({
        _id: updatedQuestions[CurrentQuestion]?._id,
        ans: updatedQuestions[CurrentQuestion]?.option?.[key],
        status: QUESTION_STATUS[2],
      });
    } else {
      if (answerSheet[CurrentQuestion]) {
        answerSheet[CurrentQuestion].ans = '';
      }
      setSelectedAnswer({
        _id: updatedQuestions[CurrentQuestion]?._id,
        ans: '',
        status: QUESTION_STATUS[1],
      });
    }
  };

  const handleFinishExam = () => {
    const obj = {
      exam_id: examId,
      answers: answerSheet.map(({ _id, ans }: any) => ({ que_id: _id, ans })),
    };
    API.post(API_CONSTANT?.CHECK_ANSWER, obj)
      .then((res: any) => {
        if (res?.data?.status === 200) {
          setResults(res?.data?.data);
          setCategories([]);
          clearStorage();
        }
      })
      .catch((error: any) => {
        toast.error(error || 'Something want wrong');
      });
  };

  const handleBackToExam = () => {
    setFinishExamModal(false);
    setCurrentQuestion(CurrentQuestion);
  };

  const handleNext = () => {
    if (
      answerSheet.some(
        (element: any) =>
          element._id === updatedQuestions[CurrentQuestion]?._id,
      )
    ) {
      const updatedElements = answerSheet.map((element: any) => {
        if (element._id === updatedQuestions[CurrentQuestion]?._id) {
          return {
            ...element,
            status: selectedAnswer
              ? selectedAnswer?.status
              : answerSheet[CurrentQuestion]?.status,
            ans: selectedAnswer?.ans
              ? selectedAnswer?.ans
              : answerSheet[CurrentQuestion]?.ans,
          };
        }
        return element;
      });
      questionSheet[CurrentQuestion].status = selectedAnswer
        ? selectedAnswer?.status
        : answerSheet[CurrentQuestion]?.status;
      setAnswerSheet(updatedElements);
    } else {
      if (selectedAnswer == '') {
        questionSheet[CurrentQuestion].status = QUESTION_STATUS[1];
        setAnswerSheet([
          ...answerSheet,
          {
            _id: questionSheet[CurrentQuestion]?._id,
            ans: answerSheet[CurrentQuestion]?.ans || '',
            status: QUESTION_STATUS[1],
          },
        ]);
      } else {
        questionSheet[CurrentQuestion].status = selectedAnswer?.status;
        setAnswerSheet([...answerSheet, selectedAnswer]);
      }
    }
    setSelectedAnswer('');
    if (CurrentQuestion + 1 !== questionSheet?.length) {
      setCurrentQuestion(CurrentQuestion + 1);
    } else {
      setFinishExamModal(true);
    }
  };

  const handleMarkedForReview = () => {
    if (
      answerSheet.some(
        (element: any) =>
          element._id === updatedQuestions[CurrentQuestion]?._id,
      )
    ) {
      const updatedElements = answerSheet.map((element: any) => {
        if (element._id === updatedQuestions[CurrentQuestion]?._id) {
          return {
            ...element,
            status:
              selectedAnswer?.status?.status == 'Answered'
                ? QUESTION_STATUS[4]
                : QUESTION_STATUS[3],
            ans: selectedAnswer?.ans
              ? selectedAnswer?.ans
              : answerSheet[CurrentQuestion]?.ans,
          };
        }
        return element;
      });
      questionSheet[CurrentQuestion].status =
        selectedAnswer?.status?.status == 'Answered';
      setAnswerSheet(updatedElements);
    } else {
      if (selectedAnswer === '') {
        questionSheet[CurrentQuestion].status = QUESTION_STATUS[3];
        setAnswerSheet([
          ...answerSheet,
          {
            _id: questionSheet[CurrentQuestion]?._id,
            ans: answerSheet[CurrentQuestion]?.ans || '',
            status: QUESTION_STATUS[3],
          },
        ]);
      } else {
        questionSheet[CurrentQuestion].status = QUESTION_STATUS[4];
        setAnswerSheet([
          ...answerSheet,
          {
            _id: updatedQuestions[CurrentQuestion]?._id,
            ans: updatedQuestions[CurrentQuestion]?.ans,
            status: QUESTION_STATUS[4],
          },
        ]);
      }
    }
    setSelectedAnswer('');
    if (CurrentQuestion + 1 !== questionSheet?.length) {
      setCurrentQuestion(CurrentQuestion + 1);
    }
  };

  return (
    <>
      {results === undefined ? (
        questionSheet?.length !== 0 && (
          <div className="m-auto w-10/12 max-w-7xl">
            <div className="flex justify-between ">
              <Image
                src={'/MainLogo.svg'}
                alt="MainLogo"
                width={199}
                height={33}
              />
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
                      {moment().toString()}
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
                    <p className="text-sm font-medium text-meta-purple-1">
                      05 Min
                    </p>
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
                          <div
                            className={`${list?.color} h-4 w-4 rounded-sm`}
                          ></div>
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
                        className={`flex h-8 w-8 items-center justify-center rounded-[4px]  text-center  ${list?.status?.color} 
                        ${list?.status?.status == 'Default' ? 'text-meta-purple-1' : 'text-white'}  `}
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
                  {updatedQuestions[CurrentQuestion]?.question}
                </p>
                <div className="mt-2">
                  {updatedQuestions.length !== 0 &&
                    Object?.keys(
                      updatedQuestions[CurrentQuestion]?.option as any,
                    )?.map((key: any) => {
                      const check =
                        updatedQuestions[CurrentQuestion]?.option?.[key] ===
                          selectedAnswer?.ans ||
                        updatedQuestions[CurrentQuestion]?.option?.[key] ===
                          answerSheet?.[CurrentQuestion]?.ans;

                      return (
                        <div
                          className={`my-2 w-full rounded-lg border  p-3 ${check === true ? 'border-meta-blue-2' : 'border-meta-light-blue-1'} `}
                        >
                          <label
                            htmlFor={key}
                            className={`flex cursor-pointer select-none items-center justify-between `}
                          >
                            <div className="flex gap-2 pl-3">
                              <p className="capitalize">
                                {RENDER_OPTION[key]?.[key]}
                              </p>
                              <p>
                                {
                                  updatedQuestions[CurrentQuestion]?.option?.[
                                    key
                                  ]
                                }
                              </p>
                            </div>
                            <input
                              type="checkbox"
                              id={key}
                              value={
                                updatedQuestions[CurrentQuestion]?.option?.[key]
                              }
                              checked={check}
                              onChange={(e) => handleAnswer(e, key)}
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
                  onClick={handleMarkedForReview}
                  className="mb-8 h-12 min-w-full rounded-lg  bg-meta-light-blue-1 px-3 text-base font-medium text-meta-light-blue-3 sm:mb-8 sm:min-w-48"
                >
                  {selectedAnswer?.ans || answerSheet?.[CurrentQuestion]?.ans
                    ? 'Answered & Marked for Review'
                    : 'Marked for Review'}
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
              handleFinishExam={handleFinishExam}
              allAnswer={answerSheet.some((ele: any) => ele?.ans === '')}
              handleBackToExam={handleBackToExam}
            />
          </div>
        )
      ) : (
        <ResultComp results={results} setResults={setResults} />
      )}
    </>
  );
};

export default Page;
