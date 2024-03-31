import { TEXT } from "@/service/Helper";
import Image from "next/image";
import React from "react";

const menu = [
  { title: "Candidates Hired" },
  { title: "Active Jobs" },
  { title: "Total Jobs" },
  { title: "Active Jobs" },
];

const page = () => {
  return (
    <div>
      <div>
        <div className="text-meta-purple-1 font-semibold text-2xl">
          {TEXT?.DASHBOARD}
        </div>
        <div className="flex gap-4 mt-4">
          {menu.map((item) => {
            return (
              <div className="relative p-5 border border-meta-light-blue-1 rounded-2xl w-1/4">
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

        <div className="mt-4">
          <div className="p-5 bg-meta-gray-2 rounded-2xl">
            <div className="flex justify-between">
              <div className="flex">
                {/* <div className="mt-1"><Checkbox /></div> */}
                <div>
                  <p className="text-meta-purple-1 font-semibold text-xl">
                    {TEXT?.USER_INTERFACE_EXPERT}
                  </p>
                  <p className="text-meta-light-blue-3 font-medium text-base">
                   {TEXT?.CITY_NAMES}
                  </p>
                </div>
                <p className="text-meta-light-blue-3 font-medium text-base ml-2 mt-1">
                 {TEXT?.TWO_WEEKS_AGO}
                </p>
              </div>

              {/* <div><Select /></div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
