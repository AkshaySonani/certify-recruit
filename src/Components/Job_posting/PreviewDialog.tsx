import Image from 'next/image';
import { ROUTE, TEXT } from '@/service/Helper';
import React, { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';

const PreviewDialog = ({ isOpen, setIsOpen, formik }: any) => {
  console.log('formik', formik);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10  "
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-all">
                <Dialog.Title as="h3" className="mb-5 flex justify-between">
                  <p className="text-xl font-bold leading-6 text-gray-900">
                    {TEXT?.PREVIEW}
                  </p>
                  <div
                    className="cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      alt="Icon"
                      width={22}
                      height={22}
                      src={'CloseIcon.svg'}
                    />
                  </div>
                </Dialog.Title>

                <div className="flex w-full items-center justify-between">
                  <p className="text-base font-medium text-gray-500">
                    {TEXT?.ARE_YOU_HIRING_MANAGER}
                  </p>
                  <div className="text-sm font-medium text-black">
                    {formik?.values?.is_hiring_manager ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="mt-2 flex w-full items-center justify-between">
                  <p className="text-base font-medium text-gray-500">
                    {TEXT?.YOUR_COMPANY_NAME}
                  </p>
                  <div className="text-sm font-medium text-black">
                    {formik?.values?.company_name}
                  </div>
                </div>
                <div className="mt-2 flex w-full items-center justify-between">
                  <p className="text-base font-medium text-gray-500">
                    {TEXT?.JOB_TITLE}
                  </p>
                  <div className="rounded-md py-1 pl-4 text-sm font-medium text-black">
                    {formik?.values?.title}
                  </div>
                </div>
                <div className="mtgi-2 flex w-full items-start justify-between ">
                  <p className="w-1/2 text-base font-medium text-gray-500">
                    {TEXT?.WORKPLACE_TYPE}
                  </p>
                  <div className="flex flex-wrap gap-3 rounded-md py-1 pl-4 text-sm text-meta-light-blue-3">
                    {formik?.values?.workplace?.length > 0 &&
                      formik?.values?.workplace?.map((list: any) => {
                        return (
                          <div className="text-sm font-medium text-black">
                            {list}
                          </div>
                        );
                      })}
                  </div>
                </div>

                <p className="text-md my-4 text-center font-bold text-black">
                  {TEXT?.JOB_POSTING_LOCATION}
                </p>

                <div className="mt-2 flex w-full items-center justify-between">
                  <p className="text-base font-medium text-gray-500">
                    {TEXT?.CITY}
                  </p>
                  <div className="rounded-md py-1 pl-4 text-sm font-medium text-black">
                    {formik?.values?.city?.name}
                  </div>
                </div>

                <div className="mt-2 flex w-full items-center justify-between">
                  <p className="text-base font-medium text-gray-500">
                    {TEXT?.AREA}
                  </p>
                  <div className="rounded-md py-1 pl-4 text-sm font-medium text-black">
                    {formik?.values?.area}
                  </div>
                </div>

                <div className="mt-2 flex w-full items-center justify-between">
                  <p className="text-base font-medium text-gray-500">
                    {TEXT?.PINCODE}
                  </p>
                  <div className="rounded-md py-1 pl-4 text-sm font-medium text-black">
                    {formik?.values?.pincode}
                  </div>
                </div>
                <div className="mt-2 flex w-full items-center justify-between ">
                  <p className="w-1/2 text-base font-medium text-gray-500">
                    {TEXT?.STREET_ADDRESS}
                  </p>
                  <div className="rounded-md py-1 text-sm font-medium text-black">
                    {formik?.values?.street_address}
                  </div>
                </div>

                <div className="mt-2 flex w-full items-start justify-between ">
                  <p className="w-1/2 text-base font-medium text-gray-500">
                    {TEXT?.EMPLOYMENT_TYPE}
                  </p>
                  <div className="flex flex-wrap gap-3 rounded-md py-1 pl-4 text-sm text-meta-light-blue-3">
                    {formik?.values?.job_types?.length > 0 &&
                      formik?.values?.job_types?.map((list: any) => {
                        return (
                          <div className="text-sm font-medium text-black">
                            {list}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="mt-2 flex w-full items-start justify-between ">
                  <p className="w-1/2 text-base font-medium text-gray-500">
                    {TEXT?.WORKING_SCHEDULE}
                  </p>
                  <div className="flex flex-wrap gap-3 rounded-md py-1 pl-4 text-sm text-meta-light-blue-3">
                    {formik?.values?.working_schedule.length > 0 &&
                      formik?.values?.working_schedule?.map((list: any) => {
                        return (
                          <div className="text-sm font-medium text-black">
                            {list?.label}
                          </div>
                        );
                      })}
                  </div>
                </div>

                <p className="text-md my-4 text-center font-bold text-black">
                  {TEXT?.SALARY}
                </p>
                <div className="mt-2 flex w-full items-center justify-between ">
                  <p className="w-1/2 text-base font-medium text-gray-500">
                    {TEXT?.HOURLY_RATE}
                  </p>
                  <div className="rounded-md py-1 pl-4 text-sm font-medium text-black">
                    {formik?.values?.hourly_rate}
                  </div>
                </div>
                <div className="mt-2 flex w-full items-start justify-between ">
                  <p className="w-1/2 text-base font-medium text-gray-500">
                    {TEXT?.CHOOSE_HOW_YOU_PREFER_TO_PAY_FOR_THIS_JOB}
                  </p>
                  <div className="text-sm font-medium text-black">
                    {formik?.values?.salary_pay}
                  </div>
                </div>

                <div className="mt-2 flex w-full items-center justify-between ">
                  <p className="w-1/2 text-base font-medium text-gray-500">
                    Salary is negotiable
                  </p>
                  <div className="rounded-md py-1 pl-4 text-sm font-medium text-black">
                    {formik?.values?.salary_negotiable ? 'Yes' : 'No'}
                  </div>
                </div>
                <div className="mt-2 flex w-full items-start justify-between ">
                  <p className="w-1/2 text-base font-medium text-gray-500">
                    {TEXT?.JOB_DETAILS}
                  </p>
                  <div
                    id="section-to-print"
                    className="text-font-dark-gray whitespace-pre-wrap text-left font-normal"
                    dangerouslySetInnerHTML={{
                      __html: `<div className="">${formik?.values?.description}</div>`,
                    }}
                  />
                </div>
                <div className="mt-2 flex w-full items-start justify-between ">
                  <p className="w-1/2 text-base font-medium text-gray-500">
                    {TEXT?.SKILLS}
                  </p>
                  <div className="flex flex-wrap gap-3 rounded-md py-1 pl-4 text-sm text-meta-light-blue-3">
                    {formik?.values?.skills?.length > 0 &&
                      formik?.values?.skills?.map((list: any) => {
                        return (
                          <div className="text-sm font-medium text-black">
                            {list}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="mt-2 flex w-full items-center justify-between ">
                  <p className="w-1/2 text-base font-medium text-gray-500">
                    Hiring Candidate
                  </p>
                  <div className="rounded-md py-1 pl-4 text-sm font-medium text-black">
                    {formik?.values?.vacancy}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default PreviewDialog;
