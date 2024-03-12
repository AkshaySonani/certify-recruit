"use client"
import Checkbox from "@/Components/Checkbox";
import Select from "@/Components/Select";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";

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
  { title: "Hired", count: 10 }
]

const SelectOption = [
  { label: "Select ...", value: "" },
  { label: "Open", value: "Open" },
  { label: "Paused", value: "Paused" },
  { label: "Closed", value: "Closed" },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const page = () => {
  const router = useRouter()

  const navigateHandler = (title: string) => {
    if (title === "Active Jobs") {
      router.push("/dashboard/active_job")
    } else if (title === "Candidates Hired") {
      router.push("/dashboard/hired")
    }
  }

  return (
    <div>
      <div>
        <div className="text-text/secondary font-semibold text-2xl mb-4">
          Dashboard
        </div>
        <div className="bg-[url('/dashboard/sertificateBG.svg')] bg-no-repeat bg-cover rounded-3xl p-4">
          <div>
            <div className="text-white font-medium text-xl">Congratulations Your Certification is Complete.</div>
          </div>
          <div className="flex justify-end">
            <div className="text-white font-medium text-sm underline underline-offset-2 mb-2.5">View certificate</div>
          </div>
          <div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="text-white font-medium text-sm">*Certification validation is 1 year only</div>
              </div>
              <div className="flex items-center">
                <div className="text-white font-medium text-sm mr-4">Share:</div>
                <div className="mr-4">
                  <Image
                    src={"/dashboard/linkedin.svg"}
                    alt="linkedin"
                    width={30}
                    height={30}
                  />
                </div>
                <div className="mr-4">
                  <Image
                    src={"/dashboard/twitter.svg"}
                    alt="twitter"
                    width={30}
                    height={30}
                  />
                </div>
                <div>
                  <button className="text-white bg-[#3751F2] w-48 h-10 rounded-lg">Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          {menu.map((item) => {
            return (
              <div className="relative p-5 border border-[#DCE7FF] rounded-2xl w-1/4 cursor-pointer" onClick={() => navigateHandler(item.title)}>
                <div className="bg-[#DCE7FF] rounded-lg h-9 w-9 flex justify-center items-center mb-2">
                  <Image
                    src={"/sidebarIcon/jobPosting.svg"}
                    alt="Icon"
                    width={19}
                    height={19}
                  />
                </div>
                <p className="font-bold text-text/secondary text-2xl">50</p>
                <p className="text-text/paragraph font-medium text-base">
                  {item.title}
                </p>
                <Image
                  src={"/dashboard/MaskGroup.svg"}
                  className="absolute right-0 top-6"
                  alt="Icon"
                  width={61}
                  height={93}
                />
              </div>
            );
          })}
        </div>
        <div className="text-text/secondary font-semibold text-xl mt-8">
          Recently Job post
        </div>

        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div className="mt-5">
              <div className="p-5 bg-bg/primary rounded-2xl">
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="mt-1">
                      <Checkbox />
                    </div>
                    <div className="">
                      <div className="text-text/secondary font-semibold text-xl">
                        User Interface Expert (WFH)
                        <div className="text-text/paragraph font-medium text-base">Surat, Gujrat, India.</div>
                      </div>
                    </div>
                    <p className="text-text/paragraph font-medium text-base ml-2 mt-1">2 weeks ago</p>
                  </div>
                  <div className="flex items-center">
                    <Select options={SelectOption} />
                    {/* <Image src={"/dashboard/threeDot.svg"} className="ml-10" alt="Icon" width={4} height={20} /> */}

                    {/* ---------------------------- */}
                    <Menu as="div" className="relative ml-10">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-base focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2">
                          <Image src={"/dashboard/threeDot.svg"} alt="Icon" width={4} height={20} />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
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
                                  )}>
                                  Edit
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
                                  )}>
                                  Delete
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
                                  )}>
                                  View
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
                                  )}>
                                  Job details
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
                      <div className=" p-5 bg-white rounded-2xl w-1/4 ">
                        <div className="flex flex-col justify-center items-center">
                          <p className="font-semibold text-text/primary text-xl mb-2">{item.count}</p>
                          <p className="text-text/paragraph font-medium text-base">{item.title}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  );
};

export default page;
