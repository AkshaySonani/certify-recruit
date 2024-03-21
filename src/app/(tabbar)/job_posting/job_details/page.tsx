"use client";
import Image from "next/image";
import ReactQuill from "react-quill";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import Checkbox from "@/Components/Checkbox";
import SelectBox from "@/Components/SelectBox";

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
        <p className="sm:text-[25px] text-lg font-semibold text-text/secondary">
          Job posting
        </p>
        <div className="flex items-center cursor-pointer">
          <Image
            width={25}
            height={25}
            alt="Preview"
            src={"/job/Eye_fill.svg"}
          />
          <p className="ml-2 sm:text-xl text-lg font-semibold text-text/primary sm:block hidden">
            Preview
          </p>
        </div>
      </div>

      <div className="flex items-start justify-between w-full lg:flex-nowrap h-full flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-[20px] text-start">
          <p className="sm:text-2xl text-xl font-semibold text-text/secondary">
            Job detail
          </p>
          <p className="sm:text-base text-sm font-medium text-text/paragraph">
            Tell us about the role
          </p>
        </div>
        <div className="flex items-center lg:w-1/2 w-full lg:mt-0 mt-3 mb-10">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(e) => setContent(e)}
            className="!h-[300px] !rounded-lg !w-full"
          />
        </div>
      </div>
      <div className="border-stroke/secondary border-[1px] my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-[20px] text-start">
          <p className="sm:text-2xl text-xl font-semibold text-text/secondary">
            Skills
          </p>
          <p className="sm:text-base text-sm font-medium text-text/paragraph">
            Add skill keywords (max 10) to make your job more visible to the
            right candidates.
          </p>
        </div>

        <div className="flex items-center flex-col lg:w-1/2 w-full lg:mt-0 mt-3">
          <div className="flex items-start w-full lg:mt-0 mt-3 flex-wrap">
            {SKILL_ARR?.map((ele: any) => {
              return (
                <div className="flex items-center p-3 border-[1.5px] border-stroke/secondary rounded-lg mr-[10px] mb-2">
                  <p className="text-text/paragraph font-medium text-base whitespace-nowrap">
                    {ele?.name}
                  </p>
                  <Image
                    width={25}
                    height={25}
                    alt="Preview"
                    src={"/job/Close.svg"}
                    className="ml-[10px]"
                  />
                </div>
              );
            })}
          </div>
          {isOpen ? (
            <SelectBox
              options={options}
              optionStyle="w-[38%]"
              buttonStyle="h-[47px]"
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          ) : (
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-full cursor-pointer"
            >
              <div className="border-[1.5px] w-max border-stroke/secondary rounded-lg flex items-start p-3">
                <p>Add Skill</p>
                <div>
                  <Image
                    width={25}
                    height={25}
                    alt="Preview"
                    src={"/job/Add.svg"}
                    className="ml-[10px]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="border-stroke/secondary border-[1px] my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-[20px] text-start">
          <p className="sm:text-2xl text-xl font-semibold text-text/secondary">
            Hiring multiple candidates?
          </p>
          <p className="sm:text-base text-sm font-medium text-text/paragraph">
            This will be displayed on job page for candidates to see.
          </p>
        </div>
        <div className="flex items-start lg:w-1/2 w-full lg:mt-0 mt-3 flex-col">
          <div className="border-[1.5px] border-stroke/secondary rounded-lg w-[196px] min-h-[47px] flex justify-between">
            <button className="px-3 w-1/3" onClick={handleIncrement}>
              <Image
                width={25}
                height={25}
                alt="Preview"
                src={"/job/Plus.svg"}
              />
            </button>
            <div className="border-x-[1.5px] border-x-stroke/secondary w-[65%] flex items-center justify-center text-text/paragraph text-base font-medium">
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
            <p className="sm:text-base text-sm font-medium text-text/paragraph">
              I am hiring multiple candidates
            </p>
          </div>
        </div>
      </div>
      <div className="border-stroke/secondary border-[1px] my-6" />

      <div className="w-full flex justify-between sm:mt-16 mt-7 sm:flex-nowrap flex-wrap">
        <button
          onClick={() => handleBack()}
          className="border-stroke/secondary border-[1px] text-base text-text/paragraph font-medium py-[13px] rounded-lg sm:min-w-[200px] min-w-full sm:mb-0 mb-3"
        >
          Back
        </button>
        <button
          onClick={() => handleNext()}
          className="bg-stroke/secondary text-base text-text/paragraph font-medium py-[13px] rounded-lg sm:min-w-[200px] min-w-full"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
