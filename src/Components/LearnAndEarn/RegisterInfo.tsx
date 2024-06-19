'use client';
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/service/Helper';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { toast } from 'react-toastify';
import QuizInfo from './QuizInfo';

const RegisterInfo = ({ userDetails }: any) => {
  const router = useRouter();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [showQuizInfo, setShowQuizInfo] = useState(false);

  useEffect(() => {
    const checkRegistrationTime = () => {
      const currentTime = new Date();
      // Set the start and end times for registration
      const startTime = new Date();
      startTime.setHours(8, 0, 0); // 8:00 AM

      const endTime = new Date();
      endTime.setHours(12, 0, 0); // 12:00 PM

      // const endTime = new Date(currentTime); //for Testing
      // endTime.setDate(endTime.getDate() + 1); // Move to the next day  //for Testing
      // endTime.setHours(1, 0, 0); // 1:00 AM next day

      // Check if current time is between start and end time
      if (currentTime >= startTime && currentTime <= endTime) {
        setIsRegistrationOpen(true);
      } else {
        setIsRegistrationOpen(false);
      }
    };
    checkRegistrationTime();
    // Optional: Check every minute to update the button state
    const interval = setInterval(checkRegistrationTime, 60000); // 60000ms = 1 minute
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const userRegistarion = () => {
    API.post(API_CONSTANT?.UPDATE_LE_DETAILS, {})
      .then((res: any) => {
        if (res?.data?.data) {
          toast.info('Your quiz started at 8:00 PM');
        }
        setIsRegistrationOpen(false);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || 'Internal server error');
      });
  };

  useEffect(() => {
    if (
      userDetails?.learn_and_earn &&
      userDetails?.learn_and_earn?.result !== 0
    ) {
      router?.replace('/quiz/results');
    }
  }, [userDetails]);
  console.log('userDetails', userDetails);

  return (
    <div>
      {userDetails?.learn_and_earn?.register === true &&
      showQuizInfo === true ? (
        <QuizInfo userDetails={userDetails} />
      ) : (
        <div>
          <div className="mb-4 text-2xl font-semibold text-meta-purple-1">
            {TEXT?.LEARN_AND_EARN}
          </div>
          <div className="h-52 w-full rounded-xl bg-meta-gray-2 py-10">
            <div className="m-auto h-full w-[70%] ">
              <p className="text-center text-base text-meta-purple-1">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
              <div className="flex w-full justify-center">
                {userDetails?.learn_and_earn?.register === true ? (
                  <button
                    onClick={() => setShowQuizInfo(true)}
                    className={`mt-5 rounded-xl bg-meta-blue-1 px-5 py-3 text-base text-white`}
                  >
                    {TEXT?.Join_Now}
                  </button>
                ) : (
                  <button
                    onClick={() => userRegistarion()}
                    disabled={!isRegistrationOpen}
                    className={`${!isRegistrationOpen ? 'cursor-not-allowed' : 'cursor-pointer'} mt-5 rounded-xl bg-meta-blue-1 px-5 py-3 text-base text-white`}
                  >
                    {TEXT?.REGISTRATION}
                  </button>
                )}
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
      )}
    </div>
  );
};

export default RegisterInfo;
