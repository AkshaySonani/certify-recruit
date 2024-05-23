'use client';
import React, { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTE, TEXT } from '@/service/Helper';
import { Icons } from '@/svg';
import Image from 'next/image';
import Button from '@/Components/Button';

const BenefitsArr = [
  {
    title: 'Enhanced career opportunities',
    icon: <Icons.Bag />,
  },
  {
    title: 'Knowledge and skill validation',
    icon: <Icons.knowledge />,
  },
  {
    title: 'Skill reinforcement',
    icon: <Icons.IQ />,
  },
  {
    title: 'Sense of accomplishment',
    icon: <Icons.Sense />,
  },
  {
    title: 'Public recognition',
    icon: <Icons.Public />,
  },
  {
    title: 'Building trust and Relationship',
    icon: <Icons.Trade />,
  },
  {
    title: 'Certifyrecruit help to find a right job',
    icon: <Icons.HelpInfo />,
  },
];

const InstructionsArr = [
  'You are permitted a maximum of two exam attempts.',
  'The exam consists of 30 multiple-choice questions, each with four options.',
  'You will have 15 minutes to complete the assessment.',
  'Throughout the test, we kindly request that you avoid refreshing the page or navigating away from it.',
  'If you do so, you will receive a warning Pop up. If this is done three times, it will result in your removal from the assessment',
  'You will only be able to download the certificate in which you had the highest marks obtained.',
  'Once you have completed the exam, please click the Finish button.',
];

const Page = () => {
  const router = useRouter();

  return (
    <div>
      <div>
        <div className="mb-4 text-2xl font-semibold text-meta-purple-1">
          Certification
        </div>
        <p className="text-lg font-medium text-meta-light-blue-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type.
        </p>
      </div>
      <div className="mt-5">
        <p className="text-xl font-bold text-meta-purple-1">Benefits</p>
        <div className="mt-2 flex flex-wrap gap-4">
          {BenefitsArr?.map((list) => {
            return (
              <div className="flex w-[30%] items-center gap-3 rounded-lg bg-meta-light-blue-2 py-3 pl-4">
                <div className="relative h-12 w-12 rounded-full bg-white">
                  <div className="absolute left-3 top-3">{list?.icon}</div>
                </div>
                <div className="text-sm text-meta-light-blue-3">
                  {list?.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-5">
        <p className="text-xl font-bold text-meta-purple-1">Instructions</p>
        <ul className="">
          {InstructionsArr?.map((list: any) => {
            return (
              <div className="mt-2 flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-meta-light-blue-3"></div>
                <li className="text-lg font-medium text-meta-light-blue-3">
                  {list}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="mt-5">
        <p className="text-xl font-bold text-meta-purple-1">Fees</p>
        <div className="bg-meta-light-blue-4 mt-3 flex w-full items-center rounded-lg border border-meta-green-1 p-4">
          <div className="relative h-12 w-12  rounded-full bg-white">
            <Image
              alt="Icon"
              width={23}
              height={23}
              src={'/wallet.svg'}
              className="absolute left-3 top-3"
            />
          </div>
          <div className="ml-3 text-lg font-semibold text-meta-light-blue-3">
            One time payment only Rs.
            <span className="text-meta-green-1"> 200/-</span>
          </div>
        </div>
        <div className="mt-5 flex w-full justify-end">
          <div className="w-auto">
            <Button
              title="Start Assessment"
              btnClass="px-6 p-2"
              handleClick={() => router?.push(ROUTE?.CHOOSE_CATEGORY)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
