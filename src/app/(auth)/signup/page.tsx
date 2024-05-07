'use client';
import AppContext from '@/context/AppProvider';
import EmployeeComp from '@/Components/EmployeeComp';
import React, { useContext, useEffect } from 'react';
import SelectRoleComp from '@/Components/SelectRoleComp';
import IndividualComp from '@/Components/IndividualComp';

const Page = () => {
  const context = useContext(AppContext);
  useEffect(() => {
    context?.setCurrentRole('');
  }, []);

  return (
    <div>
      {context?.currentRole === '' ? (
        <SelectRoleComp />
      ) : context?.currentRole === 'employee' ? (
        <EmployeeComp />
      ) : context?.currentRole === 'individual' ? (
        <IndividualComp />
      ) : (
        ''
      )}
    </div>
  );
};

export default Page;
