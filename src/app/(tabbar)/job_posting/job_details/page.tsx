"use client";
import Image from "next/image";
import ReactQuill from "react-quill";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import Checkbox from "@/Components/Checkbox";
import SelectBox from "@/Components/SelectBox";
import { TEXT } from "@/service/Helper";

const SKILL_ARR = [
  {
    id: 1,
    name: "Server Side",
  },
  {
    id: 2,
    name: "Cascading Style Sheets (CSS)",
  },
  {
    id: 3,
    name: "Java",
  },
];

const Page = () => {
  const router = useRouter();

  const [value, setValue] = useState(1);
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const options = [
    { id: 4, name: "Option 1" },
    { id: 5, name: "Option 2" },
    { id: 6, name: "Option 3" },
    { id: 7, name: "Option 4" },
    { id: 8, name: "Option 5" },
  ];

  const formattedValue = value < 10 ? `0${value}` : `${value}`;
  const handleNext = () => router.push("/job_posting/job_details");
  const handleIncrement = () => setValue((prevValue) => prevValue + 1);
  const handleBack = () => router.push("/job_posting/employment_Type");
  const handleDecrement = () =>
    setValue((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <p className="sm:text-text-text-2xl text-lg font-semibold text-meta-purple-1">
          {TEXT?.JOB_POSTING}
        </p>
        <div className="flex items-center cursor-pointer">
          <Image
            width={25}
            height={25}
            alt="Preview"
            src={"/job/Eye_fill.svg"}
          />
          <p className="ml-2 sm:text-xl text-lg font-semibold text-meta-blue-1 sm:block hidden">
            {TEXT?.PREVIEW}
          </p>
        </div>
      </div>

      <div className="flex items-start justify-between w-full lg:flex-nowrap h-full flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-5 text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
           {TEXT?.JOB_DETAILS}
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
           {TEXT?.TELL_US_ABOUT_THE_ROLE}
          </p>
        </div>
        <div className="flex items-center lg:w-1/2 w-full lg:mt-0 mt-3 mb-10">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(e:any) => setContent(e)}
            className="!h-78 !rounded-lg !w-full"
          />
        </div>
      </div>
      <div className="border-meta-light-blue-1 border my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-5 text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
            {TEXT?.SKILLS}
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
            {TEXT?.ADD_SKILL_KEYWORDS_TO_MAKE_YOUR_JOB}
          </p>
        </div>

        <div className="flex items-center flex-col lg:w-1/2 w-full lg:mt-0 mt-3">
          <div className="flex items-start w-full lg:mt-0 mt-3 flex-wrap">
            {SKILL_ARR?.map((ele: any) => {
              return (
                <div className="flex items-center p-3 border-2 border-meta-light-blue-1 rounded-lg mr-3 mb-2">
                  <p className="text-meta-light-blue-3 font-medium text-base whitespace-nowrap">
                    {ele?.name}
                  </p>
                  <Image
                    width={25}
                    height={25}
                    alt="Preview"
                    className="ml-3"
                    src={"/job/Close.svg"}
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
              <div className="border-2 w-max border-meta-light-blue-1 rounded-lg flex items-start p-3">
                <p>{TEXT?.ADD_SKILL}</p>
                <div>
                  <Image
                    width={25}
                    height={25}
                    alt="Preview"
                    className="ml-3"
                    src={"/job/Add.svg"}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="border-meta-light-blue-1 border my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-5 text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
           {TEXT?.HIRING_MULTIPLE_CANDIDATES}
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
           {TEXT?.THIS_WILL_BE_DISPLAYED_ON_JOB_PAGE_FOR_CANDIDATES_SEE}
          </p>
        </div>
        <div className="flex items-start lg:w-1/2 w-full lg:mt-0 mt-3 flex-col">
          <div className="border-2 border-meta-light-blue-1 rounded-lg w-48 min-h-12 flex justify-between">
            <button className="px-3 w-1/3" onClick={handleIncrement}>
              <Image
                width={25}
                height={25}
                alt="Preview"
                src={"/job/Plus.svg"}
              />
            </button>
            <div className="border-x-2 border-x-meta-light-blue-1 w-2/3 flex items-center justify-center text-meta-light-blue-3 text-base font-medium">
              <p>{formattedValue}</p>
            </div>
            <button className="px-3 w-1/3" onClick={handleDecrement}>
              <Image
                width={25}
                height={25}
                alt="Preview"
                src={"/job/Minus.svg"}
              />
            </button>
          </div>
          <div className="flex items-center mt-5">
            <Checkbox />
            <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
              {TEXT?.I_AM_HIRING_MULTIPLE_CANDIDATES}
            </p>
          </div>
        </div>
      </div>
      <div className="border-meta-light-blue-1 border my-6" />

      <div className="w-full flex justify-between sm:mt-16 mt-7 sm:flex-nowrap flex-wrap">
        <button
          onClick={() => handleBack()}
          className="border-meta-light-blue-1 border text-base text-meta-light-blue-3 font-medium py-3 rounded-lg sm:min-w-48 min-w-full sm:mb-0 mb-3"
        >
          {TEXT?.BACK}
        </button>
        <button
          onClick={() => handleNext()}
          className="bg-meta-light-blue-1 text-base text-meta-light-blue-3 font-medium py-3 rounded-lg sm:min-w-48 min-w-full"
        >
          {TEXT?.NEXT}
        </button>
      </div>
    </div>
  );
};

export default Page;
