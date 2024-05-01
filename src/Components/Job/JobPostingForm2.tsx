"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TEXT } from "@/service/Helper";
import MultipleSelectBox from "../MultipleSelectBox";
import { EMP_TYPE_ARR } from "@/constant/Enum";

const WORK_SCHEDULE = [
  {
    id: 1,
    value: "Monday to Friday",
    label: "Monday to Friday",
  },
  {
    id: 2,
    value: "Weekend availability",
    label: "Weekend availability",
  },
  {
    id: 3,
    value: "Day shift",
    label: "Day shift",
  },
];

const style = {
  control: (base: any, state: any) => ({
    ...base,
    border: state.isFocused ? 0 : 0,
    // This line disable the blue border
    boxShadow: state.isFocused ? 0 : 0,
    paddingLeft: "20px",
    "&:hover": {
      border: state.isFocused ? 0 : 0,
    },
  }),
};

const JobPostingForm2 = ({ formik }: { formik: any }) => {
  const handleClose = (list: any) => {
    const arr = formik?.values?.working_schedule.filter((el: any) => {
      return el !== list;
    });
  };
  const router = useRouter();
  return (
    <div className="">
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
          <div className="flex items-center  flex-wrap w-full gap-3 ">
            {EMP_TYPE_ARR?.map((list: any) => {
              return (
                <div className="border-meta-light-blue-1 lg:w-[48%] border rounded-lg p-3 sm:w-[30%] w-full">
                  <label
                    htmlFor={list}
                    className={`flex cursor-pointer select-none items-center `}
                  >
                    <input
                      type="checkbox"
                      name={"job_types"}
                      id={list}
                      value={list}
                      onChange={formik.handleChange}
                    />
                    <p className="pl-3 capitalize">{list}</p>
                  </label>
                </div>
              );
            })}
          </div>
          {formik.touched.job_types && formik.errors.job_types && (
            <div className="error">{formik.errors.job_types}</div>
          )}
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
            className={`w-full flex items-center justify-between min-w-64 appearance-none rounded-lg border border-stroke px-1  outline-none transition focus:border-meta-blue-1 active:border-meta-blue-1`}
          >
            <div className="flex items-center w-full relative">
              <MultipleSelectBox
                style={style}
                className="border-none w-full  "
                value={formik?.values?.working_schedule}
                name="working_schedule"
                form={formik}
                options={WORK_SCHEDULE}
                placeholder="Select working schedule..."
                isMulti={true}
              />
              <div className="absolute left-2">
                <Image
                  alt="Icon"
                  width={14}
                  height={14}
                  src={"/job/Clock.svg"}
                />
              </div>
            </div>
          </div>
          {formik.touched.working_schedule &&
            formik.errors.working_schedule && (
              <div className="error">{formik.errors.working_schedule}</div>
            )}

          <div className="text-start mt-4 flex items-center sm:flex-nowrap flex-wrap">
            {formik?.values?.working_schedule?.map((ele: any, i: any) => {
              return (
                <div className="flex items-center px-2 py-1 border-2 border-meta-light-blue-1 rounded-lg mr-3 mb-2">
                  <p className="text-meta-light-blue-3 font-medium text-sm whitespace-nowrap">
                    {ele}
                  </p>
                  <div
                    className="cursor-pointer "
                    onClick={() => handleClose(ele)}
                  >
                    <Image
                      width={19}
                      height={19}
                      alt="Preview"
                      className="ml-3"
                      src={"/job/Close.svg"}
                    />
                  </div>
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
                name="salary_pay"
                type="radio"
                radioGroup="Salary"
                value={"MONTHLY"}
                onChange={formik.handleChange}
                className="ml-2 mt-2"
              />
              <label className="flex items-center flex-col mb-6" htmlFor="hour">
                <Image
                  width={20}
                  height={20}
                  alt="clock-icon"
                  src={"/job/Clock.svg"}
                />
                <p>{TEXT?.MONTHLY}</p>
              </label>
            </div>
            <div className="border border-meta-light-blue-1 rounded-xl min-w-64 w-full cursor-pointer">
              <input
                id="month"
                name="salary_pay"
                type="radio"
                radioGroup="Salary"
                value={"HOURLY"}
                onChange={formik.handleChange}
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
                <p>{TEXT?.HOURLY}</p>
              </label>
            </div>
          </div>

          <div className="w-full">
            <label className="text-base font-medium text-meta-purple-1">
              {TEXT?.HOURLY_RATE}
            </label>
            <input
              type="number"
              name="hourly_rate"
              onChange={formik.handleChange}
              value={formik?.values?.hourly_rate}
              className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
            />
            <div className="border-meta-light-blue-1 border my-4" />

            <div className="mr-3 sm:w-1/2 w-full">
              <label
                htmlFor="checkboxLabelOne"
                className={`flex cursor-pointer select-none items-center `}
              >
                <input
                  type="checkbox"
                  id="checkboxLabelOne"
                  name={"salary_negotiable"}
                  value={formik?.values?.salary_negotiable}
                  onChange={formik.handleChange}
                />
                <p className="pl-3">{"Salary is negotiable"}</p>
              </label>
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
    </div>
  );
};

export default JobPostingForm2;
