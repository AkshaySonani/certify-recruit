"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter();
  const [eye, setEye] = useState(false);
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center py-20">
          <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')] ">
          <div className="flex justify-center">
            <div className="min-w-72 max-w-xl rounded-3xl border border-[#EFF4FF] p-10">
              <div className="flex justify-center h-40 my-4">
                <Image
                  src={"/login/ClockMan.svg"}
                  alt="MainLogo"
                  width={99.32}
                  height={159.52}
                />
              </div>
              <h3 className="font-bold text-3xl text-text/secondary text-center mb-4">
                Thank you for sign up!
              </h3>
              <p className="text-text/paragraph font-medium text-sm text-center mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>

              {/* <div className='flex justify-center items-center font-medium text-lg text-text/paragraph'>
                                <span className='mr-2 text-[#3751F2] cursor-pointer' onClick={() => router.push("/login")}>Go to login</span><Image src={"/LeftArrow.svg"} className='rotate-180' alt="LeftArrow" width={17} height={7} />
                            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
