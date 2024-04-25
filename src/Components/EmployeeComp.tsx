"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TEXT } from "@/service/Helper";
import SignupForm from "./SignupForm";
import DemoLinkComp from "./DemoLinkComp";
import Button from "./Button";

const EmployeeComp = () => {
  const router = useRouter();
  const [showForms, setShowForms] = useState(false);
  const [showDemoLink, setShowDemoLink] = useState(false);
  return (
    <div>
      {showForms ? (
        <SignupForm />
      ) : showDemoLink ? (
        <DemoLinkComp setShowDemoLink={setShowDemoLink} />
      ) : (
        <div className="container mx-auto h-screen">
          <div className="flex justify-center py-20">
            <Image
              src={"/MainLogo.svg"}
              alt="MainLogo"
              width={334}
              height={56}
            />
          </div>

          <div className="bg-[url('/_Compound.svg')] ">
            <div className="flex justify-center mt-36">
              <div className="w-2/4">
                <h3 className="font-bold text-3xl text-meta-purple-1 text-center mb-7">
                  {TEXT?.HI_THERE}
                </h3>
                <p className="text-meta-light-blue-3 font-semibold text-xl text-center mb-14">
                  {
                    TEXT?.CERTIFYRECRUIT_STREAMLINES_YOUR_ENTIRE_RECRUITING_PROCESS
                  }
                </p>
                <div className="flex justify-center">
                  <div className="flex">
                    <Button
                      title={TEXT?.START_NOW_ITS_FREE}
                      handleClick={() => setShowForms(true)}
                      titleClass="text-xl font-semibold text-white"
                      btnClass="rounded-2xl !w-64 !h-16 bg-meta-blue-2 mr-10"
                    />

                    <button
                      onClick={() => setShowDemoLink(true)}
                      className="rounded-2xl w-64 h-16 bg-white text-xl font-semibold text-meta-light-blue-3 border border-meta-light-blue-2 hover:bg-meta-gray-2 hover:border-meta-light-blue-1"
                    >
                      {TEXT?.SCHEDULE_A_DEMO}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeComp;
