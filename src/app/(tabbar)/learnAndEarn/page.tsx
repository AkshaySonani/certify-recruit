'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTE, TEXT } from '@/service/Helper';
import RegisterInfo from '@/Components/LearnAndEarn/RegisterInfo';
import API from '@/service/ApiService';
import { API_CONSTANT } from '@/constant/ApiConstant';
import { toast } from 'react-toastify';

const Page = () => {
  const [userDetails, setUserDetails] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = () => {
    API.get(API_CONSTANT?.PROFILE)
      .then((res) => {
        setUserDetails(res?.data?.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      });
  };

  return (
    <div>
      {userDetails?.certificates?.length === 0 ? (
        <div>
          <div className="mb-4 text-2xl font-semibold text-meta-purple-1">
            {TEXT?.LEARN_AND_EARN}
          </div>
          <div className="h-52 rounded-xl bg-meta-gray-2">
            <div className="flex h-full flex-col items-center justify-center">
              <p className="text-base text-meta-purple-1">
                {
                  TEXT?.ONLY_WHEN_YOU_HAVE_CERTIFICATION_CAN_YOU_DO_LEARN_AND_EARN_USE
                }
              </p>
              <button
                onClick={() => router?.push(ROUTE?.CERTIFICATION)}
                className="mt-5 rounded-xl bg-meta-blue-1 px-5 py-3 text-base text-white"
              >
                {TEXT?.GO_TO_CERTIFICATION}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <RegisterInfo userDetails={userDetails} />
      )}
    </div>
  );
};

export default Page;
