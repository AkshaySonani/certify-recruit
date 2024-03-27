"use client";
import { Dialog, Menu, Popover, Switch, Transition } from "@headlessui/react";
import React, { useState, Fragment } from "react";
import Checkbox from "@/Components/Checkbox";
import Image from "next/image";
import Select from "@/Components/Select";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const SelectOption = [
    { label: "HR", value: "hr" },
    { label: "Bench sales", value: "Bench sales" },
    { label: "Domestic Recruitment", value: "Domestic Recruitment" },
    { label: "US Recruitment", value: "US Recruitment" },
    { label: "UK Recruitment", value: "UK Recruitment" },
  ];
  const tableData = [
    {
      name: "Kate Tanner",
      Email: "katetanner123@gmail.com",
      Experience: "6+ years",
      Department: "UI/UX Designer",
      Score:"70%",
      status:"Send"
    },
    {
      name: "Kate Tanner",
      Email: "katetanner123@gmail.com",
      Experience: "6+ years",
      Department: "UI/UX Designer",
      Score:"70%",
      status:"Send"
    },
    {
      name: "Kate Tanner",
      Email: "katetanner123@gmail.com",
      Experience: "6+ years",
      Department: "UI/UX Designer",
      Score:"70%",
      status:"Send"
    },
    {
      name: "Kate Tanner",
      Email: "katetanner123@gmail.com",
      Experience: "6+ years",
      Department: "UI/UX Designer",
      Score:"70%",
      status:"Send"
    },
    {
      name: "Kate Tanner",
      Email: "katetanner123@gmail.com",
      Experience: "6+ years",
      Department: "UI/UX Designer",
      Score:"70%",
      status:"Send"
    },
    {
      name: "Kate Tanner",
      Email: "katetanner123@gmail.com",
      Experience: "6+ years",
      Department: "UI/UX Designer",
      Score:"70%",
      status:"Send"
    },
    {
      name: "Kate Tanner",
      Email: "katetanner123@gmail.com",
      Experience: "6+ years",
      Department: "UI/UX Designer",
      Score:"70%",
      status:"Send"
    },
    {
      name: "Kate Tanner",
      Email: "katetanner123@gmail.com",
      Experience: "6+ years",
      Department: "UI/UX Designer",
      Score:"70%",
      status:"Send"
    },
  ];
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <div className="text-text/secondary font-semibold text-2xl">Company Info</div>
      <div className="flex gap-6 mt-5 mb-10 justify-center items-center">
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
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Type location here..."
                  className="w-full rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-5 py-3"
                />
              </div>

              <div className="flex justify-between items-center w-full mt-4">
                <div>
                  <Checkbox
                    label={"Set as default"}
                    className={"text-text/paragraph text-base font-medium"}
                  />
                </div>
                <div>
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
        <div className="flex lg:w-2/4 w-1/3 items-center">
          <div className="bg-Ellipse-2 rounded-[8px] p-[9px]">
            <Image
              src={"/dashboard/search.svg"}
              alt="date"
              width={19}
              height={19}
            />
          </div>
        </div>
        <button
          className="rounded-xl w-full max-w-64 min-w-50  h-12 bg-text/primary border border-Ellipse-2 ml-5"
          onClick={() => setIsOpen(true)}
        >
          <span className="flex justify-center font-medium text-sm text-white">
          Add Employee
          </span>
        </button>
      </div>

      <div>
        <table className="xl:w-full min-w-[700px] overflow-y-auto overflow-x-auto text-sm text-left">
          <thead className="shadow-inner border-b border-Ellipse-1">
            <tr>
              <th className="px-6 py-4 w-1/4">
                <div className="font-medium text-base text-text/paragraph">
                  Name
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="font-medium text-base text-text/paragraph">
                Department
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="font-medium text-base text-text/paragraph">
                Experience
                </div>
              </th>

              <th className="px-6 py-4">
                <div className="font-medium text-base text-text/paragraph">
                Email
                </div>
              </th>
              <th className="px-6 w-1/12">
              <div className="font-medium text-base text-text/paragraph">
              Score
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
                        {item.Department}
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
                        className={`font-medium text-base`}
                      >
                        {item.Email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                  <div>
                      <div
                        className={`font-medium text-base text-green-500`}
                      >
                        {item.Score}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                  <div>
                      <div
                        className={`font-medium text-base`}
                      >
                        {item.status}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className=" " onClose={() => setIsOpen(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center  text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="  w-full max-w-md transform rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className=" p-6 relative border-b-[1px] mt-[] border-Ellipse-1 text-[20px]  font-semibold leading-6 text-[#150936] flex justify-center items-center"
                    >
                      Add Employee
                    </Dialog.Title>
                    <div className="absolute top-2 right-1 p-[8px] cursor-pointer" onClick={() => setIsOpen(false)}>
                      <Image
                        src={"CloseIcon.svg"}
                        alt="date"
                        width={19}
                        height={15}
                      />
                    </div>
                    <div className="w-full p-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-full rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-5 py-3"
                        />
                      </div>
                     
                      <div className="w-full  mt-[10px]">
                        <Menu
                          as="div"
                          className="relative z-[1] inline-block text-left w-full"
                        >
                          <Menu.Button className="inline-flex w-full justify-between items-center rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-5 py-3">
                          Department
                            <div>
                              {" "}
                              <Image
                                src={"/dashboard/SelectDown.svg"}
                                alt="Icon"
                                width={14}
                                height={14}
                              />
                            </div>
                          </Menu.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 mt-2 w-full divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                              <div className="px-1 py-1 ">
                                {SelectOption?.map((list) => {
                                  return (
                                    <Menu.Item>
                                      {({ active }) => 
                      
                                      (
                                        <div className="flex justify-between w-full items-center">
                                          <button
                                            className={`${
                                              active ? "" : "text-gray-900"
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                          >
                                            {list?.label}
                                          </button>
                                          <div>
                                            <Checkbox
                                            checked={active ? true : false}
                                            value={list?.value}
                                              className={
                                                "text-text/paragraph text-base font-medium"
                                              }
                                            />
                                          </div>
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
                      <div className="mt-[10px]">
                        <input
                          type="text"
                          placeholder="Experience"
                          className="w-full rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-5 py-3"
                        />
                      </div>
                      <div className="mt-[10px]">
                        <input
                          type="text"
                          placeholder="Email"
                          className="w-full rounded-lg border border-Ellipse-1 focus:border-text/paragraph mt-1 px-5 py-3"
                        />
                      </div>
                      <button
                        className="rounded-xl w-full mt-[14px] h-12 bg-text/primary border border-Ellipse-2 "
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="flex justify-center font-medium text-sm text-white">
                        Add Employee
                        </span>
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default page;

