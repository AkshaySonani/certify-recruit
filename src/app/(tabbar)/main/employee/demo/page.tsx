"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="container mx-auto h-screen">
        <div className="flex justify-center py-20">
          <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')]">
          <div className="flex justify-center mt-36">
            <div className="w-2/4">
              <h3 className="font-bold text-3xl text-meta-purple-1 text-center mb-6">
                Redirect to Calendly
              </h3>
              <p className="text-meta-light-blue-3 font-semibold text-xl text-center mb-10 underline underline-offset-2">
                https://calendly.com/event_types/user/me
              </p>
              <div
                onClick={() => router.back()}
                className="flex justify-center"
              >
                <span className="flex text-xl font-semibold text-meta-blue-1 cursor-pointer">
                  <Image
                    width={17}
                    height={7}
                    alt="LeftArrow"
                    src={"/LeftArrow.svg"}
                  />
                  <span className="ml-2">Back</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
