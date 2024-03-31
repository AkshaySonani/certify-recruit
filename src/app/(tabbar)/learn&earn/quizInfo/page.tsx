"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { TEXT } from "@/service/Helper";

const page = () => {
  const router = useRouter();

  return (
    <div>
      <div className="text-meta-purple-1 font-semibold text-2xl mb-4">
       {TEXT?.LEARN_AND_EARN}
      </div>
      <div className="bg-meta-gray-2 h-[200px] rounded-[14px] w-full py-[10px]">
        <div className="h-full w-[70%] m-auto ">
          <div className="mb-5">
            <p className="text-[15px] font-medium text-meta-purple-1 text-center my-[10px]">
            {TEXT?.TIME_REMAINING}
            </p>
            <div className="flex gap-2 justify-center">
              <div className="h-[54px] w-[34px] bg-meta-light-blue-2 rounded-[7px] flex items-center justify-center">
                <p className="text-meta-light-blue-3 text-2xl font-semibold">
                  0
                </p>
              </div>
              <div className="h-[54px] w-[34px] bg-meta-light-blue-2 rounded-[7px] flex items-center justify-center">
                <p className="text-meta-light-blue-3 text-2xl font-semibold">
                  0
                </p>
              </div>
              <div className="h-[54px] w-5 flex items-center justify-center">
                <p className="text-meta-light-blue-3 text-2xl font-semibold">
                  :
                </p>
              </div>
              <div className="h-[54px] w-[34px] bg-meta-light-blue-2 rounded-[7px] flex items-center justify-center">
                <p className="text-meta-light-blue-3 text-2xl font-semibold">
                  0
                </p>
              </div>
              <div className="h-[54px] w-[34px] bg-meta-light-blue-2 rounded-[7px] flex items-center justify-center">
                <p className="text-meta-light-blue-3 text-2xl font-semibold">
                  0
                </p>
              </div>
              <div className="h-[54px] w-5 flex items-center justify-center">
                <p className="text-meta-light-blue-3 text-2xl font-semibold">
                  :
                </p>
              </div>
              <div className="h-[54px] w-[34px] bg-meta-light-blue-2 rounded-[7px] flex items-center justify-center">
                <p className="text-meta-light-blue-3 text-2xl font-semibold">
                  10
                </p>
              </div>
              <div className="h-[54px] w-[34px] bg-meta-light-blue-2 rounded-[7px] flex items-center justify-center">
                <p className="text-meta-light-blue-3 text-2xl font-semibold">
                  12
                </p>
              </div>
            </div>
          </div>
          <p className="text-meta-purple-1 text-base text-[500] text-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <div className="w-full flex justify-center" />
        </div>
      </div>
      <div className="mt-[30px]">
        <p className="text-xl text-meta-purple-1 font-semibold">{TEXT?.QUIZ_INFO}</p>
      </div>
      <div className="flex w-full mt-[10px] gap-3">
        <div className="flex w-1/2 gap-3 pl-[15px] bg-meta-light-blue-2 rounded-lg items-center py-[10px]">
          <div className="w-[47px] h-[47px] rounded-full bg-white relative">
            <Image
              alt="Icon"
              width={23}
              height={23}
              src={"/individual/linkPin.svg"}
              className="top-[12px] left-[11px] absolute"
            />
          </div>
          <div className="text-meta-light-blue-3 text-sm">
          {TEXT?.REFER_THIS_ARTICLE_LINK}
          </div>
        </div>
        <div className="flex w-1/2 gap-3 pl-[15px] bg-meta-light-blue-2 rounded-lg items-center py-[10px]">
          <div className="w-[47px] h-[47px] rounded-full bg-white relative">
            <Image
              alt="Icon"
              width={23}
              height={23}
              src={"/individual/testExamClock.svg"}
              className="top-[12px] left-[11px] absolute"
            />
          </div>
          <div className="text-meta-light-blue-3 text-sm">
          {TEXT?.QUIZ_JOINING_TIME}
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center mt-[30px]">
        <button
          onClick={() => router.push("/learn&earn/quizMCQs")}
          className="bg-meta-light-blue-1 rounded-[10px] text-meta-light-blue-3 py-[7px] px-[30px]"
        >
         {TEXT?.Join_Now}
        </button>
      </div>
    </div>
  );
};

export default page;
