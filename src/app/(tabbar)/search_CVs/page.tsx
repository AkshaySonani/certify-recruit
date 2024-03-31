"use client";
import Image from "next/image";
import Select from "@/Components/Select";
import Checkbox from "@/Components/Checkbox";
import React, { useState, Fragment } from "react";
import { Dialog, Menu, Popover, Switch, Transition } from "@headlessui/react";
import { TEXT } from "@/service/Helper";

let statusArr = [
  {
    id: 1,
    status: "Available",
  },
  { id: 2, status: "Hired" },
  { id: 3, status: "Admin" },
];

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(statusArr[0]?.status);
  
  const tableData = [
    {
      name: "Kate Tanner",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%",
    },
    {
      name: "April Curtis",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%",
    },
    {
      name: "Sledge Hammer",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%",
    },
    {
      name: "B.A. Baracus",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%",
    },
    {
      name: "Mike Torello",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%",
    },
    {
      name: "Dori Doreau",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%",
    },
    {
      name: "Murdock",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%",
    },
    {
      name: "Lynn Tanner",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%",
    },
  ];

  const [enabled, setEnabled] = useState(false);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-meta-purple-1 font-semibold text-2xl">
         {TEXT?.SEARCH_CVS}
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-[14px] h-[14px] rounded-sm bg-green-500"/>
            <p className="font-medium text-meta-purple-1 text-base">
              {TEXT?.AVAILABLE}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[14px] h-[14px] rounded-sm bg-red-500"/>
            <p className="font-medium text-meta-purple-1 text-base">Hired</p>
          </div>
        </div>
      </div>
      <div className="flex gap-6 mt-5 mb-10 justify-start items-center w-full">
        <div className="w-2/4">
          <Popover className="relative">
            <Popover.Button className="absolute left-3 top-4">
              <Image
                alt="date"
                width={19}
                height={15}
                src={"/dashboard/filter.svg"}
              />
            </Popover.Button>
            <input
              type="text"
              placeholder="Job title"
              className="w-full h-12 rounded-lg border-default-half border-stroke bg-transparent px-12 py-3 text-black outline-none transition focus:border-primary active:border-primary"
            />

            <Popover.Panel className="absolute w-full z-10 mt-2 bg-white rounded-xl shadow-xl border border-meta-light-blue-1 p-4">
              <div className="w-full">
                <label className="text-base font-medium text-meta-purple-1">
                 {TEXT?.JOB_TITLE}
                </label>
                <input
                  type="text"
                  placeholder="Job title search here..."
                  className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                />
              </div>
              <div className="w-full mt-4">
                <label className="text-base font-medium text-meta-purple-1">
                  {TEXT?.KEYWORD}
                </label>
                <div className="flex gap-2 items-center w-full flex-wrap">
                  <div className="flex justify-between rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-3 gap-1 py-3">
                    <p>{TEXT?.SERVER_SIDE}</p>
                    <Image
                      alt="date"
                      width={13}
                      height={15}
                      src={"/job/close.svg"}
                    />
                  </div>
                  <div className="flex justify-between rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-3 gap-1 py-3">
                    <p>{TEXT?.JAVA}</p>
                    <Image
                      alt="date"
                      width={13}
                      height={15}
                      src={"/job/close.svg"}
                    />
                  </div>
                  <div className="flex justify-between rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-3 gap-1 py-3">
                    <p>{TEXT?.CSS}</p>
                    <Image
                      alt="date"
                      width={13}
                      height={15}
                      src={"/job/close.svg"}
                    />
                  </div>
                  <div className="flex justify-between rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-3 gap-1 py-3">
                    <p>{TEXT?.ADD_KEYWORD}</p>
                    <Image
                      alt="date"
                      width={15}
                      height={15}
                      src={"/job/Plus.svg"}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mt-4">
                <label className="text-base font-medium text-meta-purple-1">
                  {TEXT?.LOCATION}
                </label>
                <input
                  type="text"
                  placeholder="Type location here..."
                  className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                />
              </div>
              <div className="w-full flex flex-col lg:flex-row  mt-4 lg:gap-2">
                <div className="lg:w-1/2 w-full">
                  <label className="text-base font-medium text-meta-purple-1">
                   {TEXT?.DATE_UPLOADED}
                  </label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                  />
                </div>
                <div className="lg:w-1/2 w-full">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.EXPERIENCE}
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                  />
                </div>
              </div>
              <div className="w-full mt-4 ">
                <label className="text-base font-medium text-meta-purple-1">
                  {TEXT?.STATUS}
                </label>
                <div className="flex justify-between items-center w-full flex-wrap">
                  <div className=" rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3">
                    <Checkbox
                      label={"All"}
                      className="text-meta-light-blue-3 text-base font-medium"
                    />
                  </div>
                  <div className=" rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3">
                    <Checkbox
                      label={"Available"}
                      className="text-meta-light-blue-3 text-base font-medium"
                    />
                  </div>
                  <div className=" rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3">
                    <Checkbox
                      label={"Hired"}
                      className="text-meta-light-blue-3 text-base font-medium"
                    />
                  </div>
                </div>
                <div className="w-full flex justify-end mt-2">
                  <button className="rounded-xl w-28 h-12 bg-meta-light-blue-1 border border-meta-light-blue-2 ml-5">
                    <span className="flex justify-center font-medium text-sm text-meta-light-blue-3">
                      {TEXT?.DONE}
                    </span>
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
        <div className="flex w-2/4 items-center">
          <div>
            <input
              type="text"
              placeholder="City pincode"
              className="w-full h-12 rounded-lg border-default-half border-stroke bg-transparent pl-[5px] py-3 text-black outline-none transition focus:border-primary active:border-primary"
            />
          </div>
          <div className="bg-meta-light-blue-2 rounded-lg p-[9px] ml-[10px]">
            <Image
              alt="date"
              width={19}
              height={19}
              src={"/dashboard/search.svg"}
            />
          </div>
        </div>
        <Menu as="div" className="relative ml-10">
          <div>
            <Menu.Button
              className="relative items-center flex z-20 justify-between w-full min-w-[161px] appearance-none rounded-lg border border-stroke px-5 py-3 outline-none transition bg-meta-light-blue-2"
            >
              <p>{active}</p>
              <Image
                alt="Icon"
                width={14}
                height={14}
                src={"/dashboard/SelectDown.svg"}
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
            <Menu.Items className="absolute right-0 z-30 mt-2 min-w-[161px] origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div>
                {statusArr?.map((list) => {
                  return (
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          onClick={() => setActive(list?.status)}
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-base"
                          )}
                        >
                          {list?.status}
                        </div>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div>
        <table className="w-full min-w-[600px] overflow-y-auto overflow-x-auto text-sm text-left">
          <thead className="shadow-inner border-b border-meta-light-blue-1">
            <tr>
              <th></th>
              <th className="px-6 py-4 w-1/4">
                <div className="font-medium text-base text-meta-light-blue-3">
                  {TEXT?.NAME}
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="font-medium text-base text-meta-light-blue-3">
                  {TEXT?.DESIGNATION}
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="font-medium text-base text-meta-light-blue-3">
                  {TEXT?.EXPERIENCE}
                </div>
              </th>

              <th className="px-6 py-4">
                <div className="font-medium text-base text-meta-light-blue-3">
                  {TEXT?.DATE}
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="font-medium text-base text-meta-light-blue-3">
                  {TEXT?.MATCHING}
                </div>
              </th>
              <th className="px-6 w-1/12"/>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => {
              return (
                <tr>
                  <td>
                    <div className="w-[14px] h-[14px] rounded-sm bg-green-500"/>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center">
                      <Image
                        alt="Icon"
                        width={31}
                        height={31}
                        src={"/dashboard/photo.svg"}
                      />
                      <div className="font-medium text-base text-meta-purple-1 pl-4">
                        {item.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="font-medium text-base text-meta-purple-1">
                        {item.Designation}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="font-medium text-base text-meta-purple-1">
                        {item.Experience}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="font-medium text">{item.Date}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="font-medium text-green-500">
                        {item.Matching}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex justify-end">
                      <Image
                        alt="Icon"
                        width={21}
                        height={21}
                        className="mx-4"
                        src={"/TextContent.svg"}
                      />
                      <Image
                        alt="Icon"
                        width={21}
                        height={21}
                        className="mx-4"
                        src={"/dashboard/EditIcon.svg"}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
