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
        <div className="flex justify-center py-10">
          <Image src={'/MainLogo.svg'} alt="MainLogo" width={334} height={56} />
        </div>
        <div className="bg-[url('/_Compound.svg')]">
          <div className="mt-10 flex justify-center">
            <div className="flex w-2/4 justify-between">
              <div
                onClick={() => router.push('/main/employee')}
                className="flex h-44 w-64 items-center justify-center rounded-lg border border-meta-light-blue-2"
              >
                <div className="w-24">
                  <div className="flex justify-center">
                    <Image
                      alt="icon"
                      width={70}
                      height={52}
                      src={'/Employee.svg'}
                    />
                  </div>
                  <div className="mt-4 text-center text-xl font-semibold text-meta-blue-1">
                    {TEXT?.EMPLOYEE}
                  </div>
                </div>
              </div>
              <div
                onClick={() => router.push('/main/individual')}
                className="flex h-44 w-64 items-center justify-center rounded-lg border border-meta-light-blue-2"
              >
                <div className="w-24">
                  <div className="flex justify-center">
                    <Image
                      alt="icon"
                      width={44}
                      height={52}
                      src={'/Individual.svg'}
                    />
                  </div>
                  <div className="mt-4 text-center text-xl font-semibold text-meta-blue-1">
                    {TEXT?.INDIVIDUAL}
                  </div>
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
