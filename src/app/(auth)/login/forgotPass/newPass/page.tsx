'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTE, TEXT } from '@/service/Helper';

const Page = () => {
  const router = useRouter();
  const [eye, setEye] = useState<Record<string, boolean>>({
    pass: false,
    confirmPass: false,
  });
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center py-20">
          <Image src={'/MainLogo.svg'} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')]">
          <div className="flex justify-center">
            <div className="mb-20 w-10/12 min-w-72 max-w-md rounded-3xl border border-meta-light-blue-2 bg-white px-5 py-10 sm:px-10">
              <h3 className="mb-4 text-center text-3xl font-bold text-meta-purple-1">
                {TEXT?.SET_NEW_PASSWORD}
              </h3>
              <p className="mb-10 text-center text-sm font-medium text-meta-light-blue-3">
                {TEXT?.MUST_BE_AT_LEAST_CHARACTERS}
              </p>

              <div className="relative mb-6">
                <input
                  placeholder={TEXT?.PASSWORD}
                  type={eye.pass ? 'text' : 'password'}
                  className="h-12 w-full rounded-xl border border-meta-light-blue-2 pl-4"
                />
                {!eye.pass && (
                  <Image
                    alt="eye"
                    width={18}
                    height={18}
                    src={'/login/Eye-close.svg'}
                    className="absolute right-4 top-4"
                    onClick={() =>
                      setEye((prev) => ({ ...prev, pass: !prev.pass }))
                    }
                  />
                )}
                {eye.pass && (
                  <Image
                    alt="eye"
                    width={18}
                    height={18}
                    src={'/login/Eye-open.svg'}
                    className="absolute right-4 top-4"
                    onClick={() =>
                      setEye((prev) => ({ ...prev, pass: !prev.pass }))
                    }
                  />
                )}
              </div>
              <div className="relative mb-8">
                <input
                  placeholder={TEXT?.CONFIRM_PASSWORD}
                  type={eye.confirmPass ? 'text' : 'password'}
                  className="h-12 w-full rounded-xl border border-meta-light-blue-2 pl-4"
                />
                {!eye.confirmPass && (
                  <Image
                    alt="eye"
                    width={18}
                    height={18}
                    src={'/login/Eye-close.svg'}
                    className="absolute right-4 top-4"
                    onClick={() =>
                      setEye((prev) => ({
                        ...prev,
                        confirmPass: !prev.confirmPass,
                      }))
                    }
                  />
                )}
                {eye.confirmPass && (
                  <Image
                    alt="eye"
                    width={18}
                    height={18}
                    src={'/login/Eye-open.svg'}
                    className="absolute right-4 top-4"
                    onClick={() =>
                      setEye((prev) => ({
                        ...prev,
                        confirmPass: !prev.confirmPass,
                      }))
                    }
                  />
                )}
              </div>

              <button
                className="mb-8 h-12 w-full rounded-xl border border-meta-light-blue-2 bg-meta-light-blue-1 text-meta-purple-1 hover:bg-meta-blue-2 hover:text-white"
                onClick={() => router.push(ROUTE?.SUCCESSFULL_FORGOT_PASSWORD)}
              >
                <span className="flex justify-center text-sm font-medium">
                  {TEXT?.RESET_PASSWORD}
                </span>
              </button>
              <div className="mb-3 flex items-center justify-center text-sm font-medium text-meta-light-blue-3">
                <span className="cursor-pointer" onClick={() => router.back()}>
                  {TEXT?.CANCEL}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
