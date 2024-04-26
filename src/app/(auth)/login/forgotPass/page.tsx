'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/service/Helper';

const Page = () => {
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
              <h3 className="mb-4 text-center text-3xl font-bold text-meta-purple-1">
                {TEXT?.FORGOT_PASSWORD}
              </h3>
              <p className="mb-10 text-center text-sm font-medium text-meta-light-blue-3">
                {TEXT?.PLEASE_SELECT_OPTION_TO_RECEIVE_PASSWORD_RESET_LINK}
              </p>

              <div className="mb-8 flex h-28 w-full items-center justify-between rounded-xl border border-meta-blue-1 bg-white px-4 sm:h-20">
                <div className="my-3 flex max-w-80 items-center">
                  <div className="mr-3">
                    <Image
                      src={'/login/email.svg'}
                      className="max-w-10"
                      alt="mail"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-meta-blue-1">
                      {TEXT?.RESET_VIA_EMAIL}
                    </p>
                    <p className="text-xs font-normal">
                      {TEXT?.YOU_WILL_BE_PROVIDE_A_UNIQUE}
                    </p>
                  </div>
                </div>

                <div className="m-4">
                  <input type="checkbox" />
                </div>
              </div>

              <button className="mb-8 h-12 w-full rounded-xl border border-meta-light-blue-2 bg-meta-blue-2">
                <span
                  onClick={() => router.push('/login/forgotPass/newPass')}
                  className="flex justify-center text-sm font-medium text-white"
                >
                  {TEXT?.SEND}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
