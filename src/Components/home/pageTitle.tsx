'use client';
import React, { useEffect } from 'react';

import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
const PageTitle = ({ content }: any) => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <div className="h-auto bg-meta-gray-2">
      <div className="mx-auto h-full px-4 pb-[150px] pt-4 sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
        <div
          className=" w-full"
          data-aos="fade-down"
          data-aos-duration="1200"
          data-aos-easing="ease-in-sine"
        >
          <div className="relative flex w-full flex-col items-center justify-center">
            <p className="bg-website-title bg-clip-text  text-center text-[30px] font-bold leading-[60px] text-transparent ">
              {content}
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
  );
};

export default PageTitle;
