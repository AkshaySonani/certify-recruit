'use client';
import EmployeeBGV from '@/Components/BGV/EmployeeBGV';
import IndividualBGV from '@/Components/BGV/IndividualBGV';
import { USER_ROLE } from '@/service/Helper';
import { useSession } from 'next-auth/react';

const Page = () => {
  const session = useSession();
  return (
    <div>
      {session?.data?.user?.role === USER_ROLE?.EMPLOYEE ? (
        <EmployeeBGV />
      ) : (
        <IndividualBGV />
      )}
    </div>
  );
};
export default Page;
