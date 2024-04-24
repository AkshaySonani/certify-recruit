"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import Select from "@/Components/Select";
import { useRouter } from "next/navigation";
import Checkbox from "@/Components/Checkbox";
import { Menu, Transition } from "@headlessui/react";
import { ROUTE, TEXT } from "@/service/Helper";
import Button from "@/Components/Button";

const menu = [
  { title: "Candidates Hired" },
  { title: "Active Jobs" },
  { title: "Total Jobs" },
  { title: "Active Jobs" },
];

const jobs = [
  { title: "Applicants", count: 50 },
  { title: "Awaiting", count: 10 },
  { title: "Contacting", count: 20 },
  { title: "Hired", count: 10 },
];

const SelectOption = [
  { label: "Select ...", value: "" },
  { label: "Open", value: "Open" },
  { label: "Paused", value: "Paused" },
  { label: "Closed", value: "Closed" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const page = () => {
  const router = useRouter();

  const navigateHandler = (title: string) => {
    if (title === "Active Jobs") {
      router.push(ROUTE?.ACTIVE_JOB);
    } else if (title === "Candidates Hired") {
      router.push(ROUTE?.HIRED);
    }
  };

  return (
    <div>
      <div>
        <div className="text-meta-purple-1 font-semibold text-2xl mb-4">
          {TEXT?.DASHBOARD}
        </div>
        <div className="bg-[url('/dashboard/sertificateBG.svg')] bg-no-repeat bg-cover rounded-3xl p-4">
          <div>
            <div className="text-white font-medium text-xl">
              {TEXT?.CONGRATULATIONS_YOUR_CERTIFICATION_IS_COMPLETE}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="text-white font-medium text-sm underline underline-offset-2 mb-2.5">
              {TEXT?.VIEW_CERTIFICATE}
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="text-white font-medium text-sm">
                  {TEXT?.CERTIFICATION_VALIDATION_IS_YEAR_ONLY}
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-white font-medium text-sm mr-4">
                  {TEXT?.SHARE}
                </div>
                <div className="mr-4">
                  <Image
                    width={30}
                    height={30}
                    alt="linkedin"
                    src={"/dashboard/linkedin.svg"}
                  />
                </div>
                <div className="mr-4">
                  <Image
                    width={30}
                    height={30}
                    alt="twitter"
                    src={"/dashboard/twitter.svg"}
                  />
                </div>
                <div>
                  <button className="text-white bg-meta-blue-2 w-48 h-10 rounded-lg">
                    {TEXT?.DOWNLOAD}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          {menu.map((item) => {
            return (
              <div
                className="relative p-5 border border-meta-light-blue-1 rounded-2xl w-1/4 cursor-pointer"
                onClick={() => navigateHandler(item.title)}
              >
                <div className="bg-meta-light-blue-1 rounded-lg h-9 w-9 flex justify-center items-center mb-2">
                  <Image
                    alt="Icon"
                    width={19}
                    height={19}
                    src={"/sidebarIcon/jobPosting.svg"}
                  />
                </div>
                <p className="font-bold text-meta-purple-1 text-2xl">50</p>
                <p className="text-meta-light-blue-3 font-medium text-base">
                  {item.title}
                </p>
                <Image
                  alt="Icon"
                  width={61}
                  height={93}
                  src={"/dashboard/MaskGroup.svg"}
                  className="absolute right-0 top-6"
                />
              </div>
            );
          })}
        </div>
        <div className="text-meta-purple-1 font-semibold text-xl mt-8">
          {TEXT?.RECENTLY_JOB_POST}
        </div>

        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div className="mt-5">
              <div className="p-5 bg-meta-gray-2 rounded-2xl">
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="mt-1">
                      <Checkbox />
                    </div>
                    <div className="">
                      <div className="text-meta-purple-1 font-semibold text-xl">
                        {TEXT?.USER_INTERFACE_EXPERT}
                        <div className="text-meta-light-blue-3 font-medium text-base">
                          {TEXT?.CITY_NAMES}
                        </div>
                      </div>
                    </div>
                    <p className="text-meta-light-blue-3 font-medium text-base ml-2 mt-1">
                      {TEXT?.TWO_WEEKS_AGO}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Select options={SelectOption} />
                    {/* <Image src={"/dashboard/threeDot.svg"} className="ml-10" alt="Icon" width={4} height={20} /> */}

                    {/* ---------------------------- */}
                    <Menu as="div" className="relative ml-10">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-base focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
                          <Image
                            width={4}
                            alt="Icon"
                            height={20}
                            src={"/dashboard/threeDot.svg"}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-75"
                        leaveTo="transform opacity-0 scale-95"
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leaveFrom="transform opacity-100 scale-100"
                      >
                        <Menu.Items className="absolute right-0 z-30 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-base"
                                  )}
                                >
                                  {TEXT?.EDIT}
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                          <div>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-base"
                                  )}
                                >
                                  {TEXT?.DELETE}
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                          <div>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-base"
                                  )}
                                >
                                  {TEXT?.VIEW}
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                          <div>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-base"
                                  )}
                                >
                                  {TEXT?.JOB_DETAILS}
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    {/* ---------------------------- */}
                  </div>
                </div>
                <div className="flex gap-4 mt-8">
                  {jobs.map((item) => {
                    return (
                      <div className=" p-5 bg-white rounded-2xl w-1/4">
                        <div className="flex flex-col justify-center items-center">
                          <p className="font-semibold text-meta-blue-1 text-xl mb-2">
                            {item.count}
                          </p>
                          <p className="text-meta-light-blue-3 font-medium text-base">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
