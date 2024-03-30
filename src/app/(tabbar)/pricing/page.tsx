"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Switch } from "@headlessui/react";

const page = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <section>
      <div className="text-center">
        <div className="text-meta-purple-1 font-semibold text-3xl">
          Choose your plan
        </div>
        <div className="text-meta-light-blue-3 font-medium text-base mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </div>
      </div>
      <div className="flex justify-center items-center my-14">
        <div className="text-meta-purple-1 font-medium text-xl mx-3">
          Monthly
        </div>
        <div className="mx-2">
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? "bg-gray-100" : "bg-green-100"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-blue-600 transition`}
            />
          </Switch>
        </div>
        <div className="text-meta-light-blue-3 font-medium text-xl mx-2">
          Yearly
        </div>
        <div className="text-meta-blue-1 font-medium text-sm">20%off</div>
      </div>

      <div className="flex flex-wrap gap-6 justify-center items-end">
        <div className="bg-meta-gray-2 flex flex-col justify-between rounded-3xl px-8 py-10 max-w-96 min-w-64 h-[520px]">
          <div>
            <div className="text-meta-purple-1 font-medium text-base text-center">
              Basic Plane
            </div>

            <div className="flex justify-center items-end my-6">
              <div className="text-meta-purple-1 font-medium text-4xl">$20</div>
              <div className="text-meta-light-blue-3 font-medium text-xs mb-1">
                /Month
              </div>
            </div>

            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center justify-start mb-3">
                <div className="mr-4">
                  <Image
                    alt="Icon"
                    width={20}
                    height={20}
                    src={"/pricing/rightTick.svg"}
                  />
                </div>
                <div className="text-meta-purple-1 font-normal text-sm">
                  Lorem Ipsum is simply dummy
                </div>
              </div>
            ))}
          </div>

          <div>
            <button className="rounded-xl w-full h-12 bg-meta-blue-2">
              <span className="flex justify-center font-medium text-sm text-white">
                Get Started
              </span>
            </button>
          </div>
        </div>

        <div className="rounded-3xl max-w-96 min-w-64">
          <div className="text-white bg-meta-purple-1 font-medium text-base text-center py-2">
            Most Popular
          </div>
          <div className="bg-meta-gray-2 flex flex-col justify-between h-[520px] px-8 pb-10 pt-10">
            <div>
              <div className="text-meta-purple-1 font-medium text-base text-center">
                Standard Plan
              </div>

              <div className="flex justify-center items-end my-6">
                <div className="text-meta-purple-1 font-medium text-4xl">
                  $70
                </div>
                <div className="text-meta-light-blue-3 font-medium text-xs mb-1">
                  /Month
                </div>
              </div>

              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start mb-3"
                >
                  <div className="mr-4">
                    <Image
                      alt="Icon"
                      width={20}
                      height={20}
                      src={"/pricing/rightTick.svg"}
                    />
                  </div>
                  <div className="text-meta-purple-1 font-normal text-sm">
                    Lorem Ipsum is simply dummy
                  </div>
                </div>
              ))}
            </div>

            <div>
              <button className="rounded-xl w-full h-12 bg-meta-blue-2">
                <span className="flex justify-center font-medium text-sm text-white">
                  Get Started
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-meta-gray-2 flex flex-col justify-between rounded-3xl px-8 py-10 max-w-96 min-w-64 h-[520px]">
          <div>
            <div className="text-meta-purple-1 font-medium text-base text-center">
              Business Plan
            </div>

            <div className="flex justify-center items-end my-6">
              <div className="text-meta-purple-1 font-medium text-4xl">$99</div>
              <div className="text-meta-light-blue-3 font-medium text-xs mb-1">
                /Month
              </div>
            </div>

            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center justify-start mb-3">
                <div className="mr-4">
                  <Image
                    alt="Icon"
                    width={20}
                    height={20}
                    src={"/pricing/rightTick.svg"}
                  />
                </div>
                <div className="text-meta-purple-1 font-normal text-sm">
                  Lorem Ipsum is simply dummy
                </div>
              </div>
            ))}
          </div>

          <div>
            <button className="rounded-xl w-full h-12 bg-meta-blue-2">
              <span className="flex justify-center font-medium text-sm text-white">
                Get Started
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
