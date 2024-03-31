"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Checkbox from "@/Components/Checkbox";
import { TEXT } from "@/service/Helper";

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
        <p className="sm:text-text-2xl text-lg font-semibold text-meta-purple-1">
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

      <div className="flex justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-5 text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
          {TEXT?.EMPLOYMENT_TYPE}
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
            {TEXT?.PICK_ONE_OR_MULTIPLE_OPTION}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:w-1/2 w-full lg:mt-0 mt-2">
          <div className="flex items-center sm:flex-nowrap flex-wrap w-full">
            <div className="border-meta-light-blue-1 border rounded-lg -3 mr-3 sm:w-1/2 w-full">
              <Checkbox label={"Full-time"} />
            </div>
            <div className="border-meta-light-blue-1 border rounded-lg -3 mr-3 sm:w-1/2 w-full sm:mt-0 mt-2">
              <Checkbox label={"Part-time"} />
            </div>
          </div>
          <div className="flex items-center sm:flex-nowrap flex-wrap w-full my-3">
            <div className="border-meta-light-blue-1 border rounded-lg -3 mr-3 sm:w-1/2 w-full">
              <Checkbox label={"On demand"} />
            </div>
            <div className="border-meta-light-blue-1 border rounded-lg -3 mr-3 sm:w-1/2 w-full sm:mt-0 mt-2">
              <Checkbox label={"Temporary"} />
            </div>
          </div>
          <div className="flex items-center sm:flex-nowrap flex-wrap w-full">
            <div className="border-meta-light-blue-1 border rounded-lg -3 mr-3 sm:w-1/2 w-full">
              <Checkbox label={"Volunteer"} />
            </div>
            <div className="border-meta-light-blue-1 border rounded-lg -3 mr-3 sm:w-1/2 w-full sm:mt-0 mt-2">
              <Checkbox label={"Internship"} />
            </div>
          </div>
        </div>
      </div>
      <div className="border-meta-light-blue-1 border my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-5 text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
            {TEXT?.WORKING_SCHEDULE}
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
           {TEXT?.YOU_CAN_PICK_MULTIPLE_WORK_SCHEDULES}
          </p>
        </div>
        <div className="flex flex-col lg:w-1/2 w-full lg:mt-0 mt-3">
          <div
            className={`w-full flex items-center justify-between min-w-64 appearance-none rounded-lg border border-stroke px-5 py-2 outline-none transition focus:border-meta-blue-1 active:border-meta-blue-1`}
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
                <div className="mr-3 sm:my-0 my-1 rounded-lg bg-meta-light-blue-2 py-1 px-3 text-meta-light-blue-3 text-base font-medium">
                  {ele?.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-meta-light-blue-1 border my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-5 text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
            {TEXT?.SALARY}
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
         {TEXT?.CHOOSE_HOW_YOU_PREFER_TO_PAY_FOR_THIS_JOB}
          </p>
        </div>
        <div className="flex flex-col items-center lg:w-1/2 w-full lg:mt-0 mt-3">
          <div className="flex items-center justify-between w-full mb-3">
            <div className="border border-meta-light-blue-1 rounded-xl min-w-64 w-full mr-3 cursor-pointer">
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
                <p>{TEXT?.HOURLY}</p>
              </label>
            </div>
            <div className="border border-meta-light-blue-1 rounded-xl min-w-64 w-full cursor-pointer">
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
                <p>{TEXT?.MONTHLY}</p>
              </label>
            </div>
          </div>

          <div className="w-full">
            <label className="text-base font-medium text-meta-purple-1">
              {TEXT?.HOURLY_RATE}
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
            />
            <div className="border-meta-light-blue-1 border my-4" />

            <div className="mr-3 sm:w-1/2 w-full">
              <Checkbox label={"Salary is negotiable"} />
            </div>
          </div>
        </div>
      </div>
      <div className="border-meta-light-blue-1 border my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="w-full lg:mr-5 text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
           {TEXT?.INTERVIEW_TIME}
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
           {TEXT?.CHOOSE_YOUR_INTERVIEW_TIME_SLOT}
          </p>
        </div>
      </div>

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
