'use client';
import ContactUs from '@/Components/home/ContactUs';
import Feedback from '@/Components/home/Feedback';
import Services from '@/Components/home/Services';
import Image from 'next/image';

const Page = () => {
  return (
    <div>
      <div className="h-auto bg-meta-gray-2">
        <div className="mx-auto h-full px-4 pb-[75px] pt-4 sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
          <div className=" w-full">
            <div className="relative flex flex-col items-center justify-center">
              <p className=" text-center text-[30px] font-bold leading-[60px] text-meta-blue-1 ">
                ABOUT US
              </p>
              <p className="w-full max-w-[928px] pt-3 text-center text-[30px] font-bold leading-[60px] text-meta-purple-1 sm:text-[50px]">
                Simplify Your Recruitment With Our Industry Standard Platform
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
      <div className="mx-auto h-full px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
        <div className="mt-16">
          <div className="flex  justify-between">
            <div>
              <p className="text-lg font-semibold text-meta-light-blue-3">
                OUR STORY
              </p>
              <p className="max-w-[642px] pt-1 text-4xl font-semibold text-meta-blue-1">
                CertifyRecruit - Complementing Your Recruitment Skills
              </p>
            </div>
          </div>
          <div className="pt-[20px] text-lg font-medium text-meta-light-blue-3">
            After several years of working as employees in the recruitment
            industry, we recognized a gap that needed to be addressed. While
            there are existing companies that help ease the recruitment process
            for other companies and individuals, there is no designated platform
            for Human Resource Management employees and freshers. Moreover, we
            wanted organizations to be able to find the best HR professionals.
          </div>
          <div className="pt-[20px] text-lg font-medium text-meta-light-blue-3">
            To address this gap, we came up with the idea of CertifyRecruit, a
            platform designed to simplify recruitment for organizations and help
            HR professionals excel while upgrading their skill sets. We have
            also added features such as "Learn and Earn," "Badge of Honour" (for
            organizations), "Individual Certification," and "What's Your Rank?"
            to help both organizations and candidates find the best fit.
          </div>
        </div>
        <div className="mt-24">
          <div className="flex  justify-between">
            <div>
              <p className="text-lg font-semibold text-meta-light-blue-3">
                VISION
              </p>
              <p className="max-w-[642px] pt-1 text-4xl font-semibold text-meta-blue-1">
                Our Vision
              </p>
            </div>
          </div>
          <div className="pt-[20px] text-lg font-medium text-meta-light-blue-3">
            Our Vision is to be the leading platform for Certified Recruitment
            which can save time of Organizations as well as HR candidates.
          </div>
        </div>
        <div className="mt-[46px]">
          <div className="flex  justify-between">
            <div>
              <p className="text-lg font-semibold text-meta-light-blue-3">
                Mission
              </p>
              <p className="max-w-[642px] pt-1 text-4xl font-semibold text-meta-blue-1">
                Our Mission
              </p>
            </div>
          </div>
          <div className="pt-[20px] text-lg font-medium text-meta-light-blue-3">
            Our mission is to revolutionize the recruitment industry by
            providing an all-round platform that streamlines the hiring process
            through certification, promoting efficiency and trust between
            organizations and HR candidates. We aim to uplift HR professionals
            and organizations with tools and resources that can help them
            upgrade and achieve exponential growth.
          </div>
        </div>
        <Services />

        <div className="mt-[46px]">
          <div className="flex  justify-between">
            <div>
              <p className="text-lg font-semibold text-meta-light-blue-3">
                FEEDBACK
              </p>
              <p className="max-w-[642px] pt-1 text-4xl font-semibold text-meta-blue-1">
                What They Thought About Us
              </p>
            </div>
          </div>
          <Feedback />
        </div>
      </div>
      <ContactUs />
    </div>
  );
};
export default Page;
