"use client";
import Image from "next/image";
import ReactQuill from "react-quill";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { TEXT } from "@/service/Helper";
import MultipleSelectBox from "../MultipleSelectBox";

const JobPostingForm3 = ({
  formik,
  skillData,
}: {
  formik: any;
  skillData: any;
}) => {
  const router = useRouter();

  const [hireMultiple, setHireMultiple] = useState(false);

  const formattedValue =
    formik?.values?.vacancy < 10
      ? `0${formik?.values?.vacancy}`
      : `${formik?.values?.vacancy}`;
  const handleIncrement = () =>
    formik?.setFieldValue("vacancy", formik?.values?.vacancy + 1);
  const handleDecrement = () =>
    formik?.setFieldValue(
      "vacancy",
      formik?.values?.vacancy > 1 ? formik?.values?.vacancy - 1 : 1
    );
  const handleClose = (list: any) => {
    const arr = formik?.values?.skills.filter((el: any) => {
      return el !== list;
    });
  };
  return (
    <div>
      <div className="flex items-start justify-between w-full lg:flex-nowrap h-full flex-wrap">
        <div className="lg:w-1/2 w-full lg:mr-5 text-start">
          <p className="sm:text-2xl text-xl font-semibold text-meta-purple-1">
            {TEXT?.JOB_DETAILS}
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
            {TEXT?.TELL_US_ABOUT_THE_ROLE}
          </p>
        </div>
        <div className="flex items-center lg:w-1/2 w-full lg:mt-0 mt-3 mb-5">
          <ReactQuill
            theme="snow"
            value={formik?.values?.description}
            onChange={(e: any) => formik.setFieldValue("description", e)}
            className="!h-78 !rounded-lg !w-full"
          />
        </div>
        {formik.touched.description && formik.errors.description && (
          <div className="error">{formik.errors.description}</div>
        )}
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

        <div className="flex items-start flex-col lg:w-1/2 w-full lg:mt-0 mt-3">
          <div className="flex items-start w-full lg:mt-0 mt-3 flex-wrap">
            <MultipleSelectBox
              className="w-full"
              value={formik?.values?.skills}
              name="skills"
              form={formik}
              options={skillData}
              placeholder="Add Skill."
              isMulti={true}
            />
          </div>
          <div className="text-start mt-4 flex items-start sm:flex-nowrap flex-wrap justify-start">
            {formik?.values?.skills?.map((ele: any, i: any) => {
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
            {TEXT?.HIRING_MULTIPLE_CANDIDATES}
          </p>
          <p className="sm:text-base text-sm font-medium text-meta-light-blue-3">
            {TEXT?.THIS_WILL_BE_DISPLAYED_ON_JOB_PAGE_FOR_CANDIDATES_SEE}
          </p>
        </div>
        <div className="flex items-start lg:w-1/2 w-full lg:mt-0 mt-3 flex-col">
          <div className="border-2 border-meta-light-blue-1 rounded-lg w-48 min-h-12 flex justify-between">
            <button
              className="px-3 w-1/3"
              disabled={!hireMultiple}
              onClick={handleIncrement}
            >
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
            <button
              className="px-3 w-1/3"
              disabled={!hireMultiple}
              onClick={handleDecrement}
            >
              <Image
                width={25}
                height={25}
                alt="Preview"
                src={"/job/Minus.svg"}
              />
            </button>
          </div>
          <div className="flex items-center mt-5">
            <input
              type="checkbox"
              id="hire-multiple"
              value={hireMultiple as any}
              onChange={() => setHireMultiple(!hireMultiple)}
            />
            <label
              htmlFor="hire-multiple"
              className="sm:text-base pl-2 text-sm font-medium text-meta-light-blue-3"
            >
              {TEXT?.I_AM_HIRING_MULTIPLE_CANDIDATES}
            </label>
          </div>
        </div>
      </div>
      <div className="border-meta-light-blue-1 border my-6" />
    </div>
  );
};

export default JobPostingForm3;
