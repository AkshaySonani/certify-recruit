'use client';
import Image from 'next/image';
import React, { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/service/Helper';

const RegisterInfo = () => {
  const router = useRouter();

  return (
    <div>
      <div>
        <div className="mb-4 text-2xl font-semibold text-meta-purple-1">
          {TEXT?.LEARN_AND_EARN}
        </div>
        <div className="h-52 w-full rounded-xl bg-meta-gray-2 py-10">
          <div className="m-auto h-full w-[70%] ">
            <p className="text-center text-base text-meta-purple-1">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
            <div className="flex w-full justify-center">
              <button className="mt-5 rounded-xl bg-meta-blue-1 px-5 py-3 text-base text-white">
                {TEXT?.REGISTRATION}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-xl font-semibold text-meta-purple-1">
            {TEXT?.REGISTRATION_INFO}
          </p>
        </div>
        <div className="mt-3 flex w-full gap-3">
          <div className="flex w-1/2 items-center gap-3 rounded-lg bg-meta-light-blue-2 py-3 pl-4">
            <div className="relative h-12 w-12 rounded-full bg-white">
              <Image
                alt="Icon"
                width={23}
                height={23}
                className="absolute left-3 top-3"
                src={'/individual/timeClock.svg'}
              />
            </div>
            <div className="text-sm text-meta-light-blue-3">
              {TEXT?.REGISTRATION_TIME}
            </div>
          </div>
          <div className="flex w-1/2 items-center gap-3 rounded-lg bg-meta-light-blue-2 py-3 pl-4">
            <div className="relative h-12 w-12 rounded-full bg-white">
              <Image
                alt="Icon"
                width={23}
                height={23}
                className="absolute left-3 top-3"
                src={'/individual/timeHourGlass.svg'}
              />
            </div>
            <div className="text-sm text-meta-light-blue-3">
              {TEXT?.QUIZ_JOINING_TIME}
            </div>
          </div>
        </div>
        <div className="mt-3 flex w-full gap-3">
          <div className="flex w-1/2 items-center gap-3 rounded-lg bg-meta-light-blue-2 py-3 pl-4">
            <div className="relative h-12 w-12 rounded-full bg-white">
              <Image
                alt="Icon"
                width={23}
                height={23}
                src={'/individual/clipboard.svg'}
                className="absolute left-3 top-3"
              />
            </div>
            <div className="text-sm text-meta-light-blue-3">
              {TEXT?.RESULT_ANNULMENT_TIME}
            </div>
          </div>
          <div className="flex w-1/2 items-center gap-3 rounded-lg bg-meta-light-blue-2 py-3 pl-4">
            <div className="relative h-12 w-12 rounded-full bg-white">
              <Image
                alt="Icon"
                width={23}
                height={23}
                src={'/individual/starPrise.svg'}
                className="absolute left-3 top-3"
              />
            </div>
            <div className="text-sm text-meta-light-blue-3">
              {TEXT?.WINNING_PRIZE_REDEEM_WITH_HOURS_AFTER_TEST_COMPLETE}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterInfo;
