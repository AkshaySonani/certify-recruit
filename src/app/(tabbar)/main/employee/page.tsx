'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/service/Helper';

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="container mx-auto h-screen">
        <div className="flex justify-center py-20">
          <Image src={'/MainLogo.svg'} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')] ">
          <div className="mt-5 flex justify-center">
            <div className="w-2/4">
              <h3 className="mb-7 text-center text-3xl font-bold text-meta-purple-1">
                {TEXT?.HI_THERE}
              </h3>
              <p className="mb-14 text-center text-xl font-semibold text-meta-light-blue-3">
                {
                  TEXT?.CERTIFYRECRUIT_STREAMLINES_YOUR_ENTIRE_RECRUITING_PROCESS
                }
              </p>
              <div className="flex justify-center">
                <div className="flex">
                  <button
                    onClick={() => router.push('/login')}
                    className="mr-10 h-16 w-64 rounded-2xl bg-meta-blue-2 text-xl font-semibold text-white"
                  >
                    {TEXT?.START_NOW_ITS_FREE}
                  </button>
                  <button
                    onClick={() => router.push('/main/employee/demo')}
                    className="h-16 w-64 rounded-2xl border border-meta-light-blue-2 bg-white text-xl font-semibold text-meta-light-blue-3"
                  >
                    {TEXT?.SCHEDULE_A_DEMO}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
