"use client";
import React from "react";
import Image from "next/image";
import { TEXT } from "@/service/Helper";
import { useRouter } from "next/navigation";
import { EMP_TYPE_ARR } from "@/constant/Enum";
import DatePicker from "react-datepicker";
import MultipleSelectBox from "../MultipleSelectBox";

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
  const router = useRouter();
  const handleClose = (list: any) => {
    const arr = formik?.values?.working_schedule.filter((el: any) => {
      return el !== list;
    });
    formik?.setFieldValue("working_schedule", arr);
  };

  return (
    <div className="">
      <div className="flex w-full flex-wrap justify-between lg:flex-nowrap">
        <div className="w-full text-start lg:mr-5 lg:w-1/2">
          <p className="text-xl font-semibold text-meta-purple-1 sm:text-2xl">
            {TEXT?.EMPLOYMENT_TYPE}
          </p>
          <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
            {TEXT?.PICK_ONE_OR_MULTIPLE_OPTION}
          </p>
        </div>
        <div className="mt-2 grid w-full grid-cols-1 lg:mt-0 lg:w-1/2">
          <div className="flex w-full  flex-wrap items-center gap-3 ">
            {EMP_TYPE_ARR?.map((list: any) => {
              return (
                <div className="w-full rounded-lg border border-meta-light-blue-1 p-3 sm:w-[30%] lg:w-[48%]">
                  <label
                    htmlFor={list}
                    className={`flex cursor-pointer select-none items-center `}
                  >
                    <input
                      id={list}
                      value={list}
                      type="checkbox"
                      name={"job_types"}
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
      <div className="my-6 border border-meta-light-blue-1" />

      <div className="flex w-full flex-wrap items-center justify-between lg:flex-nowrap">
        <div className="w-full text-start lg:mr-5 lg:w-1/2">
          <p className="text-xl font-semibold text-meta-purple-1 sm:text-2xl">
            {TEXT?.WORKING_SCHEDULE}
          </p>
          <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
            {TEXT?.YOU_CAN_PICK_MULTIPLE_WORK_SCHEDULES}
          </p>
        </div>
        <div className="mt-3 flex w-full flex-col lg:mt-0 lg:w-1/2">
          <div
            className={`border-stroke flex w-full min-w-64 appearance-none items-center justify-between h-12 rounded-lg border px-1 border-meta-light-blue-1  outline-none transition focus:border-meta-blue-1 active:border-meta-blue-1`}
          >
            <div className="relative flex w-full items-center">
              <MultipleSelectBox
                style={style}
                form={formik}
                isMulti={true}
                name="working_schedule"
                options={WORK_SCHEDULE}
                className="w-full border-none"
                value={formik?.values?.working_schedule}
                placeholder="Select working schedule..."
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

          <div className="mt-4 flex flex-wrap items-center text-start sm:flex-nowrap">
            {formik?.values?.working_schedule?.map((ele: any, i: any) => {
              return (
                <div className="mb-2 mr-3 flex items-center rounded-lg border-2 border-meta-light-blue-1 px-2 py-1 h-10">
                  <p className="whitespace-nowrap text-sm font-medium text-meta-light-blue-3">
                    {ele?.label}
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
      <div className="my-6 border border-meta-light-blue-1" />

      <div className="flex w-full flex-wrap items-start justify-between lg:flex-nowrap">
        <div className="w-full text-start lg:mr-5 lg:w-1/2">
          <p className="text-xl font-semibold text-meta-purple-1 sm:text-2xl">
            {TEXT?.SALARY}
          </p>
          <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
            {TEXT?.CHOOSE_HOW_YOU_PREFER_TO_PAY_FOR_THIS_JOB}
          </p>
        </div>
        <div className="mt-3 flex w-full flex-col items-center lg:mt-0 lg:w-1/2">
          <div className="mb-3 flex w-full items-center justify-between">
            <div className="min-w-54 mr-3 w-full cursor-pointer rounded-xl border border-meta-light-blue-1">
              <input
                id="hour"
                type="radio"
                name="salary_pay"
                value={"MONTHLY"}
                radioGroup="Salary"
                className="ml-2 mt-2"
                onChange={formik.handleChange}
                checked={
                  formik?.values?.salary_pay === "MONTHLY" ? true : false
                }
              />
              <label className="mb-6 flex flex-col items-center" htmlFor="hour">
                <Image
                  width={20}
                  height={20}
                  alt="clock-icon"
                  src={"/job/Clock.svg"}
                />
                <p>{TEXT?.MONTHLY}</p>
              </label>
            </div>
            <div className="min-w-54 w-full cursor-pointer rounded-xl border border-meta-light-blue-1">
              <input
                id="month"
                type="radio"
                value={"HOURLY"}
                name="salary_pay"
                radioGroup="Salary"
                className="ml-2 mt-2"
                onChange={formik.handleChange}
                checked={formik?.values?.salary_pay === "HOURLY" ? true : false}
              />
              <label
                htmlFor="month"
                className="mb-6 flex flex-col items-center"
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
              {formik?.values?.salary_pay === "MONTHLY"
                ? TEXT?.CTC
                : TEXT?.HOURLY_RATE}
            </label>
            <input
              type="number"
              name="hourly_rate"
              onChange={formik.handleChange}
              value={formik?.values?.hourly_rate}
              className="mt-1 w-full rounded-lg border border-meta-light-blue-1 px-5 py-3 focus:border-meta-light-blue-3"
            />
            <div className="my-4 border border-meta-light-blue-1" />

            <div className="mr-3 w-full sm:w-1/2">
              <label
                htmlFor="checkboxLabelOne"
                className={`flex cursor-pointer select-none items-center `}
              >
                <input
                  type="checkbox"
                  id="checkboxLabelOne"
                  name={"salary_negotiable"}
                  onChange={formik.handleChange}
                  value={formik?.values?.salary_negotiable}
                />
                <p className="pl-3">{"Salary is negotiable"}</p>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="my-6 border border-meta-light-blue-1" />

      <div className="flex w-full flex-wrap items-center justify-between lg:flex-nowrap">
        <div className="w-full text-start lg:mr-5">
          <p className="text-xl font-semibold text-meta-purple-1 sm:text-2xl">
            {TEXT?.INTERVIEW_TIME}
          </p>
          <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
            {TEXT?.CHOOSE_YOUR_INTERVIEW_TIME_SLOT}
          </p>
        </div>
        {/* <div className="flex w-full items-center">
          <label className="text-base font-medium text-meta-purple-1">
            Select Date
          </label>
          <DatePicker
            name="date"
            wrapperClassName="w-full personal-details-date-picker"
            selected={formik?.values?.interviewTime?.date as any}
            shouldCloseOnSelect={true}
            showMonthDropdown
            showYearDropdown
            placeholderText="Select date"
            className="mt-3 w-full rounded-xl border border-meta-light-blue-1 p-3"
            onChange={(date: any) =>
              formik?.setFieldValue("interviewTime", {
                ...formik?.values?.interviewTime,
                date: date,
              })
            }
          />
        </div>
        <div className="flex w-full items-center">
          <label className="text-base font-medium text-meta-purple-1">
            Start time
          </label>
        </div>
        <div className="flex w-full items-center">
          <label className="text-base font-medium text-meta-purple-1">
            End time
          </label>
        </div> */}
      </div>
    </div>
  );
};

export default JobPostingForm2;
