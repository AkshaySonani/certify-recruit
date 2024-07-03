'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/service/Helper';

const DemoLinkComp = ({ setShowDemoLink }: any) => {
  const router = useRouter();
  return (
    <div>
      <div className="container mx-auto h-screen max-w-6xl">
        <div className="flex justify-center py-20">
          <Image src={'/MainLogo.svg'} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')]">
          <div className="mt-36 flex justify-center">
            <div className="w-2/4">
              <h3 className="mb-6 text-center text-3xl font-bold text-meta-purple-1">
                {TEXT?.REDIRECT_TO_CALENDLY}
              </h3>
              <p className="mb-10 text-center text-xl font-semibold text-meta-light-blue-3 underline underline-offset-2">
                <a href="https://calendly.com/event_types/user/me">
                  https://calendly.com/event_types/user/me
                </a>
              </p>
              <div
                onClick={() => setShowDemoLink(false)}
                className="flex justify-center"
              >
                <span className="flex cursor-pointer text-xl font-semibold text-meta-blue-1">
                  <Image
                    width={17}
                    height={7}
                    alt="LeftArrow"
                    src={'/LeftArrow.svg'}
                  />
                  <span className="ml-2">{TEXT?.BACK}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoLinkComp;
