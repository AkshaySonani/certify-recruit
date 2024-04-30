'use client';
import Image from 'next/image';
// import ReactQuill from "react-quill";
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation';
import Checkbox from '@/Components/Checkbox';
import SelectBox from '@/Components/SelectBox';
import { TEXT } from '@/service/Helper';

const SKILL_ARR = [
  {
    id: 1,
    name: 'Server Side',
  },
  {
    id: 2,
    name: 'Cascading Style Sheets (CSS)',
  },
  {
    id: 3,
    name: 'Java',
  },
];

const Page = () => {
  const router = useRouter();

  const [value, setValue] = useState(1);
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const options = [
    { id: 4, name: 'Option 1' },
    { id: 5, name: 'Option 2' },
    { id: 6, name: 'Option 3' },
    { id: 7, name: 'Option 4' },
    { id: 8, name: 'Option 5' },
  ];

  const formattedValue = value < 10 ? `0${value}` : `${value}`;
  const handleNext = () => router.push('/job_posting/job_details');
  const handleIncrement = () => setValue((prevValue) => prevValue + 1);
  const handleBack = () => router.push('/job_posting/employment_Type');
  const handleDecrement = () =>
    setValue((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <p className="sm:text-text-text-2xl text-lg font-semibold text-meta-purple-1">
          {TEXT?.JOB_POSTING}
        </p>
        <div className="flex cursor-pointer items-center">
          <Image
            width={25}
            height={25}
            alt="Preview"
            src={'/job/Eye_fill.svg'}
          />
          <p className="ml-2 hidden text-lg font-semibold text-meta-blue-1 sm:block sm:text-xl">
            {TEXT?.PREVIEW}
          </p>
        </div>
      </div>

      <div className="flex h-full w-full flex-wrap items-start justify-between lg:flex-nowrap">
        <div className="w-full text-start lg:mr-5 lg:w-1/2">
          <p className="text-xl font-semibold text-meta-purple-1 sm:text-2xl">
            {TEXT?.JOB_DETAILS}
          </p>
          <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
            {TEXT?.TELL_US_ABOUT_THE_ROLE}
          </p>
        </div>
        <div className="mb-10 mt-3 flex w-full items-center lg:mt-0 lg:w-1/2">
          {/* <ReactQuill
            theme="snow"
            value={content}
            onChange={(e: any) => setContent(e)}
            className="!h-78 !rounded-lg !w-full"
          /> */}
        </div>
      </div>
      <div className="my-6 border border-meta-light-blue-1" />

      <div className="flex w-full flex-wrap items-center justify-between lg:flex-nowrap">
        <div className="w-full text-start lg:mr-5 lg:w-1/2">
          <p className="text-xl font-semibold text-meta-purple-1 sm:text-2xl">
            {TEXT?.SKILLS}
          </p>
          <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
            {TEXT?.ADD_SKILL_KEYWORDS_TO_MAKE_YOUR_JOB}
          </p>
        </div>

        <div className="mt-3 flex w-full flex-col items-center lg:mt-0 lg:w-1/2">
          <div className="mt-3 flex w-full flex-wrap items-start lg:mt-0">
            {SKILL_ARR?.map((ele: any) => {
              return (
                <div className="mb-2 mr-3 flex items-center rounded-lg border-2 border-meta-light-blue-1 p-3">
                  <p className="whitespace-nowrap text-base font-medium text-meta-light-blue-3">
                    {ele?.name}
                  </p>
                  <Image
                    width={25}
                    height={25}
                    alt="Preview"
                    className="ml-3"
                    src={'/job/Close.svg'}
                  />
                </div>
              );
            })}
          </div>
          {isOpen ? (
            <SelectBox
              options={options}
              buttonStyle="h-12"
              optionStyle="w-2/5"
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          ) : (
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-full cursor-pointer"
            >
              <div className="flex w-max items-start rounded-lg border-2 border-meta-light-blue-1 p-3">
                <p>{TEXT?.ADD_SKILL}</p>
                <div>
                  <Image
                    width={25}
                    height={25}
                    alt="Preview"
                    className="ml-3"
                    src={'/job/Add.svg'}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="my-6 border border-meta-light-blue-1" />

      <div className="flex w-full flex-wrap items-center justify-between lg:flex-nowrap">
        <div className="w-full text-start lg:mr-5 lg:w-1/2">
          <p className="text-xl font-semibold text-meta-purple-1 sm:text-2xl">
            {TEXT?.HIRING_MULTIPLE_CANDIDATES}
          </p>
          <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
            {TEXT?.THIS_WILL_BE_DISPLAYED_ON_JOB_PAGE_FOR_CANDIDATES_SEE}
          </p>
        </div>
        <div className="mt-3 flex w-full flex-col items-start lg:mt-0 lg:w-1/2">
          <div className="flex min-h-12 w-48 justify-between rounded-lg border-2 border-meta-light-blue-1">
            <button className="w-1/3 px-3" onClick={handleIncrement}>
              <Image
                width={25}
                height={25}
                alt="Preview"
                src={'/job/Plus.svg'}
              />
            </button>
            <div className="flex w-2/3 items-center justify-center border-x-2 border-x-meta-light-blue-1 text-base font-medium text-meta-light-blue-3">
              <p>{formattedValue}</p>
            </div>
            <button className="w-1/3 px-3" onClick={handleDecrement}>
              <Image
                width={25}
                height={25}
                alt="Preview"
                src={'/job/Minus.svg'}
              />
            </button>
          </div>
          <div className="mt-5 flex items-center">
            <Checkbox />
            <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
              {TEXT?.I_AM_HIRING_MULTIPLE_CANDIDATES}
            </p>
          </div>
        </div>
      </div>
      <div className="my-6 border border-meta-light-blue-1" />

      <div className="mt-7 flex w-full flex-wrap justify-between sm:mt-16 sm:flex-nowrap">
        <button
          onClick={() => handleBack()}
          className="mb-3 min-w-full rounded-lg border border-meta-light-blue-1 py-3 text-base font-medium text-meta-light-blue-3 sm:mb-0 sm:min-w-48"
        >
          {TEXT?.BACK}
        </button>
        <button
          onClick={() => handleNext()}
          className="min-w-full rounded-lg bg-meta-light-blue-1 py-3 text-base font-medium text-meta-light-blue-3 sm:min-w-48"
        >
          {TEXT?.NEXT}
        </button>
      </div>
    </div>
  );
};

export default Page;
