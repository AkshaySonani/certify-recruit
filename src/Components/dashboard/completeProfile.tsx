'use client';
import Image from 'next/image';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AppContext from '@/context/AppProvider';
import 'react-circular-progressbar/dist/styles.css';
import { ROUTE, TEXT, USER_ROLE } from '@/service/Helper';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const CompleteProfile = ({ userDetails, currentProfileCount }: any) => {
  const router = useRouter();
  const context = useContext(AppContext);
  const { profileCompletionCount } = context;
  const { data: session }: any = useSession<any>();

  return (
    <div className="md:relative">
      <div className="mt-8 flex max-h-80 flex-col items-center justify-center rounded-xl bg-meta-gray-2 p-3 md:p-8">
        <p className="mb-2 text-center text-base font-semibold text-meta-purple-1 md:mb-5 md:text-nowrap md:text-xl">
          {TEXT?.COMPLETE_YOUR_PROFILE}
        </p>
        <div className="mb-1 md:mb-3">
          <div className="relative h-24 w-24">
            {/* <Image
              width={90}
              height={90}
              alt="profile photo"
              src={
                'https://marktoconnect.s3.ap-south-1.amazonaws.com/earth.jpg'
              }
              className="absolute top-0 rounded-full p-0.5 "
            /> */}
            <Image
              width={80}
              height={80}
              alt="avatar"
              src={
                userDetails?.logo !== ''
                  ? userDetails?.logo
                  : '/profile/placeholder.jpg'
              }
              className="absolute right-[6px] top-[6px] h-[84px] w-[84px] rounded-full object-cover p-0.5"
            />

            <div className="absolute">
              <CircularProgressbar
                value={
                  session?.user?.role === USER_ROLE?.EMPLOYEE
                    ? profileCompletionCount?.employee ||
                      session?.user?.profile_count
                    : profileCompletionCount?.individual ||
                      session?.user?.profile_count
                }
                styles={buildStyles({
                  pathColor: '#34A853',
                  strokeLinecap: 'butt',
                  trailColor: '#d6d6d6',
                  pathTransitionDuration: 0.5,
                })}
              />
            </div>
          </div>
        </div>
        <p className="mb-1 text-base font-medium lowercase text-meta-light-blue-3 md:mb-5 md:text-lg">
          {session?.user?.role === USER_ROLE?.EMPLOYEE
            ? profileCompletionCount?.employee || session?.user?.profile_count
            : profileCompletionCount?.individual ||
              session?.user?.profile_count}
          % {TEXT?.COMPLETE}
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
