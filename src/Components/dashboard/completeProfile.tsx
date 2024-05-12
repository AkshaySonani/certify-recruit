import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ROUTE, TEXT } from '@/service/Helper';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const CompleteProfile = () => {
  const percentage = 33;
  const router = useRouter();

  return (
    <div className="md:relative">
      <div className="mt-8 flex max-h-80 flex-col items-center justify-center rounded-xl bg-meta-gray-2 p-3 md:p-8">
        <p className="mb-2 text-center text-base font-semibold text-meta-purple-1 md:mb-5 md:text-nowrap md:text-xl">
          {TEXT?.COMPLETE_YOUR_PROFILE}
        </p>
        <div className="mb-1 md:mb-3">
          <div className="relative h-24 w-24">
            <Image
              width={90}
              alt="avatar"
              height={90}
              src={'/sidebarIcon/profile.svg'}
              className="absolute top-0 rounded-full p-0.5"
            />

            <div className="absolute">
              <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'butt',
                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,
                  // Colors
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',
                })}
              />
            </div>
          </div>
        </div>
        <p className="mb-1 text-base font-medium lowercase text-meta-light-blue-3 md:mb-5 md:text-lg">
          {percentage}% {TEXT?.COMPLETE}
        </p>
        <div
          onClick={() => router.push(ROUTE?.MYPROFILE)}
          className="cursor-pointer text-sm font-medium text-meta-blue-2 md:text-base"
        >
          {TEXT?.GO_TO_PROFILE}{' '}
          <span className="text-sm font-bold md:text-base">&#8594;</span>
        </div>
      </div>
      <div className="hidden md:absolute md:bottom-0 md:right-0 md:block">
        <Image
          alt="Icon"
          width={191}
          height={190}
          src={'/dashboard/logo.svg'}
          className="rounded-full p-0.5"
        />
      </div>
    </div>
  );
};

export default CompleteProfile;
