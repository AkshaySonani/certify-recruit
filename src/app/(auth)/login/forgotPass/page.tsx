"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center py-20">
          <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')] ">
          <div className="flex justify-center">
            <div className="min-w-72 max-w-md bg-white w-10/12 rounded-3xl border border-meta-light-blue-2 py-10 px-5 sm:px-10 mb-20">
              <h3 className="font-bold text-3xl text-meta-purple-1 text-center mb-4">
                Forgot password
              </h3>
              <p className="text-meta-light-blue-3 font-medium text-sm text-center mb-10">
                Please select option to receive password reset link.
              </p>

              <div className="flex items-center justify-between rounded-xl w-full h-28 sm:h-20 bg-white border border-meta-blue-1 px-4 mb-8">
                <div className="flex items-center my-3 max-w-80">
                  <div className="mr-3">
                    <Image
                      src={"/login/email.svg"}
                      className="max-w-10"
                      alt="mail"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-meta-blue-1">
                      Reset via Email
                    </p>
                    <p className="text-xs font-normal">
                      You will be provide a unique password reset link to your
                      registered email address.
                    </p>
                  </div>
                </div>

                <div className="m-4">
                  <input type="checkbox" />
                </div>
              </div>

              <button className="rounded-xl w-full h-12 bg-meta-blue-2 border border-meta-light-blue-2 mb-8">
                <span
                  onClick={() => router.push("/login/forgotPass/newPass")}
                  className="flex justify-center font-medium text-sm text-white"
                >
                  Send
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
