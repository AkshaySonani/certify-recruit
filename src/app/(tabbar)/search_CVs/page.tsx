"use client";
import { Dialog, Menu, Popover, Switch, Transition } from "@headlessui/react";
import React, { useState, Fragment } from "react";
import Checkbox from "@/Components/Checkbox";
import Image from "next/image";
import Select from "@/Components/Select";
let statusArr = [{
  id: 1, status: "Available"

},
{ id: 2, status: "Hired" },
{ id: 3, status: "Admin" }]
const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(statusArr[0]?.status)
  console.log("active", active);


  const tableData = [
    {
      name: "Kate Tanner",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%"
    },
    {
      name: "April Curtis",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%"
    },
    {
      name: "Sledge Hammer",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%"
    },
    {
      name: "B.A. Baracus",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%"
    },
    {
      name: "Mike Torello",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%"
    },
    {
      name: "Dori Doreau",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%"
    },
    {
      name: "Murdock",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%"
    },
    {
      name: "Lynn Tanner",
      Designation: "UI/UX Designer",
      Experience: "5.5+ years",
      Role: "6+ years",
      Date: "Available",
      Matching: "50%"
    },
  ];


  const [enabled, setEnabled] = useState(false);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-text/secondary font-semibold text-2xl">Search CVs</div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-[14px] h-[14px] rounded-[2px] bg-green-500"></div>
            <p className="font-[500] text-text/secondary text-[14px]">Available</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[14px] h-[14px] rounded-[2px] bg-red-500"></div>
            <p className="font-[500] text-text/secondary text-[14px]">Hired</p>
          </div>
        </div>
      </div>
      <div className="flex gap-6 mt-5 mb-10 justify-start items-center w-full">
        <div className="w-2/4">
          <Popover className="relative">
            <Popover.Button className="absolute left-3 top-4">
              <Image
                src={"/dashboard/filter.svg"}
                alt="date"
                width={19}
                height={15}
              />
            </Popover.Button>
            <input
              type="text"
              placeholder="Job title"
              className="w-full h-12 rounded-lg border-[1.5px] border-stroke bg-transparent px-12 py-3 text-black outline-none transition focus:border-primary active:border-primary"
            />

            <Popover.Panel className="absolute w-full z-10 mt-2 bg-white rounded-xl shadow-xl border border-Ellipse-1 p-4">
              <div className="w-full">
                <label className="text-base font-medium text-text/secondary">
                  Job title
                </label>
                <input
                  type="text"
                  placeholder="Job title search here..."
                  className="w-full rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-5 py-3"
                />
              </div>
              <div className="w-full mt-4">
                <label className="text-base font-medium text-text/secondary">
                  Keyword
                </label>
                <div className="flex gap-2 items-center w-full flex-wrap">

                  <div className="flex justify-between rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-3 gap-1 py-3">
                    <p>Server Side</p>
                    <Image
                      src={"/job/close.svg"}
                      alt="date"
                      width={13}
                      height={15}
                    />
                  </div>
                  <div className="flex justify-between rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-3 gap-1 py-3">
                    <p>Java</p>
                    <Image
                      src={"/job/close.svg"}
                      alt="date"
                      width={13}
                      height={15}
                    />
                  </div>
                  <div className="flex justify-between rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-3 gap-1 py-3">
                    <p>Css</p>
                    <Image
                      src={"/job/close.svg"}
                      alt="date"
                      width={13}
                      height={15}
                    />
                  </div>
                  <div className="flex justify-between rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-3 gap-1 py-3">
                    <p>Add keyword</p>
                    <Image
                      src={"/job/Plus.svg"}
                      alt="date"
                      width={15}
                      height={15}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mt-4">
                <label className="text-base font-medium text-text/secondary">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Type location here..."
                  className="w-full rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-5 py-3"
                />
              </div>
              <div className="w-full flex flex-col lg:flex-row  mt-4 lg:gap-2">
                <div className="lg:w-[50%] w-full">
                  <label className="text-base font-medium text-text/secondary">
                    Date Uploaded
                  </label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="w-full rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-5 py-3"
                  />
                </div>
                <div className="lg:w-[50%] w-full ">
                  <label className="text-base font-medium text-text/secondary">
                    Experience
                  </label>
                  <input
                    type="text"
                    placeholder="Type here..."
                    className="w-full rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-5 py-3"
                  />
                </div>
              </div>
              <div className="w-full mt-4 ">
                <label className="text-base font-medium text-text/secondary">
                  Status
                </label>
                <div className="flex justify-between items-center w-full flex-wrap">

                  <div className=" rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-5 py-3">
                    <Checkbox
                      label={"All"}
                      className={"text-text/paragraph text-base font-medium"}
                    />
                  </div>
                  <div className=" rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-5 py-3">
                    <Checkbox
                      label={"Available"}
                      className={"text-text/paragraph text-base font-medium"}
                    />
                  </div>
                  <div className=" rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-5 py-3">
                    <Checkbox
                      label={"Hired"}
                      className={"text-text/paragraph text-base font-medium"}
                    />
                  </div>

                </div>
                <div className="w-full flex justify-end mt-2">
                  <button className="rounded-xl w-28 h-12 bg-Ellipse-1 border border-Ellipse-2 ml-5">
                    <span className="flex justify-center font-medium text-sm text-text/paragraph">
                      Done
                    </span>
                  </button>
                </div>
              </div>

            </Popover.Panel>
          </Popover>
        </div>
        <div className="flex w-2/4  items-center">
          <div> <input
            type="text"
            placeholder="City pincode"
            className="w-full h-12 rounded-lg border-[1.5px] border-stroke bg-transparent pl-[5px] py-3 text-black outline-none transition focus:border-primary active:border-primary"
          /></div>
          <div className="bg-Ellipse-2 rounded-[8px] p-[9px] ml-[10px]">
            <Image
              src={"/dashboard/search.svg"}
              alt="date"
              width={19}
              height={19}
            />
          </div>
        </div>
        <Menu as="div" className="relative ml-10">
          <div>
            <Menu.Button className={`relative items-center flex z-20 justify-between w-full min-w-[161px] appearance-none rounded-lg border border-stroke px-5 py-3 outline-none transition bg-Ellipse-2 `}>
              <p>{active}</p>
              <Image
                src={"/dashboard/SelectDown.svg"}
                alt="Icon"
                width={14}
                height={14}
              />
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
            <Menu.Items className="absolute right-0 z-30 mt-2 min-w-[161px] origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div>
                {statusArr?.map((list) => {
                  return (
                    <Menu.Item  >
                      {({ active }) => (
                        <div onClick={() => setActive(list?.status)}


                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-base"
                          )}>
                          {list?.status}
                        </div>
                      )}
                    </Menu.Item>
                  )
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

      </div>

      <div>
        <table className="w-full min-w-[600px] overflow-y-auto overflow-x-auto text-sm text-left">
          <thead className="shadow-inner border-b border-Ellipse-1">
            <tr>
                <th>
             
                </th>
              <th className="px-6 py-4 w-1/4">
                <div className="font-medium text-base text-text/paragraph">
                  Name
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="font-medium text-base text-text/paragraph">
                  Designation
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="font-medium text-base text-text/paragraph">
                  Experience
                </div>
              </th>

              <th className="px-6 py-4">
                <div className="font-medium text-base text-text/paragraph">
                  Date
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="font-medium text-base text-text/paragraph">
                  Matching
                </div>
              </th>
              <th className="px-6 w-1/12">

              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => {
              return (
                <tr>
                  <td>   <div className="w-[14px] h-[14px] rounded-[2px] bg-green-500"></div></td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center">
                      <Image
                        src={"/dashboard/photo.svg"}
                        alt="Icon"
                        width={31}
                        height={31}
                      />
                      <div className="font-medium text-base text-text/secondary pl-4">
                        {item.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="font-medium text-base text-text/secondary ">
                        {item.Designation}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="font-medium text-base text-text/secondary ">
                        {item.Experience}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div
                        className={`font-medium text`}
                      >
                        {item.Date}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div
                        className={`font-medium text-green-500`}
                      >
                        {item.Matching}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex justify-end">
                      <Image
                        src={"/TextContent.svg"}
                        className="mx-4"
                        alt="Icon"
                        width={21}
                        height={21}
                      />
                      <Image
                        src={"/dashboard/EditIcon.svg"}
                        className="mx-4"
                        alt="Icon"
                        width={21}
                        height={21}
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
