"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import Select from "@/Components/Select";
import { useRouter } from "next/navigation";
import Checkbox from "@/Components/Checkbox";
import { Menu, Transition } from "@headlessui/react";

const page = () => {
  const router = useRouter();

  const navigateHandler = (title: string) => {
    if (title === "Active Jobs") {
      router.push("/dashboard/active_job");
    } else if (title === "Candidates Hired") {
      router.push("/dashboard/hired");
    }
  };

  return (
    <div>
      <div>
        <div className="text-meta-purple-1 font-semibold text-2xl mb-4">
          Learn & Earn
        </div>
        <div className="bg-meta-gray-2 h-[200px] rounded-[14px]">
          <div className="flex flex-col justify-center h-full items-center">
            <p className="text-meta-purple-1 text-base text-[500]">
              Only when you have the certification can you do learn and earn
              use.
            </p>
            <button
              onClick={() => router?.push("/learn&earn/registrationInfo")}
              className="bg-meta-blue-1 rounded-[10px] mt-5 text-white text-base px-5 py-[13px]"
            >
              Go to Certification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
