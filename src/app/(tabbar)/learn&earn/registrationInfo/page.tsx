"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { TEXT } from "@/service/Helper";

const page = () => {
  const router = useRouter();

  return (
    <div>
      <div>
        <div className="text-meta-purple-1 font-semibold text-2xl mb-4">
         {TEXT?.LEARN_AND_EARN}
        </div>
        <div className="bg-meta-gray-2 h-52 rounded-xl w-full py-10">
          <div className="h-full w-[70%] m-auto ">
            <p className="text-meta-purple-1 text-base text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
            <div className="w-full flex justify-center">
              <button className="bg-meta-blue-1 rounded-xl mt-5 text-white text-base px-5 py-3">
              {TEXT?.REGISTRATION}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-xl text-meta-purple-1 font-semibold">
            {TEXT?.REGISTRATION_INFO}
          </p>
        </div>
        <div className="flex w-full mt-3 gap-3">
          <div className="flex w-1/2 gap-3 pl-4 bg-meta-light-blue-2 rounded-lg items-center py-3">
            <div className="w-12 h-12 rounded-full bg-white relative">
              <Image
                alt="Icon"
                width={23}
                height={23}
                className="top-3 left-3 absolute"
                src={"/individual/timeClock.svg"}
              />
            </div>
            <div className="text-meta-light-blue-3 text-sm">
            {TEXT?.REGISTRATION_TIME}
            </div>
          </div>
          <div className="flex w-1/2 gap-3 pl-4 bg-meta-light-blue-2 rounded-lg items-center py-3">
            <div className="w-12 h-12 rounded-full bg-white relative">
              <Image
                alt="Icon"
                width={23}
                height={23}
                className="top-3 left-3 absolute"
                src={"/individual/timeHourGlass.svg"}
              />
            </div>
            <div className="text-meta-light-blue-3 text-sm">
            {TEXT?.QUIZ_JOINING_TIME}
            </div>
          </div>
        </div>
        <div className="flex w-full mt-3 gap-3">
          <div className="flex w-1/2 gap-3 pl-4 bg-meta-light-blue-2 rounded-lg items-center py-3">
            <div className="w-12 h-12 rounded-full bg-white relative">
              <Image
                alt="Icon"
                width={23}
                height={23}
                src={"/individual/clipboard.svg"}
                className="top-3 left-3 absolute"
              />
            </div>
            <div className="text-meta-light-blue-3 text-sm">
            {TEXT?.RESULT_ANNULMENT_TIME}
            </div>
          </div>
          <div className="flex w-1/2 gap-3 pl-4 bg-meta-light-blue-2 rounded-lg items-center py-3">
            <div className="w-12 h-12 rounded-full bg-white relative">
              <Image
                alt="Icon"
                width={23}
                height={23}
                src={"/individual/starPrise.svg"}
                className="top-3 left-3 absolute"
              />
            </div>
            <div className="text-meta-light-blue-3 text-sm">
            {TEXT?.WINNING_PRIZE_REDEEM_WITH_HOURS_AFTER_TEST_COMPLETE}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
