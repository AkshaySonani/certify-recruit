'use client';
import React from 'react';
import Image from 'next/image';
import Button from '@/Components/Button';
import ContactUs from '@/Components/home/ContactUs';
import PageTitle from '@/Components/home/pageTitle';
import FeedbackSection from '@/Components/home/feedbackSection';
import Feedback from '@/Components/home/Feedback';

const Page = () => {
  return (
    <div>
      <div className="relative h-full w-full">
        <div
          data-aos="fade-down"
          className="min-h-auto flex h-full items-center justify-center bg-meta-gray-2 sm:min-h-96"
        >
          <PageTitle
            showBtn={true}
            title="FEATURES"
            content="Welcome to the Future of Recruitment!"
          />
        </div>
        <div className="absolute left-20 top-20 hidden md:block">
          <Image alt="date" width={37} height={37} src={'/landing/ball.png'} />
        </div>
      </div>

      <div className="container mx-auto">
        <div className="my-9 px-8 text-center lg:px-12" data-aos="flip-right">
          <p className="py-2 text-4xl font-bold text-meta-blue-1">
            Professional Certification
          </p>
          <p className="text-lg font-medium tracking-wider text-meta-light-blue-3">
            We Prioritize Skills over references. Certified Individuals are
            Prominently featured at the top of candidate searches.
          </p>
        </div>
        <div
          className="mx-auto flex h-full w-full items-center justify-center"
          data-aos="zoom-in-down"
        >
          <Image
            alt="date"
            width={1300}
            height={900}
            src={'/home/features_bg.png'}
          />
        </div>

        <div
          data-aos="zoom-in-right"
          className="flex min-h-screen w-full flex-col items-center justify-between p-4 lg:flex-row"
        >
          <div className="h-full w-full md:w-max md:px-6">
            <Image
              alt="date"
              width={800}
              height={500}
              src={'/home/feat_job_apply_bg.png'}
            />
          </div>

          <div className="w-full flex-col items-start justify-center p-6 text-start md:w-[445px] lg:flex">
            <h1 className="w-full text-4xl font-bold text-meta-blue-1 sm:max-w-60 md:text-6xl">
              Job Posting
            </h1>
            <p className="mt-4 w-full text-xl font-medium text-meta-light-blue-3 md:text-2xl">
              Outline your requirements and find top-tier talent from among the
              candidates.
            </p>
            <div className="flex w-full items-start">
              <Button
                type="button"
                title={'Learn More'}
                btnClass="sm:w-max w-[290px] !my-3 !py-2 !px-6"
              />
            </div>
          </div>
        </div>

        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          className="flex min-h-screen w-full flex-col-reverse items-center justify-between p-4 lg:flex-row"
        >
          <div className="w-full flex-col items-start justify-center p-6 text-start md:w-[445px] lg:flex">
            <h1 className="w-full text-4xl font-bold text-meta-blue-1 md:text-6xl">
              Learn & Earn (Improve your Knowledge and skills)
            </h1>
            <p className="mt-4 w-full text-xl font-medium text-meta-light-blue-3 md:text-2xl">
              As exciting as it sounds, your knowledge and wit can earn you
              money! If you're better than the rest, you earn the most!
            </p>
          </div>
          <div className="h-full w-full md:w-max md:px-6">
            <Image
              alt="date"
              width={800}
              height={500}
              src={'/home/feat_learn_bg.png'}
            />
          </div>
        </div>

        <div
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          className="flex min-h-screen w-full flex-col items-center justify-between p-4 lg:flex-row"
        >
          <div className="h-full w-full md:w-max md:px-6">
            <Image
              alt="date"
              width={800}
              height={500}
              src={'/home/feat_job_apply_bg.png'}
            />
          </div>

          <div className="w-full flex-col items-start justify-center p-6 text-start md:w-[445px] lg:flex">
            <h1 className="w-full text-4xl font-bold text-meta-blue-1 sm:max-w-60 md:text-6xl">
              Apply for Job
            </h1>
            <p className="mt-4 w-full text-xl font-medium text-meta-light-blue-3 md:text-2xl">
              Better Opportunities might be awaiting you! Apply today!
            </p>
            <div className="flex w-full items-start">
              <Button
                type="button"
                title={'Apply Job'}
                btnClass="sm:w-max w-[290px] !my-3 !py-2 !px-6"
              />
            </div>
          </div>
        </div>

        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          className="flex min-h-screen w-full flex-col-reverse items-center justify-between p-4 lg:flex-row"
        >
          <div className="w-full flex-col items-start justify-center p-6 text-start md:w-[445px] lg:flex">
            <h1 className="w-full text-4xl font-bold text-meta-blue-1 md:text-6xl">
              Badge of Honour (Company Certification)
            </h1>
            <p className="mt-4 w-full text-xl font-medium text-meta-light-blue-3 md:text-2xl">
              A badge that can enhance your brand reputation in the corporate
              industry.
            </p>
          </div>
          <div className="h-full w-full md:w-max md:px-6">
            <Image
              alt="date"
              width={800}
              height={500}
              src={'/home/feat_learn_bg.png'}
            />
          </div>
        </div>

        <div
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          className="flex min-h-screen w-full flex-col items-center justify-between p-4 lg:flex-row"
        >
          <div className="h-full w-full md:w-max md:px-6">
            <Image
              alt="date"
              width={800}
              height={500}
              src={'/home/feat_job_apply_bg.png'}
            />
          </div>

          <div className="w-full flex-col items-start justify-center p-6 text-start md:w-[445px] lg:flex">
            <h1 className="w-full text-4xl font-bold text-meta-blue-1 sm:max-w-60 md:text-6xl">
              Employer Resources
            </h1>
            <p className="mt-4 w-full text-xl font-medium text-meta-light-blue-3 md:text-2xl">
              Discover the ideal candidate for your precise requirements.
            </p>
            <div className="flex w-full items-start">
              <Button
                type="button"
                title={'Apply Job'}
                btnClass="sm:w-max w-[290px] !my-3 !py-2 !px-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-[46px]">
          <div
            className="flex  justify-between"
            data-aos="fade-right"
            data-aos-easing="ease-in-sine"
          >
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
        {/* <div className="container mx-auto mb-7 px-7 sm:mb-14">
          <FeedbackSection />
        </div> */}

        <ContactUs />
      </div>
    </div>
  );
};
export default Page;
