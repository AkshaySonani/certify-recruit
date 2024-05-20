'use client';
import React from 'react';
import Spinner from '@/app/icons/Spinner';
import { useSession } from 'next-auth/react';
import { USER_ROLE } from '@/service/Helper';
import EmployeeJob from '@/Components/job/employee_job';
import IndividualJob from '@/Components/job/individual_job';

const Page = () => {
  const session = useSession();

  return (
    <div>
      {!session?.data ? (
        <div className="flex h-full items-center justify-center">
          <Spinner
            width="32px"
            height="32px"
            color="#3751F2"
            className="spinner"
          />
        </div>
      ) : session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
        <EmployeeJob />
      ) : (
        <IndividualJob />
      )}
    </div>
  );
};

export default Page;
