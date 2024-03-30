"use client";
import Image from "next/image";
import Select from "@/Components/Select";
import Checkbox from "@/Components/Checkbox";
import React, { useState, Fragment } from "react";
import { Dialog, Menu, Popover, Switch, Transition } from "@headlessui/react";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const SelectOption = [
    { label: "Admin", value: "admin" },
    { label: "Employee", value: "employee" },
    { label: "Role1", value: "Role1" },
  ];
  const tableData = [
    {
      name: "Kate Tanner",
      Email: "UI/UX Designer",
      Role: "6+ years",
      Status: "Available",
    },
    {
      name: "April Curtis",
      Email: "UI/UX Designer",
      Role: "5.5+ years",
      Status: "Hired",
    },
    {
      name: "Sledge Hammer",
      Email: "UI/UX Designer",
      Role: "5.5+ years",
      Status: "Available",
    },
    {
      name: "B.A. Baracus",
      Email: "UI/UX Designer",
      Role: "5+ years",
      Status: "Available",
    },
    {
      name: "Mike Torello",
      Email: "UI/UX Designer",
      Role: "4+ years",
      Status: "Available",
    },
    {
      name: "Dori Doreau",
      Email: "UI/UX Designer",
      Role: "4+ years",
      Status: "Hired",
    },
    {
      name: "Murdock",
      Email: "UI/UX Designer",
      Role: "6+ years",
      Status: "Available",
    },
    {
      name: "Lynn Tanner",
      Email: "UI/UX Designer",
      Role: "5+ years",
      Status: "Hired",
    },
  ];
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <div className="text-meta-purple-1 font-semibold text-2xl">Users</div>
      <div className="flex gap-6 mt-5 mb-10 justify-center items-center">
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
              className="w-full h-12 rounded-lg border-[1.5px] border-stroke bg-transparent px-12 py-3 text-black outline-none transition focus:border-primary active:border-primary"
            />

            <Popover.Panel className="absolute w-full z-10 mt-2 bg-white rounded-xl shadow-xl border border-meta-light-blue-1 p-4">
              <div className="w-full">
                <label className="text-base font-medium text-meta-purple-1">
                  Job title
                </label>
                <input
                  type="text"
                  placeholder="Job title search here..."
                  className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                />
              </div>
              <div className="w-full mt-4">
                <label className="text-base font-medium text-meta-purple-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Type location here..."
                  className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                />
              </div>

              <div className="flex justify-between items-center w-full mt-4">
                <div>
                  <Checkbox
                    label={"Set as default"}
                    className="text-meta-light-blue-3 text-base font-medium"
                  />
                </div>
                <div>
                  <button className="rounded-xl w-28 h-12 bg-meta-light-blue-1 border border-meta-light-blue-2 ml-5">
                    <span className="flex justify-center font-medium text-sm text-meta-light-blue-3">
                      Done
                    </span>
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Popover>
        </div>
        <div className="flex lg:w-2/4 w-1/3 items-center">
          <div className="bg-meta-light-blue-2 rounded-[8px] p-[9px]">
            <Image
              alt="date"
              width={19}
              height={19}
              src={"/dashboard/search.svg"}
            />
          </div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-xl w-full max-w-64 min-w-50  h-12 bg-meta-blue-1 border border-meta-light-blue-2 ml-5"
        >
          <span className="flex justify-center font-medium text-sm text-white">
            Add User
          </span>
        </button>
      </div>

      <div>
        <table className="xl:w-full min-w-[700px] overflow-y-auto overflow-x-auto text-sm text-left">
          <thead className="shadow-inner border-b border-meta-light-blue-1">
            <tr>
              <th className="px-6 py-4 w-1/4">
                <div className="font-medium text-base text-meta-light-blue-3">
                  Name
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="font-medium text-base text-meta-light-blue-3">
                  Email
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="font-medium text-base text-meta-light-blue-3">
                  Role
                </div>
              </th>

              <th className="px-6 py-4">
                <div className="font-medium text-base text-meta-light-blue-3">
                  Status
                </div>
              </th>
              <th className="px-6 w-1/12"/>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => {
              return (
                <tr>
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
                        {item.Email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="font-medium text-base text-meta-purple-1">
                        {item.Role}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div
                        className={`font-medium text-base ${
                          item.Status === "Hired"
                            ? "text-meta-red-1"
                            : "text-meta-green-1"
                        }  `}
                      >
                        {item.Status}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex justify-end">
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${
                          enabled ? "bg-gray-100" : "bg-green-100"
                        } relative inline-flex h-6 w-[48px] items-center rounded-full`}
                      >
                        <span className="sr-only">Enable notifications</span>
                        <span
                          className={`${
                            enabled ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-blue-600 transition`}
                        />
                      </Switch>
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
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" onClose={() => setIsOpen(false)}>
            <Transition.Child
              as={Fragment}
              leaveTo="opacity-0"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leaveFrom="opacity-100"
              leave="ease-in duration-200"
              enter="ease-out duration-300"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center text-center">
                <Transition.Child
                  as={Fragment}
                  leave="ease-in duration-200"
                  leaveTo="opacity-0 scale-95"
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leaveFrom="opacity-100 scale-100"
                >
                  <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className=" p-6 relative border-b-[1px] mt-[] border-meta-light-blue-1 text-[20px] font-semibold leading-6 text-meta-purple-1 flex justify-center items-center"
                    >
                      Add User
                    </Dialog.Title>
                    <div
                      onClick={() => setIsOpen(false)}
                      className="absolute top-2 right-1 p-[8px] cursor-pointer"
                    >
                      <Image
                        alt="date"
                        width={19}
                        height={15}
                        src={"CloseIcon.svg"}
                      />
                    </div>
                    <div className="w-full p-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                        />
                      </div>
                      <div className="mt-[10px]">
                        <input
                          type="text"
                          placeholder="Email"
                          className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                        />
                      </div>
                      <div className="w-full mt-[10px]">
                        <Menu
                          as="div"
                          className="relative z-[1] inline-block text-left w-full"
                        >
                          <Menu.Button className="inline-flex w-full justify-between items-center rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3">
                            Role
                            <div>
                              <Image
                                alt="Icon"
                                width={14}
                                height={14}
                                src={"/dashboard/SelectDown.svg"}
                              />
                            </div>
                          </Menu.Button>

                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-75"
                            leaveTo="transform opacity-0 scale-95"
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leaveFrom="transform opacity-100 scale-100"
                          >
                            <Menu.Items className="absolute right-0 mt-2 w-full divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                              <div className="px-1 py-1">
                                {SelectOption?.map((list) => {
                                  return (
                                    <Menu.Item>
                                      {({ active }) => (
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
                                                "text-meta-light-blue-3 text-base font-medium"
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
                      <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl w-full mt-[14px] h-12 bg-meta-blue-1 border border-meta-light-blue-2"
                      >
                        <span className="flex justify-center font-medium text-sm text-white">
                          Add User
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
