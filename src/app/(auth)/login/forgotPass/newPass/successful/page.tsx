"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
            <div className="min-w-72 max-w-md bg-white w-10/12 rounded-3xl border border-meta-light-blue-2 py-10 px-5 sm:px-10 mb-20">
              <div className="flex justify-center my-6">
                <Image
                  height={136}
                  alt="MainLogo"
                  width={155.24}
                  src={"/login/successful.svg"}
                />
              </div>
              <p className="text-meta-light-blue-3 font-medium text-sm text-center mb-2">
                your password has been reset
              </p>
              <h3 className="font-semibold text-2xl text-meta-purple-1 text-center mb-10">
                Successfully
              </h3>

              <div className="flex justify-center items-center font-medium text-lg text-meta-light-blue-3">
                <span
                  onClick={() => router.push("/login")}
                  className="mr-2 text-meta-blue-2 cursor-pointer"
                >
                  Go to login
                </span>
                <Image
                  width={17}
                  height={7}
                  alt="LeftArrow"
                  src={"/LeftArrow.svg"}
                  className="rotate-180"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
