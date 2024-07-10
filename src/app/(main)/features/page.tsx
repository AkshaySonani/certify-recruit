'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Button from '@/Components/Button';
import ContactUs from '@/Components/home/ContactUs';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Feedback from '@/Components/home/Feedback';
import { ROUTE, TEXT, USER_ROLE } from '@/service/Helper';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { data: session }: any = useSession<any>();
  const router = useRouter();
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <div>
      <div className="h-auto bg-meta-gray-2">
        <div className="mx-auto h-full px-4 pb-[75px] pt-4 sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
          <div
            className=" w-full"
            data-aos="fade-down"
            data-aos-duration="1200"
            data-aos-easing="ease-in-sine"
          >
            <div className="relative flex flex-col items-center justify-center">
              <p className=" text-center text-[30px] font-bold leading-[60px] text-meta-blue-1 ">
                FEATURES
              </p>
              <p className="w-full max-w-[592px] pt-3 text-center text-[30px] font-bold leading-[60px] text-meta-purple-1 sm:text-[50px]">
                Welcome to the Future of Recruitment!
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
          <div className="mt-6 flex w-full flex-wrap items-center justify-center sm:mt-10 sm:flex-nowrap">
            <Button
              title={TEXT?.START_NOW}
              handleClick={() => {
                if (session?.user) {
                  router?.push(ROUTE?.DASHBOARD);
                } else {
                  router?.push(ROUTE?.LOGIN);
                }
              }}
              titleClass="!text-base !text-white"
              btnClass="!w-[200px] !px-0 !rounded-lg !bg-meta-blue-1 !py-2 !mb-0"
            />

            <button
              onClick={() => {
                if (session?.user) {
                  router?.push(ROUTE?.DASHBOARD);
                } else {
                  router?.push(ROUTE?.LOGIN);
                }
              }}
              className="mb-6 mt-2 h-12 min-w-[250px] rounded-lg border border-meta-light-blue-2 bg-meta-gray-3 py-3 text-white transition delay-150 duration-300 ease-in-out will-change-auto hover:bg-hiring-btn-gradient sm:mb-0 sm:ml-4 sm:mt-0 sm:min-w-48"
            >
              <span className="flex justify-center text-base font-medium text-white">
                Schedule a demo
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div
          className="my-9 px-8 text-center lg:px-12"
          data-aos="flip-right"
          data-aos-duration="1200"
          data-aos-easing="ease-in-sine"
        >
          <p className="bg-website-title bg-clip-text  text-center text-[30px] font-bold leading-[60px] text-transparent ">
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
                handleClick={() => {
                  if (session?.user) {
                    if (session?.user?.role === USER_ROLE?.EMPLOYEE) {
                      router?.push(ROUTE?.JOb_POST);
                    } else {
                      router?.push(ROUTE?.JOB);
                    }
                  } else {
                    router?.push(ROUTE?.LOGIN);
                  }
                }}
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
              Better Opportunities might be awaiting you! Apply today! fg
            </p>
            <div className="flex w-full items-start">
              <Button
                type="button"
                handleClick={() => {
                  if (session?.user) {
                    if (session?.user?.role === USER_ROLE?.EMPLOYEE) {
                      router?.push(ROUTE?.JOb_POST);
                    } else {
                      router?.push(ROUTE?.JOB);
                    }
                  } else {
                    router?.push(ROUTE?.LOGIN);
                  }
                }}
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
                handleClick={() => {
                  if (session?.user) {
                    if (session?.user?.role === USER_ROLE?.EMPLOYEE) {
                      router?.push(ROUTE?.JOb_POST);
                    } else {
                      router?.push(ROUTE?.JOB);
                    }
                  } else {
                    router?.push(ROUTE?.LOGIN);
                  }
                }}
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
