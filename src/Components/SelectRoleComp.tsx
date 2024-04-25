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
      <div className="container mx-auto h-screen">
        <div className="flex justify-center py-20">
          <Image src={"/MainLogo.svg"} alt="MainLogo" width={334} height={56} />
        </div>
        <div className="bg-[url('/_Compound.svg')]">
          <div className="flex justify-center mt-10">
            <div className="flex w-2/4 justify-between">
              <div
                onClick={() => {
                  setEmployee(true);
                  context?.setCurrentRole(USER_ROLE?.EMPLOYEE);
                }}
                className="w-64 h-44 border cursor-pointer border-meta-light-blue-2 rounded-lg flex justify-center items-center shadow-lg hover:shadow-md hover:shadow-blue-700"
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
                className="w-64 h-44 border cursor-pointer border-meta-light-blue-2 rounded-lg flex justify-center items-center shadow-lg hover:shadow-md hover:shadow-blue-700"
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
