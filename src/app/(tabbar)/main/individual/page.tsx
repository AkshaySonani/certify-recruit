"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TEXT } from "@/service/Helper";

const page = () => {
  const router = useRouter();
  const individualArr = [
    "US Recruitment",
    "Domestic Recruitment",
    "Human Resource",
    "Bench Sales",
    "UK Recruitment",
    "Canada Recruitment",
  ];

  return (
    <div>
      <div className="container mx-auto h-screen">
        <div className="flex justify-center py-20">
          <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')] w-full">
          <div
            className="bg-white shadow-[0px_2px_10px_0px_#00000006]
] w-[70%] m-auto border border-meta-light-blue-2 p-[30px] rounded-[26px] relative"
          >
            <div className="w-full flex justify-center gap-1">
              <Image
                alt="icon"
                width={22}
                height={22}
                src={"/Individual.svg"}
              />
              <p className="text-lg text-meta-blue-1 font-semibold">
              {TEXT?.INDIVIDUAL}
              </p>
            </div>
            <div className="absolute top-[39px]" onClick={() => router?.back()}>
              <Image
                width={22}
                height={22}
                alt="LeftArrow"
                src={"/LeftArrow.svg"}
              />
            </div>

            <div className="mt-[30px] flex flex-wrap gap-4">
              {individualArr?.map((list) => {
                return (
                  <div className="flex items-center justify-between w-[48%] border border-meta-light-blue-1 rounded-[10px] py-3 px-3">
                    <div className="flex gap-3 ">
                      <Image
                        alt="icon"
                        width={16}
                        height={20}
                        src={"/Individual.svg"}
                      />
                      <p className="text-sm font-medium text-meta-light-blue-3">
                        {list}
                      </p>
                    </div>

                    <input
                      value=""
                      type="radio"
                      id="inline-2-radio"
                      name="inline-radio-group"
                      className="w-[18px] h-[18px] text-meta-blue-1 bg-meta-blue-1 border-meta-light-blue-1"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          onClick={() => router?.push("/login")}
          className="flex gap-4 mt-5 items-center justify-end w-[70%] m-auto cursor-pointer"
        >
          <p className="text-lg text-meta-blue-1 font-medium">{TEXT?.NEXT}</p>
          <Image
            width={22}
            height={22}
            alt="LeftArrow"
            src={"/RightArrow.svg"}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
