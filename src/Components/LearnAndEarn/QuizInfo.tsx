'use client';
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/service/Helper';
import { log } from 'console';
import { toast } from 'react-toastify';

const QuizInfo = ({ userDetails }: any) => {
  const checkMeetingTime = () => {
    const now = new Date();
    const startTime = new Date();
    startTime.setHours(20, 0, 0, 0); // 8:00 PM
    const endTime = new Date();
    endTime.setHours(20, 45, 0, 0); // 8:45 PM
    if (now >= startTime && now <= endTime) {
      toast.info('quiz is started please join');
      router.replace('/quiz');
    } else {
      toast.error('Sorry, you cannot join the meeting now.');
    }
  };
  const getNextTargetTime = () => {
    const now = new Date();
    const target = new Date();

    // target.setHours(23, 30, 0, 0);  //  For testing Set target time to 11:30 PM today

    //set Target time 8:45
    target.setHours(20, 45, 0, 0);
    // If the current time is after 11:30 PM, set target to 11:30 PM the next day
    return target;
  };
  const calculateTimeLeft = (target: any) => {
    const now = new Date();
    const difference = +target - +now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };
  const [targetTime, setTargetTime] = useState(getNextTargetTime());
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const router = useRouter();
  const twoDigits = (num: any) => String(num).padStart(2, '0');
  return (
    <div>
      <div className="mb-4 text-2xl font-semibold text-meta-purple-1">
        {TEXT?.LEARN_AND_EARN}
      </div>
      <div className="h-52 w-full rounded-xl bg-meta-gray-2 py-3">
        <div className="m-auto h-full w-[70%]">
          <div className="mb-5">
            <p className="my-3 text-center text-base font-medium text-meta-purple-1">
              {TEXT?.TIME_REMAINING}
            </p>
            <div className="flex justify-center gap-2">
              <div className="flex h-14 w-9 items-center justify-center rounded-md bg-meta-light-blue-2">
                <p className="text-2xl font-semibold text-meta-light-blue-3">
                  {twoDigits(timeLeft?.hours).split('')[0]}
                </p>
              </div>
              <div className="flex h-14 w-9 items-center justify-center rounded-md bg-meta-light-blue-2">
                <p className="text-2xl font-semibold text-meta-light-blue-3">
                  {twoDigits(timeLeft?.hours).split('')[1]}
                </p>
              </div>
              <div className="flex h-14 w-5 items-center justify-center">
                <p className="text-2xl font-semibold text-meta-light-blue-3">
                  :
                </p>
              </div>
              <div className="flex h-14 w-9 items-center justify-center rounded-md bg-meta-light-blue-2">
                <p className="text-2xl font-semibold text-meta-light-blue-3">
                  {twoDigits(timeLeft?.minutes).split('')[0]}
                </p>
              </div>
              <div className="flex h-14 w-9 items-center justify-center rounded-md bg-meta-light-blue-2">
                <p className="text-2xl font-semibold text-meta-light-blue-3">
                  {twoDigits(timeLeft?.minutes).split('')[1]}
                </p>
              </div>
              <div className="flex h-14 w-5 items-center justify-center">
                <p className="text-2xl font-semibold text-meta-light-blue-3">
                  :
                </p>
              </div>
              <div className="flex h-14 w-9 items-center justify-center rounded-md bg-meta-light-blue-2">
                <p className="text-2xl font-semibold text-meta-light-blue-3">
                  {twoDigits(timeLeft?.seconds).split('')[0]}
                </p>
              </div>
              <div className="flex h-14 w-9 items-center justify-center rounded-md bg-meta-light-blue-2">
                <p className="text-2xl font-semibold text-meta-light-blue-3">
                  {twoDigits(timeLeft?.seconds).split('')[1]}
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-base text-meta-purple-1">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <div className="flex w-full justify-center" />
        </div>
      </div>
      <div className="mt-8">
        <p className="text-xl font-semibold text-meta-purple-1">
          {TEXT?.QUIZ_INFO}
        </p>
      </div>
      <div className="mt-3 flex w-full gap-3">
        <div className="flex w-1/2 items-center gap-3 rounded-lg bg-meta-light-blue-2 py-3 pl-4">
          <div className="relative h-12 w-12 rounded-full bg-white">
            <Image
              alt="Icon"
              width={23}
              height={23}
              src={'/individual/linkPin.svg'}
              className="absolute left-3 top-3"
            />
          </div>
          <div className="text-sm text-meta-light-blue-3">
            {TEXT?.REFER_THIS_ARTICLE_LINK}
          </div>
        </div>
        <div className="flex w-1/2 items-center gap-3 rounded-lg bg-meta-light-blue-2 py-3 pl-4">
          <div className="relative h-12 w-12 rounded-full bg-white">
            <Image
              alt="Icon"
              width={23}
              height={23}
              className="absolute left-3 top-3"
              src={'/individual/testExamClock.svg'}
            />
          </div>
          <div className="text-sm text-meta-light-blue-3">
            {TEXT?.QUIZ_JOINING_TIME}
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-end">
        <button
          // disabled={!isMeetingTime}
          onClick={() => {
            checkMeetingTime();
          }}
          className="rounded-xl bg-meta-light-blue-1 px-8 py-2 text-meta-light-blue-3"
        >
          {TEXT?.Join_Now}
        </button>
      </div>
    </div>
  );
};

export default QuizInfo;
