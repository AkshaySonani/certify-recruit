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

      <div className="flex justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-[20px] text-start">
          <p className="sm:text-2xl text-xl font-semibold text-text/secondary">
            Employment Type
          </p>
          <p className="sm:text-base text-sm font-medium text-text/paragraph">
            Pick one or multiple option
          </p>
        </div>
        <div className="grid grid-cols-1 lg:w-1/2 w-full lg:mt-0 mt-2">
          <div className="flex items-center sm:flex-nowrap flex-wrap w-full">
            <div className="border-stroke/secondary border-[1px] rounded-lg p-[13px] mr-[13px] sm:w-1/2 w-full">
              <Checkbox label={"Full-time"} />
            </div>
            <div className="border-stroke/secondary border-[1px] rounded-lg p-[13px] mr-[13px] sm:w-1/2 w-full sm:mt-0 mt-2">
              <Checkbox label={"Part-time"} />
            </div>
          </div>
          <div className="flex items-center sm:flex-nowrap flex-wrap w-full my-3">
            <div className="border-stroke/secondary border-[1px] rounded-lg p-[13px] mr-[13px] sm:w-1/2 w-full">
              <Checkbox label={"On demand"} />
            </div>
            <div className="border-stroke/secondary border-[1px] rounded-lg p-[13px] mr-[13px] sm:w-1/2 w-full sm:mt-0 mt-2">
              <Checkbox label={"Temporary"} />
            </div>
          </div>
          <div className="flex items-center sm:flex-nowrap flex-wrap w-full">
            <div className="border-stroke/secondary border-[1px] rounded-lg p-[13px] mr-[13px] sm:w-1/2 w-full">
              <Checkbox label={"Volunteer"} />
            </div>
            <div className="border-stroke/secondary border-[1px] rounded-lg p-[13px] mr-[13px] sm:w-1/2 w-full sm:mt-0 mt-2">
              <Checkbox label={"Internship"} />
            </div>
          </div>
        </div>
      </div>
      <div className="border-stroke/secondary border-[1px] my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-[20px] text-start">
          <p className="sm:text-2xl text-xl font-semibold text-text/secondary">
            Working Schedule
          </p>
          <p className="sm:text-base text-sm font-medium text-text/paragraph">
            You can pick multiple work schedules.
          </p>
        </div>
        <div className="flex flex-col lg:w-1/2 w-full lg:mt-0 mt-3">
          <div
            className={`w-full flex items-center justify-between min-w-[250px] appearance-none rounded-lg border border-stroke px-5 py-2 outline-none transition focus:border-text/primary active:border-text/primary`}
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
              <p className="text-text/third">Pick working schedule</p>
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
                <div className="mr-3 sm:my-0 my-1 rounded-[10px] bg-element/primary py-[6px] px-3 text-text/paragraph text-base font-medium">
                  {ele?.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-stroke/secondary border-[1px] my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-[20px] text-start">
          <p className="sm:text-2xl text-xl font-semibold text-text/secondary">
            Salary
          </p>
          <p className="sm:text-base text-sm font-medium text-text/paragraph">
            Choose how you prefer to pay for this job.
          </p>
        </div>
        <div className="flex flex-col items-center lg:w-1/2 w-full lg:mt-0 mt-3">
          <div className="flex items-center justify-between w-full mb-3">
            <div className="border-[1px] border-stroke/secondary rounded-[10px] min-w-[269px] w-full mr-[10px] cursor-pointer">
              <input
                id="hour"
                type="radio"
                radioGroup="Salary"
                className="ml-2 mt-2"
              />
              <label className="flex items-center flex-col mb-6" htmlFor="hour">
                <Image
                  src={"/job/Clock.svg"}
                  alt="clock-icon"
                  width={20}
                  height={20}
                />
                <p>Hourly</p>
              </label>
            </div>
            <div className="border-[1px] border-stroke/secondary rounded-[10px] min-w-[269px] w-full cursor-pointer">
              <input
                id="month"
                type="radio"
                radioGroup="Salary"
                className="ml-2 mt-2"
              />
              <label
                className="flex items-center flex-col mb-6"
                htmlFor="month"
              >
                <Image
                  src={"/job/Clock.svg"}
                  alt="clock-icon"
                  width={20}
                  height={20}
                />
                <p>Monthly</p>
              </label>
            </div>
          </div>

          <div className="w-full">
            <label className="text-base font-medium text-text/secondary">
              Hourly rate
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-stroke/secondary focus:border-text/paragraph mt-1 px-5 py-3"
            />
            <div className="border-stroke/secondary border-[1px] my-4" />

            <div className="mr-[13px] sm:w-1/2 w-full">
              <Checkbox label={"Salary is negotiable"} />
            </div>
          </div>
        </div>
      </div>
      <div className="border-stroke/secondary border-[1px] my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="w-full lg:mr-[20px] text-start">
          <p className="sm:text-2xl text-xl font-semibold text-text/secondary">
            Interview Time
          </p>
          <p className="sm:text-base text-sm font-medium text-text/paragraph">
            Choose your interview time slot
          </p>
        </div>
      </div>

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
