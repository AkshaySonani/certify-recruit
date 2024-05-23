'use client';
import Image from 'next/image';
import React, { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/service/Helper';

const Page = () => {
  const router = useRouter();

  const questionStatus = [
    { id: 1, status: 'Answered', color: 'bg-meta-green-1' },
    { id: 2, status: 'Not Answered', color: 'bg-meta-brown-1' },
    { id: 3, status: 'Marked for Review', color: 'bg-meta-red-1' },
    {
      id: 4,
      status: 'Answered & Marked for Review ',
      color: 'bg-meta-purple-2',
    },
  ];

  return (
    <div className="m-auto w-10/12 max-w-7xl">
      <div className="flex justify-between ">
        <Image src={'/MainLogo.svg'} alt="MainLogo" width={199} height={33} />
        <div>
          <p className="text-sm font-medium text-meta-purple-1">
            {TEXT?.TIME_REMAINING}
          </p>
          <div className="flex">
            <div>
              <div className="mt-3 flex gap-2">
                <div className="flex h-12 w-8 items-center justify-center rounded-lg bg-meta-light-blue-2 text-xl">
                  0
                </div>
                <div className="flex h-12 w-8 items-center justify-center rounded-lg bg-meta-light-blue-2 text-xl">
                  0
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
                  3
                </div>
                <div className="flex h-12 w-8 items-center justify-center rounded-lg bg-meta-light-blue-2 text-xl">
                  5
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
                  3
                </div>
                <div className="flex h-12 w-8 items-center justify-center rounded-lg bg-meta-light-blue-2 text-xl">
                  5
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
        <div className="w-2/4 rounded-2xl border border-meta-light-blue-2 p-5">
          <div className="flex justify-center ">
            <p className="text-meta-purple text-lg font-semibold">
              {TEXT?.QUIZ_DETAIL}{' '}
            </p>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="w-2/3">
              <p className="text-sm font-medium text-meta-gray-1">
                {TEXT?.NAME}
              </p>
              <p className="text-sm font-medium">
                Certify Recruit Certification exam
              </p>
            </div>
            <div className="w-2/3">
              <p className="text-sm font-medium text-meta-gray-1">
                {TEXT?.START_DATE_TIME}
              </p>
              <p className="text-sm font-medium">2024-03-05 08:00:00</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="w-2/3">
              <p className="text-sm font-medium text-meta-gray-1">
                {TEXT?.MARKS_PER_QUESTION}
              </p>
              <p className="text-sm font-medium">1</p>
            </div>
            <div className="w-2/3">
              <p className="text-sm font-medium text-meta-gray-1">
                {TEXT?.MAX_TAB_SWITCH_ALLOW}
              </p>
              <p className="text-sm font-medium">3</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <div className="w-2/3">
              <p className="text-sm font-medium text-meta-gray-1">
                {TEXT?.DURATION}
              </p>
              <p className="text-sm font-medium">05 Min</p>
            </div>
            <div className="w-2/3">
              <p className="text-sm font-medium text-meta-gray-1">
                {TEXT?.NEGATIVE_MARKS_PER_QUESTION}
              </p>
              <p className="text-sm font-medium">0</p>
            </div>
          </div>
        </div>
        <div className="w-2/4 rounded-2xl border border-meta-light-blue-2 p-5">
          <div className="flex justify-center ">
            <p className="text-meta-purple text-lg font-semibold">
              {TEXT?.QUESTION_PALETTE}{' '}
            </p>
          </div>
          <div className="mt-5 flex w-full flex-wrap gap-4">
            {questionStatus.map((list) => {
              return (
                <div className="flex items-center gap-2">
                  <div className={`${list?.color} h-4 w-4 rounded-sm`}></div>
                  <p>{list?.status}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'].map(
              (list) => {
                return (
                  <div className=" flex h-8 w-8 items-center justify-center rounded-[4px] bg-meta-gray-2 text-center ">
                    <p>{list}</p>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>
      <div className="mt-9">
        <p className="text-base font-medium text-meta-purple-1">
          Question 1 of 30
        </p>
        <div className="mt-5">
          <p className="text-base font-bold text-meta-purple-1">
            What is the meaning of Lorem ipsum?
          </p>
          <div className="mt-2">
            <div className="w-full rounded-lg border border-meta-light-blue-1 p-3">
              <label
                htmlFor={'JoinNow'}
                className={`flex cursor-pointer select-none items-center justify-between `}
              >
                <div className="flex gap-2 pl-3">
                  <p>B.</p>
                  <p className=" capitalize">Join Now</p>
                </div>
                <input
                  type="checkbox"
                  id={'JoinNow'}
                  //   checked={joinNow ? true : false}
                  //   onChange={() => setJoinNow(true)}
                />
              </label>
            </div>
            <div className="mt-2 w-full rounded-lg border border-meta-light-blue-1 p-3">
              <label
                htmlFor={'JoinNow'}
                className={`flex cursor-pointer select-none items-center justify-between `}
              >
                <div className="flex gap-2 pl-3">
                  <p>A.</p>
                  <p className=" capitalize">Join Now</p>
                </div>
                <input
                  type="checkbox"
                  id={'JoinNow'}
                  //   checked={joinNow ? true : false}
                  //   onChange={() => setJoinNow(true)}
                />
              </label>
            </div>
            <div className="mt-2 w-full rounded-lg border border-meta-light-blue-1 p-3">
              <label
                htmlFor={'JoinNow'}
                className={`flex cursor-pointer select-none items-center justify-between `}
              >
                <div className="flex gap-2 pl-3">
                  <p>C.</p>
                  <p className=" capitalize">Join Now</p>
                </div>
                <input
                  type="checkbox"
                  id={'JoinNow'}
                  //   checked={joinNow ? true : false}
                  //   onChange={() => setJoinNow(true)}
                />
              </label>
            </div>
            <div className="mt-2 w-full rounded-lg border border-meta-light-blue-1 p-3">
              <label
                htmlFor={'JoinNow'}
                className={`flex cursor-pointer select-none items-center justify-between `}
              >
                <div className="flex gap-2 pl-3">
                  <p>D.</p>
                  <p className=" capitalize">Join Now</p>
                </div>
                <input
                  type="checkbox"
                  id={'JoinNow'}
                  //   checked={joinNow ? true : false}
                  //   onChange={() => setJoinNow(true)}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 border-t border-meta-light-blue-2"></div>
      <div className={`"w-full   flex  items-end justify-between`}>
        <div className="flex gap-3">
          <button
            type="button"
            // onClick={handlePrevious}
            className="mb-8 h-12 min-w-full rounded-lg  bg-meta-light-blue-1 text-base font-medium text-meta-light-blue-3 sm:mb-8 sm:min-w-48"
          >
            {TEXT?.BACK}
          </button>
          <button
            type="button"
            // onClick={handlePrevious}
            className="mb-8 h-12 min-w-full rounded-lg  bg-meta-light-blue-1 px-3 text-base font-medium text-meta-light-blue-3 sm:mb-8 sm:min-w-48"
          >
            Answered & Marked for Review
          </button>
        </div>
        <button
          //   onClick={() => setJoinConfirmModal(true)}
          className={`mb-8 h-12  min-w-48 rounded-lg border border-meta-light-blue-2 bg-meta-blue-1 py-3 text-meta-light-blue-3 transition delay-150 duration-300 ease-in-out will-change-auto hover:bg-hiring-btn-gradient`}
        >
          <span
            className={`flex justify-center text-sm font-medium text-white`}
          >
            {TEXT?.NEXT}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Page;
