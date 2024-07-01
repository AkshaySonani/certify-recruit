import { ROUTE } from '@/service/Helper';
import Image from 'next/image';
import React from 'react';

const Page = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto grid h-screen content-center px-5 sm:px-0">
        <div className="grid justify-items-center gap-5 text-center">
          <Image src={'/MainLogo.svg'} alt="MainLogo" width={334} height={56} />
          <h1 className="mt-4 font-serif text-4xl font-semibold text-black">
            Coming Soon
          </h1>
          <p className="font-sans text-lg tracking-wide text-gray-400">
            This website is under construction, come back soon!
          </p>
          <a
            href={ROUTE?.HOME}
            className="w-max cursor-pointer rounded-xl border border-meta-light-blue-2 bg-meta-blue-2 p-3 tracking-wide text-white shadow-xl transition delay-150 duration-300 ease-in-out will-change-auto hover:bg-hiring-btn-gradient"
          >
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
