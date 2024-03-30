"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <div>
      <div>
        <div className="text-meta-purple-1 font-semibold text-2xl mb-4">
          Learn & Earn
        </div>
        <div className="bg-meta-gray-2 h-[200px] rounded-[14px] w-full py-[40px]">
          <div className="h-full w-[70%] m-auto ">
            <p className="text-meta-purple-1 text-[16px] text-[500] text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
            <div className="w-full flex justify-center">
              <button className="bg-meta-blue-1 rounded-[10px] mt-[20px] text-white text-[16px] px-[20px] py-[10px]">
                Registration
              </button>
            </div>
          </div>
        </div>
        <div className="mt-[30px]">
          <p className="text-xl text-meta-purple-1 font-semibold">
            Registration info
          </p>
        </div>
        <div className="flex w-full mt-[10px] gap-3">
          <div className="flex w-[50%] gap-3 pl-[15px] bg-meta-light-blue-2 rounded-[8px] items-center py-[10px]">
            <div className="w-[47px] h-[47px] rounded-full bg-white relative">
              <Image
                alt="Icon"
                width={23}
                height={23}
                src={"/individual/timeClock.svg"}
                className="top-[12px] left-[11px] absolute"
              />
            </div>
            <div className="text-meta-light-blue-3 text-[14px]">
              Registration Time 8:00 AM to 12:00 PM
            </div>
          </div>
          <div className="flex w-[50%] gap-3 pl-[15px] bg-meta-light-blue-2 rounded-[8px] items-center py-[10px]">
            <div className="w-[47px] h-[47px] rounded-full bg-white relative">
              <Image
                alt="Icon"
                width={23}
                height={23}
                src={"/individual/timeHourGlass.svg"}
                className="top-[12px] left-[11px] absolute"
              />
            </div>
            <div className="text-meta-light-blue-3 text-[14px]">
              Quiz Joining Time 8:00 PM to 8:45 PM
            </div>
          </div>
        </div>
        <div className="flex w-full mt-[10px] gap-3">
          <div className="flex w-[50%] gap-3 pl-[15px] bg-meta-light-blue-2 rounded-[8px] items-center py-[10px]">
            <div className="w-[47px] h-[47px] rounded-full bg-white relative">
              <Image
                alt="Icon"
                width={23}
                height={23}
                src={"/individual/clipboard.svg"}
                className="top-[12px] left-[11px] absolute"
              />
            </div>
            <div className="text-meta-light-blue-3 text-[14px]">
              Result annulment 9:15 PM
            </div>
          </div>
          <div className="flex w-[50%] gap-3 pl-[15px] bg-meta-light-blue-2 rounded-[8px] items-center py-[10px]">
            <div className="w-[47px] h-[47px] rounded-full bg-white relative">
              <Image
                alt="Icon"
                width={23}
                height={23}
                src={"/individual/starPrise.svg"}
                className="top-[12px] left-[11px] absolute"
              />
            </div>
            <div className="text-meta-light-blue-3 text-[14px]">
              Winning Prize redeem with in 24 Hours after test complete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
