'use client';
import React from 'react';
import Image from 'next/image';
import PageTitle from '@/Components/home/pageTitle';
import FeedbackSection from '@/Components/home/feedbackSection';
import ContactUs from '@/Components/home/ContactUs';
import Services from '@/Components/home/Services';

const Page = () => {
  const EXPERT_LIST = [
    {
      id: 1,
      title: 'Expert Talk Series: The Morphing Paas',
    },
    {
      id: 2,
      title: 'Expert Talk Series: The Morphing Paas',
    },
    {
      id: 3,
      title: 'Expert Talk Series: The Morphing Paas',
    },
    {
      id: 4,
      title: 'Expert Talk Series: The Morphing Paas',
    },
    {
      id: 5,
      title: 'Expert Talk Series: The Morphing Paas',
    },
    {
      id: 6,
      title: 'Expert Talk Series: The Morphing Paas',
    },
  ];

  return (
    <div>
      <div className="h-auto bg-meta-gray-2">
        <div className="mx-auto h-full px-4 pb-[75px] pt-4 sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
          <div className=" w-full">
            <div className="relative flex flex-col items-center justify-center">
              <p className=" text-center text-[30px] font-bold leading-[60px] text-meta-blue-1 ">
                Industry Expert Talk
              </p>
              <p className="w-full max-w-[637px] pt-3 text-center text-[30px] font-bold leading-[60px] text-meta-purple-1 sm:text-[50px]">
                Gain Industry Standard Knowledge from Experts
              </p>
              <div className="absolute left-[66px] top-[-72px] hidden lg:block">
                <Image
                  alt="date"
                  width={37}
                  height={37}
                  src={'/landing/ball.png'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto h-full px-4 pb-[75px]  sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
        <div className="px-8 lg:px-12">
          <p className="text-lg font-medium tracking-wider text-meta-light-blue-3">
            Know Our Experts
          </p>
          <p className="py-2 text-4xl font-bold text-meta-blue-1">
            Industry Expert Talk
          </p>
          <p className="text-lg font-medium tracking-wider text-meta-light-blue-3">
            The Industry Talk Series sheds light on ongoing trends, problems,
            and their solutions in the industry.
          </p>
        </div>
        <div className="container mx-auto my-7 px-4 sm:my-14">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERT_LIST?.map((list) => {
              return (
                <div
                  key={list?.id}
                  className="m-4 max-w-sm cursor-pointer overflow-hidden rounded-[18px] bg-meta-light-blue-2"
                >
                  <Image
                    alt="date"
                    width={380}
                    height={266}
                    className="rounded-2xl p-3"
                    src={'/home/expert_bg.png'}
                  />

                  <div className="px-6 pb-4">
                    <div className="mb-2 text-xl font-bold text-meta-purple-1">
                      Expert Talk Series: The Morphing Paas
                    </div>
                    <div className="flex items-center">
                      <p className="mr-2 text-base font-medium text-meta-blue-1">
                        Join now
                      </p>
                      <Image
                        alt="date"
                        width={20}
                        height={20}
                        src={'LeftArrow.svg'}
                        className="mt-[2px] rotate-180"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Services />

        <div className="container mx-auto my-7 px-7 sm:my-14">
          <FeedbackSection />
        </div>

        <ContactUs />
      </div>
    </div>
  );
};

export default Page;
