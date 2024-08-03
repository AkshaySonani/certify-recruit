'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/service/Helper';
import SignupForm from './SignupForm';
import DemoLinkComp from './DemoLinkComp';
import Button from './Button';

const EmployeeComp = () => {
  const router = useRouter();
  const [showForms, setShowForms] = useState(false);
  const [showDemoLink, setShowDemoLink] = useState(false);
  return (
    <div>
      {/* FIXME */}
      {!showForms ? (
        <SignupForm />
      ) : showDemoLink ? (
        <DemoLinkComp setShowDemoLink={setShowDemoLink} />
      ) : (
        <div className="container mx-auto h-screen max-w-6xl">
          <div className="flex justify-center py-20">
            <Image
              src={'/MainLogo.svg'}
              alt="MainLogo"
              width={334}
              height={56}
            />
          </div>

          <div className="bg-[url('/_Compound.svg')] ">
            <div className="mt-36 flex justify-center">
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
                    <Button
                      title={TEXT?.START_NOW_ITS_FREE}
                      handleClick={() => setShowForms(true)}
                      titleClass="text-xl font-semibold text-white"
                      btnClass="rounded-2xl !w-64 !h-16 bg-meta-blue-2 mr-10"
                    />

                    <button
                      onClick={() => setShowDemoLink(true)}
                      className="h-16 w-64 rounded-2xl border border-meta-light-blue-2 bg-white text-xl font-semibold text-meta-light-blue-3 hover:border-meta-light-blue-1 hover:bg-meta-gray-2"
                    >
                      {TEXT?.SCHEDULE_A_DEMO}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeComp;
