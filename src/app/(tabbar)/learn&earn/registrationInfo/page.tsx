"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";

const page = () => {
  const router = useRouter()


  return (
    <div>
      <div>
        <div className="text-text/secondary font-semibold text-2xl mb-4">
        Learn & Earn
        </div>
        <div className="bg-bg/primary h-[200px] rounded-[14px] w-full py-[40px]">
            <div className="h-full w-[70%] m-auto ">
                <p className="text-text/secondary text-[16px] text-[500] text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
been the industry's standard dummy text ever since the 1500s</p>
<div className="w-full flex justify-center">
                <button className="bg-text/primary rounded-[10px] mt-[20px] text-white text-[16px] px-[20px] py-[10px]">Registration</button>
                </div>
            </div>
        </div>
        <div className="mt-[30px]">
         <p className="text-xl text-text/secondary font-semibold">Registration info</p>
        </div>
        <div className="flex w-full mt-[10px] gap-3">
          <div className="flex w-[50%] gap-3 pl-[15px] bg-element/primary rounded-[8px] items-center py-[10px]">
            <div className="w-[47px] h-[47px] rounded-full bg-white relative">
            <Image
                src={"/individual/timeClock.svg"}
                alt="Icon"
                className="top-[12px] left-[11px] absolute"
                width={23}
                height={23}
              />
            </div>
            <div className="text-text/paragraph text-[14px]">Registration Time 8:00 AM to 12:00 PM</div>
          </div>
          <div className="flex w-[50%] gap-3 pl-[15px] bg-element/primary rounded-[8px] items-center py-[10px]">
            <div className="w-[47px] h-[47px] rounded-full bg-white relative">
            <Image
                src={"/individual/timeHourGlass.svg"}
                alt="Icon"
                className="top-[12px] left-[11px] absolute"
                width={23}
                height={23}
              />
            </div>
            <div className="text-text/paragraph text-[14px]">Quiz Joining Time 8:00 PM to 8:45 PM</div>
          </div>

        </div>
        <div className="flex w-full mt-[10px] gap-3">
          <div className="flex w-[50%] gap-3 pl-[15px] bg-element/primary rounded-[8px] items-center py-[10px]">
            <div className="w-[47px] h-[47px] rounded-full bg-white relative">
            <Image
                src={"/individual/clipboard.svg"}
                alt="Icon"
                className="top-[12px] left-[11px] absolute"
                width={23}
                height={23}
              />
            </div>
            <div className="text-text/paragraph text-[14px]">Result annulment 9:15 PM</div>
          </div>
          <div className="flex w-[50%] gap-3 pl-[15px] bg-element/primary rounded-[8px] items-center py-[10px]">
            <div className="w-[47px] h-[47px] rounded-full bg-white relative">
            <Image
                src={"/individual/starPrise.svg"}
                alt="Icon"
                className="top-[12px] left-[11px] absolute"
                width={23}
                height={23}
              />
            </div>
            <div className="text-text/paragraph text-[14px]">Winning Prize redeem  with in 24 Hours after test complete</div>
          </div>

        </div>
       



      </div>
    </div>
  );
};

export default page;
