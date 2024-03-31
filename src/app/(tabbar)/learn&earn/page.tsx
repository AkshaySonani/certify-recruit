"use client";
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
        <div className="bg-meta-gray-2 h-52 rounded-xl">
          <div className="flex flex-col justify-center h-full items-center">
            <p className="text-meta-purple-1 text-base">
            {TEXT?.ONLY_WHEN_YOU_HAVE_CERTIFICATION_CAN_YOU_DO_LEARN_AND_EARN_USE}

            </p>
            <button
              onClick={() => router?.push("/learn&earn/registrationInfo")}
              className="bg-meta-blue-1 rounded-xl mt-5 text-white text-base px-5 py-3"
            >
             {TEXT?.GO_TO_CERTIFICATION}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
