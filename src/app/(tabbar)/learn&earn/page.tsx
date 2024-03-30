"use client"
import Checkbox from "@/Components/Checkbox";
import Select from "@/Components/Select";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";

const page = () => {
  const router = useRouter()

  const navigateHandler = (title: string) => {
    if (title === "Active Jobs") {
      router.push("/dashboard/active_job")
    } else if (title === "Candidates Hired") {
      router.push("/dashboard/hired")
    }
  }

  return (
    <div>
      <div>
        <div className="text-text/secondary font-semibold text-2xl mb-4">
        Learn & Earn
        </div>
        <div className="bg-bg/primary h-[200px] rounded-[14px]">
            <div className="flex flex-col justify-center h-full items-center">
                <p className="text-text/secondary text-[16px] text-[500]">Only when you have the certification can you do learn and earn use.</p>
                <button className="bg-text/primary rounded-[10px] mt-[20px] text-white text-[16px] px-[20px] py-[13px]"onClick={()=>router?.push("/learn&earn/registrationInfo")} >Go to Certification</button>
            </div>
        </div>
       



      </div>
    </div>
  );
};

export default page;
