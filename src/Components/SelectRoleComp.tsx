"use client";
import Image from "next/image";
import EmployeeComp from "./EmployeeComp";
import { useRouter } from "next/navigation";
import IndividualComp from "./IndividualComp";
import AppContext from "@/context/AppProvider";
import { TEXT, USER_ROLE } from "@/service/Helper";
import React, { useContext, useState } from "react";

const SelectRoleComp = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const [employee, setEmployee] = useState(false);
  const [individual, setIndividual] = useState(false);

  return (
    <div>
      <div className="container mx-auto h-screen max-w-6xl">
        <div className="flex justify-center py-20">
          <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
        </div>
        <div className="bg-[url('/_Compound.svg')]">
          <div className="flex justify-center mt-10 gap-2">
            <div className="flex w-2/4 justify-between">
              <div
                onClick={() => {
                  setEmployee(true);
                  context?.setCurrentRole(USER_ROLE?.EMPLOYEE);
                }}
                className="w-64 h-44  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white border cursor-pointer border-meta-light-blue-2 rounded-[24px] flex justify-center items-center  hover:shadow-md hover:shadow-blue-700"
              >
                <div className="w-24">
                  <div className="flex justify-center">
                    <Image
                      alt="icon"
                      width={70}
                      height={52}
                      src={"/Employee.svg"}
                    />
                  </div>
                  <div className="text-center mt-4 text-xl font-semibold text-meta-blue-1">
                    {TEXT?.EMPLOYEE}
                  </div>
                </div>
              </div>
              <div
                onClick={() => {
                  setIndividual(true);
                  context?.setCurrentRole(USER_ROLE?.INDIVIDUAL);
                }}
                className="w-64 h-44 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white border cursor-pointer border-meta-light-blue-2 rounded-[24px] flex justify-center items-center  hover:shadow-md hover:shadow-blue-700"
              >
                <div className="w-24">
                  <div className="flex justify-center">
                    <Image
                      alt="icon"
                      width={44}
                      height={52}
                      src={"/Individual.svg"}
                    />
                  </div>
                  <div className="text-center mt-4 text-xl font-semibold text-meta-blue-1">
                    {TEXT?.INDIVIDUAL}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {employee && <EmployeeComp />}
      {employee && <IndividualComp />}
    </div>
  );
};

export default SelectRoleComp;
