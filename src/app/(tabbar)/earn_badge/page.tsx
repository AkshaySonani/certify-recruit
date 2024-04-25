import React from "react";
import Image from "next/image";
import { TEXT } from "@/service/Helper";

const Page = () => {
  const menu = [
    { title: "Employee", value: "50" },
    { title: "Industry", value: "10" },
    { title: "Company Revenue ", value: "$ 30" },
    { title: "Company founded", value: "$ 10M" },
  ];

  const data = [
    { name: "B.A. Baracus", location: "UK-London", post: "CEO" },
    { name: "B.A. Baracus", location: "UK-London", post: "CEO" },
    { name: "B.A. Baracus", location: "UK-London", post: "CEO" },
    { name: "B.A. Baracus", location: "UK-London", post: "CEO" },
    { name: "B.A. Baracus", location: "UK-London", post: "CEO" },
  ];
  return (
    <div>
      <div>
        <div className="text-meta-purple-1 font-semibold text-2xl mb-4">
          {TEXT?.EARN_BADGE}
        </div>

        <div className="flex gap-4 mt-4 w-full flex-wrap lg:flex-nowrap">
          {menu.map((item) => {
            return (
              <div className="relative p-5 border border-meta-light-blue-1 rounded-2xl w-1/4 cursor-pointer">
                <div className="bg-meta-light-blue-1 rounded-lg h-9 w-9 flex justify-center items-center mb-2">
                  <Image
                    alt="Icon"
                    width={19}
                    height={19}
                    src={"/sidebarIcon/jobPosting.svg"}
                  />
                </div>
                <p className="font-bold text-meta-purple-1 text-2xl">
                  {item?.value}
                </p>
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
        <div className="flex justify-center flex-wrap items-center w-full mt-5 gap-3">
          {data?.map((list) => {
            return (
              <div className="flex p-5 border border-meta-light-blue-1 rounded-2xl gap-2">
                <Image
                  alt="Icon"
                  width={50}
                  height={50}
                  src={"/dashboard/photo.svg"}
                />
                <div className="pr-3">
                  <p className="text-meta-purple-1 font-medium text-base">
                    {list?.name}
                  </p>
                  <p className="text-meta-light-blue-3 text-xs font-medium">
                    {list?.post}
                  </p>
                  <p className="text-meta-light-blue-3 text-xs font-medium">
                    {list?.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
