"use client";
import React from "react";
import Image from "next/image";
import Checkbox from "@/Components/Checkbox";
import Select from "@/Components/Select";
import { useRouter } from "next/navigation";

const SelectOption = [
  { label: "Type here....", value: "" },
  { label: "Surat", value: "Surat" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Rajkot", value: "Rajkot" },
];

const Page = () => {
  const router = useRouter();

  const handleNext = () => router.push("/job_posting/employment_Type");

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <p className="sm:text-[25px] text-lg font-semibold text-meta-purple-1">
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

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-[20px] text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
            Are you a hiring manager?
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
            The hired candidate will work in your reporting chain.
          </p>
        </div>
        <div className="flex items-center lg:w-1/2 w-full lg:mt-0 mt-3">
          <div className="border-meta-light-blue-1 border-[1px] rounded-lg p-[13px] mr-[13px] w-1/2">
            <Checkbox label={"Yes"} />
          </div>
          <div className="border-meta-light-blue-1 border-[1px] rounded-lg p-[13px] w-1/2">
            <Checkbox label={"No"} />
          </div>
        </div>
      </div>
      <div className="border-meta-light-blue-1 border-[1px] my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-[20px] text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
            Company <span className="text-red-600">*</span>
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
            Your Company name
          </p>
        </div>
        <div className="flex items-center lg:w-1/2 w-full lg:mt-0 mt-3">
          <input
            type="text"
            placeholder="Type here..."
            className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
          />
        </div>
      </div>
      <div className="border-meta-light-blue-1 border-[1px] my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-[20px] text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
            Job title <span className="text-red-600">*</span>
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
            You can pick multiple work schedules.
          </p>
        </div>
        <div className="flex items-center lg:w-1/2 w-full lg:mt-0 mt-3">
          <input
            type="text"
            placeholder="Type here..."
            className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
          />
        </div>
      </div>
      <div className="border-meta-light-blue-1 border-[1px] my-6" />

      <div className="flex items-center justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-[20px] text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
            Workplace type <span className="text-red-600">*</span>
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
            You can pick multiple work schedules.
          </p>
        </div>
        <div className="flex items-center lg:w-1/2 w-full lg:mt-0 mt-3 md:flex-nowrap flex-wrap">
          <div className="border-meta-light-blue-1 border-[1px] rounded-lg p-[13px] w-1/3 md:min-w-[126px] min-w-full">
            <Checkbox label={"On-site"} />
          </div>
          <div className="border-meta-light-blue-1 border-[1px] rounded-lg p-[13px] w-1/3 md:mx-[13px] md:min-w-[126px] min-w-full md:my-0 my-2">
            <Checkbox label={"Hybrid"} />
          </div>
          <div className="border-meta-light-blue-1 border-[1px] rounded-lg p-[13px] w-1/3 md:min-w-[126px] min-w-full">
            <Checkbox label={"Remote"} />
          </div>
        </div>
      </div>
      <div className="border-meta-light-blue-1 border-[1px] my-6" />

      <div className="flex justify-between w-full lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-[20px] text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
            Job posting location
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
            Which option best describe this job’s location?
          </p>
        </div>
        <div className="lg:w-1/2 w-full">
          <div className="lg:mt-0 mt-2">
            <label className="text-base font-medium text-meta-purple-1">
              City <span className="text-red-600">*</span>
            </label>
            <div className="mt-1">
              <Select options={SelectOption} />
            </div>
            <div className="flex items-center my-3">
              <div className="mr-[10px]">
                <label className="text-base font-medium text-meta-purple-1">
                  Area
                </label>
                <input
                  type="text"
                  placeholder="Type here..."
                  className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                />
              </div>
              <div>
                <label className="text-base font-medium text-meta-purple-1">
                  Pincode
                </label>
                <input
                  type="text"
                  placeholder="Type here..."
                  className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                />
              </div>
            </div>
            <div>
              <label className="text-base font-medium text-meta-purple-1">
                Street address
              </label>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => handleNext()}
        className="w-full flex justify-end mt-16"
      >
        <button className="bg-meta-light-blue-1 text-base text-meta-light-blue-3 font-medium py-[13px] rounded-lg min-w-[200px]">
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
