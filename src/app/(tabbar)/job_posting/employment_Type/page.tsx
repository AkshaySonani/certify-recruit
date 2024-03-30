"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Checkbox from "@/Components/Checkbox";

const WORK_ARR = [
  {
    id: 1,
    name: "Monday to Friday",
  },
  {
    id: 2,
    name: "Weekend availability",
  },
  {
    id: 3,
    name: "Day shift",
  },
];

const Page = () => {
  const router = useRouter();

  const handleBack = () => router.push("/job_posting");
  const handleNext = () => router.push("/job_posting/job_details");

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <p className="sm:text-default-t-25 text-lg font-semibold text-meta-purple-1">
          Job posting
        </p>
        <div className="flex items-center cursor-pointer">
          <Image
            width={25}
            height={25}
            alt="Preview"
            src={"/job/Eye_fill.svg"}
          />
          <p className="ml-2 sm:text-xl text-lg font-semibold text-meta-blue-1 sm:block hidden">
            Preview
          </p>
        </div>
      </div>

      <div className="flex justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-5 text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
            Employment Type
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
            Pick one or multiple option
          </p>
        </div>
        <div className="grid grid-cols-1 lg:w-1/2 w-full lg:mt-0 mt-2">
          <div className="flex items-center sm:flex-nowrap flex-wrap w-full">
            <div className="border-meta-light-blue-1 border-default-1 rounded-lg p-[13px] mr-[13px] sm:w-1/2 w-full">
              <Checkbox label={"Full-time"} />
            </div>
            <div className="border-meta-light-blue-1 border-default-1 rounded-lg p-[13px] mr-[13px] sm:w-1/2 w-full sm:mt-0 mt-2">
              <Checkbox label={"Part-time"} />
            </div>
          </div>
          <div className="flex items-center sm:flex-nowrap flex-wrap w-full my-3">
            <div className="border-meta-light-blue-1 border-default-1 rounded-lg p-[13px] mr-[13px] sm:w-1/2 w-full">
              <Checkbox label={"On demand"} />
            </div>
            <div className="border-meta-light-blue-1 border-default-1 rounded-lg p-[13px] mr-[13px] sm:w-1/2 w-full sm:mt-0 mt-2">
              <Checkbox label={"Temporary"} />
            </div>
          </div>
          <div className="flex items-center sm:flex-nowrap flex-wrap w-full">
            <div className="border-meta-light-blue-1 border-default-1 rounded-lg p-[13px] mr-[13px] sm:w-1/2 w-full">
              <Checkbox label={"Volunteer"} />
            </div>
            <div className="border-meta-light-blue-1 border-default-1 rounded-lg p-[13px] mr-[13px] sm:w-1/2 w-full sm:mt-0 mt-2">
              <Checkbox label={"Internship"} />
            </div>
          </div>
        </div>
      </div>
      <div className="border-meta-light-blue-1 border-default-1 my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-5 text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
            Working Schedule
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
            You can pick multiple work schedules.
          </p>
        </div>
        <div className="flex flex-col lg:w-1/2 w-full lg:mt-0 mt-3">
          <div
            className={`w-full flex items-center justify-between min-w-[250px] appearance-none rounded-lg border border-stroke px-5 py-2 outline-none transition focus:border-meta-blue-1 active:border-meta-blue-1`}
          >
            <div className="flex items-center">
              <span className="pr-2">
                <Image
                  alt="Icon"
                  width={14}
                  height={14}
                  src={"/job/Clock.svg"}
                />
              </span>
              <p className="text-meta-gray-1">Pick working schedule</p>
            </div>
            <span className="">
              <Image
                alt="Icon"
                width={14}
                height={14}
                src={"/dashboard/SelectDown.svg"}
              />
            </span>
          </div>
          <div className="text-start mt-4 flex items-center sm:flex-nowrap flex-wrap">
            {WORK_ARR?.map((ele) => {
              return (
                <div className="mr-3 sm:my-0 my-1 rounded-[10px] bg-meta-light-blue-2 py-[6px] px-3 text-meta-light-blue-3 text-base font-medium">
                  {ele?.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-meta-light-blue-1 border-default-1 my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-5 text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
            Salary
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
            Choose how you prefer to pay for this job.
          </p>
        </div>
        <div className="flex flex-col items-center lg:w-1/2 w-full lg:mt-0 mt-3">
          <div className="flex items-center justify-between w-full mb-3">
            <div className="border-default-1 border-meta-light-blue-1 rounded-[10px] min-w-[269px] w-full mr-[10px] cursor-pointer">
              <input
                id="hour"
                type="radio"
                radioGroup="Salary"
                className="ml-2 mt-2"
              />
              <label className="flex items-center flex-col mb-6" htmlFor="hour">
                <Image
                  width={20}
                  height={20}
                  alt="clock-icon"
                  src={"/job/Clock.svg"}
                />
                <p>Hourly</p>
              </label>
            </div>
            <div className="border-default-1 border-meta-light-blue-1 rounded-[10px] min-w-[269px] w-full cursor-pointer">
              <input
                id="month"
                type="radio"
                radioGroup="Salary"
                className="ml-2 mt-2"
              />
              <label
                htmlFor="month"
                className="flex items-center flex-col mb-6"
              >
                <Image
                  width={20}
                  height={20}
                  alt="clock-icon"
                  src={"/job/Clock.svg"}
                />
                <p>Monthly</p>
              </label>
            </div>
          </div>

          <div className="w-full">
            <label className="text-base font-medium text-meta-purple-1">
              Hourly rate
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
            />
            <div className="border-meta-light-blue-1 border-default-1 my-4" />

            <div className="mr-[13px] sm:w-1/2 w-full">
              <Checkbox label={"Salary is negotiable"} />
            </div>
          </div>
        </div>
      </div>
      <div className="border-meta-light-blue-1 border-default-1 my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="w-full lg:mr-5 text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
            Interview Time
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
            Choose your interview time slot
          </p>
        </div>
      </div>

      <div className="w-full flex justify-between sm:mt-16 mt-7 sm:flex-nowrap flex-wrap">
        <button
          onClick={() => handleBack()}
          className="border-meta-light-blue-1 border-default-1 text-base text-meta-light-blue-3 font-medium py-[13px] rounded-lg sm:min-w-[200px] min-w-full sm:mb-0 mb-3"
        >
          Back
        </button>
        <button
          onClick={() => handleNext()}
          className="bg-meta-light-blue-1 text-base text-meta-light-blue-3 font-medium py-[13px] rounded-lg sm:min-w-[200px] min-w-full"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
