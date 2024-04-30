import { Dialog, Menu, Transition } from "@headlessui/react";
import { ROUTE, TEXT } from "@/service/Helper";
import React, { Fragment, useState } from "react";
import Image from "next/image";
const PreviewDialog=({isOpen,setIsOpen,formik})=>{
  let description = {
    __html: `<div className="">${formik?.values?.description} </div>`,
  };

    return(
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10  " onClose={()=>setIsOpen(false)}>
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
                  <Dialog.Title as="h3" className="  flex justify-between mb-5">
                    <p className="font-bold leading-6 text-xl text-gray-900">
                      {TEXT?.PREVIEW}
                    </p>
                    <div className="" onClick={()=>setIsOpen(false)}>
                      <Image
                        alt="Icon"
                        width={22}
                        height={22}
                        src={"CloseIcon.svg"}
                      />
                    </div>
                  </Dialog.Title>

                  <div className="flex justify-between w-[70%] items-center">
                    <p className="text-gray-500 text-base font-medium">
                      {TEXT?.ARE_YOU_HIRING_MANAGER}
                    </p>
                    <div className="py-1 px-4 text-sm bg-blue-100 text-meta-blue-2 rounded-md">
                     {formik?.values?.is_hiring_manager}
                    </div>
                  </div>
                  <div className="flex justify-between w-[70%] items-center mt-2">
                    <p className="text-gray-500 text-base font-medium">
                      {TEXT?.YOUR_COMPANY_NAME}
                    </p>
                    <div className="py-1 px-4 text-sm bg-blue-100 text-meta-blue-2 rounded-md">
                    {formik?.values?.company_name}
                    </div>
                  </div>
                  <div className="flex justify-between w-[70%] items-center mt-2">
                    <p className="text-gray-500 text-base font-medium">
                      {TEXT?.JOB_TITLE}
                    </p>
                    <div className="py-1 px-4 text-sm text-meta-light-blue-3 rounded-md">
                    {formik?.values?.title}
                    </div>
                  </div>
                  <div className="flex justify-between w-[80%] items-start mtgi-2 ">
                    <p className="text-gray-500 text-base font-medium w-1/2">
                      {TEXT?.WORKPLACE_TYPE}
                    </p>
                    <div className="py-1 px-4 text-sm text-meta-light-blue-3 rounded-md gap-3 flex flex-wrap">
                      {formik?.values?.workplace?.map((list) => {
                        return (
                          <div className="py-1 px-4 text-sm bg-blue-100 text-meta-blue-2  rounded-md">
                            {list}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <p className="text-center font-bold text-black text-md my-4">
                    {" "}
                    {TEXT?.JOB_POSTING_LOCATION}
                  </p>

                  <div className="flex justify-between w-[70%] items-center mt-2">
                    <p className="text-gray-500 text-base font-medium">
                      {TEXT?.CITY}
                    </p>
                    <div className="py-1 px-4 text-sm text-meta-light-blue-3 rounded-md">
                    {formik?.values?.city.name}
                    </div>
                  </div>

                  <div className="flex justify-between w-[70%] items-center mt-2">
                    <p className="text-gray-500 text-base font-medium">
                      {TEXT?.AREA}
                    </p>
                    <div className="py-1 px-4 text-sm text-meta-light-blue-3 rounded-md">
                    {formik?.values?.area}
                    </div>
                  </div>

                  <div className="flex justify-between w-[70%] items-center mt-2">
                    <p className="text-gray-500 text-base font-medium">
                      {TEXT?.PINCODE}
                    </p>
                    <div className="py-1 px-4 text-sm text-meta-light-blue-3 rounded-md">
                    {formik?.values?.pincode}
                    </div>
                  </div>
                  <div className="flex justify-between w-[70%] items-center mt-2 ">
                    <p className="text-gray-500 text-base font-medium w-1/2">
                      {TEXT?.STREET_ADDRESS}
                    </p>
                    <div className="py-1 text-sm text-meta-light-blue-3 rounded-md">
                    {formik?.values?.street_address}
                    </div>
                  </div>

                  <div className="flex justify-between w-[80%] items-start mt-2 ">
                    <p className="text-gray-500 text-base font-medium w-1/2">
                      {TEXT?.EMPLOYMENT_TYPE}
                    </p>
                    <div className="py-1 px-4 text-sm text-meta-light-blue-3 rounded-md gap-3 flex flex-wrap">
                      {formik?.values?.job_types?.map((list) => {
                        return (
                          <div className="py-1 px-4 text-sm bg-blue-100 text-meta-blue-2  rounded-md">
                            {list}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-between w-[80%] items-start mt-2 ">
                    <p className="text-gray-500 text-base font-medium w-1/2">
                      {TEXT?.WORKING_SCHEDULE}
                    </p>
                    <div className="py-1 px-4 text-sm text-meta-light-blue-3 rounded-md gap-3 flex flex-wrap">
                      {formik?.values?.working_schedule?.map((list) => {
                        return (
                          <div className="py-1 px-4 text-sm bg-blue-100 text-meta-blue-2  rounded-md">
                            {list}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <p className="text-center font-bold text-black text-md my-4">
                    {" "}
                    {TEXT?.SALARY}
                  </p>
                  <div className="flex justify-between w-[70%] items-center mt-2 ">
                    <p className="text-gray-500 text-base font-medium w-1/2">
                      {TEXT?.HOURLY_RATE}
                    </p>
                    <div className="py-1 px-4 text-sm  text-meta-light-blue-3 rounded-md">
                     {formik?.values?.hourly_rate}
                    </div>
                  </div>
                  <div className="flex justify-between w-[70%] items-start mt-2 ">
                    <p className="text-gray-500 text-base font-medium w-1/2">
                      {TEXT?.CHOOSE_HOW_YOU_PREFER_TO_PAY_FOR_THIS_JOB}
                    </p>
                    <div className="py-1 px-4 text-sm bg-blue-100 text-meta-blue-2 rounded-md">
                    {formik?.values?.salary_pay}
                    </div>
                  </div>

                  <div className="flex justify-between w-[70%] items-center mt-2 ">
                    <p className="text-gray-500 text-base font-medium w-1/2">
                      Salary is negotiable
                    </p>
                    <div className="py-1 px-4 text-sm  text-meta-light-blue-3 rounded-md">
                    {formik?.values?.salary_pay}
                    </div>
                  </div>
                  <div className="flex justify-between w-[70%] items-start mt-2 ">
                    <p className="text-gray-500 text-base font-medium w-1/2">
                      {TEXT?.JOB_DETAILS}
                    </p>
                    <div
                      dangerouslySetInnerHTML={description}
                      className="whitespace-pre-wrap text-left font-normal text-font-dark-gray"
                      id="section-to-print"
                    />
                  </div>
                  <div className="flex justify-between w-[80%] items-start mt-2 ">
                    <p className="text-gray-500 text-base font-medium w-1/2">
                      {TEXT?.SKILLS}
                    </p>
                    <div className="py-1 px-4 text-sm text-meta-light-blue-3 rounded-md gap-3 flex flex-wrap">
                      {formik?.values?.skills?.map((list) => {
                        return (
                          <div className="py-1 px-4 text-sm bg-blue-100 text-meta-blue-2  rounded-md">
                            {list}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-between w-[70%] items-center mt-2 ">
                    <p className="text-gray-500 text-base font-medium w-1/2">
                      Hiring Candidate
                    </p>
                    <div className="py-1 px-4 text-sm  text-meta-light-blue-3 rounded-md">
                    {formik?.values?.vacancy}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
}
export default PreviewDialog