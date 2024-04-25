"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTE, TEXT } from "@/service/Helper";

const Page = () => {
  const router = useRouter();
  const [eye, setEye] = useState<Record<string, boolean>>({
    pass: false,
    confirmPass: false,
  });
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center py-20">
          <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
        </div>

        <div className="bg-[url('/_Compound.svg')]">
          <div className="flex justify-center">
            <div className="min-w-72 max-w-md bg-white w-10/12 rounded-3xl border border-meta-light-blue-2 py-10 px-5 sm:px-10 mb-20">
              <h3 className="font-bold text-3xl text-meta-purple-1 text-center mb-4">
                {TEXT?.SET_NEW_PASSWORD}
              </h3>
              <p className="text-meta-light-blue-3 font-medium text-sm text-center mb-10">
                {TEXT?.MUST_BE_AT_LEAST_CHARACTERS}
              </p>

              <div className="relative mb-6">
                <input
                  placeholder={TEXT?.PASSWORD}
                  type={eye.pass ? "text" : "password"}
                  className="rounded-xl w-full h-12 border border-meta-light-blue-2 pl-4"
                />
                {!eye.pass && (
                  <Image
                    alt="eye"
                    width={18}
                    height={18}
                    src={"/login/Eye-close.svg"}
                    className="absolute right-4 top-4"
                    onClick={() =>
                      setEye((prev) => ({ ...prev, pass: !prev.pass }))
                    }
                  />
                )}
                {eye.pass && (
                  <Image
                    alt="eye"
                    width={18}
                    height={18}
                    src={"/login/Eye-open.svg"}
                    className="absolute right-4 top-4"
                    onClick={() =>
                      setEye((prev) => ({ ...prev, pass: !prev.pass }))
                    }
                  />
                )}
              </div>
              <div className="relative mb-8">
                <input
                  placeholder={TEXT?.CONFIRM_PASSWORD}
                  type={eye.confirmPass ? "text" : "password"}
                  className="rounded-xl w-full h-12 border border-meta-light-blue-2 pl-4"
                />
                {!eye.confirmPass && (
                  <Image
                    alt="eye"
                    width={18}
                    height={18}
                    src={"/login/Eye-close.svg"}
                    className="absolute right-4 top-4"
                    onClick={() =>
                      setEye((prev) => ({
                        ...prev,
                        confirmPass: !prev.confirmPass,
                      }))
                    }
                  />
                )}
                {eye.confirmPass && (
                  <Image
                    alt="eye"
                    width={18}
                    height={18}
                    src={"/login/Eye-open.svg"}
                    className="absolute right-4 top-4"
                    onClick={() =>
                      setEye((prev) => ({
                        ...prev,
                        confirmPass: !prev.confirmPass,
                      }))
                    }
                  />
                )}
              </div>

              <button
                className="rounded-xl w-full h-12 bg-meta-light-blue-1 hover:bg-meta-blue-2 text-meta-purple-1 hover:text-white border border-meta-light-blue-2 mb-8"
                onClick={() => router.push(ROUTE?.SUCCESSFULL_FORGOT_PASSWORD)}
              >
                <span className="flex justify-center font-medium text-sm">
                  {TEXT?.RESET_PASSWORD}
                </span>
              </button>
              <div className="flex justify-center items-center font-medium text-sm text-meta-light-blue-3 mb-3">
                <span className="cursor-pointer" onClick={() => router.back()}>
                  {TEXT?.CANCEL}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
