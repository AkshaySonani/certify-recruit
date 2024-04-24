"use client";

import React, { useContext, useEffect, useState } from "react";
import SelectRoleComp from "@/Components/SelectRoleComp";
import EmployeeComp from "@/Components/EmployeeComp";
import IndividualComp from "@/Components/IndividualComp";
import AppContext from "@/context/AppProvider";
const page = () => {
  const context = useContext(AppContext);
  useEffect(() => {
    context?.setCurrentRole("");
  }, []);

  return (
    <div>
      {context?.currentRole === "" ? (
        <SelectRoleComp />
      ) : context?.currentRole === "employee" ? (
        <EmployeeComp />
      ) : context?.currentRole === "individual" ? (
        <IndividualComp />
      ) : (
        ""
      )}
    </div>
  );
};

export default page;
