'use client';
import Button from '@/Components/Button';
import { ROUTE } from '@/service/Helper';
import { Icons } from '@/svg';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect, useState } from 'react';
import Services from '@/Components/home/Services';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  const { data: session } = useSession<any>();
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const feedbackArr = [
    {
      profile: '/landing/indianGirl1.png',
      name: 'Vidhi Goswami',
      profession: 'HR Manager',
      content:
        'CertifyRecruit has helped me stand apart through their certification.Several companies have contacted me after I shared my certificate on my resume.',
    },
    {
      profile: '/landing/indianGirl2.png',
      name: 'Deepali Patel',
      profession: 'Finance Manager',
      content:
        "CertifyRecruit has truly elevated my career prospects by helping me obtain valuable certifications. Since adding these certifications to my resume and LinkedIn profile, I've received interest from numerous companies. ",
    },
    {
      profile: '/landing/indianGirl3.png',
      name: 'Aakashi Rajput ',
      profession: 'Software Engineer',
      content:
        "Thanks to CertifyRecruit, I've been able to distinguish myself in the job market with their valuable certification programs. Sharing my newly earned certificates on my resume has already attracted attention from several companies.",
    },
  ];
  return (
    <div>
      <div className="dm-sans ">
        <div className="h-auto bg-meta-gray-2">
          <div className="mx-auto  h-full px-4 pb-[50px] pt-4 sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
            <div
              className=" w-full"
              data-aos="fade-down"
              data-aos-duration="1200"
              data-aos-easing="ease-in-sine"
            >
              <div className="relative flex justify-center">
                <p className="max-w-[1010px] text-center text-[30px] font-bold leading-[60px] text-meta-purple-1 sm:text-[50px]">
                  Make way for more with our advanced Recruitment Assessment
                  Platform.
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
            <div className="mt-[30px] hidden  items-center justify-between sm:mt-[70px] lg:flex">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Image
                    alt="date"
                    width={310}
                    height={394}
                    src={'/landing/certificate.png'}
                  />
                </motion.div>
                <div className="absolute bottom-2 flex w-full justify-center">
                  <Button
                    type={'button'}
                    title={'Get Certification'}
                    handleClick={() => {
                      if (session?.user) {
                        router?.push(ROUTE?.COMING_SOON);
                      } else {
                        router?.push(ROUTE?.LOGIN);
                      }
                    }}
                    btnClass="w-max !my-3 !p-3 !h-auto !bg-meta-blue-1"
                    titleClass="flex justify-center  text-base  font-medium text-white"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-center">
                  <Button
                    type={'button'}
                    title={'Apply Now'}
                    handleClick={() => {
                      if (session?.user) {
                        router?.push(ROUTE?.COMING_SOON);
                      } else {
                        router?.push(ROUTE?.LOGIN);
                      }
                    }}
                    btnClass="w-max !my-3 py-3 px-10 !h-auto !bg-meta-blue-1"
                    titleClass="flex justify-center  text-base  font-medium text-white"
                  />
                </div>
                <div className="mt-[100px] flex-1">
                  <motion.div
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <Image
                      alt="date"
                      width={559}
                      height={370}
                      src={'/landing/result.png'}
                    />
                  </motion.div>
                </div>
              </div>
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Image
                    alt="date"
                    width={310}
                    height={394}
                    src={'/landing/certificate.png'}
                  />
                </motion.div>
                <div className="absolute bottom-2 flex w-full justify-center">
                  <Button
                    type={'button'}
                    title={'Get Certification'}
                    handleClick={() => {
                      if (session?.user) {
                        router?.push(ROUTE?.COMING_SOON);
                      } else {
                        router?.push(ROUTE?.LOGIN);
                      }
                    }}
                    btnClass="w-max !my-3 !p-3 !h-auto !bg-meta-blue-1"
                    titleClass="flex justify-center  text-base  font-medium text-white"
                  />
                </div>
              </div>
            </div>

            <div className="mt-[75px]">
              <div className="grid grid-cols-1 items-center justify-center  gap-2 sm:grid-cols-2 xl:grid-cols-4">
                <div
                  data-aos="fade-up"
                  className="h-[209px]  w-[295px] rounded-[43px]  border border-dashed border-meta-light-blue-6 px-[16px] pb-[18px] pt-[28px]"
                >
                  <div className=" flex h-full flex-col justify-between">
                    <p className="w-full text-center text-[20px] font-bold">
                      Industry Standard Assessment
                    </p>
                    <div className="">
                      <Image
                        alt="date"
                        width={97}
                        height={72}
                        src={'/landing/01.png'}
                      />
                    </div>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  className="h-[209px] w-[295px] rounded-[43px] border border-dashed border-meta-light-blue-6 px-[16px] pb-[18px] pt-[28px]"
                >
                  <div className=" flex h-full flex-col justify-between">
                    <p className="w-full text-center text-[20px] font-bold">
                      Authentic Certification
                    </p>
                    <div className="">
                      <Image
                        alt="date"
                        width={120}
                        height={72}
                        src={'/landing/02.png'}
                      />
                    </div>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  className="h-[209px] w-[295px] rounded-[43px] border border-dashed border-meta-light-blue-6 px-[16px] pb-[18px] pt-[28px]"
                >
                  <div className=" flex h-full flex-col justify-between">
                    <p className="w-full text-center text-[20px] font-bold">
                      Uplifting Individuals & Organizations
                    </p>
                    <div className="">
                      <Image
                        alt="date"
                        width={121}
                        height={72}
                        src={'/landing/03.png'}
                      />
                    </div>
                  </div>
                </div>
                <div
                  data-aos="fade-up"
                  className="h-[209px] w-[295px] rounded-[43px] border border-dashed border-meta-light-blue-6 px-[16px] pb-[18px] pt-[28px]"
                >
                  <div className=" flex h-full flex-col justify-between">
                    <p className="w-full text-center text-[20px] font-bold">
                      Simplifying Recruitment
                    </p>
                    <div className="">
                      <Image
                        alt="date"
                        width={129}
                        height={72}
                        src={'/landing/04.png'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto h-full px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
          <div className="mt-16">
            <div className="flex  justify-between">
              <div data-aos="fade-right" data-aos-easing="ease-in-sine">
                <p className="text-lg font-semibold text-meta-light-blue-3">
                  TOP JOB
                </p>
                <p className="pt-1 text-4xl font-semibold text-meta-blue-1">
                  Top Openings
                </p>
              </div>
              <div className="">
                <Button
                  type={'button'}
                  title={'Apply Now'}
                  handleClick={() => {
                    if (session?.user) {
                      router?.push(ROUTE?.COMING_SOON);
                    } else {
                      router?.push(ROUTE?.LOGIN);
                    }
                  }}
                  btnClass="w-max !my-3 !p-3 !h-auto !bg-meta-blue-1"
                  titleClass="flex justify-center w-[110px] text-base  font-medium text-white"
                />
              </div>
            </div>
            <div className="pt-[20px] text-lg font-medium text-meta-light-blue-3">
              CertifyRecruit wants to give you the best opportunities; after
              all, your hard work deserves the best.
            </div>

            <div className="mt-12 flex w-full gap-3 overflow-auto ">
              <div className="w-96 min-w-96 rounded-xl bg-meta-gray-2 p-2">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-meta-purple-1">
                        Human Resource
                      </p>
                      <p className="ml-1 text-lg font-semibold text-meta-purple-1">
                        - Fresher
                      </p>
                      <p className="ml-2 mt-1 text-sm font-bold text-meta-light-blue-3">
                        30 min ago
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-bold text-meta-light-blue-3">
                        Coding infotech
                      </p>
                      <p className="mx-1 text-sm font-bold text-meta-light-blue-3">
                        - Surat, Gujarat.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Image
                      alt="date"
                      width={15}
                      height={15}
                      src={'/job/moneybag.svg'}
                    />
                    <p className="text-sm font-bold text-meta-blue-1">
                      ₹12k/month - ₹30k/month
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      alt="date"
                      width={15}
                      height={15}
                      src={'/job/timepicker.svg'}
                    />
                    <p className="text-sm font-bold text-meta-blue-1">
                      Full-time
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      alt="date"
                      width={15}
                      height={15}
                      src={'/job/datepicker.svg'}
                    />
                    <p className="text-sm font-bold text-meta-blue-1">
                      Full-time
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-96 min-w-96 rounded-xl bg-meta-gray-2  p-2">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-meta-purple-1">
                        Human Resource
                      </p>
                      <p className="ml-1 text-lg font-semibold text-meta-purple-1">
                        - Fresher
                      </p>
                      <p className="ml-2 mt-1 text-sm font-bold text-meta-light-blue-3">
                        30 min ago
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-bold text-meta-light-blue-3">
                        Coding infotech
                      </p>
                      <p className="mx-1 text-sm font-bold text-meta-light-blue-3">
                        - Surat, Gujarat.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Image
                      alt="date"
                      width={15}
                      height={15}
                      src={'/job/moneybag.svg'}
                    />
                    <p className="text-sm font-bold text-meta-blue-1">
                      ₹12k/month - ₹30k/month
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      alt="date"
                      width={15}
                      height={15}
                      src={'/job/timepicker.svg'}
                    />
                    <p className="text-sm font-bold text-meta-blue-1">
                      Monday to Friday
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      alt="date"
                      width={15}
                      height={15}
                      src={'/job/datepicker.svg'}
                    />
                    <p className="text-sm font-bold text-meta-blue-1">
                      Monday to Friday
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-96 min-w-96 rounded-xl bg-meta-gray-2  p-2">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-meta-purple-1">
                        Human Resource
                      </p>
                      <p className="ml-1 text-lg font-semibold text-meta-purple-1">
                        - Fresher
                      </p>
                      <p className="ml-2 mt-1 text-sm font-bold text-meta-light-blue-3">
                        30 min ago
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-bold text-meta-light-blue-3">
                        Coding infotech
                      </p>
                      <p className="mx-1 text-sm font-bold text-meta-light-blue-3">
                        - Surat, Gujarat.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Image
                      alt="date"
                      width={15}
                      height={15}
                      src={'/job/moneybag.svg'}
                    />
                    <p className="text-sm font-bold text-meta-blue-1">
                      ₹12k/month - ₹30k/month
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      alt="date"
                      width={15}
                      height={15}
                      src={'/job/timepicker.svg'}
                    />
                    <p className="text-sm font-bold text-meta-blue-1">
                      Monday to Friday
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      alt="date"
                      width={15}
                      height={15}
                      src={'/job/datepicker.svg'}
                    />
                    <p className="text-sm font-bold text-meta-blue-1">
                      Full-time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* {About Section} */}
          <div className="mt-28">
            <div className="flex flex-col-reverse justify-center md:flex-row md:justify-between">
              <div data-aos="zoom-out-right" data-aos-easing="ease-in-sine">
                <p className="text-lg font-semibold text-meta-light-blue-3">
                  ABOUT US
                </p>
                <p className="max-w-[642px] pt-2 text-4xl font-semibold text-meta-blue-1">
                  CertifyRecruit - Complementing Your Recruitment Skills
                </p>
                <p className="max-w-[612px] pt-5 text-lg font-medium text-meta-light-blue-3">
                  Our online platform is made to change how people and companies
                  handle recruiting. Our goal is to help individuals boost their
                  recruiting abilities and assist employers in finding the best
                  talent. At CertifyRecruit, we believe that becoming great at
                  recruiting is a journey we can help you with.
                </p>
                <div className="mt-10">
                  <Button
                    type={'button'}
                    title={'Learn more'}
                    handleClick={() => router?.push('/aboutUs')}
                    btnClass="w-max !my-3 !p-3 !h-auto !bg-meta-blue-1"
                    titleClass="flex justify-center w-[110px] text-base  font-medium text-white"
                  />
                </div>
              </div>
              <div data-aos="fade-down">
                <Image
                  alt="date"
                  width={525}
                  height={486}
                  src={'/landing/Profilebanner.png'}
                />
              </div>
            </div>
          </div>
          {/* {connecting Section} */}
          <div
            className="mt-12 rounded-[28px] bg-meta-gray-2 md:mt-36"
            data-aos="flip-down"
          >
            <div className="flex justify-between px-3  pb-2 lg:px-[50px]">
              <div>
                <p className="lg:px:0 w-full pr-6 pt-[50px] text-2xl font-bold text-meta-blue-1 sm:text-4xl lg:max-w-[578px]">
                  Connecting Talents, Simplifying Recruitment
                </p>
                <p className="mt-[17px] max-w-[320px] px-6 pb-[20px] text-xl font-bold text-meta-light-blue-3 lg:px-0 lg:text-3xl">
                  Reach Out To Us Today
                </p>
              </div>
              <div className="self-end">
                <Button
                  type={'button'}
                  title={session?.user ? 'Join' : 'Register Now'}
                  handleClick={() => {
                    if (session?.user) {
                      router?.push(ROUTE?.DASHBOARD);
                    } else {
                      router?.push(ROUTE?.SIGN_UP);
                    }
                  }}
                  btnClass="w-max !my-3 !p-3 !h-auto !bg-meta-blue-1"
                  titleClass="flex justify-center w-[110px] text-base  font-medium text-white"
                />
              </div>
            </div>
          </div>

          <Services />

          {/* {Feedback} */}
        </div>
        <div className="mt-16 bg-meta-gray-2 px-4  py-[75px] md:px-24 lg:px-8">
          <Carousel
            autoPlay={false}
            showStatus={false}
            infiniteLoop={false}
            swipeable={false}
            stopOnHover={true}
            useKeyboardArrows={true}
            showIndicators={false}
            showThumbs={false}
            showArrows={false}
            selectedItem={selected}
          >
            {feedbackArr?.map((list: any, i: any) => {
              return (
                <div className="mx-auto h-full px-4 sm:max-w-full md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
                  <div className="">
                    <div data-aos="fade-up">
                      <p className="text-left text-lg font-semibold text-meta-light-blue-3">
                        FEEDBACK
                      </p>
                      <p className="max-w-[642px] pt-2 text-left text-4xl font-semibold text-meta-blue-1">
                        What our clients think about us!
                      </p>
                    </div>
                    <div className="mt-[50px]">
                      <div className="h-[29px] w-[39px]">
                        <Image
                          alt="date"
                          width={39}
                          height={29}
                          src={'/landing/comma.png'}
                        />
                      </div>

                      <div className="mt-[10px] flex items-center justify-between">
                        <div>
                          <p className="max-w-[830px] pl-5 text-left text-2xl font-medium text-meta-light-blue-3">
                            {list?.content}
                          </p>
                          <div className="mt-14 pl-5">
                            <p className="text-left text-lg font-bold text-meta-blue-1">
                              {list?.name}
                            </p>
                            <p className="text-left text-base font-bold text-meta-light-blue-3">
                              {list?.profession}
                            </p>
                            <div className="mt-14 flex justify-start">
                              <button
                                disabled={i === 0}
                                className={`${i === 0 ? 'bg-meta-light-blue-1' : 'bg-meta-blue-1'} px-[30px] py-[18px]`}
                                onClick={() => setSelected(i - 1)}
                              >
                                <Icons.Arrow
                                  color={i !== 0 ? '#ffff' : '#150936'}
                                />
                              </button>
                              <button
                                disabled={i === 2}
                                className={`${i === 2 ? 'bg-meta-light-blue-1' : 'bg-meta-blue-1'} px-[30px] py-[18px]`}
                                onClick={() => setSelected(i + 1)}
                              >
                                <div className="rotate-[179deg]">
                                  <Icons.Arrow
                                    color={i !== 2 ? '#ffff' : '#150936'}
                                  />
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="hidden  sm:block">
                          <Image
                            alt="date"
                            width={278}
                            height={278}
                            src={list?.profile}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>

        <div className="mx-auto mt-16 h-full px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
          <div data-aos="fade-right" data-aos-easing="ease-in-sine">
            <p className="text-lg font-semibold text-meta-light-blue-3">
              OUR PARTNERS
            </p>
            <p className="max-w-[642px] pt-2 text-4xl font-semibold text-meta-blue-1">
              Simplifying recruitment with following partners
            </p>
          </div>
          <div className="mt-[50px] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ">
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div
                  data-aos="zoom-out"
                  className=" flex h-[150px] w-[233px] items-center justify-center rounded-[30px] border border-meta-light-blue-2 bg-meta-light-blue-5"
                >
                  <Image
                    alt="date"
                    width={118}
                    height={67}
                    src={'/landing/logo.png'}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mx-auto my-[150px] h-full px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8 ">
          <div data-aos="fade-right" data-aos-easing="ease-in-sine">
            <p className="text-lg font-semibold text-meta-light-blue-3">
              CONTACT US
            </p>
            <p className="max-w-[642px] pt-2 text-4xl font-semibold text-meta-blue-1">
              Our friendly team is all ears
            </p>
          </div>
          <div className="mt-[80px] flex justify-between">
            <div>
              <p className="max-w-[525px] text-lg font-medium text-meta-light-blue-3">
                Feel free to send us a message or give us a call, and we'll get
                back to you as soon as we can. Helping you succeed is what
                matters most to us, and we're here to provide you with the best
                recruitment assessment solutions.
              </p>

              <div className="mt-[60px]">
                <div className="flex items-center">
                  <Image
                    alt="date"
                    width={50}
                    height={50}
                    src={'/landing/call.png'}
                  />
                  <p className="pl-[16px] text-lg font-medium text-meta-purple-1">
                    +91 9157350298
                  </p>
                </div>
                <div className="mt-[40px] flex items-center">
                  <Image
                    alt="date"
                    width={50}
                    height={50}
                    src={'/landing/email.png'}
                  />
                  <p className="pl-[16px] text-lg font-medium text-meta-purple-1">
                    info@certifyrecruit.io
                  </p>
                </div>
              </div>
            </div>
            <div className=" hidden w-1/2 items-end justify-end rounded-[30px] bg-meta-gray-2 lg:flex">
              <div>
                <Image
                  alt="date"
                  width={250}
                  height={190}
                  src={'/landing/contactbanner.png'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
