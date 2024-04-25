"use client";
import Image from "next/image";
import React, { useState } from "react";
import Select from "@/Components/Select";
import Checkbox from "@/Components/Checkbox";
import DatePicker from "react-multi-date-picker";
import { TEXT } from "@/service/Helper";
import { Menu, Popover, Transition } from "@headlessui/react";
const tableData = [
  {
    name: "Kate Tanner",
    Designation: "UI/UX Designer",
    Experience: "6+ years",
    Date: "16/02/2024",
    Status: "Hired",
  },
  {
    name: "April Curtis",
    Designation: "UI/UX Designer",
    Experience: "5.5+ years",
    Date: "10/02/2024",
    Status: "Hired",
  },
  {
    name: "Sledge Hammer",
    Designation: "UI/UX Designer",
    Experience: "5.5+ years",
    Date: "16/02/2024",
    Status: "Hired",
  },
  {
    name: "B.A. Baracus",
    Designation: "UI/UX Designer",
    Experience: "5+ years",
    Date: "12/02/2024",
    Status: "Hired",
  },
  {
    name: "Mike Torello",
    Designation: "UI/UX Designer",
    Experience: "4+ years",
    Date: "06/02/2024",
    Status: "Hired",
  },
  {
    name: "Dori Doreau",
    Designation: "UI/UX Designer",
    Experience: "4+ years",
    Date: "16/02/2024",
    Status: "Hired",
  },
  {
    name: "Murdock",
    Designation: "UI/UX Designer",
    Experience: "6+ years",
    Date: "15/02/2024",
    Status: "Hired",
  },
  {
    name: "Lynn Tanner",
    Designation: "UI/UX Designer",
    Experience: "5+ years",
    Date: "16/02/2024",
    Status: "Hired",
  },
];

const Page = () => {
  const [dateRange, setDateRange] = useState(["2024-01-01", "2024-12-31"]);

  return (
    <div>
      <div>
        <div className="text-meta-purple-1 font-semibold text-2xl">
          {TEXT.HIRED}
        </div>
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
                placeholder="Search..."
                className="w-full h-12 rounded-lg border border-meta-light-blue-1 bg-transparent px-12  text-black outline-none transition focus:border-primary active:border-primary"
              />
              <div className="absolute right-3 top-[9px]">
                <Image
                  alt="date"
                  width={19}
                  height={19}
                  src={"/dashboard/search.svg"}
                />
              </div>
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
                    {TEXT?.LOCATION}
                  </label>
                  <input
                    type="text"
                    placeholder="Type location here..."
                    className="w-full rounded-lg border border-meta-light-blue-1 focus:border-meta-light-blue-3 mt-1 px-5 py-3"
                  />
                </div>
                <div className="w-full mt-4">
                  <label className="text-base font-medium text-meta-purple-1">
                    {TEXT?.DATE_POSTED}
                  </label>
                  <DatePicker
                    range
                    format="YYYY-MM-DD"
                    minDate={new Date("01-01-2014")}
                    maxDate={new Date("12-31-2024")}
                    placeholder="YYYY-MM-DD - YYYY-MM-DD"
                    containerStyle={{ width: "100%" }}
                    onChange={(dateObjects: any) => {
                      if (dateObjects?.[1]?.toString()) {
                        setDateRange((e) => [
                          dateObjects?.[0]?.toString(),
                          dateObjects?.[1]?.toString(),
                        ]);
                      }
                    }}
                    style={{
                      height: 48,
                      width: "100%",
                      borderRadius: 8,
                      paddingLeft: 20,
                      marginTop: 4,
                    }}
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
                        {TEXT?.DONE}
                      </span>
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Popover>
          </div>
          <div className="flex w-2/4 items-center">
            <div className="relative w-full">
              <DatePicker
                range
                format="YYYY-MM-DD"
                placeholder="Select Dates"
                minDate={new Date("01-01-2014")}
                maxDate={new Date("12-31-2024")}
                containerStyle={{ width: "100%" }}
                onChange={(dateObjects: any) => {
                  if (dateObjects?.[1]?.toString()) {
                    setDateRange((e) => [
                      dateObjects?.[0]?.toString(),
                      dateObjects?.[1]?.toString(),
                    ]);
                  }
                }}
                style={{
                  height: 35,
                  fontSize: 12,
                  width: "100%",
                  borderRadius: 8,
                  borderColor: "#DCE7FF",
                }}
              />
              <div className="absolute right-2 top-2">
                <Image
                  alt="date"
                  width={24}
                  height={24}
                  src={"/dashboard/date.svg"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <table className="w-full text-sm text-left">
          <thead className="shadow-inner border-b border-meta-light-blue-1">
            <tr>
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
                  {TEXT?.STATUS}
                </div>
              </th>
              <th className="px-6 w-1/12">
                <span className="flex font-medium text-base text-meta-light-blue-3 bg-meta-light-blue-2 p-2 rounded-lg">
                  <div>{TEXT?.DOWNLOADS}</div>
                  <div className="ml-5">5/5</div>
                </span>
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
                      <div className="font-medium text-base text-meta-purple-1">
                        {item.Date}
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
                      <Image
                        alt="Icon"
                        width={21}
                        height={21}
                        className="mx-4"
                        src={"/sidebarIcon/jobPosting.svg"}
                      />
                      <Image
                        alt="Icon"
                        width={21}
                        height={21}
                        className="mx-4"
                        src={"/dashboard/download.svg"}
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

export default Page;
