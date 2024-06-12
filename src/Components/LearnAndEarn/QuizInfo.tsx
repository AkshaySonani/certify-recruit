'use client';
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/service/Helper';

const QuizInfo = ({ userDetails }: any) => {
  const startTime = new Date(userDetails?.learn_and_earn?.registration_time);
  const targetTime = new Date(startTime) as any;
  targetTime.setHours(20, 0, 0); // Set to 8:00 PM

  const calculateTimeLeft = () => {
    const now = new Date() as any;
    const difference = targetTime - now;
    let timeLeft = {} as any;
    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const twoDigits = (num: any) => String(num).padStart(2, '0');
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer on component unmount
  }, []);
  const router = useRouter();
  console.log('userDetails', userDetails);

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
          onClick={() => router.push('/quiz')}
          className="rounded-xl bg-meta-light-blue-1 px-8 py-2 text-meta-light-blue-3"
        >
          {TEXT?.Join_Now}
        </button>
      </div>
    </div>
  );
};

export default QuizInfo;
