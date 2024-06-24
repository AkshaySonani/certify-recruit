'use client';
import Button from '@/Components/Button';
import { ROUTE } from '@/service/Helper';
import { Icons } from '@/svg';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ServiceARR = [
  {
    id: 1,
    title: 'Individual Certification',
    optionText: '',
    content: 'Certification based on your skills.',
  },
  {
    id: 2,
    title: 'Learn & Earn',
    optionText: '( Improve your knowledge & skills )',
    content:
      'As exciting as it sounds, your knowledge and wit can earn you money! If you re better than the rest, you earn the most!',
  },
  {
    id: 3,
    title: 'Apply for a Job',
    optionText: '',
    content: 'Better opportunities might be awaiting you. Apply today!',
  },
  {
    id: 4,
    title: 'Badge of Honour',
    optionText: '( Company certification )',
    content:
      'A badge that can enhance your brand reputation in the corporate industry.',
  },
  {
    id: 5,
    title: 'Individual Certification ',
    optionText: '',
    content:
      'Where knowledge earns you rankings that earn you brownie points. You can negotiate more from your employers when you achieve top rankings by competing with others.',
  },
  {
    id: 6,
    title: 'Employer Resources',
    optionText: '',
    content: 'Discover the ideal candidate for your precise requirements.',
  },
];

