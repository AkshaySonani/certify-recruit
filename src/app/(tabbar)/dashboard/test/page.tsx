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
        <div className="text-text/secondary font-semibold text-2xl">
          Dashboard
        </div>
        <div className="flex gap-4 mt-4">
          {menu.map((item) => {
            return (
              <div className="relative p-5 border border-[#DCE7FF] rounded-2xl w-1/4 ">
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

        <div className="mt-4">
          <div className="p-5 bg-bg/primary rounded-2xl">
            <div className="flex justify-between">
              <div className="flex">
                <div className="mt-1">{/* <Checkbox /> */}</div>
                <div className="">
                  <p className="text-text/secondary font-semibold text-xl">
                    User Interface Expert (WFH)
                  </p>
                  <p className="text-text/paragraph font-medium text-base">
                    Surat, Gujrat, India.
                  </p>
                </div>
                <p className="text-text/paragraph font-medium text-base ml-2 mt-1">
                  2 weeks ago
                </p>
              </div>

              <div>{/* <Select /> */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
