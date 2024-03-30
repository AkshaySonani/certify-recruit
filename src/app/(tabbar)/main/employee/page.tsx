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

        <div className="bg-[url('/_Compound.svg')] ">
          <div className="flex justify-center mt-36">
            <div className="w-2/4">
              <h3 className="font-bold text-3xl text-meta-purple-1 text-center mb-7">
                Hi there!
              </h3>
              <p className="text-meta-light-blue-3 font-semibold text-xl text-center mb-14">
                CertifyRecruit streamlines your entire recruiting process, so
                you can find the best people for your team, quickly and easily.{" "}
              </p>
              <div className="flex justify-center">
                <div className="flex">
                  <button
                    onClick={() => router.push("/login")}
                    className="rounded-2xl w-64 h-16 bg-meta-blue-2 text-xl font-semibold text-white mr-10"
                  >
                    Start now - it's free
                  </button>
                  <button
                    onClick={() => router.push("/main/employee/demo")}
                    className="rounded-2xl w-64 h-16 bg-white text-xl font-semibold text-meta-light-blue-3 border border-meta-light-blue-2"
                  >
                    Schedule a demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