export default function Home() {
  const session = useSession();
  const router = useRouter();
  return (
    <div>
      <div className="dm-sans ">
        <div className="h-auto bg-meta-gray-2">
          <div className="mx-auto h-full px-4 pb-[50px] pt-4 sm:max-w-xl sm:pt-36 md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
            <div className=" w-full">
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
            <div className="mt-[30px] flex items-center justify-between sm:mt-[70px]">
              <div className="relative">
                <Image
                  alt="date"
                  width={310}
                  height={394}
                  src={'/landing/certificate.png'}
                />
                <div className="absolute bottom-2 flex w-full justify-center">
                  <Button
                    type={'button'}
                    title={'Get Certification'}
                    // handleClick={downloadPdf}
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
                    handleClick={() => router?.push(ROUTE?.LOGIN)}
                    btnClass="w-max !my-3 py-3 px-10 !h-auto !bg-meta-blue-1"
                    titleClass="flex justify-center  text-base  font-medium text-white"
                  />
                </div>
                <div className="mt-[100px] flex-1">
                  <Image
                    alt="date"
                    width={559}
                    height={370}
                    src={'/landing/result.png'}
                  />
                </div>
              </div>
              <div className="relative">
                <Image
                  alt="date"
                  width={310}
                  height={394}
                  src={'/landing/certificate.png'}
                />
                <div className="absolute bottom-2 flex w-full justify-center">
                  <Button
                    type={'button'}
                    title={'Get Certification'}
                    handleClick={() => router?.push(ROUTE?.LOGIN)}
                    btnClass="w-max !my-3 !p-3 !h-auto !bg-meta-blue-1"
                    titleClass="flex justify-center  text-base  font-medium text-white"
                  />
                </div>
              </div>
            </div>

            <div className="mt-[75px]">
              <div className="grid grid-cols-1 items-center justify-center  gap-2 sm:grid-cols-2 xl:grid-cols-4">
                <div className="h-[209px]  w-[295px] rounded-[43px]  border border-dashed border-meta-light-blue-6 px-[16px] pb-[18px] pt-[28px]">
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
                <div className="h-[209px] w-[295px] rounded-[43px] border border-dashed border-meta-light-blue-6 px-[16px] pb-[18px] pt-[28px]">
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
                <div className="h-[209px] w-[295px] rounded-[43px] border border-dashed border-meta-light-blue-6 px-[16px] pb-[18px] pt-[28px]">
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
                <div className="h-[209px] w-[295px] rounded-[43px] border border-dashed border-meta-light-blue-6 px-[16px] pb-[18px] pt-[28px]">
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
              <div>
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
                  handleClick={() => router?.push(ROUTE?.LOGIN)}
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
              <div>
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
                    handleClick={() => router?.push(ROUTE?.LOGIN)}
                    btnClass="w-max !my-3 !p-3 !h-auto !bg-meta-blue-1"
                    titleClass="flex justify-center w-[110px] text-base  font-medium text-white"
                  />
                </div>
              </div>
              <div>
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
          <div className="mt-12 rounded-[28px] bg-meta-gray-2 md:mt-36">
            <div className="flex justify-between  px-[50px] pb-2">
              <div>
                <p className="max-w-[578px] pt-[50px] text-2xl font-bold text-meta-blue-1 sm:text-4xl">
                  Connecting Talents, Simplifying Recruitment
                </p>
                <p className="mt-[17px] max-w-[320px] text-3xl font-bold text-meta-light-blue-3">
                  Reach Out To Us Today
                </p>
              </div>
              <div className="self-end">
                <Button
                  type={'button'}
                  title={'Register Now'}
                  // handleClick={downloadPdf}
                  btnClass="w-max !my-3 !p-3 !h-auto !bg-meta-blue-1"
                  titleClass="flex justify-center w-[110px] text-base  font-medium text-white"
                />
              </div>
            </div>
          </div>

          {/* {services Section} */}
          <div className="mt-36">
            <div>
              <p className="text-lg font-semibold text-meta-light-blue-3">
                Here's What CertifyRecruit can do for you.
              </p>
              <p className="max-w-[642px] pt-2 text-4xl font-semibold text-meta-blue-1">
                Our Services
              </p>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {ServiceARR?.map((list) => {
                  return (
                    <div className="relative h-[285px] w-[400px] rounded-[12px] bg-meta-gray-2 p-[20px]">
                      <div className="flex flex-col ">
                        <div className="h-[186px]">
                          <Image
                            alt="date"
                            width={40}
                            height={40}
                            src={'/landing/serviceicon.png'}
                          />
                          <div className="mt-[10px]  text-lg font-bold text-meta-blue-1">
                            {list?.title}
                          </div>
                          <div className="text-lg font-bold text-meta-light-blue-3">
                            {list?.optionText}
                          </div>
                          <div className=" max-w-[299px] pt-[10px] text-sm text-meta-light-blue-3 ">
                            {list?.content}
                          </div>
                        </div>
                        <div className="">
                          <Button
                            type={'button'}
                            title={'Contact Us'}
                            // handleClick={downloadPdf}
                            btnClass="w-max !my-3 !p-3 !h-auto !bg-meta-blue-1 !mb-0"
                            titleClass="flex justify-center w-[110px] text-base  font-medium text-white"
                          />
                        </div>
                      </div>

                      <div className="absolute bottom-2 right-0">
                        <Image
                          alt="date"
                          width={125}
                          height={135}
                          src={'/landing/servicebanner.png'}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* {Feedback} */}
        </div>
        <div className="mt-16 bg-meta-gray-2 px-4  py-[75px] md:px-24 lg:px-8">
          <div className="mx-auto h-full px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
            <div className="">
              <div>
                <p className="text-lg font-semibold text-meta-light-blue-3">
                  FEEDBACK
                </p>
                <p className="max-w-[642px] pt-2 text-4xl font-semibold text-meta-blue-1">
                  What our clients think about us!
                </p>
              </div>
              <div className="mt-[50px]">
                <Image
                  alt="date"
                  width={39}
                  height={29}
                  src={'/landing/comma.png'}
                />
                <div className="mt-[10px] flex items-center justify-between">
                  <div>
                    <p className="max-w-[830px] pl-5 text-2xl font-medium text-meta-light-blue-3">
                      CertifyRecruit has helped me stand apart through their
                      certification. Several companies have contacted me after I
                      shared my certificate on my resume.
                    </p>
                    <div className="mt-14 pl-5">
                      <p className="text-lg font-bold text-meta-blue-1">
                        Vidhi Goswami
                      </p>
                      <p className="text-base font-bold text-meta-light-blue-3 ">
                        HR Manager
                      </p>
                      <div className="mt-14">
                        <button className="bg-meta-light-blue-1 px-[30px] py-[18px]">
                          <Icons.Arrow color={'#150936'} />
                        </button>
                        <button className="bg-meta-blue-1 px-[30px] py-[18px]">
                          <div className="rotate-[179deg]">
                            <Icons.Arrow color={'#FFFF'} />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <Image
                      alt="date"
                      width={278}
                      height={278}
                      src={'/landing/feedbackProfile.png'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 h-full px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-2xl lg:px-8">
          <div>
            <p className="text-lg font-semibold text-meta-light-blue-3">
              OUR PARTNERS
            </p>
            <p className="max-w-[642px] pt-2 text-4xl font-semibold text-meta-blue-1">
              What Our Partners Think About Us
            </p>
          </div>
          <div className="mt-[50px] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ">
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <div className="flex h-[150px] w-[233px] items-center justify-center rounded-[30px] border border-meta-light-blue-2 bg-meta-light-blue-5">
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
          <div>
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
                    Info@Certifyrecruit.Com
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-1/2 items-end justify-end rounded-[30px] bg-meta-gray-2">
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
