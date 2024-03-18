"use client";
import { Dialog, Menu, Popover, Switch, Transition } from "@headlessui/react";
import React, { useState, Fragment } from "react";
import Checkbox from "@/Components/Checkbox";
import Image from "next/image";
import Select from "@/Components/Select";

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
      <div className="text-text/secondary font-semibold text-2xl">Search CVs</div>
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
        <div className="flex w-2/4  items-center">
          <div>   <input
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
       
      </div>

      <div>
        <table className="w-full min-w-[600px] overflow-y-auto overflow-x-auto text-sm text-left">
          <thead className="shadow-inner border-b border-Ellipse-1">
            <tr>
              <th className="px-6 py-4 w-1/4">
                <div className="font-medium text-base text-text/paragraph">
                  Name
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="font-medium text-base text-text/paragraph">
                  Email
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="font-medium text-base text-text/paragraph">
                  Role
                </div>
              </th>

              <th className="px-6 py-4">
                <div className="font-medium text-base text-text/paragraph">
                  Status
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
                        {item.Email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div className="font-medium text-base text-text/secondary ">
                        {item.Role}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    <div>
                      <div
                        className={`font-medium text-base ${
                          item.Status === "Hired"
                            ? "text-[#EA4335]"
                            : "text-[#34A853]"
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
