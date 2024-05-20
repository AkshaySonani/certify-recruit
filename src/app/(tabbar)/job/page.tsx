'use client';
import { useRouter } from 'next/navigation';
import React, { Fragment, useState } from 'react';
import { TEXT, USER_ROLE } from '@/service/Helper';
import IndividualJob from '@/Components/job/individual_job';
import { useSession } from 'next-auth/react';
import EmployeeJob from '@/Components/job/employee_job';

const Page = () => {
  const session = useSession();

  return (
    <div>
      {session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
        <EmployeeJob />
      ) : (
        <IndividualJob />
      )}
    </div>
  );
};

export default Page;
