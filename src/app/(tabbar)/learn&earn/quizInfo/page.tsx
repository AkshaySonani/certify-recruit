"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";

const page = () => {
  const router = useRouter()

  return (
   
      <div>
        <div className="text-text/secondary font-semibold text-2xl mb-4">
        Learn & Earn
        </div>
        <div className="bg-bg/primary h-[200px] rounded-[14px] w-full py-[10px]">
            <div className="h-full w-[70%] m-auto ">
                <div className="mb-[20px]">
                    <p className="text-[15px] font-[500] text-text/secondary text-center my-[10px]">Time remaining</p>
                    <div className="flex gap-2 justify-center" >
                        <div className="h-[54px] w-[34px] bg-element/primary rounded-[7px] flex items-center justify-center">
                            <p className="text-text/paragraph text-2xl font-semibold ">0</p>
                        </div>
                        <div className="h-[54px] w-[34px] bg-element/primary rounded-[7px] flex items-center justify-center">
                            <p className="text-text/paragraph text-2xl font-semibold ">0</p>
                        </div>
                        <div className="h-[54px] w-[20px]   flex items-center justify-center">
                            <p className="text-text/paragraph text-2xl font-semibold">:</p>
                        </div>
                        <div className="h-[54px] w-[34px] bg-element/primary rounded-[7px] flex items-center justify-center">
                            <p className="text-text/paragraph text-2xl font-semibold ">0</p>
                        </div>
                        <div className="h-[54px] w-[34px] bg-element/primary rounded-[7px] flex items-center justify-center">
                            <p className="text-text/paragraph text-2xl font-semibold ">0</p>
                        </div>
                        <div className="h-[54px] w-[20px]   flex items-center justify-center">
                            <p className="text-text/paragraph text-2xl font-semibold">:</p>
                        </div>
                        <div className="h-[54px] w-[34px] bg-element/primary rounded-[7px] flex items-center justify-center">
                            <p className="text-text/paragraph text-2xl font-semibold ">10</p>
                        </div>
                        <div className="h-[54px] w-[34px] bg-element/primary rounded-[7px] flex items-center justify-center">
                            <p className="text-text/paragraph text-2xl font-semibold ">12</p>
                        </div>



                    </div>
                </div>
                <p className="text-text/secondary text-[16px] text-[500] text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
been the industry's standard dummy text ever since the 1500s</p>
<div className="w-full flex justify-center">
                </div>
            </div>
        </div>
        <div className="mt-[30px]">
         <p className="text-xl text-text/secondary font-semibold">Quiz info</p>
        </div>
        <div className="flex w-full mt-[10px] gap-3">
          <div className="flex w-[50%] gap-3 pl-[15px] bg-element/primary rounded-[8px] items-center py-[10px]">
            <div className="w-[47px] h-[47px] rounded-full bg-white relative">
            <Image
                src={"/individual/linkPin.svg"}
                alt="Icon"
                className="top-[12px] left-[11px] absolute"
                width={23}
                height={23}
              />
            </div>
            <div className="text-text/paragraph text-[14px]">Refer this article Link</div>
          </div>
          <div className="flex w-[50%] gap-3 pl-[15px] bg-element/primary rounded-[8px] items-center py-[10px]">
            <div className="w-[47px] h-[47px] rounded-full bg-white relative">
            <Image
                src={"/individual/testExamClock.svg"}
                alt="Icon"
                className="top-[12px] left-[11px] absolute"
                width={23}
                height={23}
              />
            </div>
            <div className="text-text/paragraph text-[14px]">Quiz Joining Time 8:00 PM to 8:45 PM</div>
          </div>

        </div>
        <div className="flex justify-end items-center mt-[30px]">
            <button onClick={()=>router.push("/learn&earn/quizMCQs")} className="bg-stroke/secondary rounded-[10px] text-text/paragraph py-[7px] px-[30px]">Join Now</button>
        </div>
       



      </div>

  );
};

export default page;
