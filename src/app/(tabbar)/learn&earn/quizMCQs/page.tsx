"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import { useRouter } from "next/navigation";
import { TEXT } from "@/service/Helper";

const page = () => {
  const router = useRouter();

  const questionStatus=[
  {  id:1,
    status:"Answered",
    color:"bg-meta-green-1"
  },
  {  id:2,
    status:"Not Answered",
    color:"bg-meta-brown-1"
  },
  {  id:3,
    status:"Marked for Review",
    color:"bg-meta-red-1"
  },
  {  id:4,
    status:"Answered & Marked for Review ",
    color:"bg-meta-purple-2"
  }
  ]

  return <div className="w-10/12 m-auto max-w-7xl">
    <div className="flex justify-between ">
      <Image src={"/MainLogo.svg"} alt="MainLogo" width={199} height={33} />
      <div>
        <p className="text-sm text-meta-purple-1 font-medium">{TEXT?.TIME_REMAINING}</p>
        <div className="flex">
          <div>
            <div className="flex mt-3 gap-2">
              <div className="w-8 h-12 bg-meta-light-blue-2 rounded-lg text-xl flex justify-center items-center">0</div>
              <div className="w-8 h-12 bg-meta-light-blue-2 rounded-lg text-xl flex justify-center items-center">0</div>
            </div>
            <div className="text-meta-light-blue-3 text-sm font-medium mt-1">{TEXT?.HOURS}</div>

          </div>

          <div className="flex mt-3 gap-2">
            <div className="w-8 h-12  text-xl flex justify-center items-center">:</div>
          </div>
          <div>
            <div className="flex mt-3 gap-2">
              <div className="w-8 h-12 bg-meta-light-blue-2 rounded-lg text-xl flex justify-center items-center">3</div>
              <div className="w-8 h-12 bg-meta-light-blue-2 rounded-lg text-xl flex justify-center items-center">5</div>
            </div>
            <div className="text-meta-light-blue-3 text-sm font-medium mt-1">{TEXT?.MINS}</div>

          </div>
          <div className="flex mt-3 gap-2">
            <div className="w-8 h-12  text-xl flex justify-center items-center">:</div>
          </div>
          <div>
            <div className="flex mt-3 gap-2">
              <div className="w-8 h-12 bg-meta-light-blue-2 rounded-lg text-xl flex justify-center items-center">3</div>
              <div className="w-8 h-12 bg-meta-light-blue-2 rounded-lg text-xl flex justify-center items-center">5</div>
            </div>
            <div className="text-meta-light-blue-3 text-sm font-medium mt-1">{TEXT?.SECS}</div>

          </div>

        </div>

      </div>
    </div>
    <div className="flex w-full mt-8 gap-3">
      <div className="w-2/4 border border-meta-light-blue-2 rounded-2xl p-5">
        <div className="flex justify-center ">
          <p className="text-lg font-semibold text-meta-purple">{TEXT?.QUIZ_DETAIL} </p>
        </div>
        <div className="flex justify-between mt-6">
          <div className="w-2/3">
            <p className="text-meta-gray-1 text-sm font-medium">{TEXT?.NAME}</p>
            <p className="text-sm font-medium">Certify Recruit Certification exam</p>
          </div>
          <div className="w-2/3">
            <p className="text-meta-gray-1 text-sm font-medium">{TEXT?.START_DATE_TIME}</p>
            <p className="text-sm font-medium">2024-03-05  08:00:00</p>
          </div>
        </div>
        <div className="flex justify-between mt-6">
        <div className="w-2/3">
            <p className="text-meta-gray-1 text-sm font-medium">{TEXT?.MARKS_PER_QUESTION}</p>
            <p className="text-sm font-medium">1</p>
          </div>
          <div className="w-2/3">
            <p className="text-meta-gray-1 text-sm font-medium">{TEXT?.MAX_TAB_SWITCH_ALLOW}</p>
            <p className="text-sm font-medium">3</p>
          </div>
        </div>
        <div className="flex justify-between mt-6">
        <div className="w-2/3">
            <p className="text-meta-gray-1 text-sm font-medium">{TEXT?.DURATION}</p>
            <p className="text-sm font-medium">05 Min</p>
          </div>
          <div className="w-2/3">
            <p className="text-meta-gray-1 text-sm font-medium">{TEXT?.NEGATIVE_MARKS_PER_QUESTION}</p>
            <p className="text-sm font-medium">0</p>
          </div>
        </div>
      </div>
      <div className="w-2/4 border border-meta-light-blue-2 rounded-2xl p-5">
      <div className="flex justify-center ">
          <p className="text-lg font-semibold text-meta-purple">{TEXT?.QUESTION_PALETTE} </p>
        </div>
        <div className="flex w-full flex-wrap gap-4 mt-5">
          {questionStatus.map((list)=>{
            return(
            <div className="flex gap-2 items-center">
              <div className={`${list?.color} rounded-sm w-4 h-4`}></div>
              <p>{list?.status}</p>
            </div>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-4 mt-5 items-center">
          {["01","02","03","04","05","06","07","08","09","10"].map((list)=>{
            return(
              <div className=" flex items-center w-8 h-8 justify-center rounded-[4px] bg-meta-gray-2 text-center "><p>{list}</p></div>
            )
          })}
        </div>
      </div>
    </div>



  </div>;
};

export default page;
