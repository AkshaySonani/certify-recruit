import Image from 'next/image';
import { ROUTE, TEXT } from '@/service/Helper';
import React, { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';

const PreviewDialog = ({ isOpen, setIsOpen, formik }: any) => {
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
                <div className="rounded-lg border border-meta-light-blue-1 ">
                  <div className="rounded-t-lg border-b border-meta-light-blue-1 bg-meta-light-blue-1  py-2 pl-4 text-lg font-semibold text-meta-purple-1">
                    {TEXT?.JOB_DETAILS}
                  </div>

                  <div className="flex ">
                    <div className="w-1/2 pb-[14px] pl-4 pt-[18px]">
                      <div>
                        <div className="text-sm font-medium text-meta-purple-1">
                          {formik?.values?.is_hiring_manager ? 'Yes' : 'No'}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          {TEXT?.ARE_YOU_HIRING_MANAGER}
                        </p>
                      </div>
                      <div className="pt-5">
                        <div className="text-sm font-medium text-meta-purple-1">
                          {formik?.values?.title !== ''
                            ? formik?.values?.title
                            : '-'}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          {TEXT?.JOB_TITLE}
                        </p>
                      </div>
                    </div>
                    <div className="pb-[14px] pl-4 pt-[18px]">
                      <div className="">
                        <div className="text-sm font-medium text-meta-purple-1">
                          {formik?.values?.company_name !== ''
                            ? formik?.values?.company_name
                            : '-'}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          {TEXT?.YOUR_COMPANY_NAME}
                        </p>
                      </div>
                      <div className="pt-5">
                        <div className="flex flex-wrap gap-1 text-sm font-medium text-meta-purple-1">
                          {formik?.values?.workplace?.length > 0
                            ? formik?.values?.workplace?.map(
                                (list: any, index: any) => {
                                  return (
                                    <div className="text-sm font-medium text-meta-purple-1">
                                      {`${list} ${formik?.values?.workplace?.length - 1 !== index ? ' /' : ''}`}
                                    </div>
                                  );
                                },
                              )
                            : '-'}
                        </div>

                        <p className="text-meta-gray-7 text-base font-normal">
                          {TEXT?.WORKPLACE_TYPE}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 rounded-lg border  border-meta-light-blue-1">
                  <div className="rounded-t-lg border-b border-meta-light-blue-1 bg-meta-light-blue-1  py-2 pl-4 text-lg font-semibold text-meta-purple-1">
                    {TEXT?.JOB_POSTING_LOCATION}
                  </div>
                  <div className="flex ">
                    <div className="w-1/2 pb-[14px] pl-4 pt-[18px]">
                      <div>
                        <div className="text-sm font-medium text-meta-purple-1">
                          {formik?.values?.city?.name
                            ? formik?.values?.city?.name
                            : '-'}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          {TEXT?.CITY} {TEXT?.NAME}
                        </p>
                      </div>
                      <div className="pt-5">
                        <div className="text-sm font-medium text-meta-purple-1">
                          {formik?.values?.pincode !== ''
                            ? formik?.values?.pincode
                            : '-'}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          {TEXT?.PINCODE}
                        </p>
                      </div>
                      <div className="pt-5">
                        <div className="flex flex-wrap gap-1 text-sm font-medium text-meta-purple-1">
                          {formik?.values?.job_types?.length > 0
                            ? formik?.values?.job_types?.map(
                                (list: any, index: any) => {
                                  return (
                                    <div className="text-sm font-medium ">
                                      {`${list} ${formik?.values?.job_types?.length - 1 !== index ? ' /' : ''}`}
                                    </div>
                                  );
                                },
                              )
                            : '-'}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          {TEXT?.EMPLOYMENT_TYPE}
                        </p>
                      </div>
                    </div>
                    <div className="pb-[14px] pl-4 pt-[18px]">
                      <div className="">
                        <div className="text-sm font-medium text-meta-purple-1">
                          {formik?.values?.area !== ''
                            ? formik?.values?.area
                            : '-'}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          {TEXT?.AREA}
                        </p>
                      </div>
                      <div className="pt-5">
                        <div className="text-sm font-medium text-meta-purple-1">
                          {formik?.values?.street_address !== ''
                            ? formik?.values?.street_address
                            : '-'}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          {TEXT?.STREET_ADDRESS}
                        </p>
                      </div>
                      <div className="pt-5">
                        <div className=" flex flex-wrap gap-1 ">
                          {formik?.values?.working_schedule.length > 0
                            ? formik?.values?.working_schedule?.map(
                                (list: any, index: any) => {
                                  return (
                                    <div className="text-sm font-medium text-meta-purple-1">
                                      {`${list?.label} ${formik?.values?.working_schedule?.length - 1 !== index ? ' /' : ''}`}
                                    </div>
                                  );
                                },
                              )
                            : '-'}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          {TEXT?.WORKING_SCHEDULE}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 rounded-lg border border-meta-light-blue-1">
                  <div className="rounded-t-lg border-b border-meta-light-blue-1 bg-meta-light-blue-1 py-2 pl-4 text-lg font-semibold text-meta-purple-1">
                    Salary Details
                  </div>

                  <div className="flex ">
                    <div className="w-1/2 pb-[14px] pl-4 pt-[18px]">
                      <div>
                        <div className="text-sm font-medium text-meta-purple-1">
                          {formik?.values?.hourly_rate !== null
                            ? formik?.values?.hourly_rate
                            : '-'}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          {TEXT?.HOURLY_RATE}
                        </p>
                      </div>
                      <div className="pt-5">
                        <div className="text-sm font-medium text-meta-purple-1">
                          {formik?.values?.salary_negotiable ? 'Yes' : 'No'}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          Salary is negotiable
                        </p>
                      </div>
                      <div className="pt-5">
                        <div className="flex gap-1 text-sm font-medium text-meta-purple-1">
                          {formik?.values?.skills?.length > 0
                            ? formik?.values?.skills?.map(
                                (list: any, index: any) => {
                                  return (
                                    <div className="text-sm font-medium text-black">
                                      {`${list?.label} ${formik?.values?.skills?.length - 1 !== index ? ' /' : ''}`}
                                    </div>
                                  );
                                },
                              )
                            : '-'}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          {TEXT?.SKILLS}
                        </p>
                      </div>
                    </div>
                    <div className="w-1/2 pb-[14px] pl-4 pt-[18px]">
                      <div>
                        <div className="text-sm font-medium text-meta-purple-1">
                          {formik?.values?.salary_pay}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          Prefer to Pay
                        </p>
                      </div>
                      <div className="pt-5">
                        <div className="text-sm font-medium text-meta-purple-1">
                          {formik?.values?.vacancy}
                        </div>
                        <p className="text-meta-gray-7 text-base font-normal">
                          Hiring Candidate
                        </p>
                      </div>
                    </div>
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
