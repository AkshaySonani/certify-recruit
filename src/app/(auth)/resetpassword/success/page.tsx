'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTE, TEXT } from '@/service/Helper';

const Page = (data: any) => {
  const router = useRouter();
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center py-20">
          <Image src={'/MainLogo.svg'} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')] ">
          <div className="flex justify-center">
            <div className="mb-20 w-10/12 min-w-72 max-w-md rounded-3xl border border-meta-light-blue-2 bg-white px-5 py-10 sm:px-10">
              <div className="my-6 flex justify-center">
                <Image
                  height={136}
                  alt="MainLogo"
                  width={155.24}
                  src={'/login/successful.svg'}
                />
              </div>
              <p className="mb-2 text-center text-sm font-medium text-meta-light-blue-3">
                Congratulations! Your Password has been reset! You are ready to
                roll again!
              </p>
              <h3 className="mb-10 mt-3 text-center text-2xl font-semibold text-meta-purple-1">
                Reset Successful
              </h3>

              <div className="flex items-center justify-center text-lg font-medium text-meta-light-blue-3">
                <span
                  onClick={() => {
                    if (data?.searchParams?.new === '') {
                      router.push(ROUTE?.DASHBOARD);
                    } else {
                      router.push('/login');
                    }
                  }}
                  className="mr-2 cursor-pointer text-meta-blue-2"
                >
                  {data?.searchParams?.new == ''
                    ? 'Go To Dashobard'
                    : TEXT?.GO_TO_LOGIN}
                </span>
                <Image
                  width={17}
                  height={7}
                  alt="LeftArrow"
                  src={'/LeftArrow.svg'}
                  className="rotate-180"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
