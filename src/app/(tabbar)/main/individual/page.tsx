'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/service/Helper';
import SignupForm from '@/Components/SignupForm';

const Page = () => {
  const router = useRouter();
  const [showForms, setShowForms] = useState(false);
  const individualArr = [
    'US Recruitment',
    'Domestic Recruitment',
    'Human Resource',
    'Bench Sales',
    'UK Recruitment',
    'Canada Recruitment',
  ];

  return (
    <div>
      {showForms ? (
        <SignupForm />
      ) : (
        <div className="container mx-auto h-screen">
          <div className="flex justify-center py-20">
            <Image
              src={'/MainLogo.svg'}
              alt="MainLogo"
              width={334}
              height={56}
            />
          </div>

          <div className="w-full bg-[url('/_Compound.svg')]">
            <div className="relative m-auto w-[70%] rounded-3xl border border-meta-light-blue-2 bg-white p-8 shadow-[0px_2px_10px_0px_#00000006]">
              <div className="flex w-full justify-center gap-1">
                <Image
                  alt="icon"
                  width={22}
                  height={22}
                  src={'/Individual.svg'}
                />
                <p className="text-lg font-semibold text-meta-blue-1">
                  {TEXT?.INDIVIDUAL}
                </p>
              </div>
              <div className="absolute top-10" onClick={() => router?.back()}>
                <Image
                  width={22}
                  height={22}
                  alt="LeftArrow"
                  src={'/LeftArrow.svg'}
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {individualArr?.map((list) => {
                  return (
                    <div className="flex w-3/6 items-center justify-between rounded-xl border border-meta-light-blue-1 px-3 py-3">
                      <div className="flex gap-3 ">
                        <Image
                          alt="icon"
                          width={16}
                          height={20}
                          src={'/Individual.svg'}
                        />
                        <p className="text-sm font-medium text-meta-light-blue-3">
                          {list}
                        </p>
                      </div>

                      <input
                        value=""
                        type="radio"
                        id="inline-2-radio"
                        name="inline-radio-group"
                        className="h-5 w-5 border-meta-light-blue-1 bg-meta-blue-1 text-meta-blue-1"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            onClick={() => setShowForms(true)}
            className="m-auto mt-5 flex w-[70%] cursor-pointer items-center justify-end gap-4"
          >
            <p className="text-lg font-medium text-meta-blue-1">{TEXT?.NEXT}</p>
            <Image
              width={22}
              height={22}
              alt="LeftArrow"
              src={'/RightArrow.svg'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
