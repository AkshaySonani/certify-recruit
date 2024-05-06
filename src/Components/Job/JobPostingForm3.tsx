'use client';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/navigation';
import { TEXT } from '@/service/Helper';
import MultipleSelectBox from '../MultipleSelectBox';

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
    formik?.setFieldValue('vacancy', formik?.values?.vacancy + 1);
  const handleDecrement = () =>
    formik?.setFieldValue(
      'vacancy',
      formik?.values?.vacancy > 1 ? formik?.values?.vacancy - 1 : 1,
    );
  const handleClose = (list: any) => {
    const arr = formik?.values?.skills.filter((el: any) => {
      return el !== list;
    });
    formik?.setFieldValue('skills', arr);
  };
  return (
    <div>
      <div className="flex h-full w-full flex-wrap items-start justify-between lg:flex-nowrap">
        <div className="w-full text-start lg:mr-5 lg:w-1/2">
          <p className="text-xl font-semibold text-meta-purple-1 sm:text-2xl">
            {TEXT?.JOB_DETAILS} <span className="text-red-600">*</span>
          </p>
          <p className="text-sm font-medium text-meta-light-blue-3 sm:text-base">
            {TEXT?.TELL_US_ABOUT_THE_ROLE}
          </p>
        </div>
        <div className="job_html_editor mb-5 mt-3 flex w-full flex-col items-start lg:mt-0 lg:w-1/2">
          <div>
            <ReactQuill
              theme="snow"
              value={formik?.values?.description}
              className="!h-full !w-full !rounded-lg"
              onChange={(e: any) => formik.setFieldValue('description', e)}
            />
          </div>
        </div>
        {formik.touched.description && formik.errors.description && (
          <div className="error mt-2">{formik.errors.description}</div>
        )}
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

        <div className="mt-3 flex w-full flex-col items-start lg:mt-0 lg:w-1/2">
          <div className="mt-3 flex w-full flex-wrap items-start lg:mt-0">
            <MultipleSelectBox
              name="skills"
              form={formik}
              isMulti={true}
              className="w-full"
              options={skillData}
              placeholder="Add Skill."
              value={formik?.values?.skills}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-start justify-start text-start sm:flex-nowrap">
            {formik?.values?.skills?.map((ele: any, i: any) => {
              return (
                <div className="mb-2 mr-3 flex items-center rounded-lg border-2 border-meta-light-blue-1 px-2 py-1">
                  <p className="whitespace-nowrap text-sm font-medium text-meta-light-blue-3">
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
                      src={'/job/Close.svg'}
                    />
                  </div>
                </div>
              );
            })}
          </div>
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
            <button
              className="w-1/3 px-3"
              disabled={!hireMultiple}
              onClick={handleIncrement}
            >
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
            <button
              className="w-1/3 px-3"
              disabled={!hireMultiple}
              onClick={handleDecrement}
            >
              <Image
                width={25}
                height={25}
                alt="Preview"
                src={'/job/Minus.svg'}
              />
            </button>
          </div>
          <div className="mt-5 flex items-center">
            <input
              type="checkbox"
              id="hire-multiple"
              value={hireMultiple as any}
              onChange={() => setHireMultiple(!hireMultiple)}
            />
            <label
              htmlFor="hire-multiple"
              className="pl-2 text-sm font-medium text-meta-light-blue-3 sm:text-base"
            >
              {TEXT?.I_AM_HIRING_MULTIPLE_CANDIDATES}
            </label>
          </div>
        </div>
      </div>
      <div className="my-6 border border-meta-light-blue-1" />
    </div>
  );
};

export default JobPostingForm3;
